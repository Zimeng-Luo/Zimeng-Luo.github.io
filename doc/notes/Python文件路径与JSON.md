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
description: "Python 文件读写、Python OS 模块、Python JSON的学习笔记。"
---

# Python 文件处理：路径、文本与 JSON

## Python 文件读写

### 1. 核心前置：`open()` 函数与文件模式

在调用任何 File 方法之前，必须先使用 `open()` 函数获取一个文件对象（File Object）。

**基础语法：**

```python
file_obj = open(file_name, mode='r', encoding='utf-8')
```

**编码避坑指南**：在处理中文字符时，强烈建议永远显式加上 `encoding='utf-8'`，否则在 Windows 系统下极易出现乱码（Windows 默认可能使用 GBK）。

**常用访问模式 (Mode) 核心速查表：**

|**模式**|**描述**|**特点**|
|---|---|---|
|**`'r'`**|**只读** (默认)|文件必须存在，否则报错。光标在文件开头。|
|**`'w'`**|**只写**|**极度危险！** 如果文件存在，会**清空**原有内容。不存在则创建新文件。|
|**`'a'`**|**追加**|文件存在时，光标定位在文件尾部（内容写在后面）。不存在则创建。|
|**`'b'`**|**二进制**|用于处理非文本文件（如图片、视频），常与其它模式结合，如 `'rb'`, `'wb'`。|
|**`'+'`**|**读写升级**|为其它模式添加读写功能，如 `'r+'`（读写，不清空），`'w+'`（读写，先清空）。|

### 2. 读取文件内容 (Read)

Python 提供了三种不同粒度的读取方法，你需要根据文件的大小来选择合适的方案。

- **`file.read([size])`**: 读取指定的字节/字符数。如果省略 `size`，则**一次性读取整个文件的所有内容**并返回一个长字符串。
    
- **`file.readline()`**: 每次只读取**一行**内容（包含末尾的换行符 `\n`）。适合一行一行地处理数据。
    
- **`file.readlines()`**: 一次性读取所有行，并返回一个**列表 (List)**，列表中的每个元素就是文件的一行。
    

**代码示例与内存优化建议：**

```python
# 1. 常规读取 (适合小文件)
with open('demo.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)

# 2. 内存友好的逐行读取 (强烈推荐用于大文件/海量日志)
# 不要用 readlines() 将几个G的文件一次性塞进内存，而是直接迭代文件对象
with open('huge_log.txt', 'r', encoding='utf-8') as f:
    for line in f:
        # strip() 用于移除字符串头尾的空白字符和换行符
        print(line.strip()) 
```

### 3. 写入文件内容 (Write)

写入内容时，Python 不会自动为你添加换行符。

- **`file.write(str)`**: 将字符串写入文件。返回实际写入的字符长度。
    
- **`file.writelines(sequence)`**: 向文件写入一个序列（通常是字符串列表）。**注意：它不会自动在元素之间加换行符，如果需要换行，序列中的每个字符串末尾必须自带 `\n`。**
    

**代码示例：**

```python
lines = ["第一行数据\n", "第二行数据\n", "第三行数据\n"]

with open('output.txt', 'w', encoding='utf-8') as f:
    # 写入单行
    f.write("这是表头\n")
    # 批量写入列表
    f.writelines(lines)
```

### 4. 文件指针控制 (光标移动)

文件对象内部有一个看不见的“光标”（指针），记录着当前读写到了哪个位置。

- **`file.tell()`**: 返回当前文件指针的位置（按**字节**计算，不是字符）。
    
- **`file.seek(offset, [whence])`**: 强行移动文件指针的位置。
    
    - `offset`: 移动的字节数。
        
    - `whence`: 参考位置。`0` 代表从文件开头（默认），`1` 代表从当前位置，`2` 代表从文件末尾。
        

**代码示例（反复读取同一文件）：**

```python
with open('demo.txt', 'r+', encoding='utf-8') as f:
    print("刚打开时光标位置:", f.tell()) # 输出: 0
    
    first_line = f.readline()
    print("读完一行后光标位置:", f.tell()) 
    
    # 假设我们想重新从头读一次
    f.seek(0)
    print("使用 seek 回到开头后光标位置:", f.tell()) # 输出: 0
```

### 5. 刷新与关闭 (Flush & Close)

- **`file.close()`**: 关闭文件并释放系统资源。如果你使用了上一节学到的 `with open(...) as f:` 语法，这步会自动完成，无需手动调用。
    
- **`file.flush()`**: 刷新内部缓冲区。由于硬盘写入速度慢，Python 通常会把数据先存放在内存缓冲区，等攒够了或文件关闭时再一起写入硬盘。调用 `flush()` 可以强制将目前内存中的数据立刻刷入硬盘，常用于需要实时保存的场景。

---

## Python OS 模块

### 1. 目录基础操作 (查看与切换)

这是我们在终端或命令行中最常进行的操作，`os` 模块提供了对应的 Python 实现。

- **`os.getcwd()`**: 获取当前工作目录 (Current Working Directory)，相当于 Linux 的 `pwd` 命令。
    
- **`os.chdir(path)`**: 改变当前工作目录，相当于 Linux 的 `cd` 命令。
    
- **`os.listdir(path='.')`**: 返回一个列表，包含指定目录下的所有文件和文件夹名称。如果不传参数，默认返回当前目录下的内容。
    

**代码示例：**

```python
import os

# 获取当前所在目录
current_dir = os.getcwd()
print(f"当前目录: {current_dir}")

# 列出当前目录下的所有文件和文件夹
items = os.listdir()
print(f"目录内容: {items}")

# 切换到上一级目录
os.chdir("..")
print(f"切换后的目录: {os.getcwd()}")
```

---

### 2. 目录的创建与删除

在批量处理数据或生成日志时，经常需要用代码自动创建文件夹。

- **`os.mkdir(path)`**: 创建**单层**目录。如果该目录已经存在，或者其父目录不存在，会报错 (`FileExistsError` 或 `FileNotFoundError`)。
    
- **`os.makedirs(path, exist_ok=False)`**: **递归**创建多层目录。如果中间的文件夹不存在，它会自动帮你把中间的文件夹全部建好。强烈建议将 `exist_ok` 设置为 `True`，这样如果目录已存在，程序也不会报错。
    
- **`os.rmdir(path)`**: 删除**单层空目录**。如果目录不为空，会报错。
    
- **`os.removedirs(path)`**: 递归删除目录。从最下级目录开始，如果为空则删除，然后检查上一级目录，如果也为空则继续删除，依次类推。
    

**代码示例：**

```python
import os

# 安全地递归创建多层目录 (推荐用法)
os.makedirs("project/data/raw_data", exist_ok=True)
print("目录结构创建成功！")

# 删除单层空目录
os.rmdir("project/data/raw_data") 
```

---

### 3. 文件的删除与重命名

注意：`os` 模块主要用于处理文件路径和系统属性，**读写文件内容**依然要使用内置的 `open()` 和 `with` 语句。

- **`os.remove(path)`**: 删除指定的文件。如果路径是一个目录，会报错（删除目录请用 `os.rmdir`）。
    
- **`os.rename(src, dst)`**: 重命名文件或目录。将 `src` 修改为 `dst`。这也可以用来**移动文件**（更改文件所在的路径）。
    

**代码示例：**

```python
import os

# 将文件 old_name.txt 重命名为 new_name.txt
# 也可以通过带上路径来实现移动：os.rename("old_dir/test.txt", "new_dir/test.txt")
try:
    os.rename("old_name.txt", "new_name.txt")
    print("重命名成功！")
except FileNotFoundError:
    print("找不到需要重命名的文件。")

# 删除文件
# os.remove("unwanted_file.txt")
```

---

### 4. 核心利器：`os.path` 子模块

在处理文件时，我们极其频繁地需要拼接路径、判断文件是否存在、或者提取文件名。`os.path` 模块提供了这些关键功能。

|**函数**|**功能描述**|**示例用法**|
|---|---|---|
|**`os.path.join()`**|**(极度重要)** 智能拼接路径。它会自动根据你的操作系统（Windows使用`\`，Mac/Linux使用`/`）添加正确的斜杠。|`os.path.join("folder", "img", "test.jpg")`|
|**`os.path.exists(path)`**|判断指定的路径（文件或目录）是否存在。返回布尔值。|`os.path.exists("data.csv")`|
|**`os.path.isfile(path)`**|判断指定的路径是否是一个**存在的文件**。|`os.path.isfile("data.csv")`|
|**`os.path.isdir(path)`**|判断指定的路径是否是一个**存在的目录**。|`os.path.isdir("folder_name")`|
|**`os.path.basename(path)`**|获取路径中的基础名称（通常是文件名）。|`os.path.basename("/a/b/c.txt")` 返回 `'c.txt'`|
|**`os.path.dirname(path)`**|获取路径中的目录部分。|`os.path.dirname("/a/b/c.txt")` 返回 `'/a/b'`|
|**`os.path.getsize(path)`**|获取文件的大小（以字节 Byte 为单位）。|`os.path.getsize("data.csv")`|

**综合实战示例：安全地拼接路径并检查文件**

```python
import os

# 1. 无论在什么系统下，这样拼接路径永远是安全的
folder_name = "reports"
file_name = "summary_2023.xlsx"
full_path = os.path.join(folder_name, file_name)
print(f"生成的路径: {full_path}")

# 2. 在操作文件前，先判断它存不存在
if os.path.exists(full_path):
    if os.path.isfile(full_path):
        print(f"这是一个文件，大小为: {os.path.getsize(full_path)} 字节")
else:
    print("文件或目录不存在。")
```

管家补充：

虽然 `os` 和 `os.path` 非常经典且被广泛使用，但在 Python 3.4 之后，官方引入了 **`pathlib`** 模块。`pathlib` 提供了面向对象的文件系统路径处理方式，语法更加优雅（例如使用 `/` 运算符拼接路径：`Path("folder") / "file.txt"`）。如果你在编写新的 Python3 项目，强烈建议了解并使用 `pathlib` 取代部分 `os.path` 的操作。

---

## Python JSON

### 1. Python 与 JSON 数据类型映射

在进行数据转换前，必须了解 Python 数据类型和 JSON 数据类型之间的对应关系。这是解析成功的基础。

|**Python 数据类型**|**JSON 数据类型**|
|---|---|
|`dict` (字典)|`object` (对象，即 `{}`)|
|`list`, `tuple` (列表，元组)|`array` (数组，即 `[]`)|
|`str` (字符串)|`string` (字符串)|
|`int`, `float` (整数，浮点数)|`number` (数字)|
|`True` / `False` (布尔值)|`true` / `false`|
|`None` (空值)|`null`|

### 2. 内存中的转换：`dumps()` 与 `loads()`

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

### 3. 文件读写转换：`dump()` 与 `load()`

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

### 4. 格式化输出 (美化 JSON)

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
