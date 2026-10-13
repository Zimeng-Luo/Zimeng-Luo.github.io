---
title: "C++ 对象与资源管理：从封装到 RAII"
date: 2026-10-13
categories:
  - 笔记
tags:
  - C++
  - 资源管理
  - 接口设计
coverImg: /blog/bg07.jpg
sidebar: false
description: "统一理解类、构造析构、拷贝语义与智能指针，避免浅拷贝和资源泄漏。"
---

# C++ 对象与资源管理：从封装到 RAII

类把状态与操作放在一起。设计一个类时，不仅要考虑“能调用什么”，还要定义“什么状态合法、资源由谁释放、复制代表什么”。这些问题将封装和对象生命周期连接起来。

## 用接口保护合法状态

```cpp
#include <stdexcept>

class Account {
    double balance_ = 0;
public:
    void deposit(double amount) {
        if (amount <= 0) {
            throw std::invalid_argument("amount must be positive");
        }
        balance_ += amount;
    }
    double balance() const { return balance_; }
};
```

`public` 是对外接口，`private` 隐藏实现，`protected` 可供派生类访问。成员函数能够访问当前类的私有成员，包括另一个同类对象的成员；访问权限由类边界决定，不仅由是否为当前对象决定。

普通成员函数通过 `this` 访问调用对象，可用 `this->member` 区分同名参数。静态成员函数没有 `this`；静态数据属于类而非某个实例。C++17 可用 `inline static` 在类内定义共享数据。

`struct` 与 `class` 都可以有函数、构造函数和继承，主要区别是默认成员与默认继承权限。数据记录常用 `struct`，需要维护不变量的对象常用 `class`。友元可以授权特定非成员函数或类访问内部数据，友元关系不传递，也不自动继承。

## 初始化与析构是一对边界

```cpp
#include <string>
#include <utility>

struct Student {
    const int id;
    std::string name;
    Student(int i, std::string n) : id(i), name(std::move(n)) {}
};
```

成员初始化列表在构造函数体之前执行。`const` 成员、引用成员和无默认构造函数的对象成员需要在这里初始化。实际顺序由成员声明顺序决定，不能靠调整列表顺序改变。

构造负责建立对象，析构在对象生命周期结束时清理资源。把资源交给对象管理，就是 RAII：对象活着时拥有资源，对象离开作用域时自动释放。文件流、容器和智能指针都遵循这一思路，异常离开作用域时也能清理已成功构造的自动对象。

## 裸指针所有权为什么难？

```cpp
int* one = new int{3};
delete one;
int* many = new int[4]{};
delete[] many;
```

`new` / `delete` 与 `new[]` / `delete[]` 必须正确配对，对内置类型也一样；混用属于未定义行为。普通 `new` 分配失败通常抛 `std::bad_alloc`，`new (std::nothrow)` 才通过空指针报告失败。

`malloc` 只分配原始存储，不像 `new` 那样正常执行对象构造。将原始存储直接当成复杂对象调用方法并不安全。

将一个拥有裸指针的对象按默认方式复制，两个对象可能指向同一资源，析构时造成重复释放。仅补一个“深拷贝构造函数”仍不完整：已有对象之间的赋值也需要正确语义。管理裸资源时需考虑析构、拷贝构造、拷贝赋值，以及移动构造、移动赋值。

## 优先让成员管理资源

```cpp
#include <vector>

class Buffer {
    std::vector<int> data_;
public:
    explicit Buffer(int size) : data_(size, 0) {}
};
```

这里容器已经处理存储、复制和释放，类本身不必手写析构函数。这是 Rule of Zero 的典型形式。对于动态对象，用智能指针表达所有权：

| 工具 | 生命周期语义 | 选择依据 |
| --- | --- | --- |
| `unique_ptr` | 独占所有权，只能移动 | 默认优先 |
| `shared_ptr` | 多个持有者共享，最后一个释放时销毁 | 确实需要共同拥有 |
| `weak_ptr` | 观察共享对象，不延长生命周期 | 打破循环引用或暂时观察 |

```cpp
#include <memory>
#include <utility>

struct Node { int value = 0; };
auto owner = std::make_unique<Node>();
auto next_owner = std::move(owner); // owner 不再拥有对象

auto shared = std::make_shared<Node>();
std::weak_ptr<Node> observer = shared;
if (auto locked = observer.lock()) {
    locked->value = 3;
}
```

`weak_ptr` 必须经 `lock()` 取得有效的共享指针后访问。共享引用计数不会自动保证对象内容的并发安全。裸指针可以作为不拥有资源的观察者，但必须保证拥有者在使用期间仍存在。

多态对象通过基类指针释放时，还需要虚析构函数，见[继承与多态](./cpp-继承多态与重载.md)。
