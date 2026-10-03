---
title: 01 JSON.md 
date: 2026-09-02
categories: ["笔记", "编程", "Python"]
tags: ["Python", "编程"]
sidebar: false
---

# Python JSON

## 核心摘要

本篇用于查阅 Python 中 JSON 数据的序列化和反序列化，包括数据类型映射、`dumps()` / `loads()`、`dump()` / `load()` 以及格式化输出。

## 1. Python 与 JSON 数据类型映射

在进行数据转换前，必须了解 Python 数据类型和 JSON 数据类型之间的对应关系。这是解析成功的基础。

|**Python 数据类型**|**JSON 数据类型**|
|---|---|
|`dict` (字典)|`object` (对象，即 `{}`)|
|`list`, `tuple` (列表，元组)|`array` (数组，即 `[]`)|
|`str` (字符串)|`string` (字符串)|
|`int`, `float` (整数，浮点数)|`number` (数字)|
|`True` / `False` (布尔值)|`true` / `false`|
|`None` (空值)|`null`|

## 2. 内存中的转换：`dumps()` 与 `loads()`

这两个方法用于在**Python 对象（通常是字典）**和**JSON 字符串**之间进行转换。带有 `s` 后缀代表操作的是 String（字符串）。

- **`json.dumps(obj)`**: 将 Python 对象编码成 JSON 字符串（序列化）。
    
- **`json.loads(s)`**: 将 JSON 字符串解码为 Python 对象（反序列化）。
    

**代码示例与防坑指南：**

```python
import json

python_dict = {
    "name": "张三",
    "age": 30,
    "is_student": False,
    "skills": ["Python", "Data Analysis"],
    "car": None
}

# 1. Python 转 JSON 字符串 (dumps)
# 坑：如果不加 ensure_ascii=False，中文会被转义成 \uXXXX 格式的 ASCII 字符
json_str = json.dumps(python_dict, ensure_ascii=False)
print("转换后的 JSON 字符串:")
print(json_str)
print(type(json_str)) # 输出: <class 'str'>

# 2. JSON 字符串转 Python 字典 (loads)
parsed_dict = json.loads(json_str)
print("\n解析回来的 Python 字典:")
print(parsed_dict["name"]) # 输出: 张三
print(type(parsed_dict))   # 输出: <class 'dict'>
```

## 3. 文件读写转换：`dump()` 与 `load()`

这两个方法用于直接在**Python 对象**和**JSON 文件**之间进行读写。它们不需要带有 `s` 后缀。

- **`json.dump(obj, fp)`**: 将 Python 对象写入到 JSON 文件中。
    
- **`json.load(fp)`**: 从 JSON 文件中读取并解析为 Python 对象。
    

**代码示例：**

```python
import json

data = {"city": "北京", "temperature": 25.5}

# 1. 将数据写入 JSON 文件 (dump)
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
    print("数据已成功写入 data.json 文件")

# 2. 从 JSON 文件中读取数据 (load)
with open("data.json", "r", encoding="utf-8") as f:
    loaded_data = json.load(f)
    print("\n从文件中读取的数据:")
    print(loaded_data)
```

## 4. 格式化输出 (美化 JSON)

在打印或保存 JSON 数据时，默认输出是一整行紧凑的字符串，非常难以阅读。我们可以通过 `dumps()` 或 `dump()` 的参数来进行美化排版。

**核心美化参数：**

- **`indent`**: 设置缩进的空格数（通常设置为 4），让结构层级更清晰。
    
- **`sort_keys`**: 设置为 `True` 时，会按照字典的键（Key）进行字母排序。
    
- **`separators`**: 用于控制分隔符，默认是 `(', ', ': ')`。为了极致压缩体积，可以去掉后面的空格设为 `(',', ':')`。
    

**代码示例：**

```python
import json

data = {"b": 2, "a": 1, "c": 3}

# 使用 indent 缩进，并按键排序
pretty_json = json.dumps(data, indent=4, sort_keys=True)
print(pretty_json)
```

**输出结果：**

```json
{
    "a": 1,
    "b": 2,
    "c": 3
}
```

