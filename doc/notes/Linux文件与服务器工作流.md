---
title: "Linux 服务器工作流：权限、传输、会话与任务管理"
date: 2026-10-13
categories:
  - 笔记
tags:
  - 开发实践
  - 远程协作
  - 环境排查
coverImg: /blog/bg30.jpg
sidebar: false
description: "围绕远程任务完整流程，合并文件权限、服务器操作与压缩解压笔记。"
---

# Linux 服务器工作流：权限、传输、会话与任务管理

基础终端操作已有[专门笔记](./终端基础命令.md)。本文继续处理远程开发常见问题：为什么文件不能访问、任务断线后是否继续、结果怎样可靠传回本机。

## 文件权限先看对象类型

`ls -l` 的第一位区分普通文件、目录和软链接，其余三组三位分别表示拥有者、同组用户和其他用户的读、写、执行权限。

```bash
ls -l run.sh
chmod u+x run.sh
```

文件的 x 表示可执行；目录的 x 表示可以按路径访问目录内对象，r 用于列出名称，w 用于更改目录条目。删除文件主要取决于父目录权限，还可能受粘滞位等限制，不能只看文件是否可写。

软链接保存目标路径，目标消失时成为失效链接。检查命令来源可用 `command -v python` 或 `which python`；Shell 内建命令和别名需要结合 `type` 判断。PATH 的前后顺序决定同名可执行文件的优先级。

## 登录与传输

```bash
ssh -p 2222 user@host
scp -P 2222 result.txt user@host:/remote/path/
rsync -avP -e 'ssh -p 2222' results/ user@host:/remote/path/results/
```

SSH 的端口选项是小写 `-p`，SCP 是大写 `-P`。首次连接核对主机指纹；密钥用 `-i` 指定。登录后先确认 `hostname`、工作目录和账户，避免在错误机器上处理任务。

`rsync` 源路径末尾的斜杠决定复制目录内容还是目录本身；`-a` 尽量保留属性，`-P` 表示保留部分传输并显示进度。同步前可加 `--dry-run` 检查计划，不为简单复制顺手添加删除选项。

## 用 tmux 管理长任务

```bash
tmux new -s train
# 运行自己的任务后，用 Ctrl-b 再按 d 分离
tmux ls
tmux attach -t train
```

分离会话不终止任务，关闭会话则可能结束其中任务。tmux 保持的是终端会话，不会使机器重启、程序崩溃或资源耗尽变得无关紧要。

## 查看自己的进程再决定处理

```bash
ps -u "$USER" -f
ps -p 12345 -o pid,ppid,user,stat,cmd
top -u "$USER"
```

示例 PID 只是占位，需替换成实际值。结束前确认命令、用户和归属，通常先发送 TERM，让程序有机会清理；确认卡死且无正常退出方式后才考虑 KILL。

僵尸进程已经退出，等待父进程回收状态，不能直接杀掉它。应定位 PPID，检查父进程的 `wait/waitpid` 逻辑。给父进程发送 SIGCHLD 只有在它具有正确处理逻辑时才可能有帮助，不能保证自动回收。不要把终止父进程写成无需诊断的固定步骤。

## GPU 选择是可见性设置

```bash
nvidia-smi
CUDA_VISIBLE_DEVICES=2 python train.py
CUDA_VISIBLE_DEVICES=0,1 torchrun --nproc_per_node=2 train.py
```

设置可见设备后，程序内部设备编号重新从 0 开始。多卡启动要求训练代码本身支持分布式，设置变量不等于自动并行。共享机器要确认 GPU 资源安排，不只看某一瞬间显存为空。

## 压缩包先查看再解压

| 格式 | 查看内容 | 解压 |
| --- | --- | --- |
| tar / tar.gz | `tar -tf archive.tar.gz` | `tar -xzf archive.tar.gz -C target` |
| zip | `unzip -l archive.zip` | `unzip archive.zip -d target` |
| 7z | `7z l archive.7z` | `7z x archive.7z -otarget` |

目标目录需先存在或由工具创建。`.tar` 仅打包，gzip、bzip2、xz 对应不同压缩方式。中文文件名乱码可能是编码差异，`unzip -O` 并非所有实现支持，先确认工具版本再选择处理方式。

工作流的重点是明确机器、目录、资源和结果位置，再使用对应工具，避免只记命令却不知道它实际操作的对象。
