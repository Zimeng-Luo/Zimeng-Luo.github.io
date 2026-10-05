---
title: "git操作基础"
date: 2026-10-05
categories:
  - 笔记
tags:
  - git
  - 命令行
  - 操作基础
coverImg: /blog/bg10.jpg
sidebar: false
description: 介绍git相关的基础知识, 以及git cli相关的基础知识和命令。
---

# git操作基础

## 基本概念

| 概念 | 作用 |
| --- | --- |
| 工作区 `working tree` | 当前正在编辑的文件 |
| 暂存区 `staging area` | 准备进入下一次提交的变更 |
| 本地仓库 `repository` | 保存提交历史的 `.git` 数据库 |
| 远程仓库 `remote` | GitHub、GitLab 等服务器上的仓库 |
| 提交 `commit` | 一次带说明的历史快照 |
| 分支 `branch` | 一条独立开发线 |

基本链路：

```bash
修改文件 -> git add -> git commit -> git push
```

## 初始化与克隆

```bash
git init
git clone https://github.com/user/repo.git
git clone git@github.com:user/repo.git
```

- `git init`：把当前目录初始化为 Git 仓库。
- `git clone`：从远程复制仓库到本地，并自动关联远程地址。

## 查看状态与历史

```bash
git status
git log --oneline
git diff
git diff --staged
```

| 命令 | 用途 |
| --- | --- |
| `git status` | 查看分支、修改、暂存和未跟踪文件 |
| `git log --oneline` | 简洁查看提交历史 |
| `git diff` | 查看工作区尚未暂存的差异 |
| `git diff --staged` | 查看暂存区即将提交的差异 |

## 暂存与提交

```bash
git add file.md
git add .
git commit -m "add git basic notes"
```

- `git add file.md`：只暂存指定文件。
- `git add .`：暂存当前目录下的多数变更。
- `git commit -m "..."`：提交暂存区内容。

提交信息应说明“做了什么”，避免只写 `update`、`fix`、`test`。

## 远程同步

```bash
git remote -v
git pull
git pull origin main
git push
git push origin main
```

| 命令 | 用途 |
| --- | --- |
| `git remote -v` | 查看远程仓库地址 |
| `git pull` | 拉取并合并远程更新 |
| `git push` | 推送本地提交到远程 |

拉取前建议先执行 `git status`，确认本地是否有未提交修改。

## 分支操作

```bash
git branch
git branch feature-notes
git checkout main
git checkout -b feature-notes
git switch main
git switch -c feature-notes
```

| 命令 | 用途 |
| --- | --- |
| `git branch` | 查看本地分支 |
| `git branch name` | 创建分支 |
| `git checkout name` | 切换到已有分支 |
| `git checkout -b name` | 创建并切换分支 |
| `git switch name` | 更清晰的切换分支写法 |
| `git switch -c name` | 更清晰的创建并切换写法 |

分支适合隔离不同任务，避免所有修改都堆在 `main` 上。

## 撤销与回退

```bash
git restore file.md
git restore --staged file.md
git commit --amend
git reset --soft HEAD~1
```

| 命令 | 用途 |
| --- | --- |
| `git restore file.md` | 丢弃工作区中某个文件的未暂存修改 |
| `git restore --staged file.md` | 把文件从暂存区移回工作区 |
| `git commit --amend` | 修改最近一次提交 |
| `git reset --soft HEAD~1` | 撤回最近一次提交，保留修改和暂存状态 |

`reset --hard` 会丢弃修改，使用前必须确认没有需要保留的内容。

## .gitignore

`.gitignore` 用于声明不需要 Git 跟踪的文件，常见对象是缓存、日志、虚拟环境和大体积产物。

```gitignore
__pycache__/
*.pyc
.venv/
env/
*.log
outputs/
checkpoints/
```

基本原则：

- 可再生成的文件通常不提交。
- 本地环境相关文件通常不提交。
- 模型权重、数据集、中间产物等大文件通常不直接提交。

## 最小工作流

```bash
git status
git switch -c feature-notes
git add notes.md
git commit -m "add notes"
git pull
git push
```

记忆顺序：

1. 先用 `git status` 看清当前状态。
2. 用 `git add` 选择要提交的变更。
3. 用 `git commit` 保存本地版本。
4. 用 `git pull` / `git push` 同步远程。

