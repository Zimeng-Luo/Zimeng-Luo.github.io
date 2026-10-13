---
title: "C++ 实用标准库：输入输出、异常、随机数与时间"
date: 2026-10-13
categories:
  - 笔记
tags:
  - C++
  - 标准库实践
  - 运行诊断
coverImg: /blog/bg12.jpg
sidebar: false
description: "围绕读取、记录与复现实验，合并文件流、异常处理、随机生成和时间测量。"
---

# C++ 实用标准库：输入输出、异常、随机数与时间

一个小程序需要把数据读进来、给出清楚的失败原因，并保存结果。标准流、文件流、异常、随机数和时间工具可以组成完整的运行流程。

## 标准流与文件流使用相同接口

`cin` 接收输入，`cout` 输出正常结果，`cerr` 常用于错误，`clog` 常用于日志。`cerr` 默认启用自动刷新行为；`endl` 换行并刷新，普通换行通常用 `\n` 即可。

```cpp
#include <iostream>
#include <string>

int main() {
    int count{};
    std::string name;
    if (!(std::cin >> count)) {
        std::cerr << "invalid count\n";
        return 1;
    }
    std::getline(std::cin >> std::ws, name);
    std::cout << name << ": " << count << '\n';
}
```

`>>` 按空白分隔，`getline` 读取整行。这里 `std::ws` 跳过前导空白，适合不需要保留名字开头空格的情况；若必须保留空格，应只处理上次输入剩余的换行。

## 文件先检查，再读取

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream input("data.txt");
    if (!input) {
        std::cerr << "cannot open data.txt\n";
        return 1;
    }
    std::string line;
    while (std::getline(input, line)) {
        std::cout << line << '\n';
    }
    if (input.bad()) {
        std::cerr << "read failed\n";
        return 1;
    }
}
```

文件流析构时关闭文件。`ofstream` 默认写入可能截断原文件；持续记录可用 `std::ios::app`。`app` 保证每次写在末尾，`ate` 只是在打开后定位末尾，之后仍可移动位置。`tellg/seekg` 管理读位置，`tellp/seekp` 管理写位置。

`binary` 表示二进制模式，不会自动把复杂对象转换成可移植文件格式。字符串、指针和平台布局不同的结构体不应直接当成可跨平台的原始字节记录。

## 用异常表达失败原因

```cpp
#include <stdexcept>

double divide(double a, double b) {
    if (b == 0) {
        throw std::invalid_argument("division by zero");
    }
    return a / b;
}
```

在调用边界按 `const` 引用捕获，先捕获具体类型，再捕获基类。自定义异常可以继承 `runtime_error`。错误路径的资源清理由[RAII](./cpp-对象生命周期与资源管理.md)保证，避免手动释放被异常跳过。

`noexcept` 函数若让异常逃出，会触发 `std::terminate()`；析构通常不应抛出异常。不要用吞掉全部异常来假装程序运行成功。重定向流的 `rdbuf` 时要保存并恢复原缓冲区，且保证目标缓冲区仍存在。

## 随机数分成引擎和分布

```cpp
#include <random>

std::mt19937 engine{42};
std::uniform_int_distribution<int> dice{1, 6};
std::normal_distribution<double> noise{0.0, 1.0};
int roll = dice(engine);
double sample = noise(engine);
```

引擎产生伪随机序列，分布将其转换为所需范围。整数均匀分布包含两端，实数均匀分布通常采用左闭右开区间。引擎建立一次并持续使用，不要每抽一次都重新播种。

固定种子便于重复实验，但不同标准库实现的分布采样算法可能不同；跨平台精确复现还需要记录实现版本。旧式 `rand() % n` 可能引入取模偏差，新代码优先用 `<random>`。这些工具不用于生成密码等安全凭据。

## 日历时间与耗时分开看

`time_t` 和 `tm` 用于日期时间。`tm_year` 从 1900 计年，`tm_mon` 从 0 计月；`strftime` 用于格式化。`localtime`、`gmtime` 返回的静态存储可能被后续调用覆盖，线程安全接口依平台而定。

`clock()` 测量的是处理器时间，不等于实际经过的墙钟时间。测量耗时更适合使用单调时钟：

```cpp
#include <chrono>
auto begin = std::chrono::steady_clock::now();
// operation
auto elapsed = std::chrono::steady_clock::now() - begin;
auto ms = std::chrono::duration<double, std::milli>(elapsed).count();
```

现代标准库还有更多日期时间能力，本文保留原笔记中常见接口，并优先区分用途而非堆叠函数名称。
