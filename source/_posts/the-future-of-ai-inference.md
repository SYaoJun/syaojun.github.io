---
title: The Future of AI Inference
date: 2026-03-14 23:30:21
tags: llm
---
## 引言

总结一个最近看的视频，出自 1 月英伟达的 Dynamo Day，主要包括两方面：2025年PD分离的推理和2026年未来推理的趋势。
<!-- more -->
## 2025年推理主线：PD分离
目前LLM 推理的问题有以下两点：吞吐量(throughput)和延迟(latency)。
延迟通常两个更细的指标：首次 token 的时长(TTFT，time to first token)和每个 token 间的时长(TPOT，time per output token)。
这两个指标都是越快越好，这样输入prompt 后，立马就获得了响应。
个人理解LLM 推理应该还有一个成本问题。
“既要又要“不是做不到，只是用户不舍得花这么多钱。
因此在不同应用上可以有不同的服务等级目标(SLO,serve level object)，比如像 chatgpt，那么 TTFT 就需要很快，但是 TPOT 可以稍微慢一点；如果是论文总结，那么 TTFT 可以稍微慢一点，但是 TPOT 就要稍微快一点。
但是高吞吐量不等于高好吞吐量。

## high throughput != high goodput

如图所示，一秒处理 10 个请求，算是高吞吐，但是满足 TTFT 和 TPOT 的只有 3 个，所以有效的请求很少。
![high throughput](/images/1.png)

2025年一个大的趋势就是 PD(prefill/decode) 分离。prefill 和 decode 分别在不同的 GPU 上执行，先让 prefill worker 处理请求，然后将数据传输到 decode worker 处理。

## continuous batching 连续批处理

在 PD 分离之前，最好用的技术是连续批处理，但是这会给prefill 和 decode 阶段带来一些干扰。

![continuous batching cause interference](/images/2.png)

我来解释一下这个图片的含义：左边是传统连续批处理，右边是 PD 分离。图中蓝色柱子表示 decode 阶段，绿色柱子表示 prefill 阶段。在左边的图中，在 R1 执行 decode 的时候接收到了 R2 的请求，为了攒一批数据，R1 必须停下来等 R2 把 prefill执行完之后，再一起执行 decode。这个过程就带来了图中白色矩形显示的资源浪费。PD 分离之后就不会有这个问题，因为有两张卡。

图 3 就说明一件事，只要你有足够多的钱，TTFT 和 TPOT “既要又要“也是可以做到的。

![meet slo](/images/3.png)

## 机会: PD分离
1. 消除prefill 和 decode 两个阶段存在的干扰。
2. 将SLO 的目标自然的切分成两个优化方向：prefill 优化TTFT，decode 优化 TPOT。选择合适的资源和并行策略。

![better goodput](/images/4.png)
PD 分离之后每个 GPU 的利用率可以带来两倍的提升。原来 1 张卡，每秒每张卡处理 1.6 个请求，现在两张卡，每秒每张卡处理 3.3 个请求。

## 核心问题: XPYD


p1-placement: 解决 X和Y在给定负载需求，最大化GPU 的好吞吐。
p2-communication: 最小化XP 和YD 之间的KV Cache 通信成本。

一些不错的分离式推理系统：LMCache/HiCache/Dynamo/Cachegen/Deepseek-V3

## 2026 年 AI 推理的趋势
1. Attention-FFN 的分离
2. 扩散模型的流量正在急剧增长

这两个太超前了，我没怎么看懂。放两张图给大家感受一下，就是说可以将原本的执行流程切成小块，然后以 CPU 流水线的形式执行，可以起到一定加速的效果。

![better goodput](/images/5.png)
![better goodput](/images/6.png)
扩散模型方面，主要是视频生成，目前厂家生成视频的成本都很高，演讲嘉宾自己团队开源了一个 fastvideo似乎在尝试解决相关的问题，感兴趣的可以看一下。

## 附录
[the future of ai inference](https://www.nvidia.com/en-us/on-demand/session/other25-dynamoday09/?playlistId=playList-e42aee58-4db9-4ce4-8a6f-c41d8e272d72)