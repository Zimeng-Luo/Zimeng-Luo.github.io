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
description: "Matplotlib Pyplot 基础、Matplotlib 常见图表、Matplotlib 其它工具、Matplotlib 细节调整的学习笔记。"
---

# Matplotlib 绘图：选择图表、控制样式与导出

## Matplotlib Pyplot 基础

### 1. 基础准备

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

### 2. 核心绘图函数 `plot()`

`plot()` 是最基本也是最常用的绘图函数，主要用于绘制**折线图**或**散点图**。

#### 基础用法

```python
x = np.array([1, 2, 3, 4])
y = np.array([1, 4, 9, 16])

plt.plot(x, y)
plt.show() # 显示图表
```

**注意**：如果只传入一个数组 `plt.plot(y)`，Pyplot 会自动将它的索引 `[0, 1, 2, 3]` 作为 x 轴的坐标。

#### 格式化字符串 (Fmt)

你可以用一个快捷字符串来同时设置**标记 (marker)**、**线型 (line)** 和 **颜色 (color)**，格式为 `fmt = '[marker][line][color]'`。

```python
plt.plot(x, y, 'o:r') # 圆圈标记，点线，红色
```

- **常用标记 (Marker)**: `'o'` (实心圆), `'.'` (点), `'*'` (星号), `'+'` (加号), `'s'` (正方形), `'^'` (上三角形)。
    
- **常用线型 (Line)**: `'-'` (实线), `'--'` (虚线), `':'` (点线), `'-.'` (点划线)。
    
- **常用颜色 (Color)**: `'r'` (红), `'g'` (绿), `'b'` (蓝), `'c'` (青), `'m'` (洋红), `'y'` (黄), `'k'` (黑), `'w'` (白)。
    

#### 详细属性设置

除了格式化字符串，也可以显式声明属性：

```python
plt.plot(x, y, marker='o', markersize=10, markerfacecolor='r', linestyle='--', linewidth=2, color='blue')
```

---

### 3. 标签、标题与网格

为了让图表更具可读性，需要添加说明性的文字和辅助线。

#### 轴标签与标题

```python
plt.xlabel("X轴名称", fontsize=12, color="blue")
plt.ylabel("Y轴名称")
plt.title("图表主标题", loc="center") # loc 可选: 'left', 'center', 'right'
```

#### 网格线 `grid()`

```python
# 开启网格，axis='x'/'y'/'both' 控制方向
plt.grid(True, axis='both', color='gray', linestyle='--', linewidth=0.5)
```

---

### 4. 绘制多图 (Subplot)

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

**快捷写法**：`plt.subplot(121)` 等同于 `plt.subplot(1, 2, 1)`。

---

### 5. 其他常用图表类型

除了折线图，Pyplot 还可以非常方便地绘制各种统计图表。

#### 散点图 `scatter()`

用于观察两个变量之间的相关性。

```python
x = np.random.rand(50)
y = np.random.rand(50)
sizes = np.random.rand(50) * 100 # 气泡大小
colors = np.random.rand(50)      # 气泡颜色映射

plt.scatter(x, y, s=sizes, c=colors, alpha=0.5, cmap='viridis')
```

#### 柱状图 `bar()` 和 `barh()`

用于对比不同类别的数据。

```python
categories = ['A', 'B', 'C', 'D']
values = [3, 8, 1, 10]

plt.bar(categories, values, color='skyblue', width=0.5) # 垂直柱状图
# plt.barh(categories, values, color='orange', height=0.5) # 水平条形图
```

#### 饼图 `pie()`

用于展示部分占总体的比例。

```python
labels = ['苹果', '香蕉', '橙子', '葡萄']
sizes = [25, 30, 15, 30]
explode = (0, 0.1, 0, 0) # 突出显示第二个切片（香蕉）

plt.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%', shadow=True, startangle=90)
```

#### 直方图 `hist()`

用于展示数据的分布情况。

```python
data = np.random.randn(1000) # 生成正态分布数据
plt.hist(data, bins=30, facecolor='g', alpha=0.75) # bins为柱子的数量
```

---

## Matplotlib 常见图表

### 1. Matplotlib 散点图 (Scatter Plot)

散点图主要用于观察和显示两个变量之间的相关性或分布趋势。通过调整点的大小和颜色，散点图还可以展示三维甚至四维数据。

**核心函数与参数：**

- **`plt.scatter(x, y)`**
    
- **`s`**: 散点的大小 (size)，可以是标量，也可以是与 `x` 长度相同的数组。
    
- **`c`**: 散点的颜色 (color)，可以是单一颜色，也可以是颜色序列，常配合 `cmap` 使用。
    
- **`alpha`**: 透明度，0（完全透明）到 1（完全不透明）之间的浮点数。
    
- **`cmap`**: 颜色映射（Colormap），当 `c` 是浮点数数组时，用于将数值映射为颜色。
    

**代码示例：**

```python
import matplotlib.pyplot as plt
import numpy as np

# 生成随机数据
x = np.random.randn(100)
y = np.random.randn(100)
colors = np.random.rand(100) # 随机颜色映射值
sizes = 1000 * np.random.rand(100) # 随机大小

plt.scatter(x, y, c=colors, s=sizes, alpha=0.5, cmap='viridis')
plt.colorbar() # 显示颜色条
plt.title("Scatter Plot Example")
plt.show()
```

### 2. Matplotlib 柱形图 (Bar Chart)

柱形图用于显示分类数据的对比情况，长条的高度表示各类别的数值大小。

**核心函数与参数：**

- **`plt.bar(x, height)`**: 绘制垂直柱形图。
    
- **`plt.barh(y, width)`**: 绘制水平条形图。
    
- **`width`**: 柱子的宽度（默认 0.8）。
    
- **`color`**: 柱子的颜色。
    
- **`bottom`**: 柱子的起始 y 坐标，用于绘制**堆叠柱状图**。
    

**代码示例：**

```python
import matplotlib.pyplot as plt
import numpy as np

categories = ['A', 'B', 'C', 'D']
values = [15, 30, 45, 10]

# 垂直柱形图
plt.bar(categories, values, color=['#4CAF50', 'blue', 'red', 'orange'], width=0.6)

# 在柱子上添加具体的数值标签
for i in range(len(categories)):
    plt.text(i, values[i] + 1, str(values[i]), ha='center')

plt.title("Bar Chart Example")
plt.show()
```

### 3. Matplotlib 饼图 (Pie Chart)

饼图用于显示各项数据在总和中所占的比例。

**核心函数与参数：**

- **`plt.pie(x)`**: `x` 是数据数组，表示每个扇形的面积。
    
- **`labels`**: 每个扇形的标签。
    
- **`colors`**: 颜色列表。
    
- **`explode`**: 一个数组，指定每个扇形偏离圆心的距离，常用于突出显示某个特定部分。
    
- **`autopct`**: 格式化字符串或函数，用于在扇形内部显示百分比数值（如 `'%1.1f%%'` 保留一位小数）。
    
- **`shadow`**: 是否显示阴影（布尔值）。
    
- **`startangle`**: 饼图的起始绘制角度（如 90 表示从正上方开始）。
    

**代码示例：**

```python
import matplotlib.pyplot as plt

sizes = [15, 30, 45, 10]
labels = ['Frogs', 'Hogs', 'Dogs', 'Logs']
colors = ['yellowgreen', 'gold', 'lightskyblue', 'lightcoral']
explode = (0, 0.1, 0, 0)  # 仅突出显示第二个区块 'Hogs'

plt.pie(sizes, explode=explode, labels=labels, colors=colors, 
        autopct='%1.1f%%', shadow=True, startangle=90)

plt.axis('equal')  # 确保饼图是正圆形，而不是椭圆
plt.title("Pie Chart Example")
plt.show()
```

### 4. Matplotlib 直方图 (Histogram)

直方图用于展示连续数据的频率分布情况。它将数据范围划分为若干个连续的区间（bins），并统计每个区间内包含的数据个数。

**核心函数与参数：**

- **`plt.hist(x)`**: `x` 是一维数据数组。
    
- **`bins`**: 直方图的柱数（整数），或自定义的区间边界数组。默认为 10。
    
- **`density`**: 如果为 `True`，则返回概率密度而不是具体的频数。
    
- **`facecolor` / `color`**: 柱子的填充颜色。
    
- **`alpha`**: 透明度。
    

**代码示例：**

```python
import matplotlib.pyplot as plt
import numpy as np

# 生成 1000 个服从标准正态分布的随机数
data = np.random.randn(1000)

# 绘制直方图，将数据分为 30 个区间
plt.hist(data, bins=30, facecolor='blue', alpha=0.7, edgecolor='black')

plt.title("Histogram Example")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.show()
```

---

## Matplotlib 其它工具

### 1. Matplotlib 绘制多图 (Subplots)

当需要在一个画布（Figure）上对比展示多组数据时，多图绘制功能必不可少。Matplotlib 提供了 `subplot()` 和 `subplots()` 两种常用方法。

**核心方法：**

- **`plt.subplot(nrows, ncols, index)`**: 在全局画布上划分网格并激活特定子图。参数分别代表行数、列数和当前激活的索引（从左到右，从上到下，从 1 开始）。简写如 `plt.subplot(221)` 代表 2x2 网格的第 1 个子图。
    
- **`plt.subplots(nrows, ncols)`**: 一次性创建画布和所有子图对象（Axes），返回 `fig` 和 `axes` 数组。这是一种更加面向对象的写法，适合进行更复杂的精细控制。
    

**代码示例：**

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.array([0, 1, 2, 3])

# 创建 1 行 2 列的图表

# 激活第 1 个图
plt.subplot(1, 2, 1)  
plt.plot(x, x**2, color='blue')
plt.title("Plot 1")

# 激活第 2 个图
plt.subplot(1, 2, 2)  
plt.plot(x, x**3, color='red')
plt.title("Plot 2")

# 自动调整子图参数，防止标签或标题重叠
plt.tight_layout() 
plt.show()
```

### 2. Matplotlib `imread()` 方法

该方法用于读取图像文件，并将其转换为可以进行数学运算的 NumPy 数组格式。读取后的数据通常是三维的 RGB/RGBA 数组（高度 x 宽度 x 颜色通道），或者二维的灰度数组。

**核心语法：**

- **`plt.imread(fname, format=None)`** （也可以通过 `matplotlib.image.imread` 调用）
    
- **`fname`**: 图像文件的路径。
    

**代码示例：**

```python
import matplotlib.pyplot as plt

# 读取当前目录下的 image.jpg
img_array = plt.imread('image.jpg')

# 查看数组形状 (高度, 宽度, 通道数)
# 例如返回 (480, 640, 3) 代表 480x640 的彩色图
print(img_array.shape) 
```

### 3. Matplotlib `imshow()` 方法

`imshow()` 用于将数据渲染为图像并显示出来。它既可以显示由 `imread` 读取的真实图片，也非常适合将二维的数学矩阵（如热力图、相关性矩阵）以颜色的形式可视化。

**核心参数：**

- **`X`**: 图像数据（二维或三维 NumPy 数组）。
    
- **`cmap`**: 颜色映射（Colormap）。在显示单通道（灰度）图像或二维矩阵时非常有用，常用值如 `'gray'`（灰度）, `'viridis'`（默认渐变色）, `'hot'`（热力图）等。
    

**代码示例：**

```python
import matplotlib.pyplot as plt
import numpy as np

# 1. 显示读取的真实图片
# img_array = plt.imread('image.jpg')
# plt.imshow(img_array)
# plt.axis('off') # 显示图片时通常隐藏坐标轴

# 2. 显示矩阵热力图
data_matrix = np.random.rand(10, 10) # 生成 10x10 的随机矩阵
plt.imshow(data_matrix, cmap='hot')  # 使用 'hot' 颜色映射
plt.colorbar()                       # 在旁边添加颜色条说明
plt.title("Matrix Heatmap")

plt.show()
```

### 4. Matplotlib `imsave()` 方法

将 NumPy 数组直接保存为本地图像文件。常用于对图像数组进行处理（如裁剪、加滤镜、矩阵计算）后的快速保存。

**核心语法：**

- **`plt.imsave(fname, arr, cmap=None, format=None)`** （也可以通过 `matplotlib.image.imsave` 调用）
    
- **`fname`**: 保存的路径和文件名（如 `'output.png'`）。
    
- **`arr`**: 要保存的数组数据。
    

**代码示例：**

```python
import matplotlib.pyplot as plt
import numpy as np

# 创建一个简单的渐变二维数组
x = np.linspace(0, 1, 100)
y = np.linspace(0, 1, 100)
X, Y = np.meshgrid(x, y)
Z = X**2 + Y**2  # 生成一个 100x100 的二维矩阵

# 将这个二维矩阵使用 viridis 颜色映射保存为 png 图片
plt.imsave('gradient_output.png', Z, cmap='viridis')
```

---

## Matplotlib 细节调整

### 1. Matplotlib 绘图标记 (Markers)

在绘制折线图或散点图时，可以通过设置 `marker` 参数来突出显示数据点。

**核心参数与简写：**

- **`marker`**: 标记形状（如 `'o'` 实心圆, `'*'` 星号, `'s'` 正方形, `'D'` 菱形, `'.'` 点）。
    
- **`markersize` 或 `ms`**: 标记的大小。
    
- **`markeredgecolor` 或 `mec`**: 标记边缘的颜色。
    
- **`markerfacecolor` 或 `mfc`**: 标记内部的填充颜色。
    

**代码示例：**

```python
import matplotlib.pyplot as plt
import numpy as np

y = np.array([3, 8, 1, 10])

# 使用 o 标记，大小为 20，边缘为红色，内部填充为黄色
plt.plot(y, marker='o', ms=20, mec='r', mfc='y')
plt.show()
```

### 2. Matplotlib 绘图线 (Lines)

你可以自定义折线的样式、颜色和宽度，使其在多条线同图时更具区分度。

**核心参数与简写：**

- **`linestyle` 或 `ls`**: 线的样式。
    
    - `'-'` 或 `'solid'` (实线，默认)
        
    - `':'` 或 `'dotted'` (点线)
        
    - `'--'` 或 `'dashed'` (虚线)
        
    - `'-.'` 或 `'dashdot'` (点划线)
        
- **`color` 或 `c`**: 线的颜色。可以使用颜色首字母（如 `'r'`, `'g'`, `'b'`）、颜色全称（如 `'hotpink'`）或十六进制代码（如 `'#4CAF50'`）。
    
- **`linewidth` 或 `lw`**: 线的宽度（浮点数，默认为 1.5）。
    

**代码示例：**

```python
y1 = np.array([3, 8, 1, 10])
y2 = np.array([6, 2, 7, 11])

# 自定义线型、颜色和宽度
plt.plot(y1, linestyle='dashed', color='#4CAF50', linewidth=3.5)
# 简写形式
plt.plot(y2, ls=':', c='r', lw=2)

plt.show()
```

### 3. Matplotlib 轴标签和标题 (Labels & Titles)

清晰的标题和坐标轴说明是专业图表的标配。你可以通过 `fontdict` 字典参数深度定制文字的外观。

**核心函数与参数：**

- **`plt.xlabel()` / `plt.ylabel()`**: 设置 X 轴和 Y 轴的标签。
    
- **`plt.title()`**: 设置图表的主标题。
    
    - `loc` 参数设置标题位置：`'left'`, `'center'` (默认), `'right'`。
        
- **`fontdict`**: 字体属性字典，用于统一设置 `family` (字体), `color` (颜色), `weight` (粗细), `size` (大小)。
    

**代码示例：**

```python
x = np.array(["A", "B", "C", "D"])
y = np.array([10, 20, 15, 25])

plt.plot(x, y)

# 定义两套不同的字体样式
font1 = {'family':'serif', 'color':'blue', 'size':20}
font2 = {'family':'sans-serif', 'color':'darkred', 'size':15}

# 应用标题和标签
plt.title("Sales Data 2023", fontdict=font1, loc='left')
plt.xlabel("Category", fontdict=font2)
plt.ylabel("Revenue", fontdict=font2)

plt.show()
```

### 4. Matplotlib 网格线 (Grid)

网格线有助于阅读者更准确地估算图表中数据点的值。

**核心函数与参数：**

- **`plt.grid()`**: 开启网格线。
    
- **`axis`**: 指定显示哪个方向的网格线。
    
    - `'both'` (默认，显示 X 和 Y 轴网格)
        
    - `'x'` (仅显示垂直网格线)
        
    - `'y'` (仅显示水平网格线)
        
- **样式参数**: 可以像设置线条一样设置网格的 `color`, `linestyle` (`ls`), `linewidth` (`lw`)。
    

**代码示例：**

```python
y = np.array([3, 8, 1, 10])
plt.plot(y)

# 仅显示 Y 轴（水平方向）的网格，设置为绿色虚线，宽度为 0.5
plt.grid(axis='y', color='green', linestyle='--', linewidth=0.5)

plt.show()
```
