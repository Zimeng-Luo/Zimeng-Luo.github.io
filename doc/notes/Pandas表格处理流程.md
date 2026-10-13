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
description: "以完整表格流程合并 Series、DataFrame、索引、清洗、分组与格式转换。"
---

# Pandas 数据处理：从读取、清洗到模型输入

Pandas 的价值是保留行列标签，并为数据清洗提供明确语义。先把表格整理正确，再转成模型需要的数组，比直接把全部数据压成矩阵更可靠。

## 从索引和列类型开始

`Series` 是带索引的一维数据，`DataFrame` 是共享行索引的多列数据，每列可以具有不同类型。不同 Series 运算常按标签自动对齐，而不是单纯按位置配对。

```python
import pandas as pd

df = pd.DataFrame({
    "name": ["A", "B", "B", "C"],
    "group": ["x", "x", "x", "y"],
    "score": [80., None, None, 90.],
})
print(df.head())
print(df.dtypes)
```

真实数据读取后先看 `head()`、`shape`、`info()` 和缺失值数量。数字样式的文本并不一定是数值类型，编号又可能需要保留前导零。

## loc 与 iloc 的边界不同

`loc` 按标签选取，标签切片通常包含终点；`iloc` 按位置选取，切片终点不包含。Series 也应显式使用这两种接口，不依赖不同版本对 `series[0]` 的隐含解释。

```python
valid = df.loc[df["score"].notna(), ["name", "score"]]
first_two = df.iloc[:2]
df.loc[df["name"] == "A", "score"] = 85
```

修改数据使用单次 `.loc` 索引，避免链式赋值。列筛选后还需确认拿到的是 Series 还是 DataFrame，以免后续形状不符。

## 清洗要有业务理由

```python
clean = df.drop_duplicates(subset=["name", "group"])
summary = clean.groupby("group", as_index=False).agg(
    mean_score=("score", "mean"),
    valid_count=("score", "count"),
)
```

去重先定义哪些字段代表同一记录。`dropna` 删除缺失值，`fillna` 填补缺失值；均值填充、0 填充都隐含业务假设，不应无条件用于所有列。`mean` 通常跳过缺失值，因此均值应与有效样本量一起报告。

| 任务 | 常用操作 |
| --- | --- |
| 类别频次 | `value_counts` |
| 值映射 | `map` |
| 改名称与排序 | `rename / sort_values` |
| 调整索引 | `set_index / reset_index` |
| 纵向拼接 | `concat` |
| 按键连接 | `merge` |

连接表格前检查键是否唯一，重复键可能把行数放大。已有向量化运算能解决时，优先使用它们而不是逐行 `apply`。

## 文件格式与索引保存

```python
loaded = pd.read_csv("records.csv", encoding="utf-8", dtype={"id": "string"})
loaded.to_csv("clean.csv", index=False, encoding="utf-8-sig")
```

只有确实需要保存索引时才输出索引。CSV 的编码和分隔符要与来源匹配，不应为乱码盲目切换编码。

Excel 用 `read_excel` / `to_excel`，选择 `sheet_name` 和 `usecols`；现代 `.xlsx` 常需要 `openpyxl` 等引擎。多个工作表一次写入使用 `ExcelWriter`，避免多次直接写同一路径而覆盖。

JSON 的 `orient` 定义结构，常用 `records` 产生对象列表；导出中文可用 `force_ascii=False`。读取与导出的结构约定要一致。

## 转 NumPy 前明确特征顺序

```python
features = df.loc[df["score"].notna(), ["score"]].to_numpy(dtype=float)
```

`to_numpy` 去掉行列标签，可能统一类型或复制数据，不是自动保证“纯数字且更快”。混合文本列可能得到 object 数组。模型边界应记录特征名、顺序、缺失值策略与形状。

一些模型可以直接接收 DataFrame，不必一律先转 NumPy。根据目标接口转换，保留数据语义直到确实不再需要标签时。
