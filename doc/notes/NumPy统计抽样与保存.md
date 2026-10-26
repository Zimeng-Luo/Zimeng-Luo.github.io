---
title: "NumPy 实用计算：统计、抽样、索引与保存"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 科学计算
  - 实验复现
coverImg: /blog/bg19.jpg
sidebar: false
description: "NumPy IO、NumPy 内置函数、NumPy 随机数与索引返回的学习笔记。"
---

# NumPy 实用计算：统计、抽样、索引与保存

## NumPy IO

### 1. NumPy 专有二进制文件 (`.npy` 和 `.npz`)

使用 NumPy 专有的二进制格式保存数据，读写速度极快，且能完美保留数组的形状（shape）和数据类型（dtype）等信息。

**核心函数：**

- **`np.save(file, arr)`**: 将**单个**数组保存为 `.npy` 格式的二进制文件。如果文件路径没有 `.npy` 扩展名，系统会自动补全。
    
- **`np.savez(file, *args, **kwds)`**: 将**多个**数组保存到一个未压缩的 `.npz` 格式的字典压缩包中。可以通过关键字参数（如 `arr1=a, arr2=b`）为数组命名。
    
- **`np.load(file)`**: 加载 `.npy` 或 `.npz` 文件。
    

**代码示例：**

```python
import numpy as np

# 1. 保存和读取单个数组 (.npy)
arr1 = np.array([[1, 2, 3], [4, 5, 6]])
np.save('my_data.npy', arr1)

loaded_arr1 = np.load('my_data.npy')
print("加载的单个数组:\n", loaded_arr1)

# 2. 保存和读取多个数组 (.npz)
arr2 = np.arange(5)
arr3 = np.linspace(0, 1, 5)

# 使用关键字参数为数组命名，如果不命名，默认会以 'arr_0', 'arr_1' 命名
np.savez('my_archive.npz', data_a=arr2, data_b=arr3)

# 加载 .npz 文件后，会得到一个类似字典的对象
loaded_archive = np.load('my_archive.npz')
print("\n加载的数组 a:", loaded_archive['data_a'])
print("加载的数组 b:", loaded_archive['data_b'])

# 使用完后关闭文件（良好习惯）
loaded_archive.close()
```

### 2. 纯文本文件 (`.txt` 和 `.csv`)

当你需要将数据与其他工具（如 Excel、文本编辑器或 R 语言）共享时，通常会保存为纯文本格式。由于纯文本无法像二进制文件那样存储维度信息，它通常只适合保存一维或二维数组。

**核心函数：**

- **`np.savetxt(fname, X, fmt='%.18e', delimiter=' ', ...)`**: 将一维或二维数组保存为文本文件。
    
    - `fmt`: 写入文件的格式，如 `%d`（整数）、`%.2f`（保留两位小数的浮点数）。
        
    - `delimiter`: 分隔符，默认为空格。常用的还有 `,`（逗号，用于生成 CSV 文件）。
        
- **`np.loadtxt(fname, dtype=float, delimiter=None, ...)`**: 从文本文件中加载数据。
    

**代码示例：**

```python
import numpy as np

# 创建一个 3x3 的二维浮点数组
arr = np.random.rand(3, 3)

# 1. 保存为 CSV 文件（逗号分隔），并指定格式为保留 2 位小数
np.savetxt('my_data.csv', arr, fmt='%.2f', delimiter=',')
print("已保存至 my_data.csv")

# 2. 从 CSV 文件中读取数据
# 必须指定与保存时相同的分隔符
loaded_txt = np.loadtxt('my_data.csv', delimiter=',')
print("\n从文本读取的数组:\n", loaded_txt)
```

---

## NumPy 内置函数

### 1. NumPy 字符串函数

NumPy 的字符串操作集中在 `numpy.char` 模块中。它们对字符串数组执行元素级的操作。

**核心函数：**

- **`np.char.add(a, b)`**: 对两个数组的元素进行字符串连接。
    
- **`np.char.upper(a)` / `lower(a)`**: 将数组中的字符串转换为大写/小写。
    
- **`np.char.replace(a, old, new)`**: 替换字符串中的子串。
    
- **`np.char.split(a, sep)`**: 按指定分隔符分割字符串。
    

**代码示例：**

```python
import numpy as np

arr1 = np.array(['Hello', 'NumPy'])
arr2 = np.array([' World', ' Tutorial'])

# 字符串连接
print("连接:", np.char.add(arr1, arr2)) 
# 输出: ['Hello World' 'NumPy Tutorial']

# 转大写
print("大写:", np.char.upper(arr1)) 
# 输出: ['HELLO' 'NUMPY']
```

### 2. NumPy 数学函数

包含大量标准数学计算函数，支持元素级平方根、三角函数、指数、对数以及舍入操作。

**核心函数：**

- **三角函数**: `np.sin()`, `np.cos()`, `np.tan()` 等（注意：输入参数为弧度制，可用 `np.radians()` 将角度转为弧度）。

- **`np.sqrt(x)`**: 对数组或标量逐元素开平方，返回非负平方根。输入负实数时结果为 `nan`，如需复数结果可先转为 `complex` 类型。
    
- **`np.around(a, decimals)`**: 返回指定精度的四舍五入值。`decimals` 为保留的小数位数（默认 0）。
    
- **`np.floor(a)`**: 向下取整（返回不大于输入参数的最大整数）。
    
- **`np.ceil(a)`**: 向上取整（返回大于输入参数的最小整数）。
    

**代码示例：**

```python
import numpy as np

arr = np.array([-1.7, 1.5, -0.2, 0.6, 10])
nums = np.array([0, 1, 4, 9])

print("平方根:", np.sqrt(nums))          # 输出: [0. 1. 2. 3.]
print("负数开方:", np.sqrt(-1))          # 输出: nan
print("复数开方:", np.sqrt(-1 + 0j))     # 输出: 1j
print("原始数组:", arr)
print("四舍五入 (around):", np.around(arr)) # 输出: [-2.  2. -0.  1. 10.]
print("向下取整 (floor):", np.floor(arr))   # 输出: [-2.  1. -1.  0. 10.]
print("向上取整 (ceil):", np.ceil(arr))     # 输出: [-1.  2. -0.  1. 10.]
```

### 3. NumPy 算术函数

对数组进行元素级的加减乘除和幂运算。**注意：进行算术运算的数组必须具有相同的形状或符合广播（Broadcasting）规则。**

**核心函数：**

- **基础四则运算**: `np.add()`, `np.subtract()`, `np.multiply()`, `np.divide()`。在实际操作中，通常直接使用运算符 `+`, `-`, `*`, `/`。
    
- **`np.power(a, b)`**: 将 `a` 中的元素作为底数，`b` 中的元素作为指数进行幂运算。
    
- **`np.mod(a, b)` / `np.remainder(a, b)`**: 计算两数组元素相除后的余数。
    

**代码示例：**

```python
import numpy as np

a = np.array([10, 20, 30])
b = np.array([3, 5, 7])

print("除法:", a / b)                  # 直接使用运算符
print("求幂:", np.power(a, 2))         # 输出: [100 400 900]
print("求余:", np.mod(a, b))           # 输出: [1 0 2]
```

### 4. NumPy 统计函数

用于从数组中提取统计信息。**这类函数最关键的参数是 `axis`**：

- 不指定 `axis` 时，计算整个数组。
    
- `axis=0`：跨行计算（计算每列的统计值）。
    
- `axis=1`：跨列计算（计算每行的统计值）。
    

**核心函数：**

- **最值**: `np.amin()` (最小值), `np.amax()` (最大值), `np.ptp()` (极差，即最大值减最小值)。
    
- **平均与中位数**: `np.mean()` (算术平均值), `np.median()` (中位数), `np.average()` (加权平均值)。
    
- **方差与标准差**: `np.var()` (方差), `np.std()` (标准差)。
    

**代码示例：**

```python
import numpy as np

arr = np.array([[3, 7, 5], 
                [8, 4, 3], 
                [2, 4, 9]])

print("全局最小值:", np.amin(arr))        # 输出: 2
print("按列求最小值 (axis=0):", np.amin(arr, axis=0)) # 输出: [2 4 3]
print("按行求平均值 (axis=1):", np.mean(arr, axis=1)) # 输出: [5. 5. 5.]
```

### 5. NumPy 排序与条件筛选函数

处理数据时，经常需要对数据进行排序或提取满足特定条件的数据索引。

**核心函数：**

- **`np.sort(a, axis)`**: 返回数组的排序副本（不改变原数组）。
    
- **`np.argsort(a)`**: **(极度常用)** 返回的是数组值从小到大排序后的**索引值**数组。
    
- **`np.where(condition, [x, y])`**:
    
    - 只有 `condition` 时，返回满足条件的元素索引。
        
    - 有 `x` 和 `y` 时，相当于三元运算符：满足条件替换为 `x`，不满足替换为 `y`。
        
- **`np.extract(condition, array)`**: 根据指定的布尔条件提取数组中的元素，直接返回满足条件的值。
    

**代码示例：**

```python
import numpy as np

arr = np.array([3, 1, 2])

# argsort 用法
sort_indices = np.argsort(arr)
print("排序后的索引:", sort_indices) # 输出: [1 2 0] (因为最小值 1 的索引是 1)
print("利用索引重构数组:", arr[sort_indices]) # 输出: [1 2 3]

# where 用法
scores = np.array([45, 78, 88, 55, 92])
# 大于等于 60 为及格(True)，否则不及格(False)
results = np.where(scores >= 60, '及格', '不及格')
print("筛选替换结果:", results) 
# 输出: ['不及格' '及格' '及格' '不及格' '及格']
```

---

## NumPy 随机数与索引返回

### 1. 随机数

从 NumPy 1.17 开始，官方推荐弃用旧版的全局状态接口（如 `np.random.rand`），全面改用面向对象的 **Generator API**，它速度更快且支持多线程安全。

#### 1.1 初始化生成器

所有随机操作都通过这个实例化的生成器对象（通常命名为 `rng`）来调用。

```python
import numpy as np

# 1. 常规使用（每次运行结果不同）
rng = np.random.default_rng()

# 2. 需要结果可复现（固定 Seed）
rng = np.random.default_rng(seed=42)
```

#### 1.2 基础随机数生成

- **生成 `[0.0, 1.0)` 的浮点数**：`rng.random(size)`
    
    ```python
    rng.random()          # 单个浮点数
    rng.random(5)         # 长度为 5 的一维数组
    rng.random((2, 3))    # 2行3列 的矩阵
    ```
    
- **生成整数**：`rng.integers(low, high, size, endpoint=False)`
    
```
    rng.integers(0, 10, 5)                # [0, 10) 之间的 5 个随机整数（不包含 10）
    rng.integers(1, 5, (2, 2), endpoint=True) # [1, 5] 之间的 2x2 矩阵（包含 5）
```
    

#### 1.3 常见的概率分布

- **正态（高斯）分布**：`rng.normal(loc=均值, scale=标准差, size)`
    
    ```python
    rng.normal(0, 1, 10)  # 生成 10 个标准正态分布的随机数
    ```
    
- **均匀分布**：`rng.uniform(low, high, size)`
    
    ```python
    rng.uniform(-1, 1, 5) # 生成 5 个 [-1.0, 1.0) 之间的均匀分布数
    ```
    

#### 1.4 数组元素的随机操作

- **随机抽取**：`rng.choice(a, size, replace=True, p=None)`
    
    ```python
    items = np.array(['A', 'B', 'C', 'D'])
    
    rng.choice(items, 3)                  # 随机抽 3 个（默认可重复抽取）
    rng.choice(items, 2, replace=False)   # 无放回抽样（抽出不重复）
    rng.choice(items, 1, p=[0.1, 0.1, 0.1, 0.7]) # 按指定概率 p 抽取
    ```
    
- **打乱顺序**：`rng.shuffle(x)` 与 `rng.permutation(x)`
    
    ```python
    arr = np.arange(10) # [0, 1, 2...9]
    
    # 方法 A：原地打乱（修改原数组，无返回值）
    rng.shuffle(arr)
    
    # 方法 B：返回新数组（原数组保持不变）
    new_arr = rng.permutation(arr)
    ```


### 2. 返回索引

#### 2.1 一维数组：使用 `np.where`

`np.where(condition)` 会返回一个元组，里面包含了满足条件的元素的索引数组。对于一维数组，通常需要取元组的第一个元素 `[0]` 来获取纯净的索引数组。

```python
import numpy as np

arr = np.array([10, 20, 30, 20, 40, 50])

# 查找值为 20 的所有索引
# 注意：np.where 返回的是 tuple: (array([1, 3]),)
result = np.where(arr == 20)
print("返回的原始结果:", result)

# 提取具体的索引数组
indices = result[0]
print("纯净的索引数组:", indices)  # 输出: [1 3]

# 也可以结合条件查找（例如查找大于 25 的索引）
indices_greater = np.where(arr > 25)[0]
print("大于25的索引:", indices_greater)  # 输出: [2 4 5]
```

#### 2.2 多维数组：使用 `np.argwhere` (推荐)

对于二维或多维矩阵，虽然 `np.where` 也能用，但它会按维度分别返回行索引和列索引，看起来不太直观。

**`np.argwhere`** 会将结果组合成 `[行坐标, 列坐标]` 的形式，非常适合多维数组。

```python
arr_2d = np.array([[10, 20, 30],
                   [40, 20, 60],
                   [70, 80, 20]])

# 查找矩阵中值为 20 的坐标
indices_2d = np.argwhere(arr_2d == 20)

print("值为20的坐标 [行, 列]:\n", indices_2d)
# 输出:
# [[0  1]   <- 第0行, 第1列
#  [1  1]   <- 第1行, 第1列
#  [2  2]]  <- 第2行, 第2列
```

#### 2.3 查找第一个匹配值的索引

如果你知道数组中某个值有很多个，但你**只需要找到第一个**，使用 `np.where` 会遍历整个数组，效率不高。这时可以使用 Python 内置方法或 `argmax` 配合布尔值来实现快速查找（遇到即停或快速返回）：

```python
arr = np.array([10, 20, 30, 20, 40])

# 技巧：(arr == 20) 会生成布尔数组 [False, True, False, True, False]
# argmax 会返回第一个最大值（True）的索引
first_index = (arr == 20).argmax()

print("第一个值为20的索引:", first_index)  # 输出: 1
```

_(注意：如果数组中根本不存在该值，此方法会返回 0，所以在不确定值是否存在时需谨慎使用，或者先判断 `20 in arr`)_

#### 2.4 查找最大值 / 最小值的索引

这是非常高频的操作，不需要用 `np.where`，NumPy 提供了专门的函数：

```python
arr = np.array([15, 8, 99, 23, 4])

print("最大值的索引:", np.argmax(arr))  # 输出: 2 (对应数值 99)
print("最小值的索引:", np.argmin(arr))  # 输出: 4 (对应数值 4)
```
