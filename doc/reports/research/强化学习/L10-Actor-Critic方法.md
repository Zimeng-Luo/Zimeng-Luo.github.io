---
title: L10 Actor-Critic方法
date: 2026-09-02
categories: ["报告", "研究", "强化学习"]
tags: ["强化学习", "研究"]
sidebar: false
---

# L10 Actor-Critic 方法

## 核心摘要

本节整理 Actor-Critic 方法如何结合价值学习和策略梯度：Actor 负责改进策略，Critic 负责估计价值并提供低方差的学习信号。查阅重点是 Q-AC、优势函数和 A2C 的参数更新公式。

## 1. 课程动机：结合价值与策略的优势

在前面的课程中，我们学习了两大类强化学习方法：

- **基于价值（Value-based）**：如 Q-learning、DQN。先学习价值函数，再隐含地推导策略（如 $\epsilon$-greedy）。缺点是难以处理连续动作空间。
    
- **基于策略（Policy-based）**：如 REINFORCE。直接参数化并学习策略网络。优点是能处理连续动作和随机策略，但缺点是使用蒙特卡洛回报 $G_t$ 更新，导致**方差极大、学习效率低**。
    

**Actor-Critic (AC) 方法**的诞生正是为了结合两者的优点：

- **Actor（演员）**：即**策略网络 $\pi_\theta(a|s)$**。负责在给定状态下选择动作，并在Critic的指导下更新策略参数 $\theta$。
    
- **Critic（评论家）**：即**价值网络**（如 $q_w(s,a)$ 或 $v_w(s)$）。负责评估Actor当前选择的动作有多好，并利用TD学习（时序差分）更新自己的参数 $w$，为Actor提供低方差的梯度指导。
    

---

## 2. Q-Actor-Critic (Q-AC)

这是最基础的 Actor-Critic 形式，Critic 使用动作价值函数 $q_w(s,a)$。

### 2.1 数学原理

根据策略梯度定理，策略的目标函数梯度为：

$$\nabla_\theta J(\theta) = \mathbb{E} \left[ q_{\pi_\theta}(S,A) \nabla_\theta \ln \pi_\theta(A|S) \right]$$

在 REINFORCE 中，我们用回合的总回报 $G_t$ 来近似真实的 $q_{\pi_\theta}(s,a)$。而在 Q-AC 中，我们**直接用一个神经网络 $q_w(s,a)$ 来逼近它**。

### 2.2 参数更新过程

1. **Critic 更新（评价动作）**：
    
    使用类似于 Sarsa 的 TD 学习方法更新价值网络参数 $w$：
    
    $$w_{t+1} = w_t + \alpha_w \big[ r_{t+1} + \gamma q_w(s_{t+1}, a_{t+1}) - q_w(s_t, a_t) \big] \nabla_w q_w(s_t, a_t)$$
    
2. **Actor 更新（改进策略）**：
    
    使用 Critic 给出的 Q 值来指导策略网络参数 $\theta$ 的更新：
    
    $$\theta_{t+1} = \theta_t + \alpha_\theta q_w(s_t, a_t) \nabla_\theta \ln \pi_\theta(a_t|s_t)$$
    

---

## 3. 优势演员-评论家 (Advantage Actor-Critic, A2C)

虽然 Q-AC 解决了方差极大的问题，但直接使用 Q 值作为梯度权重依然存在一定的波动。为了进一步**降低方差**，我们引入**基线（Baseline）**的概念，演进为 A2C 算法。

### 3.1 优势函数 (Advantage Function)

我们在策略梯度公式中减去一个基线 $v(S)$（状态价值函数），得到**优势函数**：

$$A_{\pi}(s, a) = q_{\pi}(s, a) - v_{\pi}(s)$$

- **物理含义**：优势函数衡量的是“在状态 $s$ 下采取动作 $a$，比该状态下所有动作的**加权平均表现**要好多少”。
    
- 引入基线后的策略梯度为：
    
    $$\nabla_\theta J(\theta) = \mathbb{E} \left[ A_{\pi}(S,A) \nabla_\theta \ln \pi_\theta(A|S) \right]$$
    

### 3.2 绝妙的数学替换：TD 误差

如果要直接计算 $A(s,a)$，似乎需要同时训练 $Q$ 网络和 $V$ 网络，这会增加系统的复杂性。但数学推导给出了一个极其优雅的结论：**TD 误差是优势函数的无偏估计**。

- **TD 误差**定义为：$\delta_t = r_{t+1} + \gamma v_w(s_{t+1}) - v_w(s_t)$
    
- 可以证明：$\mathbb{E}[\delta_t | s_t, a_t] = A_{\pi}(s_t, a_t)$
    

因此，在 A2C 中，我们**只需要一个状态价值网络 $v_w(s)$** 即可！

### 3.3 A2C 的参数更新公式

1. **计算 TD 误差 (Critic 的评价信号)**：
    
    $$\delta_t = r_{t+1} + \gamma v_w(s_{t+1}) - v_w(s_t)$$
    
2. **Critic 更新（优化打分能力）**：
    
    $$w_{t+1} = w_t + \alpha_w \delta_t \nabla_w v_w(s_t)$$
    
3. **Actor 更新（根据评价调整策略）**：
    
    $$\theta_{t+1} = \theta_t + \alpha_\theta \delta_t \nabla_\theta \ln \pi_\theta(a_t|s_t)$$
    

- **直观理解**：
    
    - 如果 $\delta_t > 0$：说明实际执行动作 $a_t$ 后的结果比预期的 $v(s_t)$ 要好（惊喜），Actor 就增加该动作的被选概率。
        
    - 如果 $\delta_t < 0$：说明动作表现不及预期（失望），Actor 就降低该动作的被选概率。
        

---

## 4. 总结 (Summary)

- **网络结构**：Actor-Critic 包含策略网络（Actor）和价值网络（Critic）。它们可以独立设计，但在深度强化学习中（如 A3C, PPO），为了提取公共特征，Actor 和 Critic 通常会**共享底层神经网络的隐藏层**，只在最后输出两个不同的头（一个是动作概率分布，一个是标量状态价值）。
    
- **步长/学习率**：通常 Critic 的学习率 $\alpha_w$ 要比 Actor 的学习率 $\alpha_\theta$ 大。因为 Critic 必须先准确评价出状态的好坏，Actor 才能跟着学到正确的策略（评价得准，才能学得好）。
    
- **算法地位**：Actor-Critic 框架结合了 Value-based 的低方差/单步更新特性与 Policy-based 的处理连续动作/随机策略特性，是现代强化学习最主流的基础架构（DDPG、TRPO、PPO、SAC 等先进算法均基于此框架）。

