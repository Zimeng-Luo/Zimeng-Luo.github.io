---
title: 04 pyplot.md 
date: 2026-09-02
categories: ["笔记", "编程", "Python"]
tags: ["Python", "编程"]
sidebar: false
---

# Matplotlib Pyplot 基础

## 核心摘要

本篇用于查阅 `matplotlib.pyplot` 的基础绘图流程，包括导入配置、`plot()`、标签标题、网格、子图和常见图表类型。

## 1. 基础准备

在使用 Pyplot 之前，通常需要导入相应的库。为了解决图表中文字体显示为方块（乱码）的问题，需要进行简单的配置。

```python
import matplotlib.pyplot as plt
import numpy as np

# 解决中文显示问题（Windows常用黑体 SimHei，Mac常用 Arial Unicode MS）
plt.rcParams['font.sans-serif'] = ['SimHei'] 
# 解决负号 '-' 显示为方块的问题
plt.rcParams['axes.unicode_minus'] = False
```

---

## 2. 核心绘图函数 `plot()`

`plot()` 是最基本也是最常用的绘图函数，主要用于绘制**折线图**或**散点图**。

### 基础用法

```python
x = np.array([1, 2, 3, 4])
y = np.array([1, 4, 9, 16])

plt.plot(x, y)
plt.show() # 显示图表
```

> **注意**：如果只传入一个数组 `plt.plot(y)`，Pyplot 会自动将它的索引 `[0, 1, 2, 3]` 作为 x 轴的坐标。

### 格式化字符串 (Fmt)

你可以用一个快捷字符串来同时设置**标记 (marker)**、**线型 (line)** 和 **颜色 (color)**，格式为 `fmt = '[marker][line][color]'`。

```python
plt.plot(x, y, 'o:r') # 圆圈标记，点线，红色
```

- **常用标记 (Marker)**: `'o'` (实心圆), `'.'` (点), `'*'` (星号), `'+'` (加号), `'s'` (正方形), `'^'` (上三角形)。
    
- **常用线型 (Line)**: `'-'` (实线), `'--'` (虚线), `':'` (点线), `'-.'` (点划线)。
    
- **常用颜色 (Color)**: `'r'` (红), `'g'` (绿), `'b'` (蓝), `'c'` (青), `'m'` (洋红), `'y'` (黄), `'k'` (黑), `'w'` (白)。
    

### 详细属性设置

除了格式化字符串，也可以显式声明属性：

```python
plt.plot(x, y, marker='o', markersize=10, markerfacecolor='r', linestyle='--', linewidth=2, color='blue')
```

---

## 3. 标签、标题与网格

为了让图表更具可读性，需要添加说明性的文字和辅助线。

### 轴标签与标题

```python
plt.xlabel("X轴名称", fontsize=12, color="blue")
plt.ylabel("Y轴名称")
plt.title("图表主标题", loc="center") # loc 可选: 'left', 'center', 'right'
```

### 网格线 `grid()`

```python
# 开启网格，axis='x'/'y'/'both' 控制方向
plt.grid(True, axis='both', color='gray', linestyle='--', linewidth=0.5)
```

---

## 4. 绘制多图 (Subplot)

`subplot()` 函数用于在同一窗口内绘制多个子图。它的参数通常是三个整数 `(nrows, ncols, index)`，分别代表行数、列数和当前子图的索引（从1开始）。

```python
# 创建 1行2列 的图表，当前激活第 1 个子图
plt.subplot(1, 2, 1)
plt.plot(x, y)
plt.title("图1")

# 激活第 2 个子图
plt.subplot(1, 2, 2)
plt.plot(y, x)
plt.title("图2")

plt.show()
```

> **快捷写法**：`plt.subplot(121)` 等同于 `plt.subplot(1, 2, 1)`。

---

## 5. 其他常用图表类型

除了折线图，Pyplot 还可以非常方便地绘制各种统计图表。

### 散点图 `scatter()`

用于观察两个变量之间的相关性。

```python
x = np.random.rand(50)
y = np.random.rand(50)
sizes = np.random.rand(50) * 100 # 气泡大小
colors = np.random.rand(50)      # 气泡颜色映射

plt.scatter(x, y, s=sizes, c=colors, alpha=0.5, cmap='viridis')
```

### 柱状图 `bar()` 和 `barh()`

用于对比不同类别的数据。

```python
categories = ['A', 'B', 'C', 'D']
values = [3, 8, 1, 10]

plt.bar(categories, values, color='skyblue', width=0.5) # 垂直柱状图
# plt.barh(categories, values, color='orange', height=0.5) # 水平条形图
```

### 饼图 `pie()`

用于展示部分占总体的比例。

```python
labels = ['苹果', '香蕉', '橙子', '葡萄']
sizes = [25, 30, 15, 30]
explode = (0, 0.1, 0, 0) # 突出显示第二个切片（香蕉）

plt.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%', shadow=True, startangle=90)
```

### 直方图 `hist()`

用于展示数据的分布情况。

```python
data = np.random.randn(1000) # 生成正态分布数据
plt.hist(data, bins=30, facecolor='g', alpha=0.75) # bins为柱子的数量
```

