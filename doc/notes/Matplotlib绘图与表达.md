---
title: "Matplotlib 绘图：选择图表、控制样式与导出"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 数据可视化
  - 结果表达
coverImg: /blog/bg21.jpg
sidebar: false
description: "把绘图 API 整合为选图、建图、标注、检查和保存的完整流程。"
---

# Matplotlib 绘图：选择图表、控制样式与导出

图表的第一步是确定要表达的关系，而不是决定颜色。趋势、类别差异、分布和空间结构需要不同图形；坐标轴、单位和统计口径也应一起明确。

## 按问题选择图形

| 问题 | 图形 | 使用注意 |
| --- | --- | --- |
| 随时间或连续自变量变化 | 折线图 | 连接顺序有含义 |
| 两变量关联 | 散点图 | 关联不等于因果 |
| 比较类别 | 柱形图 | 高度和基准线要一致 |
| 查看分布 | 直方图 | 分箱数量会影响观察 |
| 部分占整体 | 饼图 | 类别少且总量明确时使用 |
| 查看矩阵或图像 | 热力图 / imshow | 颜色刻度需说明 |

## 使用 Figure 与 Axes 组织多图

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 1, 50)
fig, axes = plt.subplots(1, 2, figsize=(8, 3), constrained_layout=True)
axes[0].plot(x, x**2, color="#2166ac", linewidth=2, label="x²")
axes[0].set(xlabel="x", ylabel="y", title="Curve")
axes[0].legend()
axes[0].grid(axis="y", alpha=0.3)
axes[1].hist(x**2, bins=8, edgecolor="white")
axes[1].set(xlabel="value", ylabel="count", title="Distribution")
fig.savefig("summary.png", dpi=200)
plt.close(fig)
```

对象式接口让每个操作归属明确，比频繁依赖“当前图”更适合多图。`subplot` 索引从 1 开始，`subplots` 返回整组 Axes；只生成一个 Axes 时返回结构不同，编写通用代码时需注意。

## 样式要帮助比较

`marker` 表示样本点，`linestyle` 表示连接方式，`color`、`linewidth` 控制区分度。线型和标记可以与颜色共同编码，避免读者只能依靠颜色识别。

散点的 `s` 是面积尺度，不是半径；`c` 为数值时可配合 `cmap` 与颜色条。柱形图可以用 `bottom` 堆叠，但堆叠后的中间部分不易比较，必要时改用并排柱。

直方图 `density=True` 表示密度，柱高不一定加起来等于 1；应是“高度乘分箱宽度”的总面积为 1。不要把频数与密度的纵轴混用。

## 中文字体先确认可用

```python
plt.rcParams["font.sans-serif"] = ["Noto Sans CJK SC"]
```

这只是配置示例，前提是系统已安装该字体。Windows 常见 SimHei，其他平台不同，不能仅设置名字就保证成功。若确有 Unicode 负号缺字，可调整 `axes.unicode_minus`；更根本的是选择覆盖所需字符的字体。

## 图像数据与整张图导出

`imread` 返回图像数组，灰度常为二维，RGB/RGBA 常为三维。PNG 与其他格式的读取结果可能具有不同 dtype 与数值范围，计算前检查它们。

```python
matrix = np.arange(9).reshape(3, 3)
fig, ax = plt.subplots()
image = ax.imshow(matrix, cmap="viridis")
fig.colorbar(image, ax=ax, label="value")
fig.savefig("heatmap.svg")
plt.close(fig)
```

`savefig` 保存包含坐标轴、标题等的整张图；`imsave` 保存数组对应的图像。定量比较多张热力图时，统一 `vmin/vmax`，否则相同颜色可能代表不同数值。

导出前核对轴标签与单位、颜色条、图例、缺失数据、分箱和坐标范围。无图形界面的服务器可使用非交互后端保存文件，不需要依赖 `show()` 弹窗。
