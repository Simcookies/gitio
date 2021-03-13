---
title: "机器学习算法系列 - 决策树C4.5算法"
date: 2021-03-13 12:30:31 +0900
category: machine learning
tags: algorithm formula
toc: false
---

上一篇文章[机器学习算法系列 - 决策树ID3算法]({% post_url 2020-11-12-summary-of-machine-learning-algorithms-decision-tree-id3 %}), 对决策树中非常典型的 ID3 算法做了深入介绍. 这篇文章本来会大概总结一下 C4.5 算法. 但是由于 C4.5 算法与 ID3 算法高度的一致, 所以这里只谈及一些前者相对于后者的改进.

# 提出问题

ID3 算法的核心在于找到信息增益最大的特征, 在上一篇文章的例子当中, 就能感觉到其非常直观和易于理解. 但是在一些特殊的情况下, 单是绝对的信息增益是不能够找到真正最有用的特征的.

假设训练数据集中有一列 ID, 每条记录都有一个独立的 ID. 那么这个 ID 列的条件熵会变成 0 (因为在 ID 确定的条件下, 出现的类别数只有一个). 使用这个值为 0 的条件熵得到的信息增益就会非常大 (等于原来的信息熵). 从现实意义上看, 这也是符合的. 因为一条记录如果确定了它的 ID, 那么他的类别一定也是能被确定的. 原因就是 ID 这个信息里面包含了太多的信息量了. 但是显然不能使用 ID 作为一个节点的特征. 实际上, 对于某些特征来说, 其每个属性所包含的每个分类类别很多的时候, 都会得到很大信息增益. 这个时候只通过信息增益是不能选出有效的特征的.

概括地说, 就是一个特征其特征熵很大的时候信息增益就很大, 反之就很小.

# 解决方法

为了排除特征本身信息熵地干扰, C4.5 算法选择了信息增益率 (Gain Ratio) 作为选择分支的准则。对于特征熵很大的特征，除上一个相应的较大的数值，反之特征熵小的特征除一个较小的数值，使得特征的信息熵的影响变小。这里 C4.5 算法中所除以的数值使用了属性熵。

$$
H_A(D) = -\sum\limits_{i=1}^{n}\frac{|D_i|}{|D|}\log\frac{|D_i|}{|D|}\notag
$$

当数据集 $D$ 中 $A$ 属性里有很多不同的取值时，上述的属性熵就会变得很大。这样由信息增益除以该值所得到的增益率就能够正真反映出属性 $A$ 作为一个特征，区分样本的能力。**最终就避免了 ID3 趋向与选择取值较多的属性作为节点的问题**。

## 描述

1. 从根节点开始, 对节点计算所有可能的特征的信息增益;
2. 选择**信息增益比**最大的特征作为节点的特征, 构建子节点;
3. 对子节点递归调用上述方法, 构建决策树;
4. 直到所有特征的信息增益均很小 (可用事前决定的阈值进行判断) 或者没有特征可以选择

## 步骤

输入: 训练数据集 $D$, 特征集 $A$, 阈值 $\epsilon$  
输出: 决策树 $T$  
步骤:  

1. 若 $D$ 中所有实例输入同一类 $C_k$, 则 $T$ 为单节点树, 并将类 $C_k$ 作为该节点的类标记, 返回 $T$; (只有一个类的情况)
2. 若 $A=\varnothing$ , 则 $T$ 为单节点树, 并将 $D$ 实例数最大的类 $C_k$ 作为该节点的类标记, 返回 $T$; (没有特征量的情况)
3. 否则, 计算 $A$ 中各个特征对于 $D$ 的**信息增益比**, 选择信息增益比最大的特征 $A_g$;
4. 如果 $A_g$ 的信息增益比小于阈值 $\epsilon$, 则置 $T$ 为单节点树, 并将 $D$ 中实例数最大的类 $C_k$ 作为该节点的类标记, 返回 $T$; 
5. 否则, 对 $A_g$ 的每一个可能值 $a_i$, 依 $A_g = a_i$ 将 $D$ 分割为若干个非空子集 $D_i$, 将 $D_i$ 中实例数最大的类作为标记, 构建子节点, 由节点及其子节点构成树 $T$, 返回 $T$;
6. 对于第 $i$ 个子节点, 以 $D_i$ 为训练集, 以 $A-\{A_g\}$ 为特征集, 递归调用步1 ~ 步5, 得到子树 $T_i$, 返回 $T_i$.

可以看出 C4.5 算法和 ID3 算法除了特征选择的参照物不同之外，其他基本上是一致的。

# 基于 Python Scratch 的实现

对于同一个问题[预测能否贷款]({% post_url 2020-11-12-summary-of-machine-learning-algorithms-decision-tree-id3 %}#问题提出)，和前文的ID3一样，这里也给出 Python Scratch 的实现。代码上C4.5算法和ID3算法也是一致的，只是增加了计算属性熵的部分，并且原来取得最大信息增益的函数需要改为计算最大信息增益率的函数。

```python
def find_best_gain_ratio(X_train, y_train, features):
    h_d = calc_entropy(y_train)
    gr_max = 0
    feature_gr_max = 0
    for i in features:
        x_feature = X_train[:, i]
        ps = calc_probs(x_feature)
        Hs = [calc_entropy(y_train[x_feature == j]) for j in np.unique(x_feature)]
        h_da = sum(np.array(ps) * np.array(Hs))
        g = h_d - h_da
        # 计算属性熵
        h_ad = calc_entropy(x_feature)
        gr = g / h_ad
        if gr > gr_max:
            gr_max = gr
            feature_gr_max = i
    return gr_max, feature_gr_max
```

最终版的代码在这里 [Github](https://github.com/simcookies/algorithm_implement/blob/master/ml/Decision_Tree_C4.5_scratch.ipynb)。scikit-learn 的实现和之前的一篇完全一样，这里不再赘述。另外根据 scikit-learn 的官方文档，决策树中采用的并不是 ID3/C4.5 算法，而是 CART。（这就很尴尬😅了，不过知道算法的实现终归是好事。）

> scikit-learn uses an optimised version of the CART algorithm; however, scikit-learn implementation does not support categorical variables for now.

---

以上就是关于 C4.5 算法的说明。之后算法的发明者 Ross Quinlan 将算法更新到了 C5.0（有专利保护），使得计算更快，结果更精确，不过这就是另外的话了。