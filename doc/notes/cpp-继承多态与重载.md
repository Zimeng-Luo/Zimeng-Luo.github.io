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
description: "C++ 重载、C++ 继承、C++ 多态与虚函数的学习笔记。"
---

# C++ 多态：区分继承、重写与重载

## C++ 重载

### 函数重载

同一作用域中，函数名相同但参数列表不同。

```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}
```

返回值类型不同但参数列表相同，不能构成重载。

### 重载决策

调用重载函数时，编译器会根据实参匹配最合适的函数版本。

```cpp
void print(int value);
void print(double value);
void print(const char* value);

print(10);      // 匹配 print(int)
print(3.14);    // 匹配 print(double)
print("hello"); // 匹配 print(const char*)
```

可构成函数重载的差异：

| 差异 | 示例 |
| --- | --- |
| 参数数量不同 | `f(int)`、`f(int, int)` |
| 参数类型不同 | `f(int)`、`f(double)` |
| 参数顺序不同 | `f(int, double)`、`f(double, int)` |

不能只靠返回值类型区分：

```cpp
int get();
double get(); // 错误：参数列表相同，不能只按返回值重载
```

### 运算符重载

运算符重载让自定义类型支持类似内置类型的操作。

```cpp
class Point {
public:
    int x;
    int y;

    Point operator+(const Point& other) const {
        return {x + other.x, y + other.y};
    }
};
```

常见需要用非成员函数或友元实现的运算符：`<<`、`>>`、左右操作数类型不同的二元运算。

### 成员与非成员写法

成员运算符重载以左操作数作为当前对象，即 `a + b` 会被理解为 `a.operator+(b)`：左操作数是 `this` 指向的对象，右操作数是函数形参。

```cpp
class Box {
public:
    double volume = 0.0;

    Box operator+(const Box& other) const {
        return {volume + other.volume};
    }
};
```

非成员运算符重载没有隐式的 `this`，`a + b` 会被理解为 `operator+(a, b)`：左、右操作数都作为普通形参传入。

```cpp
class Box {
public:
    double volume = 0.0;
};

bool operator<(const Box& a, const Box& b) {
    return a.volume < b.volume;
}
```

### 成员函数与非成员函数选择

| 写法      | 左操作数身份       | 右操作数身份 | 适合场景                      |
| ------- | ------------ | ------ | ------------------------- |
| 成员函数    | 当前对象 `*this` | 普通形参   | 左操作数必须是当前类对象，或运算会修改当前对象   |
| 普通非成员函数 | 普通形参         | 普通形参   | 左右操作数都需要类型转换，或左操作数不是当前类对象 |
| 友元非成员函数 | 普通形参         | 普通形参   | 需要访问私有成员，但逻辑不适合作为成员函数     |

必须写成类成员函数的运算符：

| 运算符 | 说明 |
| --- | --- |
| `=` | 赋值运算符，必须修改左侧对象 |
| `[]` | 下标运算符，左侧必须是对象 |
| `()` | 函数调用运算符，让对象像函数一样调用 |
| `->` | 成员访问运算符，左侧必须是对象或对象代理 |

通常应写成成员函数的运算符：

| 运算符                 | 适合原因                       |
| ------------------- | -------------------------- |
| `+=`、`-=`、`*=`、`/=` | 修改左侧对象，返回 `*this`          |
| 前置 `++x`、`--x`      | 修改当前对象，返回当前对象引用            |
| 后置 `x++`、`x--`      | 修改当前对象，用额外 `int` 形参区分前置/后置 |

通常应写成普通非成员函数的运算符：

| 运算符                         | 适合原因                                                                       |
| --------------------------- | -------------------------------------------------------------------------- |
| `+`、`-`、`*`、`/`             | 生成新对象，左右操作数应尽量对称                                                           |
| `==`、`!=`、`<`、`>`、`<=`、`>=` | 比较两个对象，不一定属于左侧对象                                                           |
| `<<`、`>>`                   | 左操作数通常是流对象，如 `ostream`、`istream`（流操作符重载的作用，就是让自定义对象能无缝接入输入输出系统，并按你指定的格式读写） |

没有“必须写成普通非成员函数”的可重载运算符，但 `<<`、`>>` 几乎总是写成非成员函数；若要访问私有成员，可声明为 `friend`。

```cpp
ostream& operator<<(ostream& os, const Box& box) {
    return os << box.volume;
}
```

### 常见运算符形态

| 运算符 | 常见返回值 | 说明 |
| --- | --- | --- |
| `+`、`-`、`*` | 新对象 | 不修改原对象 |
| `+=`、`-=` | 当前对象引用 | 修改自身，返回 `*this` |
| `==`、`<` | `bool` | 比较对象 |
| `[]` | 元素引用 | 支持下标访问 |
| `()` | 任意类型 | 让对象像函数一样调用 |
| `++x` | 当前对象引用 | 前置递增，先改后返回 |
| `x++` | 旧对象值 | 后置递增，用 `int` 形参区分 |

### 常见限制

| 规则 | 说明 |
| --- | --- |
| 不能创建新运算符 | 只能重载已有运算符 |
| 优先级不能改变 | 重载后仍保持原运算符优先级 |
| 参数数量受限制 | 一元、二元运算符参数数量固定 |
| 部分运算符不可重载 | 如 `.`、`.*`、`->*`、`::`、`sizeof`、`?:`、`#` |

不可重载的常见运算符：

| 运算符        | 含义        |
| ---------- | --------- |
| `.`        | 成员访问运算符   |
| `.*`、`->*` | 成员指针访问运算符 |
| `::`       | 作用域解析运算符  |
| `sizeof`   | 长度运算符     |
| `?:`       | 条件运算符     |
| `#`        | 预处理符号     |

---

## C++ 继承

### 基本语法

```cpp
class Base {
public:
    void publicFunc() {}

protected:
    int protectedValue;

private:
    int privateValue;
};

class Derived : public Base {
public:
    void ownFunc() {}
};
```

语法格式：

```cpp
class 派生类名 : 继承方式 基类名 {
    // 新增成员或重写成员
};
```

### 继承方式

继承方式决定基类成员在派生类中的可见性。基类 `private` 成员不会被派生类直接访问，只能通过基类的 `public` 或 `protected` 接口间接使用。

| 继承方式 | 基类 `public` 成员 | 基类 `protected` 成员 | 常见用途 |
| --- | --- | --- | --- |
| `public` | 仍为 `public` | 仍为 `protected` | 表达“是一个”关系 |
| `protected` | 变为 `protected` | 仍为 `protected` | 较少使用 |
| `private` | 变为 `private` | 变为 `private` | 复用实现，不暴露接口 |

### 访问示例

```cpp
class Animal {
public:
    void eat() {}

protected:
    int age = 0;

private:
    int id = 1;
};

class Dog : public Animal {
public:
    void grow() {
        age++;
        // id++; // 错误：基类 private 成员不可直接访问
    }
};
```

### 派生类构造

派生类对象包含一个基类子对象。构造派生类时，应在初始化列表中显式调用基类构造函数。

```cpp
class Person {
public:
    explicit Person(string name) : name_(name) {}

protected:
    string name_;
};

class Student : public Person {
public:
    Student(string name, int score) : Person(name), score_(score) {}

private:
    int score_;
};
```

### 构造与析构顺序

1. 构造对象时，先调用基类构造函数，再调用派生类构造函数。需要手动调用
2. 销毁对象时，先调用派生类析构函数，再调用基类析构函数。
```cpp
  class Derived : public Base {
  public:
      Derived(int x, int y) : Base(x) { //Base是父类构造函数
          cout << "Derived constructor, y = " << y << endl;
      }

      ~Derived() { //父类析构函数不需要手动调用
          cout << "Derived destructor" << endl;
      }
  };
```
3. 如果你会通过父类指针删除子类对象，父类析构函数必须写成 virtual。

```cpp
class Base {
public:
    virtual ~Base() = default;
};
```

### 多继承

C++ 支持一个派生类继承多个基类，但容易引入命名冲突和菱形继承问题。

| 问题 | 说明 | 处理 |
| --- | --- | --- |
| 命名冲突 | 多个基类有同名成员 | 用 `Base::member` 指明来源 |
| 菱形继承 | 同一个祖先基类被继承多次 | 必要时使用虚继承 |

### 继承类型速查

| 类型 | 结构 |
| --- | --- |
| 单继承 | 一个派生类继承一个基类 |
| 多继承 | 一个派生类继承多个基类 |
| 多级继承 | `A -> B -> C` 逐级派生 |
| 层次继承 | 多个派生类继承同一个基类 |
| 混合继承 | 多种继承结构组合使用 |

---

## C++ 多态与虚函数

### 多态成立条件

运行时多态通常同时满足：

| 条件 | 说明 |
| --- | --- |
| 继承关系 | 派生类继承基类接口 |
| 基类虚函数 | 基类函数使用 `virtual` 声明 |
| 派生类重写 | 派生类提供同签名实现，建议写 `override` |
| 基类指针或引用调用 | 通过 `Base*` 或 `Base&` 调用虚函数 |

### 虚函数

虚函数是在基类中用 `virtual` 声明的成员函数。通过基类指针或引用调用时，程序会在运行期根据对象真实类型选择具体实现，这叫动态绑定，也叫后期绑定。

```cpp
#include <iostream>
#include <memory>

class Shape {
public:
    virtual double area() const {
        return 0;
    }

    virtual ~Shape() = default;
};

class Circle : public Shape {
private:
    double r;

public:
    explicit Circle(double radius) : r(radius) {}

    double area() const override {
        return 3.14 * r * r;
    }
};

int main() {
    std::unique_ptr<Shape> shape = std::make_unique<Circle>(2.0);
    std::cout << shape->area() << '\n';
}
```

如果 `area()` 不是虚函数，`shape->area()` 会按指针的静态类型 `Shape*` 调用 `Shape::area()`，不会体现运行时多态。

### 纯虚函数与抽象类

纯虚函数使用 `= 0` 声明，表示基类只定义接口，具体实现交给派生类。包含纯虚函数的类是抽象类，不能直接创建对象。

```cpp
class Drawable {
public:
    virtual void draw() const = 0;
    virtual ~Drawable() = default;
};
```

### 接口（抽象类）

C++ 没有单独的 `interface` 关键字，通常用“只有纯虚函数的抽象类”来表达接口。

#### 特点

| 特点 | 说明 |
| --- | --- |
| 只定义行为 | 只声明函数，不关心具体实现 |
| 不能实例化 | 含纯虚函数的类不能直接创建对象 |
| 由派生类实现 | 子类必须重写全部纯虚函数，才能成为具体类 |
| 便于统一调用 | 可以用基类指针或引用操作不同派生类对象 |

#### 常见写法

```cpp
class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};
```

这种写法把“能做什么”固定下来，把“怎么做”交给派生类。接口越稳定，调用方越不依赖实现细节。

### 虚函数表机制

C++ 常通过虚函数表实现动态绑定：

| 名称 | 作用 |
| --- | --- |
| 虚函数表 vtable | 类级别表，保存虚函数实现地址 |
| 虚函数指针 vptr | 对象内部指针，指向所属类的 vtable |

调用虚函数时，程序通过对象的 `vptr` 找到对应 `vtable`，再跳转到真实类型的函数实现。

### 关键写法

| 写法 | 作用 |
| --- | --- |
| `virtual` | 在基类中开启动态绑定 |
| `override` | 标明派生类函数重写基类虚函数 |
| `virtual ~Base()` | 通过基类指针删除派生类对象时正确析构 |
| `= 0` | 声明纯虚函数，使类成为抽象类 |

### 静态多态与动态多态

| 类型   | 实现方式          | 绑定时机 |
| ---- | ------------- | ---- |
| 静态多态 | 函数重载、运算符重载、模板 | 编译期  |
| 动态多态 | 继承 + 虚函数      | 运行期  |

### 常见注意点

- 只有通过基类指针或引用调用虚函数，才会触发运行时多态。
- 多态基类通常需要虚析构函数，避免只析构基类部分。
- `override` 可让编译器检查函数签名，避免误写成新的成员函数。
