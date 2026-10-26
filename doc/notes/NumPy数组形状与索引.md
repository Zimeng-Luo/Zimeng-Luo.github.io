---
title: "NumPy 数组基础：形状、索引、广播与内存"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 数组计算
  - 数据建模
coverImg: /blog/bg18.jpg
sidebar: false
description: "NumPy 基础、NumPy 创建数组、NumPy 高级功能的学习笔记。"
---

# NumPy 数组基础：形状、索引、广播与内存

## NumPy 基础

### 1. NumPy Ndarray 对象

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

### 2. NumPy 数据类型 (Data Types)

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

### 3. NumPy 数组属性 (Array Attributes)

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

---

## NumPy 创建数组

### 1. NumPy 创建常规数组

除了上一节提到的 `np.array()`，NumPy 还提供了几个非常实用的内建函数，用于快速生成特定规律的初始化数组。

**核心函数：**

- **`np.empty(shape, dtype)`**: 创建一个未初始化的数组，数组元素为内存中的随机残留值。速度最快，但数据不可控。
    
- **`np.zeros(shape, dtype)`**: 创建一个全部由 `0` 组成的数组。
    
- **`np.ones(shape, dtype)`**: 创建一个全部由 `1` 组成的数组。
    

**代码示例：**

```python
import numpy as np

# 创建一个 2行2列 的全零矩阵，类型指定为整型
arr_zeros = np.zeros((2, 2), dtype=int)
print("Zeros:\n", arr_zeros)

# 创建一个 3个元素的 全一数组
arr_ones = np.ones(3)
print("Ones:\n", arr_ones)
```

### 2. NumPy 从已有数据创建数组

当你的数据已经以 Python 列表、元组或迭代器的形式存在时，可以通过以下方式将其转化为高效的 `ndarray`。

**核心函数：**

- **`np.asarray(a, dtype)`**: 类似 `np.array`，但当输入本身就是 ndarray 时，`asarray` 不会占用新内存进行复制，效率更高。可以接受列表、列表的元组、元组、元组的元组等。
    
- **`np.frombuffer(buffer, dtype)`**: 用于实现动态数组。接受 buffer 输入字符串（需要是字节串），并以一维数组的形式读取它。
    
- **`np.fromiter(iterable, dtype)`**: 从任何可迭代对象（如生成器、字典的键等）构建一维数组。
    

**代码示例：**

```python
import numpy as np

# 使用 fromiter 从迭代器创建数组
iterable = (x * x for x in range(5))
arr_iter = np.fromiter(iterable, dtype=float)
print("From Iterator:\n", arr_iter)  # 输出: [ 0.  1.  4.  9. 16.]
```

### 3. NumPy 从数值范围创建数组

在绘制函数图像（如 Pyplot 画图）或生成坐标轴数据时，最常用到数值范围生成函数。

**核心函数：**

- **`np.arange(start, stop, step, dtype)`**: 等差数列，用法与 Python 原生的 `range()` 完全一致，但返回的是 `ndarray`。（注意：不包含 stop 值）
    
- **`np.linspace(start, stop, num=50)`**: 线性等分数列。在指定的间隔内返回均匀间隔的数字。（注意：默认**包含** stop 值）
    
- **`np.logspace(start, stop, num=50, base=10.0)`**: 对数等比数列。
    

**代码示例：**

```python
import numpy as np

# 1. 生成 10 到 20，步长为 2 的数组
arr_arange = np.arange(10, 20, 2)
print("Arange:\n", arr_arange)  # 输出: [10 12 14 16 18]

# 2. 生成 1 到 10 之间，均匀分布的 4 个数字
arr_linspace = np.linspace(1, 10, 4)
print("Linspace:\n", arr_linspace) # 输出: [ 1.  4.  7. 10.]
```

### 4. NumPy 切片和索引 (Slicing & Indexing)

NumPy 数组的切片与 Python 列表非常相似，可以通过冒号 `:` 进行截取，格式为 `[start:stop:step]`。但对于多维数组，NumPy 提供了更强大的逗号分隔索引方式。

**一维数组切片：**

```python
import numpy as np
a = np.arange(10) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(a[2:7:2])  # 从索引2开始，到索引7(不含)，步长为2。输出: [2 4 6]
print(a[5:])     # 提取从索引5开始的所有元素。输出: [5 6 7 8 9]
```

**多维数组切片与索引：**

对于多维数组，可以通过逗号 `,` 分隔不同维度的切片参数，格式为 `[行切片, 列切片]`。

```python
import numpy as np
arr_2d = np.array([[1, 2, 3], 
                   [4, 5, 6], 
                   [7, 8, 9]])

# 1. 提取第 1 行，第 1 列的元素 (索引从 0 开始)
print("特定元素:", arr_2d[1, 1])  # 输出: 5

# 2. 提取第 1 行及之后的所有行，第 1 列及之后的所有列
print("多维切片:\n", arr_2d[1:, 1:]) 
# 输出:
# [[5 6]
#  [8 9]]

# 3. 提取所有行的第 0 列元素
print("特定列:", arr_2d[:, 0]) # 输出: [1 4 7]
```

**省略号 `...` 的使用：**

如果在多维数组中，你只想对某一维度进行操作，其余维度全选，可以使用 `...`。例如 `arr[..., 1]` 等价于提取所有维度的第 1 列。

---

## NumPy 高级功能

### 1. NumPy 高级索引

除了基础的切片，NumPy 提供了更灵活的高级索引方式，主要分为**整数数组索引**和**布尔索引**。

**整数数组索引：**

允许你通过传入行索引数组和列索引数组，提取数组中任意位置的元素。

```python
import numpy as np

arr = np.array([[1, 2], [3, 4], [5, 6]])

# 提取 (0,0), (1,1), (2,0) 这三个位置的元素
result = arr[[0, 1, 2], [0, 1, 0]]
print(result)  # 输出: [1 4 5]
```

**布尔索引：**

通过逻辑表达式直接过滤数组中的元素，这在数据清洗中极为常用。

```python
arr = np.array([[1, 5, 8], [4, 9, 2]])

# 找出所有大于 4 的元素
print(arr[arr > 4])  # 输出: [5 8 9]

# 复合条件过滤（使用 & 表示与，| 表示或）
print(arr[(arr > 2) & (arr < 8)])  # 输出: [5 4]
```

### 2. NumPy 广播 (Broadcasting)

广播是 NumPy 最强大的机制之一。它允许不同形状的数组之间进行算术运算，而无需显式地复制数据。

**广播的核心规则：**

如果两个数组的后缘维度（从末尾开始算起的维度）的轴长度相符，或其中一方的长度为 1，则认为它们是广播兼容的。广播会在缺失或长度为 1 的维度上进行补充。

**代码示例：**

```python
import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6]])  # 形状 (2, 3)
b = np.array([10, 20, 30])            # 形状 (3,) -> 视为 (1, 3) 进行广播

# b 的每一项会自动与 a 的每一行对应相加
print(a + b)
# 输出:
# [[11 22 33]
#  [14 25 36]]
```

### 3. NumPy 迭代数组

虽然可以直接用 Python 的 `for` 循环遍历 `ndarray`，但使用 NumPy 提供的 `np.nditer` 迭代器对象，能够更高效地进行多维数组的遍历。

**核心用法与参数：**

- **控制遍历顺序**：`order='C'`（按行遍历，C语言风格）或 `order='F'`（按列遍历，Fortran风格）。
    
- **修改数组元素**：默认情况下 `nditer` 将数组视为只读，如果需要修改元素，必须指定 `op_flags=['readwrite']`。
    

**代码示例：**

```python
import numpy as np

arr = np.arange(0, 6).reshape(2, 3)

# 高效遍历每个元素并修改（将其翻倍）
for x in np.nditer(arr, op_flags=['readwrite']):
    x[...] = 2 * x

print(arr)
# 输出:
# [[ 0  2  4]
#  [ 6  8 10]]
```

### 4. NumPy 数组操作

NumPy 提供了极其丰富的数组变形与拼接函数。

**修改数组形状：**

- **`reshape`**: 不改变数据的情况下修改形状。
    
- **`flatten`**: 返回一份数组的一维拷贝，对拷贝所做的修改不会影响原始数组。
    
- **`ravel`**: 返回数组的一维视图，修改视图会影响原始数组（效率比 flatten 高）。
    

**翻转数组：**

- **`transpose`** 或 **`arr.T`**: 矩阵转置，交换数组的维度。
    

**连接与分割数组：**

- **`np.concatenate((a1, a2), axis)`**: 沿指定轴连接相同形状的两个或多个数组。
    
- **`np.vstack((a1, a2))`**: 垂直（按行）堆叠数组。
    
- **`np.hstack((a1, a2))`**: 水平（按列）堆叠数组。
    
- **`np.split(ary, indices_or_sections, axis)`**: 沿特定的轴将数组分割为子数组。
    

**代码示例（连接与转置）：**

```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# 按列连接
c = np.hstack((a, b))
print("水平拼接:\n", c)

# 矩阵转置
print("\n转置矩阵:\n", a.T)
```

### 5. NumPy 位运算

NumPy 的位运算主要用于对整型数组的二进制位进行操作。在图像处理、掩码操作或底层算法优化中会用到。

**核心位运算函数：**

- **`np.bitwise_and`**: 按位与操作。
    
- **`np.bitwise_or`**: 按位或操作。
    
- **`np.invert`** (或 `~`): 按位取反操作。
    
- **`np.left_shift`** (或 `<<`): 将数值的二进制位向左移动指定的位数。
    
- **`np.right_shift`** (或 `>>`): 将数值的二进制位向右移动指定的位数。
    

**代码示例：**

```python
import numpy as np

# 数字 13 的二进制是 1101，17 的二进制是 10001
num1, num2 = 13, 17

# 13 按位与 17 (01101 & 10001 = 00001)
print("按位与:", np.bitwise_and(num1, num2)) # 输出: 1

# 左移 2 位 (10 左移 2 位相当于乘 4)
print("左移:", np.left_shift(10, 2)) # 输出: 40
```
