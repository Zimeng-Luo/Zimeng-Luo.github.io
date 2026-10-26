---
title: "Python 数值工具与可复现抽样"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 科学计算
  - 实验复现
coverImg: /blog/bg17.jpg
sidebar: false
description: "Python math 库、Python 随机数的学习笔记。"
---

# Python 数值工具与可复现抽样

## Python math 库

### 1. 核心数学常量 (Constants)

`math` 模块内置了几个我们在数学计算中极常用的常量，使用它们比你自己手动输入精确得多。

- **`math.pi`**: 圆周率 $\pi$，大约等于 3.141592653589793。
    
- **`math.e`**: 自然对数的底数 $e$，大约等于 2.718281828459045。
    
- **`math.inf`**: 正无穷大。常用于在算法（如寻找最小值）中初始化一个极大的对比值。如果是负无穷大，可以使用 `-math.inf`。
    
- **`math.nan`**: 非数字 (Not a Number)，通常用于表示未定义或不可表示的结果。
    

**代码示例：**

```python
import math

print(math.pi)
print(math.inf > 999999999) # 输出: True
```

### 2. 数值处理与舍入 (Rounding & Absolute)

虽然 Python 内置了 `round()` 和 `abs()`，但 `math` 模块提供了更精细的控制，特别是在处理浮点数时。

- **`math.ceil(x)`**: 向上取整，返回大于或等于 x 的最小整数。
    
- **`math.floor(x)`**: 向下取整，返回小于或等于 x 的最大整数。
    
- **`math.trunc(x)`**: 截断 x 的小数部分，只保留整数部分。
    
- **`math.fabs(x)`**: 返回 x 的绝对值。与内置的 `abs()` 不同，`math.fabs()` **总是返回浮点数**。
    

**代码示例：**

```python
import math

x = 4.2
y = -4.8

print("向上取整 (ceil):", math.ceil(x))   # 输出: 5
print("向下取整 (floor):", math.floor(y)) # 输出: -5
print("截断小数 (trunc):", math.trunc(y)) # 输出: -4
print("绝对值 (fabs):", math.fabs(-10))   # 输出: 10.0
```

### 3. 幂运算与对数 (Power & Logarithmic)

- **`math.pow(x, y)`**: 返回 x 的 y 次方。虽然和 `x ** y` 类似，但 `math.pow()` 会将参数转换为浮点数，并**始终返回浮点数**。
    
- **`math.sqrt(x)`**: 返回 x 的平方根。
    
- **`math.exp(x)`**: 返回 $e^x$ （`math.e` 的 x 次方）。
    
- **`math.log(x, [base])`**: 返回 x 的对数。如果不传 `base`，默认返回自然对数（以 e 为底）。如果传入 `base`，则返回以 `base` 为底的对数。
    
- **`math.log10(x)`**: 相当于 `math.log(x, 10)` 的快捷方式，返回以 10 为底的对数。
    

**代码示例：**

```python
import math

print("平方根:", math.sqrt(16))      # 输出: 4.0
print("幂运算:", math.pow(2, 3))     # 输出: 8.0
print("以2为底的对数:", math.log(8, 2)) # 输出: 3.0
```

### 4. 三角函数与角度转换 (Trigonometry)

⚠️ `math` 模块中所有的三角函数（sin, cos, tan 等），它们接收的参数都是**弧度 (Radians)**
- **角度与弧度互转**：
    
    - **`math.radians(x)`**: 将角度 x 转换为弧度。
        
    - **`math.degrees(x)`**: 将弧度 x 转换为角度。
        
- **三角函数**：
    
    - **`math.sin(x)`**: 返回 x（弧度）的正弦值。
        
    - **`math.cos(x)`**: 返回 x（弧度）的余弦值。
        
    - **`math.tan(x)`**: 返回 x（弧度）的正切值。
        

**代码示例：**

```python
import math

# 错误做法：直接传入角度 30，结果是不对的
# print(math.sin(30)) 

# 正确做法：先将 30 度转为弧度，再求正弦值
angle = 30
radians = math.radians(angle)
sin_value = math.sin(radians)

# 因为浮点数精度问题，结果可能是 0.49999999999999994
print(f"30度的正弦值: {sin_value}")
```

### 5. 实用特殊函数

- **`math.factorial(x)`**: 返回 x 的阶乘（x!）。x 必须是正整数或 0，否则会报错 `ValueError`。
    
- **`math.gcd(a, b)`**: 返回整数 a 和 b 的最大公约数 (Greatest Common Divisor)。
    

**代码示例：**

```python
import math

print("5的阶乘:", math.factorial(5)) # 输出: 120 (即 5*4*3*2*1)
print("12和18的最大公约数:", math.gcd(12, 18)) # 输出: 6
```

---

## Python 随机数

### 1. 导入模块

在使用任何随机数函数之前，必须先导入模块：

```python
import random
```

### 2. 生成随机整数

这是最常用的场景，比如摇骰子或随机抽号。

- **`random.randint(a, b)`**: 返回一个在 `[a, b]` 范围内的整数（**包含边界 a 和 b**）。
    
```python
    num = random.randint(1, 10)  # 结果可能是 1 到 10 之间的任意整数（包括 1 和 10）
    print("randint(1, 10):", num)
```
    
- **`random.randrange(start, stop[, step])`**: 返回一个在 `range(start, stop, step)` 中的随机整数。**不包含 stop**。
    
```python
    # 生成 0 到 99 之间的随机偶数
    num = random.randrange(0, 100, 2) 
    print("randrange(0, 100, 2):", num)
```

### 3. 生成随机浮点数 (小数)

- **`random.random()`**: 返回一个在 `[0.0, 1.0)` 范围内的随机浮点数（包含 0.0，不包含 1.0）。

```python
    num = random.random()
    print("random():", num)  # 例如: 0.37444887175646646
```
    
- **`random.uniform(a, b)`**: 返回一个在 `[a, b]` 范围内的随机浮点数。无论 `a` 和 `b` 哪个大，结果都在它们之间。
```python
    num = random.uniform(1.5, 5.5)
    print("uniform(1.5, 5.5):", num) # 例如: 3.1415926...
```
    

### 4. 序列相关的随机操作

Python 提供了非常方便的函数直接从序列中随机抽取。

- **`random.choice(seq)`**: 从非空序列（如列表、元组、字符串）中随机**抽取一个**元素。

```python
    fruits = ['apple', 'banana', 'cherry', 'durian']
    print("choice:", random.choice(fruits))
```
    
- **`random.choices(seq, weights=None, k=1)`**: 从序列中抽取 `k` 个元素，**有放回抽样**（元素可能重复）。可以设置权重 `weights`。
```python
    # 抽取 3 个水果，可能有重复
    print("choices:", random.choices(fruits, k=3)) 
    # 按照权重抽取（抽中 apple 的概率是 banana 的 10 倍）
    print("choices(带权重):", random.choices(['apple', 'banana'], weights=[10, 1], k=5))
```
    
- **`random.sample(seq, k)`**: 从序列中随机抽取 `k` 个**独立的**元素，**无放回抽样**（元素不会重复）。

```python
    # 随机抽取 2 个不同的水果
    print("sample:", random.sample(fruits, 2)) 
```
    
- **`random.shuffle(x)`**: 将序列 `x` 中的元素**原地打乱**（注意：它会修改原列表，且没有返回值）。
    
```python
    cards = [1, 2, 3, 4, 5]
    random.shuffle(cards)
    print("shuffle:", cards) # 例如: [3, 1, 5, 2, 4]
```
    

### 5. 随机数种子 (Seed)

计算机生成的实际上是“伪随机数”。如果初始种子相同，每次生成的随机数序列也会完全相同。这在调试或需要可重复结果（如机器学习实验）时非常有用。

- **`random.seed(a=None)`**: 初始化随机数生成器。如果省略参数或为 `None`，通常使用当前系统时间。
```python
    random.seed(42) # 设置固定的种子
    print(random.random()) # 0.6394267984578837
    
    random.seed(42) # 再次设置相同的种子
    print(random.random()) # 依然是 0.6394267984578837
```
    

### 6. 重要补充

1. **安全领域的随机数**：`random` 模块生成的伪随机数是**不安全**的，不能用于加密、生成密码或安全 Token。对于涉及安全的场景，必须使用 Python 的 **`secrets`** 模块。
    
    ```python
    import secrets
    # 生成一个安全的 8 字符随机密码
    password = ''.join(secrets.choice("abcdefghijklmnopqrstuvwxyz0123456789") for i in range(8))
    ```
    
2. **科学计算与大数据**：如果你需要生成大型数组、矩阵或特定概率分布（如正态分布、泊松分布）的随机数，通常使用 **`numpy.random`** 模块，它的性能比内置的 `random` 高得多。
