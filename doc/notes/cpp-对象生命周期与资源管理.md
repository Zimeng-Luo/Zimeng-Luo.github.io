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
description: "C++ 结构体、C++ 类与对象、C++ 成员函数、this 指针与对象指针、C++ 访问控制、封装与数据抽象、C++ 构造析构与拷贝控制、C++ 友元与静态成员、C++ 智能指针、C++ 动态内存的学习笔记。"
---

# C++ 对象与资源管理：从封装到 RAII

## C++ 结构体

### 1. 基本定义

结构体先定义类型，再声明变量。

```cpp
struct Student {
    std::string name;
    int age;
    double score;
};

Student s;
s.name = "Tom";
s.age = 18;
s.score = 95.5;
```

常见写法：

| 写法 | 说明 |
| --- | --- |
| `struct Student { ... };` | 定义结构体类型，结尾必须有分号 |
| `Student s;` | 声明一个结构体变量 |
| `s.name` | 通过点运算符访问成员 |

### 2. 初始化

结构体可用聚合初始化按成员顺序赋值。

```cpp
Student a = {"Alice", 20, 88.0};
Student b{"Bob", 19, 91.5};
```

如果结构体只用于保存数据，聚合初始化简洁清晰；成员顺序改变时，要同步检查初始化代码。

### 3. 构造函数

结构体可以定义构造函数，用于创建对象时统一初始化成员。

```cpp
struct Student {
    std::string name;
    int age;
    double score;

    Student(std::string n, int a, double s)
        : name(n), age(a), score(s) {}
};

Student s("Tom", 18, 95.5);
```

要点：

| 写法 | 说明 |
| --- | --- |
| `Student(...)` | 构造函数名必须和结构体名一致 |
| `: name(n), age(a)` | 成员初始化列表，优先用于初始化成员 |
| 无返回类型 | 构造函数不能写 `void` 或其他返回类型 |

如果定义了带参数构造函数，编译器通常不会再自动生成无参构造函数；若仍需无参创建对象，可显式补上：

```cpp
Student() = default;
```

### 4. 指针访问

结构体指针保存结构体对象地址，访问成员时使用 `->`。

```cpp
Student s{"Tom", 18, 95.5};
Student* p = &s;

p->score = 99.0;      // 等价于 (*p).score = 99.0
std::cout << p->name;
```

| 访问方式 | 适用对象 |
| --- | --- |
| `s.name` | 结构体变量 |
| `p->name` | 结构体指针 |
| `(*p).name` | 指针解引用后再访问成员 |

### 5. 作为函数参数

小结构体可以值传递；较大结构体通常使用引用或 `const` 引用，避免不必要拷贝。

```cpp
void printStudent(const Student& s) {
    std::cout << s.name << " " << s.score << '\n';
}

void updateScore(Student& s, double score) {
    s.score = score;
}
```

| 参数形式               | 作用               |
| ------------------ | ---------------- |
| `Student s`        | 复制一份，函数内修改不影响原对象 |
| `Student& s`       | 直接修改原对象          |
| `const Student& s` | 只读访问，避免拷贝        |

### 6. 类型别名

C 语言常用 `typedef` 简化结构体写法；C++ 中结构体名本身就是类型名，也可用 `using` 起别名。

```cpp
typedef struct Book {
    std::string title;
    double price;
} Book;

using Point2D = struct Point {
    double x;
    double y;
};
```

在普通 C++ 代码中，更常见的是直接写：

```cpp
struct Point {
    double x;
    double y;
};

Point p{1.0, 2.0};
```

### 7. `struct` 与 `class`

C++ 中 `struct` 和 `class` 都能包含成员变量、成员函数、构造函数、继承等；核心差异是默认访问权限。

| 对比项 | `struct` | `class` |
| --- | --- | --- |
| 默认成员权限 | `public` | `private` |
| 默认继承权限 | `public` | `private` |
| 常见用途 | 简单数据对象 | 封装行为和不变量的对象 |

```cpp
struct Data {
    int x; // 默认 public
};

class Counter {
    int value; // 默认 private
};
```

### 8. 常见易错点

- 结构体定义结尾忘记写分号。
- 构造函数写了返回类型，例如 `void Student(...)`。
- 定义带参数构造函数后，还想直接写 `Student s;`，但没有无参构造函数。
- 把结构体变量访问成员写成 `s->name`，只有指针才用 `->`。
- 结构体初始化依赖成员顺序，调整字段后忘记同步修改。
- 大结构体频繁值传递，造成不必要拷贝。
- 误以为 `struct` 只能存数据；C++ 的 `struct` 也可以定义成员函数。

---

## C++ 类与对象

### 基本概念

| 概念 | 说明 |
| --- | --- |
| 类 `class` | 把数据和操作数据的函数绑定在一起 |
| 对象 | 类创建出的实例，每个对象有自己的成员数据 |
| 成员变量 | 类中保存状态的数据 |
| 成员函数 | 类中定义的行为，可访问对象成员 |
| 访问控制 | `public` 对外可见，`private` 仅类内可见，`protected` 类内和派生类可见 |

### 函数的两个问题

判断一个类相关的函数时，先看两个点：

| 问题       | 说明                                       |
| -------- | ---------------------------------------- |
| 操作的是哪个对象 | 看函数绑定到哪个对象上，成员函数默认通过 `this` 指针访问当前对象     |
| 有没有权限操作  | 看访问控制是否允许，成员函数只能直接访问当前类允许的成员，必要时可用友元放宽权限 |

这两个问题分别对应“对象归属”和“访问权限”。前者决定函数处理的是谁的数据，后者决定函数能不能改这些数据。

### 类定义

```cpp
class Box {
private:
    double width;

public:
    void setWidth(double w) {
        width = w;
    }

    double getWidth() const {
        return width;
    }
};
```

### 对象使用

```cpp
Box box;
box.setWidth(10.0);
double w = box.getWidth();
```

### 构造函数与析构函数

| 函数 | 作用 |
| --- | --- |
| 构造函数 | 对象创建时自动调用，常用于初始化成员 |
| 析构函数 | 对象销毁时自动调用，常用于释放资源 |

```cpp
class File {
public:
    File() {
        // 初始化资源
    }

    ~File() {
        // 释放资源
    }
};
```

---

## C++ 成员函数、this 指针与对象指针

### 成员函数

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

### this 指针

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

### 对象指针

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

### 内联函数

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

---

## C++ 访问控制、封装与数据抽象

### 访问修饰符

| 修饰符 | 类内 | 派生类 | 类外 | 常见用途 |
| --- | --- | --- | --- | --- |
| `public` | 可访问 | 可访问 | 可访问 | 对外接口 |
| `protected` | 可访问 | 可访问 | 不可访问 | 供继承复用 |
| `private` | 可访问 | 不可直接访问 | 不可访问 | 内部数据与实现 |

`class` 默认成员访问权限是 `private`，`struct` 默认是 `public`。

### 封装

封装就是把数据隐藏起来，只通过成员函数操作对象。

#### 要点

| 做法 | 目的 |
| --- | --- |
| 成员变量设为 `private` | 防止外部直接破坏对象状态 |
| 提供 `public` 成员函数 | 暴露稳定、可控的操作入口 |
| 必要时使用 `protected` | 让派生类复用基类能力 |
| 只读函数加 `const` | 保证函数不修改对象状态 |

```cpp
class Account {
private:
    double balance = 0.0;

public:
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    double getBalance() const {
        return balance;
    }
};
```

### 数据抽象

数据抽象是只向外提供必要接口，隐藏内部实现细节。

#### 直观理解

像电视机一样，用户只关心开关、频道、音量，不需要知道内部电路如何工作。

#### C++ 中的体现

C++ 用类来定义抽象数据类型（ADT）。类的公有成员构成接口，私有成员保存实现细节。

```cpp
#include <iostream>
using namespace std;

class Adder {
public:
    Adder(int i = 0) : total(i) {}

    void addNum(int number) {
        total += number;
    }

    int getTotal() const {
        return total;
    }

private:
    int total;
};

int main() {
    Adder a;
    a.addNum(10);
    a.addNum(20);
    a.addNum(30);
    cout << "Total " << a.getTotal() << endl;
    return 0;
}
```

### 好处

- 保护内部状态，减少误用
- 接口稳定后，内部实现可以替换
- 代码更易维护、测试和复用

### 设计原则

抽象的核心是分离接口和实现。对外只暴露必要方法，底层数据结构或算法可以变化，只要接口不变，使用方通常不需要改动。

---

## C++ 构造析构与拷贝控制

### 构造函数

构造函数名称与类名相同，没有返回类型。

```cpp
class Line {
private:
    double length;

public:
    Line() : length(0.0) {}

    explicit Line(double len) : length(len) {}

    double getLength() const {
        return length;
    }
};
```

`explicit` 可避免单参数构造函数发生不必要的隐式类型转换。

### 成员初始化列表

成员初始化列表在进入构造函数体前完成初始化，推荐优先使用。

```cpp
class Person {
private:
    const int id;
    string name;

public:
    Person(int id, string name) : id(id), name(name) {}
};
```

必须使用初始化列表的常见场景：

| 场景 | 原因 |
| --- | --- |
| `const` 成员 | 只能初始化，不能后续赋值 |
| 引用成员 | 引用创建时必须绑定对象 |
| 无默认构造函数的对象成员 | 必须明确调用其构造函数 |

成员实际初始化顺序由它们在类中的声明顺序决定，不由初始化列表书写顺序决定。

### 析构函数

析构函数名称为 `~类名`，没有返回类型，不能带参数，每个类只能有一个析构函数。

```cpp
class Buffer {
private:
    int* data;

public:
    explicit Buffer(int size) : data(new int[size]) {}

    ~Buffer() {
        delete[] data;
    }
};
```

| 函数 | 自动调用时机 |
| --- | --- |
| 构造函数 | 创建对象时 |
| 析构函数 | 对象离开作用域、临时对象结束、`delete` 对象时 |

### 拷贝构造函数

拷贝构造函数用于用一个同类型对象初始化新对象。

```cpp
class ClassName {
public:
    ClassName(const ClassName& other) {
        // 使用 other 初始化当前对象
    }
};
```

参数通常写成 `const ClassName&`，避免按值传参再次触发拷贝构造。

### 深拷贝示例

类中有指针并负责释放内存时，应让新对象拥有自己的独立资源。

```cpp
class Line {
private:
    int* ptr;

public:
    explicit Line(int len) : ptr(new int(len)) {}

    Line(const Line& other) : ptr(new int(*other.ptr)) {}

    ~Line() {
        delete ptr;
    }
};
```

### 速查

| 写法 | 含义 |
| --- | --- |
| `ClassName();` | 默认构造函数 |
| `ClassName(int x);` | 带参数构造函数 |
| `ClassName() : member(value) {}` | 成员初始化列表 |
| `~ClassName();` | 析构函数 |
| `ClassName(const ClassName& other);` | 拷贝构造函数 |
| `ClassName b = a;` | 拷贝初始化，调用拷贝构造 |
| `b = a;` | 已有对象赋值，调用拷贝赋值运算符 |

---

## C++ 友元与静态成员

### 友元函数

友元函数不是成员函数，但被类授权后可以访问其 `private` 和 `protected` 成员。

```cpp
class Box {
private:
    double width = 0.0;

public:
    void setWidth(double wid) {
        width = wid;
    }

    friend void printWidth(const Box& box);
};

void printWidth(const Box& box) {
    cout << box.width << endl;
}
```

| 要点 | 说明 |
| --- | --- |
| 非成员 | 友元函数没有 `this` 指针 |
| 非继承 | 友元关系不能继承，也不能传递 |
| 破坏封装 | 只在确有必要时使用 |

### 友元类

如果希望一个类的所有成员函数都能访问当前类的私有成员，可以声明整个类为友元。

```cpp
class BigBox;

class Box {
private:
    double width = 0.0;

public:
    friend class BigBox;
};
```

### 静态数据成员

静态数据成员属于类本身，所有对象共享同一份数据。

```cpp
class Box {
public:
    static int objectCount;

    Box() {
        objectCount++;
    }
};

int Box::objectCount = 0;
```

静态数据成员在类内声明，通常还要在类外定义并初始化。

### 静态成员函数

静态成员函数不依赖具体对象，不能直接访问非静态成员，也没有 `this` 指针。

```cpp
class Box {
public:
    static int objectCount;

    static int getCount() {
        return objectCount;
    }
};

int count = Box::getCount();
```

### 速查

| 机制 | 作用 | 注意 |
| --- | --- | --- |
| `friend` 函数 | 类外函数访问私有成员 | 不是成员函数 |
| `friend class` | 整个类获得访问权限 | 关系不传递 |
| `static` 数据成员 | 类级共享状态 | 一般需类外定义 |
| `static` 成员函数 | 类级工具函数或访问静态数据 | 没有 `this` |

---

## C++ 智能指针

### 普通指针的问题

普通指针需要手动 `new` 和 `delete`：

```cpp
Base* p = new Derived();
p->f();
delete p;
```

常见风险：

| 问题 | 说明 |
| --- | --- |
| 内存泄漏 | 忘记 `delete`，对象一直不释放 |
| 悬空指针 | `delete` 后继续访问已释放对象 |
| 异常安全差 | 中途抛异常时可能跳过 `delete` |

### 基本用法

```cpp
#include <memory>

std::unique_ptr<Base> p = std::make_unique<Derived>();
p->f();
```

智能指针对象离开作用域时会自动释放所管理的对象，不需要手动 `delete`。

### std::unique_ptr

`std::unique_ptr` 表示独占所有权：同一时间只有一个 `unique_ptr` 拥有对象。

```cpp
std::unique_ptr<Base> p1 = std::make_unique<Derived>();
std::unique_ptr<Base> p2 = std::move(p1);
```

特点：

- 不能复制，只能移动。
- 开销小，语义清晰。
- 适合大多数“对象归当前代码管理”的场景。

### std::shared_ptr

`std::shared_ptr` 表示共享所有权：多个 `shared_ptr` 可以共同拥有同一个对象，最后一个拥有者销毁时对象才释放。

```cpp
std::shared_ptr<Base> p1 = std::make_shared<Derived>();
std::shared_ptr<Base> p2 = p1;
```

特点：

- 可以复制。
- 通过引用计数管理生命周期。
- 适合对象确实需要被多个模块共同持有的场景。

### std::weak_ptr

`std::weak_ptr` 是弱引用：它观察 `shared_ptr` 管理的对象，但不拥有对象，也不会延长对象生命周期。

```cpp
std::weak_ptr<Base> w = p1;

if (auto p = w.lock()) {
    p->f();
}
```

特点：

- 不能直接访问对象，使用前要通过 `lock()` 转成 `shared_ptr`。
- 对象已释放时，`lock()` 返回空的 `shared_ptr`。
- 常用于避免 `shared_ptr` 循环引用。

### 对比

| 类型 | 是否拥有对象 | 特点 | 常见场景 |
| --- | --- | --- | --- |
| `std::unique_ptr` | 是 | 独占所有权，不能复制 | 默认优先选择 |
| `std::shared_ptr` | 是 | 共享所有权，引用计数 | 多处共同持有对象 |
| `std::weak_ptr` | 否 | 只观察对象，不延长生命周期 | 配合 `shared_ptr` 打破循环引用 |

### 使用原则

- 能用 `std::unique_ptr` 就优先用 `std::unique_ptr`。
- 确实需要共享生命周期时，再使用 `std::shared_ptr`。
- 需要观察对象但不拥有对象时，使用 `std::weak_ptr`。
- 创建智能指针优先使用 `std::make_unique` 和 `std::make_shared`。

---

## C++ 动态内存

### new 和 delete 运算符

`new` 为指定类型在堆上分配内存，返回指向该内存的指针；`delete` 释放 `new` 分配的内存。

```cpp
// 基本用法
double* pvalue = new double;    // 分配内存
*pvalue = 29494.99;
delete pvalue;                  // 释放内存
```

自由存储区不足时 `new` 会抛出 `std::bad_alloc` 异常（默认行为），或旧式编译器返回空指针。

#### 与 malloc/free 对比

| 特性          | `new`/`delete` | `malloc`/`free` |
| ----------- | -------------- | --------------- |
| 语言          | C++            | C               |
| 调用构造函数/析构函数 | 是              | 否               |
| 返回类型        | 类型安全指针         | `void*`         |
| 失败处理        | 抛出异常           | 返回 `NULL`       |
| 内存大小计算      | 编译器自动计算        | 手动计算字节数         |

```cpp
// malloc 不会调用构造函数，成员为未初始化值
TEST* pObj1 = (TEST*)malloc(sizeof(TEST));
pObj1->Print();  // 垃圾值

// new 会调用构造函数，成员为构造后的值
TEST* pObj2 = new TEST;
pObj2->Print();  // 已初始化
```

### 数组动态分配

#### 一维数组

```cpp
int* array = new int[m];   // 分配
delete[] array;            // 释放
```

#### 二维数组

```cpp
int** array = new int*[m];
for (int i = 0; i < m; i++) {
    array[i] = new int[n];
}
// 释放
for (int i = 0; i < m; i++) {
    delete[] array[i];
}
delete[] array;
```

#### 三维数组

```cpp
int*** array = new int**[m];
for (int i = 0; i < m; i++) {
    array[i] = new int*[n];
    for (int j = 0; j < n; j++) {
        array[i][j] = new int[h];
    }
}
// 释放
for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
        delete[] array[i][j];
    }
    delete[] array[i];
}
delete[] array;
```

### 对象动态分配

`new[]` 分配对象数组时为每个对象调用构造函数，`delete[]` 为每个对象调用析构函数。

```cpp
class Box {
public:
    Box() { std::cout << "调用构造函数！\n"; }
    ~Box() { std::cout << "调用析构函数！\n"; }
};

Box* myBoxArray = new Box[4];   // 调用 4 次构造函数
delete[] myBoxArray;             // 调用 4 次析构函数
```

### delete 与 delete[] 区别

- **内置类型**（`int`、`char`、`float` 等）：`delete` 和 `delete[]` 效果相同，因系统能直接通过指针获取实际分配的内存大小。
- **自定义类型**（类对象）：必须使用 `delete[]`，否则只调用第一个对象的析构函数，后续对象分配的资源（如内部 `new` 的缓冲区）无法释放，造成内存泄漏。

```cpp
A* a = new A[10];
delete a;     // 错误：仅释放内存空间，只调用了 a[0] 的析构函数
delete[] a;   // 正确：为每个对象调用析构函数并释放全部内存
```

### 使用要点

- `new` 分配的内存必须用 `delete` 释放，`new[]` 分配的内存必须用 `delete[]` 释放。
- 删除后指针变为野指针，建议置为 `nullptr`：`delete p; p = nullptr;`。
- 现代 C++ 优先使用智能指针（`std::unique_ptr`、`std::shared_ptr`）替代裸指针管理动态内存。
