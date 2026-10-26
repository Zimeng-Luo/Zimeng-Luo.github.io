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
description: "Python 面向对象、Python 异常处理、Python 日志的学习笔记。"
---

# Python 可靠性：对象边界、异常与日志

## Python 面向对象

### 1. 核心概念：类 (Class) 与对象 (Object)

理解 OOP 的第一步，是搞懂“类”和“对象”的关系。

- **类 (Class)**：是对事物的**抽象模板或图纸**。比如“汽车”是一个类，它规定了汽车应该有轮子、颜色（属性），能启动、刹车（方法）。
    
- **对象 (Object / 实例 Instance)**：是根据类（图纸）造出来的**具体实体**。比如“你停在楼下的那辆红色宝马”就是一个具体的对象。
    

### 2. 定义类与创建对象

在 Python 中，使用 `class` 关键字来定义类。类名通常首字母大写（驼峰命名法）。

**核心语法要素：**

- **`__init__()` 构造方法**：每次创建新对象时，这个方法会被**自动调用**，常用于初始化对象的属性。
    
- **`self` 关键字**：**极度重要！** 在类的方法中，第一个参数永远是 `self`。它代表着**当前正在创建或调用的那个具体对象本身**。（相当于 Java / C++ 中的 `this`）。
    

**代码示例：**

```python
class Dog:
    # 构造方法，初始化属性
    def __init__(self, name, age):
        self.name = name  # 将传入的 name 绑定到当前对象的 name 属性上
        self.age = age

    # 实例方法
    def bark(self):
        # 使用 self 访问属于该对象的属性
        print(f"汪汪！我是 {self.name}，我今年 {self.age} 岁了。")

# 根据图纸（Dog 类）造出两个具体的对象
dog1 = Dog("大黄", 3)
dog2 = Dog("小白", 1)

# 调用对象的方法
dog1.bark()  # 输出: 汪汪！我是 大黄，我今年 3 岁了。
dog2.bark()  # 输出: 汪汪！我是 小白，我今年 1 岁了。
```

### 3. 封装 (Encapsulation) 与私有属性

封装的目的在于**隐藏对象内部的复杂细节，只对外暴露简单的接口**，防止外部代码随意篡改对象内部的关键数据。

在 Python 中，没有像 Java 那样严格的 `public` 或 `private` 关键字。Python 依靠命名约定来实现私有化：

- **私有属性/方法**：在名称前加上**两个下划线 `__`**（例如 `__balance`）。这样在类的外部就无法直接访问它了。
    

**代码示例：**

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance # 私有属性，外部不能直接修改

    # 对外提供一个合法的方法来查看余额
    def get_balance(self):
        return self.__balance

    # 对外提供一个合法的方法来存钱，并加入逻辑判断
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"存款成功，当前余额: {self.__balance}")
        else:
            print("存款金额必须大于0！")

account = BankAccount("Alice", 1000)
# print(account.__balance)  # 这行会报错！外部无法直接访问私有属性
print(account.get_balance()) # 通过公开接口访问: 1000
account.deposit(500)         # 通过公开接口修改余额
```

### 4. 继承 (Inheritance)

继承允许我们基于一个已有的类（父类 / 基类），创建一个新的类（子类 / 派生类）。**子类可以直接拥有父类的所有非私有属性和方法**，从而极大地减少代码重复。

**语法**：`class 子类名(父类名):`

**代码示例：**

```python
# 父类：动物
class Animal:
    def __init__(self, name):
        self.name = name
    
    def eat(self):
        print(f"{self.name} 正在吃东西...")

# 子类：猫 (继承自 Animal)
class Cat(Animal):
    def meow(self):
        print(f"{self.name}: 喵喵喵！")

# 创建猫的对象
my_cat = Cat("汤姆")
my_cat.eat()  # 直接使用了父类继承来的方法
my_cat.meow() # 使用自己独有的方法
```

### 5. 方法重写 (Overriding) 与 `super()`

如果子类对父类继承来的方法不满意，可以在子类中**重写（覆盖）**这个方法。

如果我们在重写的同时，还想保留父类原有的功能，可以使用 **`super()`** 函数来调用父类的方法。

**代码示例：**

```python
class Bird(Animal):
    def __init__(self, name, wing_span):
        # 使用 super() 调用父类的构造方法，避免重复写 self.name = name
        super().__init__(name) 
        self.wing_span = wing_span
    
    # 重写父类的 eat 方法
    def eat(self):
        # 先执行一些子类独有的逻辑
        print(f"{self.name} 扇动着 {self.wing_span}cm 的翅膀飞下来。")
        # 然后再调用父类原本的 eat 逻辑
        super().eat()

my_bird = Bird("波利", 30)
my_bird.eat()
```

---

## Python 异常处理

### 1. 语法错误 vs 异常 (Syntax Errors vs Exceptions)

在 Python 中，程序报错通常分为两类：

- **语法错误 (SyntaxError)**：这是代码写得不符合 Python 语法规则（比如漏了冒号、括号不匹配、缩进错误）。这种错误在**代码运行前**就会被解释器拦截，必须改对代码才能执行。
    
- **异常 (Exception)**：代码语法完全正确，但在**运行期间**发生了意外（比如把字符串强转为数字、除数为 0、尝试打开不存在的文件）。这就需要我们用代码去“捕获”它。
    

### 2. 核心捕获机制：`try...except...else...finally`

这是 Python 处理异常的完整结构。你可以不写 `else` 和 `finally`，但 `try` 和 `except` 通常是成对出现的。

**结构解析：**

- **`try`**: 里面放可能发生报错的“危险代码”。
    
- **`except`**: 如果 `try` 里面报错了，就会立刻跳到这里执行补救措施（程序不会崩溃）。
    
- **`else`**: (可选) 如果 `try` 里面**没有报错**，就会乖乖执行这里。
    
- **`finally`**: (可选) **无论报没报错，最后一定会执行这里**。通常用于必须执行的扫尾工作（如关闭文件、断开数据库连接）。
    

**代码示例：**

```python
def divide_numbers():
    try:
        # 尝试执行危险操作
        num1 = int(input("请输入被除数: "))
        num2 = int(input("请输入除数: "))
        result = num1 / num2
        
    except ZeroDivisionError:
        # 专门捕获除数为 0 的异常
        print("错误：除数不能为零！")
        
    except ValueError:
        # 专门捕获输入非数字的异常
        print("错误：请输入有效的整数！")
        
    except Exception as e:
        # 捕获所有其他未知的异常，并将异常对象保存到变量 e 中
        print(f"发生了一个未知错误: {e}")
        
    else:
        # 只有在 try 代码块完全没报错时才会执行
        print(f"计算成功！结果是: {result}")
        
    finally:
        # 无论成功还是失败，最后一定会被打印
        print("--- 运算环节结束 ---")

# 运行测试
divide_numbers()
```

### 3. 主动抛出异常 (`raise`)

有时候，程序在运行层面没有报错，但在**业务逻辑层面**是不允许的（比如年龄不能输入负数）。这时候你可以使用 `raise` 关键字主动“炸毁”程序，抛出一个异常。

**代码示例：**

```python
def register_user(age):
    if age < 0:
        # 主动抛出一个 ValueError 异常
        raise ValueError("年龄怎么可能是负数呢？非法输入！")
    print(f"用户注册成功，年龄: {age}")

try:
    register_user(-5)
except ValueError as e:
    print(f"捕获到了主动抛出的异常: {e}")
```

### 4. 自定义异常 (User-defined Exceptions)

虽然 Python 内置了很丰富的异常类型（如 `TypeError`, `IndexError`, `KeyError` 等），但在复杂项目中，我们经常需要定义属于自己项目的专属异常。

**方法**：创建一个新的类，并让它继承自内置的 `Exception` 类。

```python
# 定义一个自定义异常类
class BalanceInsufficientError(Exception):
    def __init__(self, message="账户余额不足，无法完成扣款"):
        self.message = message
        super().__init__(self.message)

# 模拟提现功能
def withdraw(balance, amount):
    if amount > balance:
        raise BalanceInsufficientError(f"余额不足！当前余额: {balance}, 尝试提取: {amount}")
    return balance - amount

try:
    withdraw(100, 500)
except BalanceInsufficientError as e:
    print(f"交易失败: {e}")
```

---

## Python 日志

### 1. 日志级别 (Logging Levels)

日志级别用于标识事件的严重程度。默认级别是 `WARNING`，这意味着只有级别大于或等于 `WARNING` 的日志才会被记录。

| **级别**     | **数值** | **描述**              |
| ---------- | ------ | ------------------- |
| `DEBUG`    | 10     | 详细信息，通常仅在诊断问题时使用。   |
| `INFO`     | 20     | 确认程序按预期运行。          |
| `WARNING`  | 30     | 表示发生了意外，或近期可能出现问题。  |
| `ERROR`    | 40     | 由于严重问题，程序的某些功能无法执行。 |
| `CRITICAL` | 50     | 严重错误，程序可能无法继续运行。    |
|            |        |                     |

### 2. 基础配置 (`basicConfig`)

这是最简单的使用方式，适合小型脚本。

```python
import logging

# 基础配置：设置级别、输出文件、格式和日期格式
logging.basicConfig(
    level=logging.DEBUG,
    filename='app.log',
    filemode='w', # 'w' 表示覆盖，'a' 表示追加
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

logging.debug("这是一条调试信息")
logging.info("程序正常启动")
logging.warning("警告：内存占用过高")
```

### 3. 核心组件架构

为了实现更复杂的逻辑（例如同时输出到屏幕和文件），需要理解四个核心类：

- **Logger (记录器)**：应用程序直接调用的接口。
    
- **Handler (处理器)**：决定日志去向（`StreamHandler` 发往控制台，`FileHandler` 发往文件）。
    
- **Formatter (格式器)**：定义日志的最终排版样式。
    
- **Filter (过滤器)**：提供更精细的控制，决定哪些记录被发出。
    

### 4. 多处理器配置示例

下面的例子展示了如何配置一个 Logger，使其在控制台显示 INFO 级别以上的日志，同时在文件中保存 DEBUG 级别以上的日志。

```python
import logging

# 1. 创建 Logger
logger = logging.getLogger("MyService")
logger.setLevel(logging.DEBUG) # 设置总入口级别

# 2. 创建控制台 Handler
c_handler = logging.StreamHandler()
c_handler.setLevel(logging.INFO) # 控制台只看 INFO 以上

# 3. 创建文件 Handler
f_handler = logging.FileHandler("error.log")
f_handler.setLevel(logging.DEBUG) # 文件记录所有细节

# 4. 创建并添加格式器
c_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
f_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
c_handler.setFormatter(c_format)
f_handler.setFormatter(f_format)

# 5. 将 Handler 添加到 Logger
logger.addHandler(c_handler)
logger.addHandler(f_handler)

# 使用
logger.info("这是一个普通消息")
logger.error("这是一个错误消息")
```

### 5. 常用日志操作技巧

- **记录异常堆栈**：在 `except` 块中使用 `logger.exception()` 会自动记录完整的错误堆栈信息。
    
    ```python
    try:
        1 / 0
    except Exception:
        logger.exception("捕获到异常：")
    ```
    
- **动态格式化**：使用 `%` 风格或 `f-string`（在 logging 中推荐传参而非直接格式化字符串，以提高效率）。
    
    ```python
    logger.info("用户 %s 登录成功", "Admin")
    ```
