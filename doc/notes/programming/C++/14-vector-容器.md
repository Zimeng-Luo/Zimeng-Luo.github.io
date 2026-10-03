---
title: 14 vector 容器
date: 2026-09-02
categories: ["笔记", "编程", "C++"]
tags: ["C++", "编程"]
sidebar: false
---

# C++ vector 容器

## 核心摘要

`std::vector` 是 C++ STL 的动态数组容器，元素连续存储，支持下标随机访问，并能在运行时自动扩容。它适合替代大多数需要“可变长度数组”的场景，常用操作包括添加、访问、遍历、删除和清空。

## 1. 基本用法

使用 `vector` 需要包含头文件 `&lt;vector&gt;`。

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

## 2. 添加与删除

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

## 3. 访问元素

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

## 4. 大小与容量

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

## 5. 遍历

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

## 6. 二维 vector

二维 `vector` 常用于矩阵或表格数据。

```cpp
std::vector<std::vector<int>> matrix(3, std::vector<int>(4, 0));

matrix[0][1] = 5;
```

含义：创建 `3` 行 `4` 列的整数矩阵，所有元素初始为 `0`。

## 7. 常见易错点

- 使用 `nums[i]` 前未确认下标范围。
- 对空 `vector` 调用 `front()`、`back()` 或 `pop_back()`。
- 混淆 `size()` 和 `capacity()`：前者是元素个数，后者是已分配空间。
- 在循环中频繁 `insert` 或 `erase` 中间元素，效率较低。
- `push_back`、`emplace_back`、`insert`、`erase` 可能导致迭代器、指针或引用失效。

