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
description: "掌握 math 的数值约定与 random 的采样边界，避免舍入和随机种子的误用。"
---

# Python 数值工具与可复现抽样

数值计算的结果不仅由公式决定，也由数据表示、舍入方式与随机状态决定。标准库 `math` 和 `random` 适合标量计算与小规模采样；数组任务可交给 NumPy。

## 舍入的方向要明确

```python
import math

print(math.floor(-2.7))  # -3
print(math.ceil(-2.7))   # -2
print(math.trunc(-2.7))  # -2
print(round(2.5), round(3.5))  # 2 4
```

`round` 对恰好居中的值采用向偶数舍入，还会受二进制浮点表示影响，不是简单的十进制“四舍五入”。金额等精确十进制任务可用 `decimal` 并明确舍入规则。

`math.pow` 转为浮点运算，`**` 在整数指数等情况下可以保留整数结果。`sqrt`、`log` 有定义域限制；`sin`、`cos`、`tan` 接收弧度，可用 `radians` 和 `degrees` 转换。`factorial` 处理非负整数，`gcd` 处理整数的最大公约数。

```python
angle = math.radians(30)
print(math.isclose(math.sin(angle), 0.5))
```

浮点比较使用适当的相对和绝对容差。接近零时尤其要考虑 `abs_tol`；NaN 不等于自身，应使用 `math.isnan` 检测。

## 用独立随机生成器保存状态

```python
import random

rng = random.Random(42)
items = ["A", "B", "C", "D"]
print(rng.randint(1, 6))
print(rng.sample(items, k=2))
```

独立 `Random` 实例减少模块间共享全局随机状态的干扰。相同种子、相同调用次序及兼容实现可重现序列；改变抽样顺序也会改变后续结果。

| 方法 | 抽样约定 |
| --- | --- |
| `randint(a,b)` | 整数闭区间 |
| `randrange(start,stop,step)` | 从 range 对应序列抽样，终点不包含 |
| `random()` | `[0,1)` 的浮点数 |
| `uniform(a,b)` | 区间浮点抽样，浮点舍入可能影响端点 |
| `choice(seq)` | 从非空序列取一个元素 |
| `choices(seq,k,weights)` | 可按权重有放回抽样 |
| `sample(seq,k)` | 按位置无放回抽样 |
| `shuffle(seq)` | 原地打乱，返回 None |

如果原序列中有相同的值，无放回按位置抽样仍可能抽到两个相同值。无放回样本之间也不是相互独立的抽取。

## 可复现不是只固定一个 seed

实验记录应包括数据版本、随机种子、库版本、调用顺序和并行设置。标准库、NumPy 和训练框架通常有各自随机状态，只给 `random` 播种不会控制所有库。某些并行算法即使种子相同也可能有非确定性。

随机数用于模拟和实验；安全令牌使用 `secrets`，例如 `secrets.token_urlsafe()`。不要把伪随机序列可复现的性质当成安全随机性。
