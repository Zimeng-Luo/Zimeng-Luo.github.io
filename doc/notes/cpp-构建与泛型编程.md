---
title: "C++ 工程组织：构建、命名空间、模板与预处理"
date: 2026-10-13
categories:
  - 笔记
tags:
  - C++
  - 工程实践
  - 泛型编程
coverImg: /blog/bg11.jpg
sidebar: false
description: "CMake 与 g++、C++ 命名空间、C++ 模板、C++ 预处理器的学习笔记。"
---

# C++ 工程组织：构建、命名空间、模板与预处理

## CMake 与 g++

### 1. g++ 速查

查看版本：

```powershell
g++ -v
```

最简单的编译：

```powershell
g++ helloworld.cpp
./a.out
```

指定输出名：

```powershell
g++ helloworld.cpp -o helloworld
./helloworld
```

多文件编译：

```powershell
g++ runoob1.cpp runoob2.cpp -o runoob
```

带调试信息和常用警告：

```powershell
g++ -g -Wall -std=c++11 main.cpp
```

如果用 `gcc` 编 C++，通常需要手动链接标准库：

```powershell
gcc main.cpp -lstdc++ -o main
```

常用选项：

- `-c` 只编译，不链接
- `-o FILE` 指定输出文件
- `-I DIR` 添加头文件搜索路径
- `-L DIR` 添加库搜索路径
- `-l LIB` 链接指定库
- `-g` 生成调试信息
- `-O0/-O2/-O3` 控制优化级别
- `-std=c++11` 指定语言标准

### 2. CMake 在做什么

CMake 不是编译器。它根据 `CMakeLists.txt` 生成构建规则，再交给 `g++`、`clang++` 或 MSVC 去真正编译。

```text
C++ 源码
  -> CMakeLists.txt
  -> CMake 生成构建系统
  -> Ninja / Make / Visual Studio
  -> 编译器
  -> 可执行文件 / 库
```

### 3. 最小 CMake 项目

```text
hello_cmake/
├── CMakeLists.txt
└── main.cpp
```

`CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.20)
project(hello_cmake)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
add_executable(hello main.cpp)
```

构建和运行：

```powershell
mkdir build
cd build
cmake .. -G Ninja
cmake --build .
.\hello.exe
```

### 4. 多文件项目

```text
my_project/
├── CMakeLists.txt
├── main.cpp
├── math_utils.cpp
└── math_utils.h
```

`CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.20)
project(my_project)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
add_executable(my_app
    main.cpp
    math_utils.cpp
)
```

只把参与编译的 `.cpp` 写进 `add_executable`。

### 5. include 目录

```text
my_project/
├── CMakeLists.txt
├── include/
│   └── math_utils.h
└── src/
    ├── main.cpp
    └── math_utils.cpp
```

`CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.20)
project(my_project)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
add_executable(my_app
    src/main.cpp
    src/math_utils.cpp
)
target_include_directories(my_app PRIVATE include)
```

`target_include_directories` 用来告诉编译器去哪里找头文件。

### 6. Debug 与 Release

```powershell
cmake .. -G Ninja -DCMAKE_BUILD_TYPE=Debug
cmake --build .
```

```powershell
cmake .. -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build .
```

- Debug: 便于调试
- Release: 开启优化，运行更快

### 7. 常用速查

```powershell
cmake -S . -B build-ucrt -G "MinGW Makefiles" `
  -DCMAKE_C_COMPILER=D:/msys2/ucrt64/bin/gcc.exe `
  -DCMAKE_CXX_COMPILER=D:/msys2/ucrt64/bin/g++.exe `
  -DCMAKE_MAKE_PROGRAM=D:/msys2/ucrt64/bin/mingw32-make.exe
cmake --build build-ucrt
```

```powershell
Remove-Item -Recurse -Force build
mkdir build
cd build
cmake .. -G Ninja
cmake --build .
```

---

## C++ 命名空间

### 定义与访问

```cpp
namespace first_space {
    void func() { std::cout << "Inside first_space\n"; }
}
namespace second_space {
    void func() { std::cout << "Inside second_space\n"; }
}

first_space::func();   // 域解析运算符访问
second_space::func();
```

### using 指令

#### 引入整个命名空间

```cpp
using namespace first_space;
func();  // 无需前缀
```

#### 引入特定成员

```cpp
using std::cout;       // 只引入 cout
cout << "hello\n";     // cout 可省略 std::
std::endl;             // endl 仍需 std:: 前缀
```

#### 作用域与隐藏

`using` 引入的名称从该指令开始到当前作用域结束可见，范围外同名实体被隐藏。

```cpp
int a = 200;             // 全局 a

using namespace A;       // 将 A 中名称引入当前作用域
cout << a;               // 编译错误：与全局 a 产生歧义

int a = 30;              // 局部变量 a 优先，冲突解除
cout << a;               // 30
cout << ::a;             // 200（全局 a，用 :: 显式访问）
```

### 不连续命名空间

命名空间可分散定义在多个位置（不同文件），每个 `namespace namespace_name { ... }` 是向已有命名空间添加新元素或定义新命名空间。

```cpp
// file1.cpp
namespace MyLib {
    void funcA();
}

// file2.cpp
namespace MyLib {
    void funcB();
}
```

### 嵌套命名空间

```cpp
namespace outer {
    void func() { std::cout << "outer\n"; }
    namespace inner {
        void func() { std::cout << "inner\n"; }
    }
}

using namespace outer::inner;
func();  // inner

using namespace outer;
// 此时 outer::inner 中的名称也可见
```

### 全局命名空间

无命名空间修饰的全局变量/函数属于全局命名空间，用 `::` 前缀显式访问：

```cpp
int a = 200;

namespace A { int a = 100; }

int main() {
    int a = 30;
    cout << a;    // 30（局部）
    cout << ::a;  // 200（全局）
    cout << A::a; // 100（命名空间 A）
}
```

### 使用要点

- 避免在头文件中使用 `using namespace std;`，防止污染包含该头文件的所有源文件。
- 大型项目中优先使用限定名（`std::cout`）而非 `using` 指令，提高可读性和避免歧义。
- 命名空间别名可简化长命名空间名：`namespace mys = my_project::sub_module;`。

---

## C++ 模板

### 函数模板

```cpp
template <typename T>
inline T const& Max(T const& a, T const& b) {
    return a < b ? b : a;
}

// 使用
Max(10, 20);           // T 推断为 int
Max(10.5, 20.7);       // T 推断为 double
Max("Hello", "World"); // T 推断为 string
```

函数模板支持重载，只要形参表不同即可：

```cpp
template <typename T>
void print(T arg1, T arg2) { cout << arg1 << " " << arg2 << endl; }

template <typename T1, typename T2>
void print(T1 arg1, T2 arg2) { cout << arg1 << " " << arg2 << endl; }
```

### 类模板

```cpp
template <class T>
class Stack {
private:
    vector<T> elems;
public:
    void push(T const&);
    void pop();
    T top() const;
    bool empty() const { return elems.empty(); }
};

// 类外定义成员函数
template <class T>
void Stack<T>::push(T const& elem) {
    elems.push_back(elem);
}

template <class T>
void Stack<T>::pop() {
    if (elems.empty()) throw out_of_range("Stack<>::pop(): empty stack");
    elems.pop_back();
}

template <class T>
T Stack<T>::top() const {
    if (elems.empty()) throw out_of_range("Stack<>::top(): empty stack");
    return elems.back();
}

// 使用
Stack<int> intStack;
Stack<string> stringStack;
```

### typename 的两个作用

#### 模板参数声明

`typename` 和 `class` 在模板参数中完全等价：

```cpp
template <typename T>  // 等价于 template <class T>
```

#### 嵌套依赖类型

告诉编译器 `::` 后的名字是一个类型而非静态成员：

```cpp
template <typename T>
void MyMethod(T myarr) {
    typedef typename T::LengthType LengthType;  // typename 必需
    LengthType length = myarr.GetLength();
}
```

无 `typename` 时，编译器无法判断 `T::LengthType` 是类型还是静态成员/函数。

### 模板的分离编译

模板的声明和定义分属不同文件时，由于模板在实例化时才生成代码，链接器可能找不到定义。常见解决方案：

- **将定义放在头文件中**（最常用）
- **显式实例化**：在 `.cpp` 中显式指定要实例化的类型
- **在 `main.cpp` 中同时包含 `.h` 和 `.cpp`**

```cpp
// main.cpp
#include "MyStack.h"
#include "MyStack.cpp"  // 同时包含 .cpp 以避免链接错误
```

### 使用要点

- 函数模板可自动推导类型参数；类模板必须显式指定。
- 模板代码通常在头文件中实现（inline），否则需显式实例化。
- 避免模板参数过多导致代码膨胀；使用类型萃取（`type_traits`）优化。
- C++20 引入 `concept`（概念）以对模板参数施加约束，替代 SFINAE 的复杂写法。

---

## C++ 预处理器

### #define 宏定义

#### 对象宏

```cpp
#define PI 3.14159

// 预处理后 PI 被替换为 3.14159
cout << "Value of PI :" << PI << endl;
```

使用 `gcc -E test.cpp > test.p` 可查看预处理后的结果。

#### 参数宏（函数式宏）

```cpp
#define MIN(a, b) (a < b ? a : b)

int i = 100, j = 30;
cout << MIN(i, j);  // 预处理后: (i < j ? i : j)
```

注意：参数宏的形参建议用括号包裹，避免运算符优先级问题。

### 条件编译

```cpp
#define DEBUG

#ifdef DEBUG
    cerr << "Variable x = " << x << endl;
#endif

#if 0
    // 注释掉的代码，不会被编译
#endif

#ifndef HEADER_H
#define HEADER_H
    // 头文件防护
#endif

#if (defined DEBUG) && (defined SOMETHING)
    // 多条件组合
#endif
```

### # 和 ## 运算符

#### # 字符串化

将宏参数转换为带引号的字符串：

```cpp
#define MKSTR(x) #x
cout << MKSTR(HELLO C++);  // 预处理后: cout << "HELLO C++";
```

#### ## 令牌连接

将两个令牌连接成一个：

```cpp
#define concat(a, b) a ## b

int xy = 100;
cout << concat(x, y);  // 预处理后: cout << xy;
```

### 预定义宏

| 宏 | 描述 |
| --- | --- |
| `__LINE__` | 当前行号 |
| `__FILE__` | 当前文件名 |
| `__DATE__` | 编译日期（格式 `month/day/year`） |
| `__TIME__` | 编译时间（格式 `hour:minute:second`） |

```cpp
cout << __LINE__;  // 6
cout << __FILE__;  // test.cpp
cout << __DATE__;  // Feb 28 2011
cout << __TIME__;  // 18:52:48
```

### 使用要点

- 宏只是文本替换，不进行类型检查，现代 C++ 优先使用 `constexpr`、`inline` 函数、模板替代宏。
- 参数宏的每个参数和整体都要加括号以避免优先级问题：`#define SQUARE(x) ((x) * (x))`。
- 头文件防护使用 `#pragma once`（现代编译器广泛支持）或 `#ifndef`/`#define`/`#endif` 组合。
- 调试开关通过 `#define DEBUG` 和 `#ifdef DEBUG` 控制，发布版本取消定义即可移除调试代码。
