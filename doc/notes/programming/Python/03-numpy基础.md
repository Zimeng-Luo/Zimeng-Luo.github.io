---
title: 03 numpy基础.md 
date: 2026-09-02
categories: ["笔记", "编程", "Python"]
tags: ["Python", "编程"]
sidebar: false
---

# NumPy 基础

## 核心摘要

本篇用于查阅 NumPy 的核心数据结构 `ndarray`、常见数据类型和数组属性。重点理解数组维度、形状、元素数量、数据类型和单元素内存占用。

## 1. NumPy Ndarray 对象

`ndarray`（N-dimensional array）是 NumPy 中最核心的数据结构，它是一个**同构的多维数组**。这意味着数组中的所有元素都必须是同一种数据类型（通常是数字），这使得它在内存中连续分布，计算效率远超 Python 原生的列表（List）。

**核心创建函数：`np.array()`**

```python
numpy.array(object, dtype=None, copy=True, order='K', subok=False, ndmin=0)
```

**常用参数解析：**

- **`object`**: 任何暴露数组接口的对象（如 List、Tuple 等）。
    
- **`dtype`**: 强制指定数组的数据类型（可选）。
    
- **`ndmin`**: 指定生成数组的最小维度（常用于将一维数据强制转为二维或多维）。
    

**代码示例：**

```python
import numpy as np

# 1. 从列表创建一维数组
arr1 = np.array([1, 2, 3])
print(arr1)

# 2. 从嵌套列表创建二维数组
arr2 = np.array([[1, 2], [3, 4]])
print(arr2)

# 3. 使用 ndmin 强制指定最小维度（例如将一维列表转为二维数组）
arr3 = np.array([1, 2, 3], ndmin=2)
print(arr3)  # 输出: [[1 2 3]]
```

## 2. NumPy 数据类型 (Data Types)

为了更精细地控制内存并提升计算性能，NumPy 提供了比 Python 原生类型（`int`, `float`）丰富得多的数据类型（如 8位、16位、32位、64位的整数或浮点数）。

**常用数据类型：**

- **布尔型**: `bool_`
    
- **整型**: `int8`, `int16`, `int32`, `int64` (无符号整型加 `u`前缀，如 `uint8`)
    
- **浮点型**: `float16`, `float32`, `float64`
    
- **复数型**: `complex64`, `complex128`
    

**数据类型对象 (dtype)：**

每个 `ndarray` 都有一个关联的 `dtype` 对象。你可以在创建数组时显式指定它，也可以用它来定义结构化数据。

**代码示例：**

```python
import numpy as np

# 1. 创建数组时显式指定数据类型为 32 位浮点数
arr_float = np.array([1, 2, 3], dtype=np.float32)
print(arr_float)      # 输出: [1. 2. 3.]
print(arr_float.dtype) # 输出: float32

# 2. 类型简写（'i1'代表int8, 'i4'代表int32, 'f4'代表float32）
arr_int = np.array([1, 2, 3], dtype='i1') 
print(arr_int.dtype)   # 输出: int8
```

## 3. NumPy 数组属性 (Array Attributes)

了解数组的属性，可以帮助我们快速掌握矩阵的形状和数据量。这也是在进行数组形状变换（如 `reshape`）之前必须要检查的信息。

**核心属性列表：**

- **`ndarray.ndim`**: 秩，即轴的数量（维度数）。一维数组秩为1，二维数组（矩阵）秩为2。
    
- **`ndarray.shape`**: 数组的维度，返回一个元组。例如对于 `n` 行 `m` 列的矩阵，`shape` 为 `(n, m)`。
    
- **`ndarray.size`**: 数组元素的总个数，等于 `shape` 属性中各个元组元素的乘积。
    
- **`ndarray.dtype`**: 数组中元素的数据类型。
    
- **`ndarray.itemsize`**: 数组中每个元素占用内存的大小，以字节（Byte）为单位（例如 `int8` 为 1，`float64` 为 8）。
    

**代码示例：**

```python
import numpy as np

# 创建一个 2 行 3 列的二维数组，类型为 int32 (占用 4 字节)
arr = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.int32)

print(f"数组内容:\n{arr}")
print(f"维度数 (ndim): {arr.ndim}")          # 输出: 2
print(f"数组形状 (shape): {arr.shape}")        # 输出: (2, 3)
print(f"元素总数 (size): {arr.size}")          # 输出: 6
print(f"数据类型 (dtype): {arr.dtype}")        # 输出: int32
print(f"单元素字节大小 (itemsize): {arr.itemsize}") # 输出: 4
```

