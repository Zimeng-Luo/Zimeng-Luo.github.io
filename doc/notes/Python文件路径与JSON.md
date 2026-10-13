---
title: "Python 文件处理：路径、文本与 JSON"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 数据持久化
  - 脚本自动化
coverImg: /blog/bg16.jpg
sidebar: false
description: "区分路径操作和内容读写，掌握编码、文件模式、缓冲与 JSON 类型边界。"
---

# Python 文件处理：路径、文本与 JSON

读写文件时先区分路径和内容。路径决定文件在哪，模式决定是否创建或覆盖，编码决定文本如何与字节转换。JSON 再把结构化对象转换为可交换的文本。

## 路径不依赖手动拼接斜杠

```python
from pathlib import Path

path = Path("data") / "records.json"
print(path.name, path.parent)
print(path.exists(), path.is_file())
```

`os.getcwd` 查看工作目录，`os.chdir` 改变它；`os.listdir` 获取名称，`os.path.join` 按平台拼接路径。新代码也可用 `pathlib`。相对路径相对于进程工作目录，并不天然相对于脚本所在目录。

`mkdir` 创建目录，`rename` 重命名或移动，`unlink` 删除文件。先检查存在性有助于诊断，但检查与操作之间文件仍可能变化，最终还需处理操作异常。

## 模式是数据保护的关键

| 模式 | 含义 |
| --- | --- |
| `r` | 读取，文件必须存在 |
| `w` | 写入，已存在文件会被截断 |
| `a` | 追加，不清空现有内容 |
| `x` | 创建，存在时失败 |
| `b` | 二进制，与其他模式组合 |
| `+` | 添加读写能力，仍受原模式影响 |

```python
with open("notes.txt", "r", encoding="utf-8") as handle:
    for line in handle:
        print(line.rstrip("\n"))
```

迭代文件适合大文本，`read()` 和 `readlines()` 可能把全部内容放进内存。`write()` 与 `writelines()` 不会自动添加换行。二进制文件使用 `rb` 或 `wb`，不传文本编码。

## 文件位置与缓冲

二进制流的 `tell()` 通常表示字节偏移，文本流的返回值可能是用于恢复位置的不透明标记，不应当成字符数或直接做偏移运算。文本流需要回退时可用 `seek(0)` 或先前 `tell()` 保存的合法位置。

`flush()` 把语言层缓冲交给底层，不能等同于数据已经持久化到物理磁盘。确有耐久性要求时还涉及 `os.fsync`、文件系统和操作系统保证。`with` 会在离开时关闭文件，包括常规异常路径。

## JSON 序列化与反序列化

```python
import json
from pathlib import Path

path = Path("records.json")
data = {"name": "张三", "scores": [80, 90], "active": True}
with path.open("w", encoding="utf-8") as handle:
    json.dump(data, handle, ensure_ascii=False, indent=2, allow_nan=False)
with path.open("r", encoding="utf-8") as handle:
    loaded = json.load(handle)
print(loaded["name"])
```

`dump/load` 操作文件对象，`dumps/loads` 操作字符串。`ensure_ascii=False` 让中文直接可读，默认 Unicode 转义也能正常往返，并不是损坏数据。

| Python | JSON | 往返注意 |
| --- | --- | --- |
| 字典 | object | JSON 键是字符串 |
| 列表、元组 | array | 读取后通常是列表 |
| 字符串 | string | 文件编码仍需匹配 |
| 整数、浮点 | number | 严格 JSON 不支持 NaN、Infinity |
| 布尔值、None | true / false / null | 与 Python 拼写不同 |

自定义对象、集合等不是默认可序列化类型，需要明确转换。加载后还应校验字段类型和业务约束。精确恢复全部 Python 类型不是 JSON 的目标；一次文件中连续 `dump` 多个对象也不会自动组成合法 JSON 数组。
