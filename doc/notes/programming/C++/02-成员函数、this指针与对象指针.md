---
title: 02 成员函数、this指针与对象指针
date: 2026-09-02
categories: ["笔记", "编程", "C++"]
tags: ["C++", "编程"]
sidebar: false
---

# C++ 成员函数、this 指针与对象指针

## 核心摘要

成员函数负责操作对象状态，调用时会隐式绑定到某个对象。`this` 指针指向当前对象；对象指针保存对象地址，并用 `->` 访问成员。

## 成员函数

| 概念 | 说明 |
| --- | --- |
| 类内定义 | 写在类定义内部，通常是内联候选 |
| 类外定义 | 在类中声明，在类外用 `类名::函数名` 定义 |
| `const` 成员函数 | 承诺不修改当前对象状态 |
| 调用方式 | 对象用 `.`，对象指针用 `->` |

```cpp
class Box {
private:
    double length = 0.0;

public:
    void setLength(double len);
    double getLength() const {
        return length;
    }
};

void Box::setLength(double len) {
    if (len > 0) {
        length = len;
    }
}
```

`Box::setLength` 中的 `::` 是作用域解析运算符，表示该函数属于 `Box` 类。

## this 指针

`this` 是成员函数中隐式存在的指针，指向当前调用该函数的对象。

```cpp
class MyClass {
private:
    int value = 0;

public:
    void setValue(int value) {
        this->value = value;
    }

    MyClass& add(int n) {
        value += n;
        return *this;
    }
};
```

| 用法                   | 说明               |
| -------------------- | ---------------- |
| `this->member`       | 访问当前对象成员         |
| `this->member = ...` | 消除参数名和成员名冲突      |
| `return *this;`      | 返回当前对象，支持链式调用    |
| 友元函数                 | 不是成员函数，没有 `this` |
| 静态成员函数               | 属于类本身，没有 `this`  |

## 对象指针

对象指针保存类对象地址，可通过 `->` 访问成员。

```cpp
Box box;
Box* ptr = &box;
ptr->setLength(10.0);
```

动态创建对象时，`new` 返回对象指针，`delete` 释放对象。

```cpp
Box* ptr = new Box();
ptr->setLength(10.0);
delete ptr;
```

| 要点 | 说明 |
| --- | --- |
| 空指针 | 使用前确认不是 `nullptr` |
| 内存管理 | `new` 创建的对象要对应 `delete` |
| 与 `this` 区别 | 对象指针由代码显式保存，`this` 由成员函数隐式获得 |

## 内联函数

`inline` 提示编译器可在调用点展开函数体，常用于短小、频繁调用的函数。类内定义的成员函数通常也是内联候选。

```cpp
inline int maxValue(int x, int y) {
    return x > y ? x : y;
}
```

| 注意 | 说明 |
| --- | --- |
| 不是强制 | 编译器可以忽略 `inline` |
| 定义可见 | 通常把内联函数定义放在头文件 |
| 避免滥用 | 复杂函数、递归函数通常不适合内联 |

