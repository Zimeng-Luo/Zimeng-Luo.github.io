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
description: "C++ 日期与时间、C++ 基本输入输出、C++ 随机数、C++ 文件和流、C++ 异常处理的学习笔记。"
---

# C++ 实用标准库：输入输出、异常、随机数与时间

## C++ 日期与时间

### 1. 相关类型

| 类型 | 作用 |
| --- | --- |
| `time_t` | 表示日历时间，通常是自 1970-01-01 以来的秒数 |
| `clock_t` | 表示程序运行期间占用的处理器时间 |
| `tm` | 以结构体形式保存年月日、时分秒等信息 |
| `size_t` | 与时间函数中的长度、大小参数配合使用 |

`tm` 结构常用成员：

| 成员 | 含义 |
| --- | --- |
| `tm_sec` | 秒，0-59 |
| `tm_min` | 分，0-59 |
| `tm_hour` | 时，0-23 |
| `tm_mday` | 月中的第几天，1-31 |
| `tm_mon` | 月份，0-11 |
| `tm_year` | 自 1900 年起的年数 |
| `tm_wday` | 星期中的第几天，0-6，0 表示星期日 |
| `tm_yday` | 一年中的第几天，0-365 |
| `tm_isdst` | 是否处于夏令时 |

### 2. 常用函数

| 函数            | 输入值                                                                | 作用                           | 返回值                 |
| ------------- | ------------------------------------------------------------------ | ---------------------------- | ------------------- |
| `time()`      | `time_t* timer`，可传 `nullptr`                                       | 获取当前系统日历时间                   | `time_t`，失败时返回 `-1` |
| `ctime()`     | `const time_t* timer`                                              | 将 `time_t` 转成本地时间字符串         | `char*`，指向静态字符串     |
| `localtime()` | `const time_t* timer`                                              | 将 `time_t` 转成本地时区的 `tm`      | `tm*`，指向静态对象        |
| `gmtime()`    | `const time_t* timer`                                              | 将 `time_t` 转成 UTC/GMT 的 `tm` | `tm*`，指向静态对象        |
| `asctime()`   | `const tm* timeptr`                                                | 将 `tm` 转成固定格式字符串             | `char*`，指向静态字符串     |
| `mktime()`    | `tm* timeptr`                                                      | 将 `tm` 转回 `time_t`           | `time_t`，失败时返回 `-1` |
| `difftime()`  | `time_t end, time_t begin`                                         | 计算两个 `time_t` 的秒差            | `double`            |
| `strftime()`  | `char* str, size_t maxsize, const char* format, const tm* timeptr` | 按指定格式输出日期时间字符串               | `size_t`，成功写入的字符数   |
| `clock()`     | 无参数                                                                | 获取程序运行所消耗的处理器时间              | `clock_t`           |

### 3. 获取当前时间

```cpp
#include <iostream>
#include <ctime>

int main() {
    time_t now = time(nullptr);

    char* local = ctime(&now);
    std::cout << "本地日期和时间：" << local;

    tm* utc = gmtime(&now);
    std::cout << "UTC 日期和时间：" << asctime(utc);
}
```

### 4. 读取 `tm` 字段

```cpp
#include <iostream>
#include <ctime>

int main() {
    time_t now = time(nullptr);
    tm* ltm = localtime(&now);

    std::cout << "年: " << 1900 + ltm->tm_year << '\n';
    std::cout << "月: " << 1 + ltm->tm_mon << '\n';
    std::cout << "日: " << ltm->tm_mday << '\n';
    std::cout << "时间: " << ltm->tm_hour << ':'
              << ltm->tm_min << ':' << ltm->tm_sec << '\n';
}
```

### 5. `strftime` 格式化输出

```cpp
#include <iostream>
#include <ctime>

int main() {
    time_t now = time(nullptr);
    char buf[64];

    strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", localtime(&now));
    std::cout << buf << '\n';
}
```

常见格式：

| 格式 | 含义 |
| --- | --- |
| `%Y` | 四位年份 |
| `%m` | 月份 |
| `%d` | 日期 |
| `%H` | 小时 |
| `%M` | 分钟 |
| `%S` | 秒 |

### 6. 常见易错点

- `tm_mon` 从 0 开始，不是从 1 开始。
- `tm_year` 不是实际年份，要加 1900。
- `ctime()`、`asctime()` 返回的是带换行的字符串。
- `localtime()` 和 `gmtime()` 返回的是指向静态对象的指针，后续调用会覆盖结果。
- 只想格式化输出时，优先用 `strftime()`。

---

## C++ 基本输入输出

### 1. 标准流

| 流 | 作用 | 特点 |
| --- | --- | --- |
| `cout` | 标准输出 | 常用于正常信息输出 |
| `cin` | 标准输入 | 从键盘读取数据 |
| `cerr` | 标准错误输出 | 非缓冲，错误会立即输出 |
| `clog` | 标准日志输出 | 缓冲输出，适合日志信息 |

### 2. 输出

```cpp
#include <iostream>

int main() {
    std::cout << "Hello C++" << std::endl;
}
```

要点：

- `<<` 是流插入运算符。
- `endl` 会输出换行并刷新缓冲区。
- 同一条语句可以连续输出多个值。

```cpp
std::cout << "name: " << name << ", age: " << age << '\n';
```

### 3. 输入

```cpp
#include <iostream>

int main() {
    char name[50];
    int age;

    std::cin >> name >> age;
}
```

要点：

- `>>` 是流提取运算符。
- `cin` 默认按空白字符分隔输入，空格、换行、制表符都会结束当前读取。
- 连续输入可直接写成 `cin >> a >> b >> c;`。

### 4. 常见易错点

- 误以为 `cin` 会读取整行；它默认只读到空白字符前。
- 用 `getline()` 前没有处理前一次输入留下的换行。
- 忘记 `endl` 会刷新缓冲区，和 `'\n'` 不完全相同。

---

## C++ 随机数

### 旧式 rand/srand

`rand()` 生成伪随机整数，`srand()` 设置随机种子。

```cpp
#include <cstdlib>
#include <ctime>
#include <iostream>

int main() {
    std::srand(static_cast<unsigned int>(std::time(nullptr)));

    int min = 2;
    int max = 20;
    int value = std::rand() % (max - min + 1) + min;

    std::cout << value << '\n';
}
```

常见区间写法：

| 区间 | 写法 |
| --- | --- |
| `[a, b)` | `std::rand() % (b - a) + a` |
| `[a, b]` | `std::rand() % (b - a + 1) + a` |
| `(a, b]` | `std::rand() % (b - a) + a + 1` |

### C++11 random 库

`<random>` 把随机数生成拆成两部分：

| 组成 | 作用 |
| --- | --- |
| 随机数引擎 | 产生原始伪随机序列，如 `std::default_random_engine` |
| 随机数分布 | 把原始随机数映射成指定范围或概率分布 |

### 均匀整数

`std::uniform_int_distribution` 生成闭区间 `[a, b]` 的整数。

```cpp
#include <ctime>
#include <iostream>
#include <random>

int main() {
    std::default_random_engine engine(
        static_cast<unsigned int>(std::time(nullptr))
    );
    std::uniform_int_distribution<int> dist(2, 20);

    std::cout << dist(engine) << '\n';
}
```

### 均匀实数

`std::uniform_real_distribution` 生成指定范围内的浮点数，常用于模拟连续随机值。

```cpp
std::default_random_engine engine(
    static_cast<unsigned int>(std::time(nullptr))
);
std::uniform_real_distribution<double> dist(1.5, 19.5);

double value = dist(engine);
```

### 正态分布

`std::normal_distribution` 按均值和标准差生成实数。

```cpp
std::default_random_engine engine(
    static_cast<unsigned int>(std::time(nullptr))
);
std::normal_distribution<double> dist(0.0, 1.0);

double value = dist(engine);
```

### 伯努利分布

`std::bernoulli_distribution` 按给定概率生成 `true` 或 `false`。

```cpp
std::default_random_engine engine(
    static_cast<unsigned int>(std::time(nullptr))
);
std::bernoulli_distribution dist(0.8);

bool success = dist(engine);
```

### 对比

| 写法 | 特点 | 适用 |
| --- | --- | --- |
| `rand()` / `srand()` | 简单，范围控制依赖取模 | 临时演示、旧代码 |
| `<random>` | 分布明确，质量更好，类型更丰富 | 现代 C++ 首选 |

### 使用原则

- 新代码优先使用 `<random>`。
- 引擎通常只创建一次，重复传给分布使用。
- 需要可复现实验时使用固定种子；需要每次不同结果时使用时间或 `std::random_device` 作为种子。

---

## C++ 文件和流

### 文件流类

| 类 | 作用 | 常见用途 |
| --- | --- | --- |
| `std::ifstream` | 输入文件流 | 从文件读取 |
| `std::ofstream` | 输出文件流 | 向文件写入 |
| `std::fstream` | 输入输出文件流 | 同一文件既读又写 |

使用前需要包含头文件：

```cpp
#include <fstream>
```

### 打开与关闭文件

文件可以在构造时打开，也可以先创建流对象再调用 `open()`。

```cpp
#include <fstream>

int main() {
    std::ofstream out("data.txt");
    out << "hello\n";
    out.close();

    std::ifstream in;
    in.open("data.txt");
    in.close();
}
```

文件流对象析构时会自动关闭文件，但显式 `close()` 可以更清楚地释放文件句柄。

### 常用打开模式

| 模式 | 含义 |
| --- | --- |
| `std::ios::in` | 读模式 |
| `std::ios::out` | 写模式 |
| `std::ios::app` | 追加写入，每次写入都在文件末尾 |
| `std::ios::ate` | 打开后定位到文件末尾，之后仍可移动位置 |
| `std::ios::trunc` | 打开时清空原文件内容 |
| `std::ios::binary` | 二进制模式 |

多个模式用 `|` 组合：

```cpp
std::ofstream log("app.log", std::ios::out | std::ios::app);
```

### 写入文件

写文件通常使用 `std::ofstream` 和插入运算符 `<<`。

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ofstream out("user.txt");

    if (!out) {
        std::cerr << "open file failed\n";
        return 1;
    }

    out << "Alice\n";
    out << 18 << '\n';
}
```

### 读取文件

读取单词或数字可以用 `>>`；读取整行文本用 `std::getline()`。

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream in("user.txt");
    std::string line;

    while (std::getline(in, line)) {
        std::cout << line << '\n';
    }
}
```

### 文件位置指针

文件流内部维护读写位置，可用于随机访问。

| 函数 | 作用 |
| --- | --- |
| `tellg()` | 获取当前读位置 |
| `seekg()` | 移动读位置 |
| `tellp()` | 获取当前写位置 |
| `seekp()` | 移动写位置 |

常见定位基准：

| 基准 | 含义 |
| --- | --- |
| `std::ios::beg` | 文件开头 |
| `std::ios::cur` | 当前位置 |
| `std::ios::end` | 文件末尾 |

```cpp
std::ifstream in("data.txt", std::ios::binary);
in.seekg(0, std::ios::end);
auto size = in.tellg();
```

### 使用要点

- 新代码优先使用 `std::ifstream` / `std::ofstream` 明确读写方向。
- 打开文件后先检查流状态：`if (!file)` 或 `if (file.is_open())`。
- 文本逐行读取优先使用 `std::getline()`。
- `std::ios::app` 是强制追加；`std::ios::ate` 只是打开后先移动到末尾。
- 写模式可能清空原文件，保留原内容时使用 `std::ios::app`。
- 处理图片、音频、结构体等非纯文本数据时使用 `std::ios::binary`。

---

## C++ 异常处理

### 基本语法

| 关键字 | 作用 |
| --- | --- |
| `throw` | 抛出异常对象 |
| `try` | 包裹可能抛出异常的代码 |
| `catch` | 捕获并处理指定类型的异常 |

```cpp
try {
    // 可能抛出异常的代码
} catch (const std::exception& e) {
    // 处理标准异常
}
```

### 抛出异常

异常可以是任意类型，但推荐抛出标准异常对象，而不是字符串字面量。

```cpp
#include <stdexcept>

double divide(double a, double b) {
    if (b == 0) {
        throw std::invalid_argument("division by zero");
    }
    return a / b;
}
```

### 捕获异常

捕获时应从具体类型到通用类型排列，最后可用 `catch (...)` 捕获未知异常。

```cpp
#include <exception>
#include <iostream>
#include <stdexcept>

int main() {
    try {
        double value = divide(10, 0);
        std::cout << value << '\n';
    } catch (const std::invalid_argument& e) {
        std::cerr << "invalid argument: " << e.what() << '\n';
    } catch (const std::exception& e) {
        std::cerr << "standard exception: " << e.what() << '\n';
    } catch (...) {
        std::cerr << "unknown exception\n";
    }
}
```

`what()` 是标准异常提供的成员函数，返回异常原因的 C 风格字符串。

### 标准异常类型

标准异常类主要定义在 `<exception>` 和 `<stdexcept>` 中。

| 类型                      | 含义                  |
| ----------------------- | ------------------- |
| `std::exception`        | 标准异常基类              |
| `std::logic_error`      | 逻辑错误基类，通常可由代码检查发现   |
| `std::invalid_argument` | 参数无效                |
| `std::out_of_range`     | 访问越界                |
| `std::length_error`     | 长度超出限制              |
| `std::runtime_error`    | 运行期错误基类             |
| `std::overflow_error`   | 数值上溢                |
| `std::underflow_error`  | 数值下溢                |
| `std::bad_alloc`        | 动态内存分配失败            |
| `std::bad_cast`         | `dynamic_cast` 转换失败 |

### 自定义异常

自定义异常通常继承 `std::exception` 或更具体的标准异常类，并提供错误信息。

```cpp
#include <stdexcept>
#include <string>

class ConfigError : public std::runtime_error {
public:
    explicit ConfigError(const std::string& message)
        : std::runtime_error(message) {}
};
```

使用方式：

```cpp
throw ConfigError("missing config file");
```

### noexcept

`noexcept` 表示函数承诺不抛出异常，常用于析构函数、移动构造函数和移动赋值函数。

```cpp
void close() noexcept;
```

如果 `noexcept` 函数实际抛出异常，程序会调用 `std::terminate()` 终止。

### 错误输出与日志输出

`cerr`（标准错误输出，非缓冲）和 `clog`（标准日志输出，缓冲）通过 `<iostream>` 提供：

```cpp
std::cerr << "Error message" << std::endl;
std::clog << "Log message" << std::endl;
```

| 项 | `cerr` | `clog` |
| --- | --- | --- |
| 是否缓冲 | 否 | 是 |
| 典型用途 | 错误信息 | 调试日志、运行日志 |

#### 重定向错误与日志输出

通过 `rdbuf()` 可指定输出位置，例如文件：

```cpp
#include <fstream>

std::ofstream logFile("log.txt");
std::cerr.rdbuf(logFile.rdbuf());
std::clog.rdbuf(logFile.rdbuf());

std::cerr << "错误信息\n";
std::clog << "日志信息\n";
```

临时重定向时应保存并恢复原缓冲区：

```cpp
std::streambuf* old = std::cerr.rdbuf();
std::cerr.rdbuf(file.rdbuf());
std::cerr << "这句写进文件\n";
std::cerr.rdbuf(old);
```

缓冲控制：

```cpp
std::cerr << std::unitbuf;    // 每次输出后自动刷新
std::cerr << std::nounitbuf;  // 取消自动刷新
```

实际项目中常把 `clog` 接到日志文件，`cerr` 留给终端错误信息。

#### 彩色警告与错误标签

ANSI 转义序列用于终端彩色输出：

| 颜色 | 代码 | 常见用途 |
| --- | --- | --- |
| 红色 | `\033[31m` | 错误、失败、异常 |
| 绿色 | `\033[32m` | 成功、通过、完成 |
| 黄色 | `\033[33m` | 警告、非致命问题 |
| 蓝色 | `\033[34m` | 信息、提示 |
| 紫色 | `\033[35m` | 调试、特殊标记 |
| 青色 | `\033[36m` | 路径、参数、辅助信息 |
| 重置 | `\033[0m` | 恢复默认颜色 |

```cpp
#include <string>

constexpr const char* YELLOW = "\033[33m";
constexpr const char* RED = "\033[31m";
constexpr const char* reset = "\033[0m";

void warn(const std::string& msg) {
    std::clog << YELLOW << "[WARN] " << msg << reset << '\n';
}
void error(const std::string& msg) {
    std::cerr << RED << "[ERROR] " << msg << reset << '\n';
}
```

每次变色后都要输出 `\033[0m` 恢复默认颜色；Windows Terminal、Linux、macOS 通常支持。

### 使用要点

- 抛出异常用于处理异常路径，不用于普通流程控制。
- 推荐抛出标准异常对象：`std::runtime_error`、`std::invalid_argument`、`std::out_of_range`。
- 捕获异常优先使用 `const std::exception&` 或具体异常的 `const` 引用。
- `catch` 顺序应从派生类到基类，避免具体异常先被基类捕获。
- 析构函数不要抛出异常；需要声明时使用 `noexcept`。
- 旧式 `throw()` 异常规格已过时，现代 C++ 使用 `noexcept`。
