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
description: "以数据处理流程串联轴约定、统计量、随机生成器和数组文件格式。"
---

# NumPy 实用计算：统计、抽样、索引与保存

数组计算要先确定“每个轴代表什么”。下面统一用二维数组的行表示样本、列表示特征，这样统计、抽样与保存就有一致的语义。

## axis 决定沿哪个方向归约

```python
import numpy as np

X = np.array([[1., 2.], [3., 4.], [5., 6.]])
print(X.mean(axis=0))       # [3. 4.]，每个特征的均值
print(X.mean(axis=1))       # [1.5 3.5 5.5]，每个样本的均值
print(X.var(axis=0, ddof=1))  # [4. 4.]，样本方差
```

`axis=0` 消去样本轴，`axis=1` 消去特征轴；不指定轴通常归约全部元素。需要继续广播时用 `keepdims=True` 保留长度为 1 的轴。

NumPy 的 `var/std` 默认 `ddof=0`。无偏样本方差常用 `ddof=1`，前提是样本数大于 1。`mean`、`median`、`average` 分别对应均值、中位数和可带权均值，不能只按哪个函数短来选择。

元素级运算包括 `sqrt`、`sin`、`power` 等。负实数开平方通常得到 NaN；需要复数结果时明确使用复数类型。`X * X` 是逐元素乘法，矩阵乘法使用 `@`。字符串数组有相应批处理函数，但不是把整列文本当成数值矩阵计算。

## 区分值与位置

```python
scores = np.array([45, 80, 60, 80])
order = np.argsort(scores)
positions = np.where(scores >= 60)[0]
labels = np.where(scores >= 60, "pass", "fail")
```

`sort` 返回排序值，`argsort` 返回索引。单参数 `where` 返回每个轴的坐标数组元组，三参数 `where` 按条件选择值；`argwhere` 返回坐标行，适合查看多维位置，但不宜直接当成所有数组的索引。

```python
mask = scores == 100
first = int(mask.argmax()) if mask.any() else None
```

全为 False 时 `argmax` 会返回 0，必须先处理无匹配。生成布尔掩码本身会扫描数据，不能把这个写法宣传成整个查询必定“遇到就停”。空数组也要单独处理。

## 用 Generator 管理随机状态

```python
rng = np.random.default_rng(42)
noise = rng.normal(loc=0, scale=1, size=(3, 2))
integers = rng.integers(1, 7, size=5)
indices = rng.choice(X.shape[0], size=2, replace=False)
subset = X[indices]
```

`integers` 默认上界不包含，`endpoint=True` 可包含上界。`normal` 的 `scale` 是标准差，不是方差。`choice` 默认有放回，`shuffle` 原地修改，`permutation` 返回排列结果。

独立生成器方便隔离状态；固定种子不会自动控制其他库或并行计算的非确定性。多工作线程或多进程的独立流应明确创建，不要把共享一个生成器理解成自动实现完整实验复现。

## 根据数据用途选择文件格式

```python
np.save("features.npy", X)
loaded = np.load("features.npy", allow_pickle=False)
np.savez("dataset.npz", features=X, labels=np.array([0, 1, 0]))
with np.load("dataset.npz", allow_pickle=False) as bundle:
    restored = bundle["features"]
```

`.npy` 保存单个数组的形状和类型；`.npz` 保存多个命名数组，`savez` 本身不压缩，可用 `savez_compressed`。纯数值数组不需要 pickle。

```python
np.savetxt("features.csv", X, delimiter=",", fmt="%.6f")
restored_text = np.loadtxt("features.csv", delimiter=",")
```

文本适合交换一维或二维数据，但不保留全部数组元信息，格式精度也可能改变数值。复杂表格保留列名、缺失值和混合类型时优先用[Pandas](./Pandas表格处理流程.md)。
