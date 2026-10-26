---
title: "Pandas 数据处理：从读取、清洗到模型输入"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 数据分析
  - 数据质量
coverImg: /blog/bg20.jpg
sidebar: false
description: "Pandas 与 NumPy 混用、Pandas 常用函数、Pandas 核心数据结构、Pandas 数据文件读写的学习笔记。"
---

# Pandas 数据处理：从读取、清洗到模型输入

## Pandas 与 NumPy 混用

### 1. 什么时候不需要转成 NumPy？

如果你在做以下事情，请直接使用 Pandas，它的效率已经极高，且操作更人性化：

1. **数据清洗与整理**：处理缺失值 (`fillna`)、删除重复项 (`drop_duplicates`)、过滤特定行。
    
2. **表格操作**：两张表的合并 (`merge`)、数据追加 (`concat`)。
    
3. **统计与数据透视**：按部门分组求平均值 (`groupby`)、统计某个值出现的频次 (`value_counts`)。
    
4. **数据导入导出**：读取或保存为 Excel、CSV、JSON 等文件。
    

**留在 Pandas 的好处**：你有“列名”和“行标签”，不容易搞错数据。一旦转成 NumPy，所有数据都会变成纯粹的数字矩阵，你将无法通过 `'姓名'`、`'年龄'` 这样的列名来提取数据，只能依靠第 0 列、第 1 列这样的数字索引。

### 2. 什么时候需要转成 NumPy？

1. **对接机器学习/深度学习库（最常见场景）**
    
    - 像 **Scikit-learn**（经典机器学习）、**TensorFlow** 或 **PyTorch**（深度学习）等框架，很多算法底层并不认识 Pandas 的列名和索引。
        
    - 当你准备把清洗好的数据“喂”给算法模型去训练时，通常需要剥离掉 Pandas 的外壳，转换成纯净的 NumPy 数组（张量）。
        
2. **追求极致的纯数学/矩阵运算速度**
    
    - Pandas 因为维护了索引和灵活的数据类型，会有少许的性能开销。如果你要做非常密集且大规模的数学运算（比如复杂的矩阵乘法、线性代数求解），纯 NumPy 数组的运行速度会比 DataFrame 快。
        
3. **使用专门针对 NumPy 开发的科学计算库**
    
    - 比如某些处理图像 (OpenCV) 或信号处理 (SciPy) 的底层函数，它们在设计之初就只接收 NumPy 数组作为参数。
        

### 3. 如何将 Pandas 转换成 NumPy？

如果你确定需要转换，Pandas 提供了非常便捷的接口。

**强烈推荐使用 `to_numpy()` 方法：**

```python
import pandas as pd

# 假设你有一个 DataFrame
data = {'年龄': [25, 30, 35], '薪水': [8000, 12000, 15000]}
df = pd.DataFrame(data)

# ---------------------------------------------
# 1. 将整个 DataFrame 转为 NumPy 数组 (二维矩阵)
# ---------------------------------------------
numpy_matrix = df.to_numpy()
print(numpy_matrix)
# 输出:
# [[   25  8000]
#  [   30 12000]
#  [   35 15000]]

# ---------------------------------------------
# 2. 将单独某一列 (Series) 转为 NumPy 数组 (一维向量)
# ---------------------------------------------
age_array = df['年龄'].to_numpy()
print(age_array)
# 输出: [25 30 35]

```

管家补充：

在以前的旧代码中，你可能会经常看到别人用 `df.values` 来进行转换（比如 `numpy_matrix = df.values`）。虽然现在它依然能用，但 Pandas 官方**强烈建议改用 `to_numpy()`**。因为 `to_numpy()` 更安全，且在处理表格中混合了不同数据类型（比如同时有字符串和数字）时，表现得更好。

---

## Pandas 常用函数

### 1. 探查数据

当你刚读取完一个 Excel 或 CSV 文件，变成 DataFrame 后，第一步就是看看它长什么样。

|**函数 / 属性**|**作用说明**|**代码示例**|
|---|---|---|
|**`df.head(n)`**|查看前 n 行数据（默认5行），用于快速预览。|`df.head()`|
|**`df.tail(n)`**|查看后 n 行数据，常用于检查数据末尾是否有异常。|`df.tail(3)`|
|**`df.info()`**|**超级常用！** 打印表的基本信息：行数列数、每列数据类型、是否有空值、内存占用。|`df.info()`|
|**`df.describe()`**|快速计算数值列的统计摘要（均值、标准差、最大/最小值、分位数）。|`df.describe()`|
|**`df.shape`**|(属性) 返回一个元组 `(行数, 列数)`，快速知道表有多大。|`df.shape`|
|**`df.dtypes`**|(属性) 查看每一列的数据类型（整数、浮点数、字符串等）。|`df.dtypes`|

### 2. 数据清洗

实际工作中的数据往往带有缺失值（NaN）或重复值，这就需要用到清洗函数。

|**函数**|**作用说明**|**代码示例**|
|---|---|---|
|**`df.isnull()`**|检查所有单元格是否为空值，返回全表的布尔值(True/False)。|`df.isnull().sum()` (统计每列空值数量)|
|**`df.dropna()`**|删除包含空值的**行**或**列**。|`df.dropna(axis=0)` (删行)|
|**`df.fillna()`**|用指定的值去填补空值（例如填0，或者填均值）。|`df.fillna(0)` (全表空值填0)|
|**`df.drop_duplicates()`**|删除完全重复的行，保证数据唯一性。|`df.drop_duplicates()`|
|**`df.replace()`**|将表中的某个值替换为另一个值。|`df.replace('男', 'M')`|

### 3. 数据筛选与切片

从庞大的表格中精准定位到你需要的行和列。

| **函数 / 方法**      | **作用说明**                   | **代码示例**                             |
| ---------------- | -------------------------- | ------------------------------------ |
| **`df.loc[]`**   | 基于**标签（名称）**进行行列选择。可以搭配条件。 | `df.loc[0:5, ['姓名', '年龄']]`          |
| **`df.iloc[]`**  | 基于**数字位置（索引）**进行行列选择。      | `df.iloc[0:5, 0:2]` (选前5行前2列)        |
| **`df.isin()`**  | 过滤出某列包含在特定列表里的行。           | `df[df['城市'].isin(['北京', '上海'])]`    |
| **`df.query()`** | 用字符串表达式来筛选数据，语法非常直观。       | `df.query("年龄 > 18 and 城市 == '北京'")` |

### 4. 数据修改与重塑

经常需要增加新列、删除废弃列、或者给列改名。

|**函数**|**作用说明**|**代码示例**|
|---|---|---|
|**`df.rename()`**|修改列名或行索引名。|`df.rename(columns={'旧名': '新名'})`|
|**`df.drop()`**|删除指定的行或列。|`df.drop(columns=['不需要的列'])`|
|**`df.sort_values()`**|按照某一列或多列的值进行排序。|`df.sort_values(by='年龄', ascending=False)`|
|**`df.set_index()`**|将某一列设置为行的索引（例如把“身份证号”设为索引）。|`df.set_index('身份证号')`|
|**`df.reset_index()`**|取消当前索引，将其还原为普通的列，并生成默认数字索引。|`df.reset_index()`|

### 5. 高阶数据处理与统计

这部分是 Pandas 分析数据的核心能力，取代 Excel 的数据透视表。

|**函数**|**作用说明**|**代码示例**|
|---|---|---|
|**`df['列'].value_counts()`**|**超级常用！** 统计某一列中各个唯一值出现的次数。|`df['性别'].value_counts()`|
|**`df.groupby()`**|分组函数。按某一列的值进行分组，常搭配聚合函数使用。|`df.groupby('部门').mean()` (求各部门平均值)|
|**`df.apply()`**|对 DataFrame 的每一列或行应用一个自定义函数。|`df['薪水'].apply(lambda x: x * 1.1)`|
|**`df['列'].map()`**|根据字典映射，将一列中的值替换为另一个值。|`df['性别'].map({'男': 1, '女': 0})`|
|**`df.agg()`**|聚合操作，允许对不同的列执行不同的统计函数。|`df.agg({'年龄': 'mean', '薪水': 'max'})`|

管家补充：

在学习这些函数时，不要只看文档，**一定要重点掌握 `info()`, `dropna()`, `loc[]`, `value_counts()` 和 `groupby()`**。这 5 个函数能解决日常 80% 的数据处理需求。

---

## Pandas 核心数据结构

### 1. Pandas Series (一维数据)

**Series** 是一种类似于一维数组的对象，它由一组数据（各种 Numpy 数据类型）以及一组与之相关的数据标签（即索引）组成。

#### 1.1 基本结构

- **Data**: 实际存储的数据（整数、字符串、浮点数、Python 对象等）。
    
- **Index**: 数据的标签，默认是从 0 开始的整数，也可以自定义。
    

#### 1.2 创建方式

```python
import pandas as pd

# 1. 从列表创建 (默认索引)
s1 = pd.Series([1, 2, 3]) 

# 2. 指定索引
s2 = pd.Series([1, 2, 3], index=["x", "y", "z"], name="示例")

# 3. 从字典创建 (字典的键自动成为索引)
sites = {1: "Google", 2: "Runoob", 3: "Wiki"}
s3 = pd.Series(sites)
```

#### 1.3 核心特点

- **索引访问**: 可以通过索引名称 `s2['x']` 或位置 `s2[0]` 访问。
    
- **向量化操作**: 可以像 Numpy 一样进行数学运算（如 `s1 * 2`），索引会自动对齐。
    
- **切片**: 支持 `s2['x':'z']`（包含末尾）或 `s2[0:2]`（不包含末尾）。
    

### 2. Pandas DataFrame (二维数据)

**DataFrame** 是一个表格型的数据结构，它含有一组有序的列，每列可以是不同的值类型。DataFrame 既有行索引（index）也有列索引（columns）。

#### 2.1 基本结构

- **Index**: 行索引，代表每一行。
    
- **Columns**: 列索引，代表每一列的名字。
    
- **Values**: 实际的二维数据矩阵。
    
- **本质**: DataFrame 可以看作是由多个 **Series** 组成的字典，这些 Series 共用同一个 Index。
    

#### 2.2 创建方式

```python
# 1. 从列表组成的字典创建 (最常用)
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}
df = pd.DataFrame(data, index=["day1", "day2", "day3"])

# 2. 从字典组成的列表创建
data = [{'a': 1, 'b': 2}, {'a': 5, 'b': 10, 'c': 20}]
df = pd.DataFrame(data) # 缺失值会自动补 NaN
```

#### 2.3 常用操作属性

- `df.loc[label]`: 根据**行标签**选取数据。
    
- `df.iloc[position]`: 根据**整数位置**选取数据。
    
- `df.columns`: 获取所有列名。
    
- `df.index`: 获取行索引。
    
- `df.T`: 转置（行列互换）。
    

### 3. Series 与 DataFrame 的关系

1. **构成关系**: DataFrame 的每一列单独拿出来就是一个 Series。
    
2. **维度关系**: Series 是 1D（一维），DataFrame 是 2D（二维）。
    
3. **索引共享**: DataFrame 中的所有 Series（列）都共享同一套行索引。
    

### 4. 学习要点总结

- **Series** = 索引 + 一维数组。
    
- **DataFrame** = 多个 Series 的集合（共用行索引）。
    
- **索引 (Index)** 是 Pandas 的灵魂，它是数据对齐和快速检索的核心。
    
- 处理 `.xlsx` 或 `.csv` 时，数据会被自动加载为 **DataFrame** 结构。

---

## Pandas 数据文件读写

### 1. Pandas 与 CSV 文件操作

CSV (Comma-Separated Values，逗号分隔值) 是数据分析中最常用的纯文本格式，体积小且通用性极强。

#### 1.1 读取 CSV 文件：`pd.read_csv()`

这是你以后每天都会用到的函数。

```python
import pandas as pd

# 最基础的读取
df = pd.read_csv('data.csv')

# --- 进阶常用参数 ---
# 1. encoding: 解决中文乱码问题 (常见于 Windows 生成的 csv)
df = pd.read_csv('data.csv', encoding='gbk') # 或 'utf-8'

# 2. sep/delimiter: 如果你的文件不是用逗号分隔（比如用制表符 \t 分隔）
df = pd.read_csv('data.csv', sep='\t')

# 3. header: 指定哪一行作为列名 (默认 header=0，即第一行)
# 如果数据本身没有列名，需要加上 header=None
df = pd.read_csv('data.csv', header=None, names=['列A', '列B', '列C'])

# 4. index_col: 指定某一列作为 DataFrame 的行索引
df = pd.read_csv('data.csv', index_col='id')

# 5. nrows: 数据太大时，只读取前 N 行进行测试
df = pd.read_csv('data.csv', nrows=100)
```

#### 1.2 导出 CSV 文件：`df.to_csv()`

将处理好的 DataFrame 保存为 CSV 文件。

```python
# 基础保存
df.to_csv('output.csv')

# 💡 黄金提示：强烈建议加上 index=False！
# 否则 Pandas 会把你 DataFrame 最左侧的 0,1,2,3... 行索引也当成一列存进文件里
df.to_csv('output.csv', index=False, encoding='utf-8-sig') 
# 注：包含中文时，用 utf-8-sig 可以避免用 Excel 打开时变成乱码
```

### 2. Pandas 与 Excel 文件操作

正如我们之前讨论的，处理 Excel (`.xlsx` 或 `.xls`) 是日常办公自动化的核心。底层依赖 `openpyxl` 或 `xlrd`。

#### 2.1 读取 Excel 文件：`pd.read_excel()`

```python
# 基础读取 (默认读取第一个工作表 Sheet)
df = pd.read_excel('data.xlsx')

# --- 进阶常用参数 ---
# 1. sheet_name: 读取特定的工作表 (可以传名称或索引)
df_sheet2 = pd.read_excel('data.xlsx', sheet_name='销售数据')
df_sheet3 = pd.read_excel('data.xlsx', sheet_name=2) # 第三个sheet

# 读取所有 Sheet (返回一个字典，键是 sheet 名，值是 DataFrame)
all_sheets = pd.read_excel('data.xlsx', sheet_name=None)

# 2. usecols: 只读取需要的列 (比如只读 A 到 C 列)
df = pd.read_excel('data.xlsx', usecols="A:C") # 或 usecols=['姓名', '年龄']
```

#### 2.2 导出 Excel 文件：`df.to_excel()`

```python
# 基础保存 (同样建议去掉索引)
df.to_excel('output.xlsx', index=False)

# 保存并指定工作表名称
df.to_excel('output.xlsx', sheet_name='2023年汇总', index=False)

# ⚠️ 注意：如果你需要把多个 DataFrame 存入同一个 Excel 的不同 Sheet 中，
# 不能直接多次调用 to_excel (会覆盖文件)，需要使用 ExcelWriter：
with pd.ExcelWriter('multi_sheets.xlsx') as writer:
    df1.to_excel(writer, sheet_name='Sheet1')
    df2.to_excel(writer, sheet_name='Sheet2')
```

### 3. Pandas 与 JSON 文件操作

JSON (JavaScript Object Notation) 常见于 Web 爬虫抓取的数据或系统 API 接口返回的数据。结构类似于 Python 的字典和列表嵌套。

#### 3.1 读取 JSON 文件：`pd.read_json()`

```python
# 基础读取本地 JSON 文件
df = pd.read_json('data.json')

# 直接读取网络上的 JSON 数据 (极度方便！)
url = 'https://api.example.com/data.json'
df = pd.read_json(url)

# --- 进阶：应对不同的 JSON 结构 ---
# JSON 数据可能千奇百怪，Pandas 通过 'orient' 参数来适配：
# 最常见的两种 orient:
# 1. orient='records' (最标准：[{"a": 1, "b": 2}, {"a": 3, "b": 4}])
# 2. orient='index' (以行索引为键：{"row1": {"a": 1}, "row2": {"a": 3}})
df = pd.read_json('data.json', orient='records')
```

#### 3.2 导出 JSON 文件：`df.to_json()`

```python
# 导出为 JSON 字符串或文件
df.to_json('output.json')

# 💡 常用参数配置：
# 1. orient='records' 通常是生成前端或其他系统最容易解析的格式
# 2. force_ascii=False 确保中文字符不被转码为 Unicode (如 \uXXXX)
df.to_json('output.json', orient='records', force_ascii=False)
```

### 4. 核心速查表

为了方便你日后查阅，这里总结了三大格式的核心读写对应关系：

|**数据格式**|**读取函数 (输入)**|**导出函数 (输出)**|**最重要的避坑参数**|
|---|---|---|---|
|**CSV**|`pd.read_csv()`|`df.to_csv()`|`encoding` (乱码), `index=False`|
|**Excel**|`pd.read_excel()`|`df.to_excel()`|`sheet_name` (选表), `index=False`|
|**JSON**|`pd.read_json()`|`df.to_json()`|`orient` (结构), `force_ascii=False`|
