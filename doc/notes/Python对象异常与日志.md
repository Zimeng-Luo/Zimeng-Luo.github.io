---
title: "Python 可靠性：对象边界、异常与日志"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 接口设计
  - 故障排查
coverImg: /blog/bg15.jpg
sidebar: false
description: "围绕状态校验与失败处理，将面向对象、异常机制和 logging 合并为实用流程。"
---

# Python 可靠性：对象边界、异常与日志

组织程序时，类负责维持状态，异常负责传递失败，日志负责留下诊断线索。三者应共同表达真实结果，避免“捕获错误之后继续当作成功”。

## 用对象组织状态与行为

```python
class Account:
    def __init__(self, owner: str, balance: float = 0):
        if balance < 0:
            raise ValueError("balance must be nonnegative")
        self.owner = owner
        self._balance = balance

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        self._balance += amount
```

普通实例方法第一个参数习惯命名为 `self`，但它不是关键字。`__init__` 初始化已创建的实例，对象创建还涉及 `__new__`。静态方法和类方法不遵循“第一个参数永远是 self”的说法。

单下划线表示内部使用约定；双下划线触发名称改写，主要避免继承中的名称冲突，并不提供安全隔离。类属性由实例共享，实例属性各自保存，尤其不要无意中把列表放在类属性中共享。

子类重写方法后，可以用 `super()` 协作调用。多继承中 `super()` 按方法解析顺序（MRO）继续查找，不总是简单的“直接父类”。只需要一份状态和几个函数时，不必强行引入继承。

## 在能够处理的边界捕获异常

```python
def parse_age(text: str) -> int:
    age = int(text)
    if age < 0:
        raise ValueError("age must be nonnegative")
    return age

try:
    age = parse_age("20")
except ValueError as exc:
    print(f"输入有误：{exc}")
else:
    print(f"年龄：{age}")
```

语法错误发生在解析阶段；运行时异常表示执行过程中出了问题。捕获具体异常，保持 `try` 范围足够小，避免把后续程序错误误当成输入错误。

`else` 在 `try` 正常完成后执行，`finally` 在正常展开栈时执行清理。文件等资源优先使用 `with`；进程被强制终止等情况不能承诺 `finally` 一定运行。业务失败可定义继承 `Exception` 的异常类，不要滥用裸 `except` 吞掉中断。

## 日志记录上下文和堆栈

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

try:
    age = parse_age("oops")
except ValueError:
    logger.exception("解析年龄失败")
else:
    logger.info("解析成功，age=%s", age)
```

`logger.exception` 在异常处理块中记录堆栈。参数化日志避免无必要地提前格式化文本。日志不能代替返回状态或抛出异常，失败后仍要决定是否重试、退出或向调用方报告。

| 级别 | 用途 |
| --- | --- |
| DEBUG | 诊断细节 |
| INFO | 常规进展与结果 |
| WARNING | 非致命但值得关注 |
| ERROR | 当前操作失败 |
| CRITICAL | 严重故障 |

## 多个输出目标

Logger 是入口，Handler 决定去向，Formatter 决定格式，Filter 做进一步过滤。Logger 的级别和各 Handler 的级别共同影响记录是否输出。

```python
handler = logging.FileHandler("app.log", encoding="utf-8")
handler.setLevel(logging.DEBUG)
handler.setFormatter(logging.Formatter("%(levelname)s %(message)s"))
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)
logger.propagate = False
```

这是单独添加文件处理器的示例；若还需要终端输出，应再添加对应处理器。初始化逻辑重复运行可能重复添加 Handler，导致一条日志出现多次。一般由应用入口配置日志，库只获取自己的 Logger。
