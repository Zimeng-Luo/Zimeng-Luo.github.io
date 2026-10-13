---
title: "C++ 多态：区分继承、重写与重载"
date: 2026-10-13
categories:
  - 笔记
tags:
  - C++
  - 接口设计
  - 多态与抽象
coverImg: /blog/bg09.jpg
sidebar: false
description: "用统一接口示例区分运行时多态和编译期重载，并梳理析构与运算符语义。"
---

# C++ 多态：区分继承、重写与重载

“同一个接口有多种行为”可以在编译期决定，也可以在运行期决定。理解多态，先分清调用选择发生在哪个阶段。

## 继承表达可替代关系

公开继承通常表达“派生对象也是一种基类对象”。如果只是“拥有一个对象”，优先考虑组合，避免为了复用几行代码引入不必要的继承层次。

派生类对象包含基类子对象。构造时先构造基类，再按声明顺序构造成员，最后执行派生类构造函数体；析构按相反方向进行。未显式指定基类初始化时会尝试默认构造，而不是需要在函数体中手动调用构造函数。

| 继承方式 | 基类 public 成员在派生类中的权限 | 基类 protected 成员 |
| --- | --- | --- |
| `public` | public | protected |
| `protected` | protected | protected |
| `private` | private | private |

基类 private 成员存在于基类子对象中，但派生类不能直接访问它们。多继承会带来命名冲突，菱形继承还涉及重复基类子对象，只有确有需求时才使用。

## 虚函数选择实际对象的实现

```cpp
#include <iostream>
#include <memory>

class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius_;
public:
    explicit Circle(double r) : radius_(r) {}
    double area() const override {
        return 3.141592653589793 * radius_ * radius_;
    }
};

int main() {
    std::unique_ptr<Shape> shape = std::make_unique<Circle>(2.0);
    std::cout << shape->area() << '\n';
}
```

`virtual` 开启动态派发，`override` 让编译器检查重写签名，纯虚函数 `= 0` 建立抽象接口。抽象类不能直接实例化。

基类指针或引用是常见的多态使用方式。对象表达式也能调用虚函数；不能把动态派发限定成“只有指针和引用调用才可能发生”。显式限定调用如 `Base::f()` 则会抑制虚派发。通过基类接口按值复制派生对象可能发生切片，丢失派生部分。

经基类指针删除派生对象时，基类必须具有合适的虚析构函数。虚函数表和对象内部的虚表指针是常见实现方式，并非标准强制的唯一布局。

## 重载在编译期选择版本

```cpp
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
```

参数类型、数量等不同可以形成重载，仅改变返回类型不行。重写则是在继承关系中提供基类虚函数的实现，签名必须满足重写要求。派生类定义同名但不同签名的函数，还可能隐藏基类重载，需要另行处理名称可见性。

## 运算符重载要维持直觉

```cpp
#include <ostream>

struct Point {
    int x = 0;
    int y = 0;
    Point& operator+=(const Point& other) {
        x += other.x;
        y += other.y;
        return *this;
    }
};

Point operator+(Point left, const Point& right) {
    return left += right;
}
std::ostream& operator<<(std::ostream& out, const Point& p) {
    return out << '(' << p.x << ", " << p.y << ')';
}
```

修改自身的 `+=` 返回当前对象引用；`+` 返回新值；输出运算符返回流引用以支持连续输出。流在左边，因此通常将流运算符实现为非成员函数，需要访问私有成员时可授权为友元。

重载不能创造新运算符，也不能改变优先级。`.`、`.*`、`::`、`?:`、`sizeof` 不能重载；`->*` 可以重载，不能与 `.*` 混淆。本系列以 C++17 为基线，`=`、`[]`、`()`、`->` 等按该版本的成员运算符规则理解。

选择抽象方式时：运行期需要统一操作不同对象，可用虚接口；编译期类型已知且希望复用实现，可用[模板](./cpp-构建与泛型编程.md)。
