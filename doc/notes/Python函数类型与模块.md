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
description: "用参数契约、作用域和导入边界，把零散脚本组织成可复用代码。"
---

# Python 代码组织：函数、类型提示与模块

函数明确一个操作的输入输出，模块组织相关操作，类型提示则把接口约定写出来。三者一起使用，脚本才容易被复用和维护。

## 参数设计比函数长短更重要

```python
def select_scores(scores: list[int], *, minimum: int = 60) -> list[int]:
    """保留达到最低分的记录，不修改输入列表。"""
    return [score for score in scores if score >= minimum]

print(select_scores([50, 80, 90], minimum=70))
```

`*` 后的参数只能用关键字传入，提升调用含义的清晰度。普通位置参数可以按位置或名称传入；`*args` 收集多余位置参数，`**kwargs` 收集多余关键字参数。只在接口确实需要扩展时使用它们。

默认值在函数定义时求值，不是每次调用重新创建：

```python
def add_item(item: str, bucket: list[str] | None = None) -> list[str]:
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket
```

不要用 `bucket=[]` 意外共享状态。普通位置参数中，必需参数不能接在有默认值的参数之后；关键字专用参数的规则不同，不能将这一约束泛化成所有参数都一样。

没有显式返回值时返回 `None`；多个返回值通常打包成元组。`lambda` 适合简单表达式，例如 `sorted(records, key=lambda r: r["score"])`，复杂逻辑用具名函数。

## 名字绑定遵循作用域

查找通常遵循 LEGB：局部、外层函数、模块全局、内置。`global` 声明重新绑定模块全局名字，`nonlocal` 声明重新绑定外层函数名字。

```python
values = []
def append_value(x):
    values.append(x)   # 修改已有列表，不需要 global
```

“修改全局对象”与“重新绑定全局名字”不同。函数内部直接给名字赋值会让它成为局部名字，若在赋值前读取就可能产生 `UnboundLocalError`。优先把状态作为参数与返回值传递。

## 类型提示表达契约

```python
from collections.abc import Callable

def apply(op: Callable[[int, int], int], a: int, b: int) -> int:
    return op(a, b)
```

`list[int]` 适用于 Python 3.9+，`int | None` 适用于 3.10+；`Optional[T]` 表示可为 `None`，不是“调用时一定可以省略”。`Any` 会放宽静态检查，少用更有帮助。

Python 通常不会自动根据注解检查传入值，但注解可以被检查工具和框架读取；它们并非完全与运行时无关。业务条件仍需要显式验证。

## 导入时避免意外执行任务

```python
# scores.py
def mean_score(values):
    if not values:
        raise ValueError("empty scores")
    return sum(values) / len(values)

if __name__ == "__main__":
    print(mean_score([80, 90]))
```

直接运行时 `__name__` 为 `__main__`，导入时为模块名。测试和演示入口放在保护块内，模块顶部不要无条件开始训练或覆盖文件。

`import scores` 保留来源前缀，`from scores import mean_score` 引入指定成员，`as` 可以起别名。避免通配符导入，避免将自己的文件命名为 `json.py`、`random.py` 等遮蔽标准库。

模块搜索路径与启动方式有关：直接运行脚本时通常包含脚本所在目录，不一定是终端当前目录；`python -m` 与交互方式又有所不同。普通包通常含 `__init__.py`，命名空间包则可以不含该文件。`dir()` 帮助探索名称，具体行为还需阅读文档和签名。
