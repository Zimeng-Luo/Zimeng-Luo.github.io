---
title: 02 math库.md 
date: 2026-09-02
categories: ["笔记", "编程", "Python"]
tags: ["Python", "编程"]
sidebar: false
---

# Python math 库

## 核心摘要

本篇用于查阅 Python 标准库 `math` 的常用函数，包括数学常量、取整、幂与对数、三角函数、角度转换、阶乘和最大公约数。

## 1. 核心数学常量 (Constants)

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

## 2. 数值处理与舍入 (Rounding & Absolute)

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

## 3. 幂运算与对数 (Power & Logarithmic)

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

## 4. 三角函数与角度转换 (Trigonometry)

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

## 5. 实用特殊函数

- **`math.factorial(x)`**: 返回 x 的阶乘（x!）。x 必须是正整数或 0，否则会报错 `ValueError`。
    
- **`math.gcd(a, b)`**: 返回整数 a 和 b 的最大公约数 (Greatest Common Divisor)。
    

**代码示例：**

```python
import math

print("5的阶乘:", math.factorial(5)) # 输出: 120 (即 5*4*3*2*1)
print("12和18的最大公约数:", math.gcd(12, 18)) # 输出: 6
```

