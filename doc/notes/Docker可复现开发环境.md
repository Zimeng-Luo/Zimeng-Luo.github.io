---
title: "Docker 开发实践：镜像、容器、挂载与 GPU"
date: 2026-10-13
categories:
  - 笔记
tags:
  - 开发实践
  - 环境复现
  - 容器使用
coverImg: /blog/bg31.jpg
sidebar: false
description: "从一次运行到可复现工作流，说明文件持久化、容器生命周期和 GPU 前提。"
---

# Docker 开发实践：镜像、容器、挂载与 GPU

Docker 镜像是可复用模板，容器是根据镜像启动的隔离进程实例。它们可以帮助复现依赖环境，但运行配置、数据路径与宿主资源仍要明确。

## 先确认客户端和服务端

```bash
docker --version
docker version
docker info
```

客户端存在不等于 Docker 服务端可用。Linux、Docker Desktop 和远程 daemon 的连接方式可能不同；理解当前连接哪个 daemon，才能确定容器在哪里运行。

## 一次性的交互容器

```bash
docker pull ubuntu:22.04
docker run --rm -it --name practice ubuntu:22.04 bash
```

`-i` 保持输入，`-t` 分配终端，`--rm` 在容器退出后移除容器，`--name` 指定名称。退出不会删除镜像。标签可随发布变化，严格复现时记录镜像 digest 及平台架构。

```bash
docker ps
docker ps -a
docker exec -it practice bash
```

`exec` 要求容器已经在运行；示例中的 `practice` 退出并自动删除后就不能再进入。需要长期运行时，应选择持续运行的进程与相应生命周期管理方式。

## 挂载决定数据存在哪里

Linux / macOS：

```bash
docker run --rm -it \
  -v "$PWD:/workspace" -w /workspace \
  ubuntu:22.04 bash
```

PowerShell：

```powershell
docker run --rm -it -v "${PWD}:/workspace" -w /workspace ubuntu:22.04 bash
```

绑定挂载让宿主目录出现在容器中；写入挂载目录会改变宿主文件。仅写容器的可写层，在容器删除后就会丢失；需要持久化的路径应使用绑定挂载或命名卷。

挂载某个路径会遮蔽镜像中该路径原来的内容，不是自动合并。还要考虑宿主与容器的用户 ID、权限及路径解析，避免结果文件变成当前用户无法修改。

## GPU 有额外前提

```bash
docker run --rm --gpus all \
  pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime \
  python -c "import torch; print(torch.cuda.is_available())"
```

这是原资料使用的示例镜像标签，不代表最新或适用于所有机器。运行要求宿主有兼容 GPU 与驱动，并完成 NVIDIA Container Toolkit 等必要配置。镜像里存在 CUDA 库，不等于宿主 GPU 已正确暴露。

挂载项目并运行时，仍需要设置工作目录 `-w`，镜像的运行时版本与项目依赖也应匹配。容器没有把代码变成自动多卡程序。

## 将手工过程变成可重复配置

学习时可以交互探索，长期项目则把依赖写进 Dockerfile 或已有项目配置，并保存启动参数、挂载位置、环境变量需求和检查方式。凭据不写进镜像或文章示例。

镜像解决基础运行环境，项目锁文件解决具体依赖版本，数据版本和启动命令决定最终实验。三者都明确，才能减少“同一镜像却结果不同”的问题。
