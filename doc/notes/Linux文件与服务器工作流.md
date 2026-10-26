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
description: "文件与权限、服务器操作、压缩与解压的学习笔记。"
---

# Linux 服务器工作流：权限、传输、会话与任务管理

## 文件与权限

### 1. 文件、目录、软链接分别是什么
- 文件：存数据的基本单位，比如代码、日志、图片、模型权重。
- 目录：装文件的“容器”，本质上是名字到对象的映射。
- 软链接：一个指向目标路径的特殊文件，类似快捷方式。

### 2. 软链接和普通文件的区别
- 普通文件保存的是内容本身。
- 软链接保存的是“目标路径”。
- 目标文件删掉后，软链接会失效。

### 3. 权限位怎么看
执行 `ls -l` 时，你会看到类似：

```bash
-rwxr-xr--
drwxr-xr-x
lrwxrwxrwx
```

第一位代表类型：
- `-` 普通文件
- `d` 目录
- `l` 软链接

后面九位分三组：
- 拥有者权限
- 同组用户权限
- 其他用户权限

每组三位分别表示：
- `r` 读
- `w` 写
- `x` 执行

### 4. `chmod` 怎么用
`chmod` 用来改权限，常见有两种写法：

```bash
chmod 755 run.sh
chmod u+x run.sh
```

数字写法里：
- `r = 4`
- `w = 2`
- `x = 1`

所以：
- `7 = rwx`
- `6 = rw-`
- `5 = r-x`
- `4 = r--`

目录和文件的 `x` 含义不一样：
- 对文件：可执行
- 对目录：可进入、可访问里面的内容

### 5. `which`、环境变量和 `PATH`
`which` 用来找命令实际在哪个路径里。

```bash
which python
which pip
which ssh
```

如果系统找得到这个命令，说明它在 `PATH` 里。`PATH` 是 shell 查找命令时的搜索列表，通常用冒号分隔。

查看环境变量：

```bash
echo $PATH
printenv PATH
env | grep PATH
```

临时加路径：

```bash
export PATH="$HOME/bin:$PATH"
```

---

## 服务器操作

### 1. 连接服务器

| 任务 | 命令 |
| --- | --- |
| 默认登录 | `ssh user@host` |
| 指定端口 | `ssh -p 2222 user@host` |
| 指定密钥 | `ssh -i ~/.ssh/id_rsa user@host` |

登录后先检查：

```bash
hostname
pwd
nvidia-smi
```

### 2. 文件传输

#### 2.1 `scp`：单次复制

适合传少量文件。

```bash
scp local.txt user@host:/remote/path/
scp user@host:/remote/path/remote.txt .
scp -r mydir user@host:/remote/path/
```

#### 2.2 `rsync`：增量同步

适合反复同步项目目录。

```bash
rsync -avP mydir/ user@host:/remote/path/mydir/
```

| 参数 | 含义 |
| --- | --- |
| `-a` | 归档模式，保留主要文件属性 |
| `-v` | 显示同步过程 |
| `-P` | 显示进度，支持断点续传 |

### 3. `tmux`：断线保活

`tmux` 能让 SSH 断开后任务继续运行。

```bash
tmux new -s train
tmux ls
tmux attach -t train
tmux kill-session -t train
```

| 操作 | 说明 |
| --- | --- |
| `tmux new -s train` | 新建名为 `train` 的会话 |
| `Ctrl-b d` | 分离会话，不结束任务 |
| `tmux ls` | 查看会话 |
| `tmux attach -t train` | 重新进入会话 |
| `tmux kill-session -t train` | 关闭会话 |

### 4. 进程查看与终止

#### 4.1 查看进程

```bash
ps -ef | grep python
ps aux | grep train.py
ps -u $USER -f
ps -o user= -p PID
ps x
top
htop
```

| 命令 | 用途 |
| --- | --- |
| `ps` | 查指定进程是否存在 |
| `ps -u $USER -f` | 查看当前账号的进程，包含 PPID、启动时间和完整命令 |
| `ps -o user= -p PID` | 只输出指定 PID 所属用户，适合共享服务器上确认进程归属 |
| `ps x` | 查看自己拥有的所有进程，包含后台进程 |
| `top` / `htop` | 实时查看 CPU、内存和进程占用 |

只看当前账号的动态资源占用：

```bash
top -u $USER
htop -u $USER
```

统计或搜索自己的进程：

```bash
ps -u $USER | wc -l
ps -u $USER -f | grep python
```

`ps -u $USER | wc -l` 的结果通常比实际进程数多 1，因为包含标题行。

确认某个进程属于谁：

```bash
ps -o user= -p <PID>
```

`user=` 会去掉标题行，只保留用户名。共享服务器上结束进程前应先确认 PID 是否属于自己。

#### 4.2 结束进程

先温和结束，再强制结束。

```bash
kill PID
kill -9 PID
```

### 5. 僵尸进程

僵尸进程是已经结束、但父进程还未回收退出状态的子进程，状态通常是 `Z` 或 `<defunct>`。它不再消耗 CPU，但会占用进程表项。

处理原则：

- 不直接 `kill` 僵尸进程本身，因为它已经结束。
- 先找到父进程 `PPID`，确认父进程身份。
- 优先让父进程回收；必要时终止异常父进程。

最小排查流程：

```bash
ps -A -o stat,pid,ppid,cmd | grep -e '^[Zz]'
ps -p PPID -o pid,ppid,user,stat,cmd
kill -s SIGCHLD PPID
kill PPID
kill -9 PPID
```

| 步骤          | 说明                            |
| ----------- | ----------------------------- |
| 查 `Z` 进程    | 重点记录 `PPID`                   |
| 查父进程        | 确认是否是自己的任务或脚本                 |
| 发 `SIGCHLD` | 尝试让父进程回收子进程                   |
| 终止父进程       | 父进程卡死时再用，先 `kill` 后 `kill -9` |

如果大量反复出现僵尸进程，根因通常是程序没有正确调用 `wait()` / `waitpid()` 或处理 `SIGCHLD`。

### 6. GPU 查看与选卡

#### 6.1 查看 GPU

```bash
nvidia-smi
```

重点看：

- 哪张 GPU 空闲
- 剩余显存
- 当前进程和用户

#### 6.2 单卡或指定多卡

```bash
CUDA_VISIBLE_DEVICES=2 python train.py
CUDA_VISIBLE_DEVICES=1,3 python train.py
```

设定 `CUDA_VISIBLE_DEVICES=1,3` 后，程序内的 `cuda:0` 指可见列表里的第 1 张卡，也就是物理 1 号卡。

#### 6.3 PyTorch 多卡训练

前提是代码本身支持多卡。

```bash
CUDA_VISIBLE_DEVICES=0,1 torchrun --nproc_per_node=2 train.py
```

| 参数 | 含义 |
| --- | --- |
| `CUDA_VISIBLE_DEVICES=0,1` | 只让程序看到 0、1 两张卡 |
| `--nproc_per_node=2` | 启动 2 个进程，通常每进程 1 张卡 |

简单单进程多卡也可能使用：

```python
model = torch.nn.DataParallel(model)
```

工程中更常见的是 `torchrun` 分布式训练。

---

## 压缩与解压

### 1. 常用解压命令

| 文件类型 | 解压命令 | 说明 |
| --- | --- | --- |
| `.tar` | `tar -xvf file.tar` | 只打包，未压缩 |
| `.tar.gz` / `.tgz` | `tar -xzvf file.tar.gz` | gzip 压缩 |
| `.tar.bz2` | `tar -xjvf file.tar.bz2` | bzip2 压缩 |
| `.tar.xz` | `tar -xJvf file.tar.xz` | xz 压缩 |
| `.zip` | `unzip file.zip` | 常见跨平台压缩包 |
| `.gz` | `gunzip file.gz` | 解压单个文件 |
| `.bz2` | `bunzip2 file.bz2` | 解压单个文件 |
| `.xz` | `unxz file.xz` | 解压单个文件 |
| `.7z` | `7z x file.7z` | 保留目录结构 |
| `.rar` | `unrar x file.rar` | 保留目录结构 |

### 2. 解压到指定目录

#### `tar`

```bash
mkdir -p target_dir
tar -xzvf file.tar.gz -C target_dir
```

#### `zip`

```bash
mkdir -p target_dir
unzip file.zip -d target_dir
```

#### `7z`

```bash
mkdir -p target_dir
7z x file.7z -otarget_dir
```

注意：`7z` 的 `-o` 和目录名之间通常不加空格。

### 3. 先查看压缩包内容

| 文件类型 | 查看命令 |
| --- | --- |
| `.tar` / `.tar.gz` / `.tar.bz2` / `.tar.xz` | `tar -tf file.tar.gz` |
| `.zip` | `unzip -l file.zip` |
| `.7z` | `7z l file.7z` |
| `.rar` | `unrar l file.rar` |

建议先查看内容，避免压缩包直接把大量文件解到当前目录。

### 4. 常用参数理解

#### `tar` 参数

| 参数 | 含义 |
| --- | --- |
| `-x` | extract，解包 |
| `-v` | verbose，显示过程 |
| `-f` | file，指定文件名 |
| `-z` | gzip |
| `-j` | bzip2 |
| `-J` | xz |
| `-C` | 解压到指定目录 |

#### `zip` 参数

| 参数 | 含义 |
| --- | --- |
| `-d` | 解压到指定目录 |
| `-l` | 只列出内容 |
| `-q` | 静默模式，减少输出 |
| `-O` | 指定文件名编码 |

### 5. 中文文件名乱码

如果 `.zip` 解压后中文文件名乱码，可以尝试：

```bash
unzip -O GBK file.zip
```

如果系统没有 `unzip`、`7z` 或 `unrar`，先安装工具：

```bash
sudo apt install unzip p7zip-full unrar
```

### 6. 压缩命令速查

| 目标格式       | 压缩命令                                    |
| ---------- | --------------------------------------- |
| `.tar.gz`  | `tar -czvf archive.tar.gz dir_or_file`  |
| `.tar.bz2` | `tar -cjvf archive.tar.bz2 dir_or_file` |
| `.tar.xz`  | `tar -cJvf archive.tar.xz dir_or_file`  |
| `.zip`     | `zip -r archive.zip dir_or_file`        |
| `.7z`      | `7z a archive.7z dir_or_file`           |
