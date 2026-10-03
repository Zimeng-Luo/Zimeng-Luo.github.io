---
title: 01 Markdown基础
date: 2026-09-02
categories: ["分享", "工具", "Markdown与LaTeX"]
tags: ["Markdown与LaTeX", "工具"]
sidebar: false
---

# Markdown 基础

## 核心摘要

本篇用于查阅 Markdown 常用排版语法，包括标题、列表、引用块、代码区块、链接、图片、表格、提示框和文本格式。

## 1. 结构格式

### 1.1 标题

使用`#`来创建，数量代表层级

### 1.2 列表

列表可以进行混合嵌套, 可以在列表中使用引用等

- 无序列表：使用`-` 来控制每一项
- 有序列表：使用数字并加上`.`来控制
- 任务列表：如下

```markdown
- [ ] 未完成的任务
- [x] 已完成的任务
- [ ] 另一个未完成的任务
```

### 1.3 引用块

```markdown
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
```

引用块内可以使用几乎其它所有markdown元素

### 1.4 代码区块

```markdown
​```
多行代码内容
可以包含空行
保持原有缩进
​```
```

添加语言种类可以使用高亮

### 1.5 链接

```markdown
[链接名称](链接地址)
[链接文字](链接地址 "可选的标题")
```

### 1.6 图片

在这软件里直接复制粘贴得了

懒得写那么复杂的路径了

### 1.7 表格

```markdown
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```

### 1.8 提示框
``` markdown
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.


```

效果预览:
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.


## 2. 文本格式

- 粗体: `**粗体内容**`

- 斜体: `_斜体内容_`

- 粗斜体: `***粗斜体内容***`

- 分隔线: `***`

- 删除线: `~~删除线内容~~`

- 下划线: `<u>下划线<u>`

- 角注: `[^注释内容]`

- 行内代码: `` `内容` ``
  
  > 要显示反引号，使用"两点 空格 一点"这样的格式

- 高亮文本: `==高亮==`

