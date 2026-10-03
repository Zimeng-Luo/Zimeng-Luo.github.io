---
title: 02 LaTeX语法
date: 2026-09-02
categories: ["分享", "工具", "Markdown与LaTeX"]
tags: ["Markdown与LaTeX", "工具"]
sidebar: false
---

# LaTeX 语法

## 核心摘要

本篇用于查阅 LaTeX 论文写作的基础结构，包括文档骨架、常用宏包、标题层级、列表排版、图片插入和 BibTeX 参考文献管理。

使用 LaTeX 写论文一般使用 Overleaf。

[overleaf](https://www.overleaf.com/project)

## 1. 文档基础骨架

任何一个标准的 LaTeX 文档都由**导言区**（Preamble，用于全局设置和引入宏包）和**正文区**（Document Environment）组成。

```latex
% --- 导言区开始 ---
\documentclass[12pt,a4paper,UTF8]{article} % 12号字体，A4纸张，UTF-8编码，article类
\usepackage{ctex} % 必须引入，用于支持中文排版
% ... 此处引入其他宏包 ...
% --- 导言区结束 ---

% --- 正文区开始 ---
\begin{document}

% 你的论文正文内容写在这里

\end{document}
% --- 正文区结束 ---
```

## 2. 常用必备宏包（Packages）

根据你的源码，以下是你写论文时通常需要配置的宏包及功能说明：

| **宏包代码**                                     | **核心作用**                           |
| -------------------------------------------- | ---------------------------------- |
| `\usepackage{amsmath}`                       | 提供高级数学公式排版支持。                      |
| `\usepackage{graphicx}`                      | 允许插入图片（配合 `\includegraphics` 使用）。  |
| `\usepackage{float}`                         | 提供严格的图表位置控制（如强制固定在当前位置的 `[H]` 参数）。 |
| `\usepackage{geometry}`                      | 用于自定义页面边距。                         |
| `\usepackage[numbers,sort&compress]{natbib}` | 强大的参考文献管理，支持数字标号和连续序号压缩（如 [1-3]）。  |
| `\usepackage{url}`                           | 允许在参考文献或正文中格式化显示和点击 URL 链接。        |

**页面边距设置示例：**

```latex
\geometry{left=2.5cm,right=2.5cm,top=2.5cm,bottom=2.5cm}
```

## 3. 标题与多级结构

LaTeX 会自动为你处理章节编号和字体大小。

```latex
% --- 论文大标题自定义居中 ---
\begin{center}
    \textbf{\huge 立项报告} % \huge 表示超大号字体，\textbf 为加粗
\end{center}
\vspace{1em} % 手动增加 1em 的垂直空白间距

% --- 章节层级 ---
\section{立项背景}       % 一级标题 (例如：1 立项背景)
\subsection{阶段一}      % 二级标题 (例如：1.1 阶段一)
\subsubsection{具体任务} % 三级标题 (例如：1.1.1 具体任务)
```

## 4. 文本高亮与列表排版

在梳理痛点或罗列技术路线时，列表环境是最常用的。

**局部文本格式化：**

- **加粗**：`\textbf{你的文字}`

- **下划线**：`\underline{你的文字}`

- **强制换行**：在行尾使用 `\\`

**有序列表（带数字编号）：**

```latex
\begin{enumerate}
    \item \textbf{痛点一}：传统方法成本过高...
    \item \textbf{痛点二}：算法重建难度大...
\end{enumerate}
```

**无序列表（带圆点）：**

```latex
\begin{itemize}
    \item \textbf{交互界面获取} \\ 使用 Python 构建界面...
    \item \textbf{智能航线规划} \\ 调用地图 API...
\end{itemize}
```

## 5. 高级图片插入技巧

你的源码中大量使用了带 `[H]` 参数的 `figure` 环境，这是防止 LaTeX 图片“乱跑”（浮动）的最佳实践。

```latex
\begin{figure}[H] % [H] 必须配合 float 宏包使用，表示“严格在当前位置(Here)插入”
    \centering % 图片居中对齐
    \includegraphics[width=0.8\textwidth]{01.png} % 宽度设为页面文本宽度的 0.8 倍
    \caption{原生VGGT在大场景下存在的困难} % 图片下方的标题说明
    \label{fig:01} % 打上标签，用于正文中的交叉引用
\end{figure}
```

> 💡 管家补充：
> 在正文中如果想引用这张图，只需写 `如图 \ref{fig:01} 所示`，系统会自动填入正确的图号。

## 6. 参考文献管理 (BibTeX 配合 Natbib)

当文献较多时，使用 `.bib` 文件分离管理是最高效的做法。

```latex
% 强制列出未在正文中直接 \cite{} 引用的文献（将所有引用的 key 列出）
\nocite{lindenbergerLightGlueLocalFeature2023, liuCityGaussianRealTimeHighQuality2025}

% 设置参考文献引用的格式（gbt7714-numerical 为国标数字格式）
\bibliographystyle{gbt7714-numerical} 

% 指定存放文献信息的 .bib 文件名称（不需要加 .bib 后缀）
\bibliography{ref} 
```

