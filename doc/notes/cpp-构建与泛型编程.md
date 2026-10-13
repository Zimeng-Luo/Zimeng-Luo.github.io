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
description: "区分编译器和构建系统，用目标级 CMake 配置、命名空间和模板组织代码。"
---

# C++ 工程组织：构建、命名空间、模板与预处理

源码最终要经过编译和链接才能执行。文件增多后，构建系统组织依赖，命名空间组织名称，模板组织类型复用；预处理器负责更早阶段的文本与条件处理。

## g++ 与 CMake 各做什么？

`g++` 编译源文件并调用链接器，CMake 生成供 Ninja、Make 或其他工具执行的构建规则。

```bash
g++ -std=c++17 -Wall -Wextra -g main.cpp utils.cpp -o app
```

`-c` 只生成目标文件，`-I` 添加头文件路径，`-L` 添加库路径，`-l` 指定链接库；声明可见不等于定义已经被链接。

最小 CMake 配置：

```cmake
cmake_minimum_required(VERSION 3.20)
project(example LANGUAGES CXX)
add_executable(app main.cpp utils.cpp)
target_compile_features(app PRIVATE cxx_std_17)
target_include_directories(app PRIVATE include)
```

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
./build/app
```

源码和构建输出分开保存，便于切换配置。单配置生成器使用 `CMAKE_BUILD_TYPE`；Visual Studio 等多配置生成器则在构建时用 `--config Debug` 或 `--config Release` 选择配置。Windows 下可执行文件的位置和后缀随生成器变化。

## 命名空间管理名称冲突

```cpp
namespace geometry {
    struct Point { double x; double y; };
}
geometry::Point p{1, 2};
```

同名空间可在不同文件中继续定义。使用限定名称能清楚表达来源；在头文件中加入全局 `using namespace std;` 会影响所有包含者，容易产生歧义。命名空间别名适合缩短较长的限定名称。

## 模板复用操作，不依赖宏替换

```cpp
#include <string>

template <typename T>
T larger(T a, T b) {
    return a < b ? b : a;
}

auto number = larger(3, 5);
auto word = larger(std::string{"cat"}, std::string{"dog"});
```

模板实例化时检查类型是否支持所需操作。示例使用 `std::string` 进行内容比较，不能把字符串字面量的指针比较当成字典序比较。返回值也避免返回绑定临时参数的悬空引用。

类模板可以组织通用数据结构，如 `Stack<T>` 内部使用 `vector<T>`。模板定义通常放在头文件中，使实例化处可见；也可以在实现文件中显式实例化有限类型，不应把随意包含 `.cpp` 当成默认组织方式。

依赖类型需要告诉编译器它是类型：

```cpp
template <typename Container>
void inspect(const Container& values) {
    typename Container::value_type item{};
    (void)values;
    (void)item;
}
```

这里 `typename` 消除依赖名称的解析歧义。类模板在 C++17 起的某些场景还能使用类模板实参推导，不能绝对地说类模板永远必须手写类型参数。

## 预处理器的边界

`#include` 包含头文件，`#define` 定义宏，`#if` 控制是否保留源码。宏没有普通函数的类型检查和作用域规则：

```cpp
#define SQUARE(x) ((x) * (x))
```

即使加了括号，也不能安全调用 `SQUARE(i++)`，因为参数会被重复求值。常量优先用 `constexpr`，泛型运算优先用函数模板。头文件保护和平台条件编译仍是宏的重要用途。

```cpp
#ifndef GEOMETRY_POINT_H
#define GEOMETRY_POINT_H
// declarations
#endif
```

`#` 可将宏参数字符串化，`##` 可连接预处理记号。`__FILE__`、`__LINE__` 适合辅助诊断。`inline` 的核心还包含允许符合规则的跨翻译单元重复定义，不能仅理解为强制编译器内联展开。
