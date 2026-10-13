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
description: "从 shape 和 dtype 出发理解数组创建、广播、视图与拷贝，减少隐蔽的数据修改。"
---

# NumPy 数组基础：形状、索引、广播与内存

NumPy 的 `ndarray` 用统一数据类型描述多维数据。高效计算依赖数组布局和向量化，但数组并不总是连续内存：切片和转置可以得到带步幅的视图。

## 创建时就明确形状和类型

```python
import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.float64)
print(a.shape, a.ndim, a.size, a.itemsize)
# (2, 3) 2 6 8
```

`ndim` 是轴数，不是线性代数中的矩阵秩。`size` 是元素总数，`dtype` 控制表示范围和精度；固定宽度整数可能溢出。

| 创建方法 | 用途与注意事项 |
| --- | --- |
| `zeros / ones` | 有明确初值 |
| `empty` | 一般未初始化，必须在读取前赋值 |
| `arange` | 按步长生成，浮点步长需注意误差 |
| `linspace` | 按数量等分，默认包含终点 |
| `logspace` | 指数均匀变化对应的数列 |
| `asarray` | 类型和布局满足要求时可复用已有数据 |
| `fromiter` | 从迭代器生成一维数组 |
| `frombuffer` | 解释已有缓冲区，不是自动扩容数组 |

```python
x = np.linspace(0, 1, 5)
rows = np.fromiter((i * i for i in range(4)), dtype=int)
```

`asarray` 是否复制取决于类型、布局和参数，不能保证任何 ndarray 输入都零复制。

## 索引有两套内存语义

```python
slice_view = a[:, 1:]
slice_view[0, 0] = 20      # 也修改 a
picked = a[[0, 1], [0, 2]]
picked[0] = -1            # 不修改 a
```

基本切片通常得到视图，整数数组索引和布尔索引读取通常得到副本。例中的两个索引数组按位置配对，取 `(0,0)` 和 `(1,2)`，不是两行两列的全部组合；笛卡尔积选择可用 `np.ix_`。

```python
selected = a[(a > 2) & (a < 6)]
```

数组条件使用带括号的 `&`、`|`，不要用 Python 的 `and/or` 判断多元素数组。省略号代表其余轴全选，`a[..., 1]` 选取最后一轴的第 1 个元素，而不是泛指任意维度的“列”。

## 广播从末尾维度对齐

两个轴的长度相同，或其中一个为 1，就可以广播；缺失的前导轴视为长度 1。

```python
bias = np.array([10, 20, 30])
result = a + bias            # (2,3) 与 (3,) 兼容
row_mean = a.mean(axis=1, keepdims=True)
centered = a - row_mean      # (2,3) 与 (2,1) 兼容
```

广播避免手动重复输入数据，但结果仍可能很大，例如 `(10000,1)` 与 `(1,10000)` 相加会生成一亿个元素。先画清形状，再检查内存开销。

## 形状变化不总是零复制

`reshape` 改变形状，元素数必须一致；一个维度可用 `-1` 推断。`transpose` 交换轴，二维时可用 `.T`；一维数组 `.T` 不会变成列向量，可使用 `x[:, None]`。

`flatten` 总是生成一维副本，`ravel` 尽可能返回视图，必要时也会复制。`reshape` 同样可能复制，不要只凭函数名推断共享关系，可以用 `np.shares_memory` 辅助检查。

`concatenate` 沿已有轴连接，除连接轴外其他维度必须一致；`stack` 则添加新轴。`split` 要求相应划分合法。`nditer` 能提供迭代控制，但 Python 层逐元素循环不天然快于向量化，优先用整数组运算。

下一篇：[统计、抽样与持久化](./NumPy统计抽样与保存.md)。
