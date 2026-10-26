---
title: "Python 代码组织：函数、类型提示与模块"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 接口设计
  - 代码组织
coverImg: /blog/bg14.jpg
sidebar: false
description: "Python 函数、Python 类型注解、Python 模块与包的学习笔记。"
---

# Python 代码组织：函数、类型提示与模块

## Python 函数

### 1. 函数的定义与调用

在 Python 中，使用 `def` 关键字来声明一个函数。

**基本语法：**

```python
def function_name(parameters):
    """这里是函数的文档字符串(docstring)，用于解释函数的功能"""
    # 这里是函数体，执行具体的逻辑
    return [expression] # 结束函数，可选地返回一个值
```

**代码示例：**

```python
# 定义函数
def greet(name):
    """向指定的人打招呼"""
    print(f"Hello, {name}!")

# 调用函数
greet("Alice") 
```

---

### 2. 灵活的参数传递 (极其重要)

Python 的函数参数传递非常灵活，支持四种主要的参数类型。这是 Python 函数最强大，也是新手最容易晕的地方。

#### ① 必需参数 (位置参数)

调用时，必须以正确的顺序传入参数。调用时的数量和位置必须和声明时完全一致。

```python
def print_info(name, age):
    print(f"名字: {name}, 年龄: {age}")

print_info("Bob", 25) # 顺序和数量必须匹配
```

#### ② 关键字参数

允许你跳过参数的顺序。调用时，通过 `参数名=值` 的形式指定，Python 解释器能自动匹配。

```python
# 顺序可以与定义时不一致
print_info(age=30, name="Charlie") 
```

#### ③ 默认参数

在定义函数时，给参数设定一个默认值。如果调用时没有传递该参数，就会使用默认值。

**黄金法则**：默认参数必须放在所有非默认参数的**最后面**！并且默认参数最好是**不可变对象**（如数字、字符串），千万不要用空列表 `[]` 作为默认值。

```python
def print_user(name, country="China"):
    print(f"{name} is from {country}")

print_user("David")           # 输出: David is from China
print_user("Emma", "UK")      # 输出: Emma is from UK
```

#### ④ 不定长参数 (`*args` 和 `**kwargs`)

当你不知道调用函数时会传递多少个参数时，可以使用不定长参数。

- **`*args`**: 接收多余的**位置参数**，并将它们打包成一个**元组 (Tuple)**。
    
- **`**kwargs`**: 接收多余的**关键字参数**，并将它们打包成一个**字典 (Dictionary)**。
    

```python
def make_pizza(size, *toppings, **details):
    print(f"\n制作一个 {size} 寸的披萨，配料有: {toppings}")
    for key, value in details.items():
        print(f"- {key}: {value}")

# 调用演示
make_pizza(12, "蘑菇", "青椒", "芝士", crust="厚饼底", delivery="加急")
```

---

### 3. `return` 返回值

`return` 语句用于退出函数，并向调用方返回一个表达式。

- 如果函数没有 `return` 语句，或者单纯写了 `return`，则默认返回 `None`。
    
- Python 函数**可以同时返回多个值**，实际上它是把这些值打包成了一个元组。
    

```python
def calculate(a, b):
    add = a + b
    sub = a - b
    return add, sub  # 返回多个值

# 接收返回值
res_add, res_sub = calculate(10, 5)
print(f"加法结果: {res_add}, 减法结果: {res_sub}")
```

---

### 4. 匿名函数 (`lambda`)

Python 使用 `lambda` 来创建精简的、单行的匿名函数。它没有名字，通常只使用一次。

- **语法**: `lambda arguments: expression`
    
- 它只能包含一个表达式，不能写复杂的逻辑或循环。
    

```python
# 传统 def 写法
def add(x, y):
    return x + y

# lambda 写法
add_lambda = lambda x, y: x + y
print("Lambda 计算:", add_lambda(3, 4)) # 输出: 7

# 最常见的应用场景：配合 sort、map、filter 等高阶函数
points = [(1, 2), (3, 1), (5, -1)]
points.sort(key=lambda p: p[1]) # 按元组的第二个元素进行排序
print("排序后:", points) # 输出: [(5, -1), (3, 1), (1, 2)]
```

---

### 5. 变量作用域 (Scope) 与 LEGB 规则

变量并不是在哪里都可以访问的，它取决于它被定义的位置。

Python 解析变量名时，遵循 **LEGB 顺序**：

1. **L (Local)**: 局部作用域（函数内部）。
    
2. **E (Enclosing)**: 嵌套函数的父级作用域。
    
3. **G (Global)**: 全局作用域（模块级别）。
    
4. **B (Built-in)**: 内置作用域（如 `len`, `int` 等内置函数）。
    

**`global` 和 `nonlocal` 关键字：**

默认情况下，函数内部只能**读取**全局变量。如果想在函数内部**修改**全局变量，必须使用关键字声明。

```python
total = 0 # 全局变量

def add_to_total(num):
    global total  # 声明我们要修改的是外部的全局变量 total
    total += num
    print(f"局部打印 total: {total}")

add_to_total(10)
print(f"全局打印 total: {total}") # 输出 10，如果不加 global 会报错
```

---

## Python 类型注解

### 1. 核心认知：注解只是“提示”

在学习具体语法前，必须牢记一个绝对核心的原则：**Python 的类型注解仅仅是“提示（Hints）”，它完全不会影响程序的运行时行为。**

即使你传入了错误的类型，Python 解释器在运行时依然会放行（除非你的代码逻辑本身报错）。类型注解主要是给 **IDE（如 PyCharm, VS Code）**和**静态代码检查工具（如 mypy）**看的，用来实现代码自动补全和提前报错。

### 2. 基础语法：变量与函数

类型注解主要应用在两个地方：声明变量、定义函数的参数和返回值。

**变量注解语法：** `变量名: 类型 = 初始值`

```python
# 基础数据类型
age: int = 25
name: str = "Alice"
is_student: bool = True
height: float = 1.75
```

**函数注解语法：** `def 函数名(参数: 类型) -> 返回类型:`

```python
# 明确指出参数 name 是字符串，返回值是一个完整的问候字符串
def greeting(name: str) -> str:
    return f"Hello, {name}"

print(greeting("Bob"))
```

### 3. 进阶类型：容器与复合数据

当你需要对列表、字典等容器内部的元素进行约束时，普通的 `list` 或 `dict` 就不够用了。

管家补充：

在 Python 3.8 及以前，你需要从 `typing` 模块导入 `List`, `Dict`, `Tuple`。

**从 Python 3.9 开始**，你可以直接使用内置的 `list`, `dict`, `tuple` 加中括号的形式进行注解，代码更简洁！

**代码示例 (基于 Python 3.9+)：**

```python
# 声明一个全部由整数组成的列表
numbers: list[int] = [1, 2, 3, 4, 5]

# 声明一个字典，键是字符串，值是浮点数
scores: dict[str, float] = {"math": 95.5, "english": 88.0}

# 声明一个长度固定、元素类型固定的元组
coordinates: tuple[float, float, float] = (10.0, 20.0, 5.0)
```

### 4. `typing` 模块的高级工具

虽然基础容器不再需要 `typing` 模块，但对于一些复杂的逻辑，`typing` 依然不可或缺。

#### 4.1 `Union` (联合类型)

当一个变量或参数**可能是多种类型之一**时使用。

_注：Python 3.10+ 引入了更简洁的 `|` 语法糖，如 `int | str`。_

```python
from typing import Union

# 这个函数可以接收整数或字符串
def process_data(data: Union[int, str]) -> None:
    print(f"Processing: {data}")

# Python 3.10+ 的现代化写法:
# def process_data(data: int | str) -> None:
```

#### 4.2 `Optional` (可选类型)

当一个变量**可能是某种类型，也可能是 `None`** 时使用。它等价于 `Union[X, None]`。在定义可能有缺失值的默认参数时极其常用。

```python
from typing import Optional

def get_user_email(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "admin@example.com"
    return None # 找不到用户时返回 None
```

#### 4.3 `Any` (任意类型)

终极“逃生舱”。当你不想限制类型，或者在重构旧代码不知道填什么类型时，可以使用 `Any`。但**过度使用 `Any` 会让类型注解失去意义**（被称为 "AnyScript" 现象）。

```python
from typing import Any

def print_anything(item: Any) -> None:
    print(item)
```

#### 4.4 `Callable` (可调用对象)

当你需要把**函数作为参数**传给另一个函数时，使用 `Callable`。

语法为：`Callable[[参数类型列表], 返回值类型]`

```python
from typing import Callable

# 参数 func 必须是一个：接收两个 int 参数，并返回 int 的函数
def execute_operation(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)
```

---

## Python 模块与包

### 1. 导入模块的几种方式

假设我们有一个自己写的模块文件叫 `math_tools.py`，里面定义了一个函数 `add(a, b)`。

**① `import` 导入整个模块**

这是最基础也是最安全的导入方式。调用时必须带上“模块名”作为前缀，以防止命名冲突。

```python
import math_tools
import math # 导入内置模块

result = math_tools.add(5, 3) 
print(math.pi)
```

**② `from ... import ...` 导入特定成员**

如果你只需要用到模块里的某一个函数或变量，可以使用这种方式。调用时**不需要**加模块名前缀。

```python
from math_tools import add
from math import pi

result = add(5, 3) # 直接使用 add，不需要写 math_tools.add
print(pi)
```

**③ `as` 取别名**

当模块名太长，或者导入的函数名与你当前文件里的函数重名时，可以给它起个简短的别名。

```python
import math_tools as mt
from math import factorial as fact

print(mt.add(1, 2))
print(fact(5)) # 计算 5 的阶乘
```

**④ `from ... import *` 导入所有成员 (不推荐)**

这会把模块中所有的非私有名称全部导入当前命名空间。**强烈不推荐**，因为这极易造成变量名覆盖（命名污染），且让代码可读性变差。

### 2. 核心属性：`__name__`

这是 Python 中极其重要的一个机制！每个模块都有一个内置属性 `__name__`。

- 当模块被**直接运行**时（比如在命令行输入 `python my_module.py`），它的 `__name__` 的值是 **`'__main__'`**。
    
- 当模块被**其他文件导入**时，它的 `__name__` 的值就是**该模块的名字**。
    

**经典实战应用：**

我们在写模块文件时，通常会在文件末尾加上下面这段代码，用于进行测试。这样，当别人导入你这个模块时，测试代码不会被莫名其妙地执行。

```python
# 文件名: my_module.py
def say_hello():
    print("Hello from module!")

# 仅当直接运行该文件时，才会执行以下代码
if __name__ == '__main__':
    print("正在直接运行测试...")
    say_hello()
```

### 3. 模块搜索路径 (`sys.path`)

当你 `import my_module` 时，Python 解释器去哪里找这个文件呢？它会按照以下顺序在一个列表 (`sys.path`) 中寻找：

1. **当前目录**（你运行脚本的那个文件夹）。
    
2. **环境变量 `PYTHONPATH`** 中指定的目录。
    
3. **Python 的默认安装库目录**（通常包含标准库和 `site-packages` 第三方库）。
    

你可以通过以下代码查看具体的搜索路径：

```python
import sys
print(sys.path) 
```

### 4. 探索模块：`dir()` 函数

如果你拿到一个陌生的模块，想快速知道里面都有哪些可用的函数和变量，内置函数 `dir()` 是你的好帮手。

```python
import math
# 返回 math 模块中定义的所有名称列表（包括内部变量和函数）
print(dir(math)) 
```

### 5. 包 (Packages)：模块的集合

当你的模块越来越多时（比如有几十个 `.py` 文件），你需要用文件夹把它们组织起来。**在 Python 中，包含了 `__init__.py` 文件的目录就被视为一个包 (Package)。**

目录结构示例：

```text
my_project/
│
├── main.py              # 主运行文件
└── my_package/          # 这是一个包
    ├── __init__.py      # 标识这是一个包 (哪怕是空文件也可以)
    ├── module_a.py
    └── module_b.py
```

在 `main.py` 中调用包里面的模块：

```python
# 从 my_package 包中导入 module_a 模块
from my_package import module_a

module_a.some_function()
```

**注意**：在 Python 3.3 之后，即使没有 `__init__.py`，目录也可以被当作包（命名空间包），但为了代码的规范性和兼容性，强烈建议加上 `__init__.py`。
