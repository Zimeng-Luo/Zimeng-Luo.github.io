---
title: 01 Docker
date: 2026-09-02
categories: ["分享", "工具", "开发工具"]
tags: ["开发工具", "工具"]
sidebar: false
---

# Docker 基础

## 核心摘要

本篇用于查阅 Docker 的最小使用流程，包括镜像、容器、拉取镜像、运行容器、查看容器、进入容器、目录挂载和常见易错点。

## 1. 最小心智模型

先记住两个核心概念：

- 镜像 `image`：一个可复用的环境模板。
- 容器 `container`：镜像启动后实际运行的进程实例。

可以先把它理解成：

- 镜像像“模具”。
- 容器像“按模具启动出来的运行实例”。

## 2. Docker 在学习阶段的主要价值

- 快速复现别人的环境。
- 减少“我这里能跑、你那里不能跑”的问题。
- 不把本机 Python 环境越装越乱。

## 3. 安装后的第一检查

安装 Docker 后先检查：

```bash
docker --version
docker version
docker info
```

如果这些命令能正常返回，说明 Docker 基本可用。

## 4. `docker pull`

作用：从镜像仓库拉取镜像。

```bash
docker pull ubuntu:22.04
docker pull pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime
```

你只要先记住：

- 前半段是镜像名。
- 后半段冒号后面通常是标签 `tag`。

## 5. `docker run`

作用：启动一个容器。

最小例子：

```bash
docker run -it ubuntu:22.04 bash
```

常见参数：

- `-i`：保持标准输入打开。
- `-t`：分配一个终端。
- `--rm`：退出后自动删除容器。
- `--name`：给容器起名字。

例如：

```bash
docker run --rm -it --name my-ubuntu ubuntu:22.04 bash
```

## 6. `docker ps`

作用：查看正在运行的容器。

```bash
docker ps
docker ps -a
```

区分：

- `docker ps`：只看正在运行的容器。
- `docker ps -a`：看所有容器，包括已经退出的。

## 7. `docker exec`

作用：进入已经在运行中的容器，或在其中执行命令。

```bash
docker exec -it my-ubuntu bash
docker exec my-ubuntu ls /workspace
```

适用场景：

- 容器已经在后台跑着。
- 你想进去看文件、查日志、补执行命令。

## 8. 挂载本地目录到容器

这是学习阶段非常重要的一步。  
如果不挂载，本地改的代码不会自动出现在容器里。

Linux / macOS 常见写法：

```bash
docker run --rm -it -v $(pwd):/workspace ubuntu:22.04 bash
```

PowerShell 常见写法：

```powershell
docker run --rm -it -v ${PWD}:/workspace ubuntu:22.04 bash
```

含义是：

- 把当前本地目录挂载到容器里的 `/workspace`
- 这样你在本地编辑代码，容器里能直接看到

## 9. 在容器里跑一个最小 PyTorch 程序

如果你只想先跑通一个最小示例，可以直接使用 PyTorch 官方镜像思路：

```bash
docker run --rm -it pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime python -c "import torch; print(torch.__version__)"
```

如果要使用本机 GPU，常见写法是：

```bash
docker run --rm -it --gpus all pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime python -c "import torch; print(torch.cuda.is_available())"
```

如果要把当前项目目录挂进去一起跑：

Linux / macOS：

```bash
docker run --rm -it --gpus all -v $(pwd):/workspace -w /workspace pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime python demo.py
```

PowerShell：

```powershell
docker run --rm -it --gpus all -v ${PWD}:/workspace -w /workspace pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime python demo.py
```

其中：

- `-v 本地目录:/workspace`：挂载代码目录
- `-w /workspace`：把容器内工作目录切到 `/workspace`
- `--gpus all`：把可用 GPU 暴露给容器

## 10. Docker 里最容易错的点

- 分不清镜像和容器。
- 以为退出容器就等于删除镜像。
- 没挂载本地目录，结果容器里改的内容找不到。
- 容器里路径和本地路径混淆。
- 想用 GPU，却忘了加 `--gpus all`。
- 把容器当虚拟机用，什么都手工装，但不记录过程。

