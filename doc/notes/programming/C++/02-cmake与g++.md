---
title: 02 cmake与g++
date: 2026-09-02
categories: ["笔记", "编程", "C++"]
tags: ["C++", "编程"]
sidebar: false
---

# CMake 与 g++

## 核心摘要

`g++` 负责编译，CMake 负责组织构建。这里把两者放在一起，按“直接编译 -> CMake 构建 -> 多文件项目 -> include 目录 -> 常用选项”来查最省事。

## 1. g++ 速查

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

## 2. CMake 在做什么

CMake 不是编译器。它根据 `CMakeLists.txt` 生成构建规则，再交给 `g++`、`clang++` 或 MSVC 去真正编译。

```text
C++ 源码
  -> CMakeLists.txt
  -> CMake 生成构建系统
  -> Ninja / Make / Visual Studio
  -> 编译器
  -> 可执行文件 / 库
```

## 3. 最小 CMake 项目

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

## 4. 多文件项目

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

## 5. include 目录

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

## 6. Debug 与 Release

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

## 7. 常用速查

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

