---
title: "LaTeX 写作：公式、文档结构与参考文献"
date: 2026-10-13
categories:
  - 笔记
tags:
  - 知识表达
  - 学术写作
  - 文档排版
coverImg: /blog/bg33.jpg
sidebar: false
description: "把公式速查和论文骨架合并，使用自包含语法示例替代缺失截图。"
---

# LaTeX 写作：公式、文档结构与参考文献

LaTeX 适合让公式、章节、图表和文献引用保持一致。网页中的公式片段与完整论文文档不同：前者由网页渲染器决定支持范围，后者由 TeX 编译系统处理。

## 公式先写结构，再写符号

行内公式常用 `$…$`，独立公式在许多 Markdown 数学扩展中用 `$$…$$`；完整 LaTeX 文档则优先用 `\(...\)`、`\[...\]` 或公式环境。

| 需求 | LaTeX 源码 |
| --- | --- |
| 上下标 | `x_i`、`x^{n+1}` |
| 分数、根号 | `\frac{a}{b}`、`\sqrt{x}` |
| 求和、积分 | `\sum_{i=1}^{n}`、`\int_0^1 f(x)\,dx` |
| 比较 | `\le`、`\ge`、`\ne` |
| 希腊字母 | `\alpha`、`\gamma`、`\Sigma` |
| 向量与粗体 | `\mathbf{x}`、`\boldsymbol{\theta}` |
| 箭头 | `\to`、`\Rightarrow` |

多字符上下标使用大括号分组。矩阵和多行公式可用 amsmath 的环境：

```latex
\begin{aligned}
v_\pi &= r_\pi + \gamma P_\pi v_\pi \\
(I-\gamma P_\pi)v_\pi &= r_\pi
\end{aligned}
```

`\\` 换行，`&` 设置对齐点。不要用空格对齐公式。编号可用 `equation` 环境和 `\label`，特殊编号使用 `\tag`，是否支持仍依环境而定。

## 一个中文文档骨架

```latex
\documentclass[UTF8,a4paper]{ctexart}
\usepackage{amsmath,graphicx,geometry}
\geometry{margin=2.5cm}
\title{学习笔记}
\author{作者}
\date{\today}

\begin{document}
\maketitle
\section{问题背景}
这里是正文。
\begin{equation}
E = mc^2
\label{eq:energy}
\end{equation}
见公式~\ref{eq:energy}。
\end{document}
```

示例通常使用 XeLaTeX 或 LuaLaTeX 等支持中文的配置，实际字体与宏包还依本机或 Overleaf 环境。`ctexart` 比把中文选项直接塞进普通 `article` 更明确。

## 章节、列表和图表

章节用 `section`、`subsection`，列表用 `itemize` 或 `enumerate`；让系统维护编号，不手写“图 3”后又忘记同步。

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.8\textwidth]{example.png}
  \caption{图像说明}
  \label{fig:example}
\end{figure}
```

`example.png` 只是源码示例中的占位文件，编译时需准备实际图片。`label` 放在 caption 之后，正文通过 `ref` 引用。`[htbp]` 让系统寻找合适浮动位置；`[H]` 需要 float 宏包且强制固定，不应把它当成所有论文排版的默认最佳方案。

## 参考文献按模板选择体系

传统 BibTeX 与 natbib 的示例为：

```latex
\usepackage[numbers,sort&compress]{natbib}
% 正文：相关研究见 \cite{paper_key}。
% 文末：
\bibliographystyle{plainnat}
\bibliography{references}
```

文献信息放在 `references.bib`。期刊或学校要求国标格式时，选择其支持的样式与宏包；biblatex/biber 是另一套体系，不应把两套命令随意混用。

`nocite` 用于明确列出未在正文引用的条目，不能代替真正的引文论证。检查引用 key、作者、标题和年份，以及最终样式；链接存在不代表文献信息准确。

## 编译与网页显示的边界

完整文档可能需要 LaTeX、BibTeX、再次 LaTeX 的多轮编译来解析交叉引用，编辑平台往往会自动处理。网页公式渲染通常只支持数学命令的一部分，不执行完整文档或加载任意宏包。

因此，把一份论文迁移到博客时，应保留推导结构，按目标页面能力展示公式。本次数学文章采用直接可读的文本公式，避免通过修改站点配置来超出文章编辑范围。
