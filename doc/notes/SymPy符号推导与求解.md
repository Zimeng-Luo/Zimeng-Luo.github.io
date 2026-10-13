---
title: "SymPy 符号计算：表达式、方程与微积分"
date: 2026-10-13
categories:
  - 笔记
tags:
  - Python
  - 符号推导
  - 数学验证
coverImg: /blog/bg22.jpg
sidebar: false
description: "以符号建模到验证的顺序合并化简、求解、矩阵、微积分和公式输出。"
---

# SymPy 符号计算：表达式、方程与微积分

NumPy 擅长数值数组，SymPy 擅长保留变量和精确结构。符号计算不等于“任何表达式都能得到闭式解”，但可以帮助检查推导、明确条件并生成数值函数。

## 先区分 Python 变量与数学符号

```python
import sympy as sp

x = sp.symbols("x")
expr = x**2 + sp.Rational(1, 2)
value = expr.subs(x, 2)
print(value)               # 9/2
print(value.evalf(20))
```

`x` 是绑定到符号对象的 Python 名字。把 Python 名字重新绑定为 2，不会修改已创建的表达式；替换使用 `subs` 并接收返回结果。普通表达式不可变，默认 `Matrix` 则是可变对象。

`1/2` 在纯 Python 中已先算成浮点数，要保留精确有理数使用 `Rational(1,2)`。`evalf(n)` 的 n 表示有效数字精度，不是固定小数位数；原输入若已经近似，就不能靠提高显示精度恢复丢失信息。

## 结构相等、数学相等和方程

`==` 通常判断表达式结构，数学恒等可尝试化简差值；`Eq(left,right)` 则表示方程。

```python
expanded = (x + 1)**2
polynomial = x**2 + 2*x + 1
print(sp.simplify(expanded - polynomial))  # 0
```

化简为 0 是等价的有力证据，未化简为 0 不一定说明不等价。变量假设、定义域和奇点都需要考虑。

## 按所需结果选择化简

| 目的 | 工具 |
| --- | --- |
| 多项式展开 | `expand` |
| 因式分解 | `factor` |
| 按变量收集 | `collect` |
| 有理式约分 | `cancel` |
| 部分分式 | `apart` |
| 三角恒等式 | `trigsimp / expand_trig` |
| 探索一般化简 | `simplify` |

`simplify` 不承诺固定“最简”形式。幂和对数恒等式有定义域条件：复数主值下不能无条件把 `log(ab)` 拆为 `log(a)+log(b)`，也不能总把嵌套幂合并。可定义 `positive=True` 等假设，但这些假设必须符合问题，不要随意使用 `force=True` 改变意义。约分后仍需记录原式排除的点。

## 求解时明确解域与返回类型

```python
roots = sp.solveset(x**2 - 1, x, domain=sp.S.Reals)
print(roots)              # {-1, 1}
y = sp.symbols("y")
solution = sp.linsolve([x + y - 3, x - y - 1], (x, y))
print(solution)           # {(2, 1)}
```

单变量用 `solveset`，线性系统用 `linsolve`，非线性系统可用 `nonlinsolve`，部分复杂问题可以尝试 `solve`。条件集表示尚未给出显式解，不等于无解。集合不会重复列出多重根，重数问题可用 `roots`。

对数值求解结果，要检查定义域与代回残差；未求出的解不能描述为“已证明不存在”。

## 微积分与近似

```python
derivative = sp.diff(sp.sin(x), x)
area = sp.integrate(sp.exp(-x), (x, 0, sp.oo))
limit = sp.limit(sp.sin(x)/x, x, 0)
series = sp.exp(x).series(x, 0, 4)
print(derivative, area, limit, series)
```

`diff` 支持阶数和混合偏导，`integrate` 的不定积分不会自动加积分常数。奇点极限使用 `limit` 而不是直接 `subs`。级数末尾的 `O(x⁴)` 表示截断误差阶，不是额外的函数项。

`Integral(...).evalf(n)` 可做高精度数值积分；`Derivative`、`Integral` 等可以保留未求值对象，再调用 `doit()`。离散数据的导数可考虑有限差分工具，但误差与网格间距、光滑性和舍入有关。

常微分方程先声明未知函数：

```python
f = sp.Function("f")
ode = sp.Eq(sp.diff(f(x), x), f(x))
print(sp.dsolve(ode, f(x)))  # f(x) = C1*exp(x)
```

## 矩阵与推导验证

```python
A = sp.Matrix([[1, 2], [3, 4]])
b = sp.Matrix([5, 6])
result = A.LUsolve(b)
assert A * result == b
```

SymPy 矩阵的 `*` 是矩阵乘法，与 NumPy 数组不同。`rref` 给出行最简形及主元列，`nullspace`、`columnspace` 返回空间基，`eigenvals` 返回特征值及重数。向量函数的 `jacobian` 可计算雅可比矩阵。解方程通常直接求解，不为大型问题显式求逆。

## 输出和数值接口

`str` 输出一维文本，`pprint` 改善终端显示，`latex` 生成 LaTeX 源码；生成源码不意味着宿主页面自动开启公式渲染。

```python
numeric = sp.lambdify(x, sp.sin(x) + x**2, modules="numpy")
print(sp.latex(expr))
```

`lambdify` 将已构造的表达式转换为数值函数。`sympify` 等解析工具不适合直接处理任意不可信输入，也不能把字符串表示当成无需校验的安全序列化格式。保留假设、检验特殊点、代回结果，是让工具真正帮助推导的关键。
