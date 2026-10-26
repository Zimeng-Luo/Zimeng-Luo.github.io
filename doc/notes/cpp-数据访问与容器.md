---
title: "C++ 数据访问：数组、指针、引用与容器"
date: 2026-10-13
categories:
  - 笔记
tags:
  - C++
  - 数据结构
  - 内存安全
coverImg: /blog/bg06.jpg
sidebar: false
description: "C++ 数组、指针与字符串、C++ 引用、C++ vector 容器的学习笔记。"
---

# C++ 数据访问：数组、指针、引用与容器

## C++ 数组、指针与字符串

### 1. 数组

数组是固定大小、元素类型相同、内存连续的数据集合。

#### 1.1 声明与初始化

```cpp
int nums[5];                    // 声明 5 个 int
int a[3] = {1, 2, 3};           // 完整初始化
int b[5] = {1, 2};              // 后续元素自动置 0
int c[] = {1, 2, 3};            // 自动推断长度为 3
```

数组长度在普通数组声明后不可改变，访问元素使用下标：

```cpp
int first = a[0];
a[1] = 10;
```

注意：C++ 数组下标从 `0` 开始，合法范围是 `0` 到 `长度 - 1`。

#### 1.2 多维数组

二维数组常用于表格、矩阵等结构。

```cpp
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

int x = matrix[1][2]; // 6
```

#### 1.3 数组与函数

数组作为函数参数时会退化为指针，函数内部无法直接知道原始数组长度，通常需要额外传入长度。

```cpp
void printArray(int arr[], int size) {
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << '\n';
    }
}
```

### 2. 指针

指针变量保存的是地址。通过指针可以间接访问或修改目标对象。

#### 2.1 基本语法

```cpp
int value = 10;
int* p = &value;  // & 取地址

std::cout << p;   // 输出地址
std::cout << *p;  // * 解引用，得到 10

*p = 20;          // 修改 value
```

常见符号：

| 符号 | 含义 |
| --- | --- |
| `&x` | 取得变量 `x` 的地址 |
| `int* p` | 声明指向 `int` 的指针 |
| `*p` | 解引用，访问指针指向的对象 |
| `nullptr` | 空指针，表示不指向任何有效对象 |

#### 2.2 空指针与安全访问

```cpp
int* p = nullptr;

if (p != nullptr) {
    std::cout << *p;
}
```

不要解引用空指针或未初始化指针，否则会产生未定义行为。

#### 2.3 指针运算

指针加减会按指向类型的大小移动，常用于遍历数组。

```cpp
int arr[3] = {10, 20, 30};
int* p = arr;

std::cout << *p;       // 10
std::cout << *(p + 1); // 20
```

数组名在多数表达式中会退化为指向首元素的指针，因此 `arr[i]` 与 `*(arr + i)` 等价。

### 3. 字符串

C++ 中常见两类字符串：C 风格字符串和 `std::string`。

#### 3.1 C 风格字符串

C 风格字符串本质是以空字符 `'\0'` 结尾的字符数组。

```cpp
char str1[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
char str2[] = "Hello";
```

字符串字面量会自动包含结尾的 `'\0'`，因此 `"Hello"` 实际需要 6 个字符空间。

常见函数需要包含头文件：

```cpp
#include <cstring>

std::strlen(str2);      // 字符串长度，不含 '\0'
std::strcpy(str1, str2); // 复制字符串
std::strcmp(str1, str2); // 比较字符串
```

#### 3.2 `std::string`

`std::string` 是 C++ 标准库字符串类型，推荐日常优先使用。

```cpp
#include <string>

std::string s = "Hello";
s += " C++";

std::cout << s.length();
std::cout << s[0];
```

常用操作：

| 操作 | 示例 |
| --- | --- |
| 拼接 | `s1 + s2`、`s += "x"` |
| 长度 | `s.size()`、`s.length()` |
| 访问字符 | `s[i]`、`s.at(i)` |
| 判空 | `s.empty()` |
| C 字符串指针 | `s.c_str()` |

### 4. 三者关系

| 主题 | 关键关系 |
| --- | --- |
| 数组与指针 | 数组名常退化为首元素指针 |
| 指针与字符串 | C 风格字符串常用 `char*` 或 `const char*` 表示 |
| 数组与字符串 | 字符数组以 `'\0'` 结尾时可作为 C 风格字符串 |
| `std::string` | 封装了动态字符序列，更适合普通业务代码 |

### 5. 常见易错点

- 数组越界访问，例如访问 `arr[size]`。
- 忘记 C 风格字符串末尾需要 `'\0'`。
- 误以为数组参数能自动保留数组长度。
- 解引用未初始化指针、空指针或已经失效的指针。
- 混淆 `p`、`&p`、`*p` 的含义。
- 用 `==` 比较 C 风格字符串内容；应使用 `std::strcmp`，或改用 `std::string`。

---

## C++ 引用

### 1. 基本概念

引用不会创建新的独立对象，而是给已有对象起另一个名字。

```cpp
int x = 10;
int& ref = x;

ref = 20; // 等价于修改 x
```

要点：

| 规则 | 说明 |
| --- | --- |
| 必须初始化 | `int& r;` 是错误写法 |
| 不能重新绑定 | 初始化后始终引用同一个对象 |
| 操作引用等于操作原对象 | 对 `ref` 赋值会改变 `x` |
| 类型要匹配 | `int&` 通常只能绑定到 `int` 左值 |

### 2. 引用作为函数参数

引用参数让函数直接操作实参，常用于需要修改外部变量的场景。

```cpp
void swapValue(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int x = 1;
int y = 2;
swapValue(x, y);
```

与普通值传递相比，引用传递不会复制实参；与指针相比，调用时不需要写 `&`，函数内也不需要解引用。

### 3. `const` 引用

如果只读取参数，不修改参数，优先使用 `const` 引用，尤其是对象较大时。

```cpp
#include <string>

void printName(const std::string& name) {
    std::cout << name << '\n';
}
```

`const` 引用的作用：

| 用法 | 作用 |
| --- | --- |
| 避免拷贝 | 适合 `std::string`、容器、类对象 |
| 禁止修改 | 函数内不能改变实参 |
| 可绑定临时对象 | 例如字符串字面量转换出的临时 `std::string` |

### 4. 引用作为返回值

函数可以返回引用，让调用方直接访问原对象。

```cpp
int& getElement(int arr[], int index) {
    return arr[index];
}

int nums[3] = {1, 2, 3};
getElement(nums, 0) = 10;
```

注意：不要返回局部变量的引用，因为局部变量在函数结束后会销毁。

```cpp
int& bad() {
    int x = 10;
    return x; // 错误：返回悬空引用
}
```

### 5. 引用与指针对比

| 对比项 | 引用 | 指针 |
| --- | --- | --- |
| 本质 | 已有对象的别名 | 保存地址的变量 |
| 初始化 | 必须初始化 | 可以先声明，后赋值 |
| 是否可为空 | 普通引用不能为空 | 可为 `nullptr` |
| 是否可改指向 | 不能重新绑定 | 可以指向其他对象 |
| 使用方式 | 像普通变量一样使用 | 需要 `*` 解引用、`&` 取地址 |

### 6. 常见易错点

- 忘记引用声明时必须初始化。
- 误以为引用可以像指针一样重新指向其他变量。
- 非 `const` 左值引用不能绑定到临时值，例如 `int& r = 10;`。
- 返回局部变量引用，导致悬空引用。
- 大对象参数仍使用值传递，造成不必要拷贝；应考虑 `const T&`。

---

## C++ vector 容器

### 1. 基本用法

使用 `vector` 需要包含头文件 `<vector>`。

```cpp
#include <iostream>
#include <vector>

std::vector<int> nums;
```

常见初始化：

```cpp
std::vector<int> a;             // 空 vector
std::vector<int> b(5);          // 5 个 int，默认初始化为 0
std::vector<int> c(5, 10);      // 5 个 int，值都是 10
std::vector<int> d{1, 2, 3, 4}; // 列表初始化
```

### 2. 添加与删除

```cpp
std::vector<int> nums{1, 2, 3};

nums.push_back(4);             // 末尾添加
nums.emplace_back(5);          // 末尾原地构造元素
nums.pop_back();               // 删除末尾元素
nums.insert(nums.begin(), 0);   // 在开头插入
nums.erase(nums.begin() + 1);   // 删除下标 1 的元素
nums.clear();                  // 清空所有元素
```

| 操作 | 说明 |
| --- | --- |
| `push_back(x)` | 把已有元素追加到末尾 |
| `emplace_back(args...)` | 在末尾直接构造元素 |
| `pop_back()` | 删除末尾元素，不返回被删元素 |
| `insert(pos, x)` | 在迭代器位置插入 |
| `erase(pos)` | 删除迭代器指向的元素 |
| `clear()` | 清空元素，容量不一定释放 |

`emplace_back` 常用于结构体或类对象，可把构造参数直接传给元素类型。

```cpp
struct Student {
    std::string name;
    int age;

    Student(std::string n, int a) : name(n), age(a) {}
};

std::vector<Student> students;
students.emplace_back("Tom", 18);          // 直接构造 Student
students.push_back(Student("Alice", 20));  // 先构造临时对象，再追加
```

### 3. 访问元素

```cpp
std::vector<int> nums{3, 7, 11};

int a = nums[0];      // 不检查越界
int b = nums.at(1);   // 越界会抛出异常
int c = nums.front(); // 第一个元素
int d = nums.back();  // 最后一个元素
```

| 方式 | 特点 |
| --- | --- |
| `nums[i]` | 快，但越界是未定义行为 |
| `nums.at(i)` | 会检查越界 |
| `front()` | 访问首元素 |
| `back()` | 访问尾元素 |

### 4. 大小与容量

```cpp
std::vector<int> nums;

nums.reserve(100); // 预留容量，减少扩容次数
nums.resize(10);   // 调整元素个数
```

| 函数           | 含义              |
| ------------ | --------------- |
| `size()`     | 当前元素个数          |
| `empty()`    | 是否为空            |
| `capacity()` | 当前已分配容量         |
| `reserve(n)` | 预留至少 `n` 个元素的容量 |
| `resize(n)`  | 改变实际元素个数        |

### 5. 遍历

范围 `for` 最常用；需要修改元素时使用引用。

```cpp
std::vector<int> nums{1, 2, 3};

for (int x : nums) {
    std::cout << x << " ";
}

for (int& x : nums) {
    x *= 2;
}
```

也可以使用迭代器：

```cpp
for (auto it = nums.begin(); it != nums.end(); ++it) {
    std::cout << *it << " ";
}
```

### 6. 二维 vector

二维 `vector` 常用于矩阵或表格数据。

```cpp
std::vector<std::vector<int>> matrix(3, std::vector<int>(4, 0));

matrix[0][1] = 5;
```

含义：创建 `3` 行 `4` 列的整数矩阵，所有元素初始为 `0`。

### 7. 常见易错点

- 使用 `nums[i]` 前未确认下标范围。
- 对空 `vector` 调用 `front()`、`back()` 或 `pop_back()`。
- 混淆 `size()` 和 `capacity()`：前者是元素个数，后者是已分配空间。
- 在循环中频繁 `insert` 或 `erase` 中间元素，效率较低。
- `push_back`、`emplace_back`、`insert`、`erase` 可能导致迭代器、指针或引用失效。
