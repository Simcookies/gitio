---
title: "机器学习算法系列 - 逻辑回归"
date: 2021-05-09 16:36:31 +0900
category: machine learning
tags: algorithm formula
---
逻辑回归(Logistic Regression)也是非常经典以及常用的算法. 虽然名字叫做"回归", 但实际上是一个常用于解决分类且多是二分类问题的算法. 在一些文献中也会被称为对数回归或者最大熵分类. 在这个模型中, 使用了逻辑函数(Logit)对描述单个实验可能结果的**概率**进行建模.

# 逻辑回归

## Logit 函数和 Sigmoid 函数

为了讨论逻辑回归中的核心也就是Logit函数, 首先要看Odds. Odds 又叫发生比或者叫几率, 指的是一个事件发生和不发生的概率的比值.

$$
\text{odds}=\frac{p}{1-p}\notag
$$

如果能够预测出这个Odds, 也就能够计算得到该事件发生的概率了. 而Logit函数就是对这里的 Odds 取对数.

$$
\text{logit}(\text{p})=\log\frac{p}{1-p}\notag
$$

**问题假设**: 现在要预测能否通过银行的贷款审核(结果只有是否两种, 属于二分类问题), 而手头已有的数据特征量为用户的个人信息以及信用卡偿还信息等. (这里的特征量用 $x_i(i=1,2,\dots,n)$ 表示) 这里我们假设 $\text{logit}(\text{p})$ 和特征量之间服从线性关系 (至于为什么要这么假设, 到后面可以看到这个假设能够帮助我们做分类).

$$
\begin{align*}
&\log\frac{p}{1-p}=\theta_0+\theta_1x_1+\theta_2x_2+\dots+\theta_nx_n=\vec{\theta}\cdot\vec{x}\\
&\Rightarrow \frac{p}{1-p} = \exp(\vec{\theta}\cdot\vec{x})\\
&\Rightarrow p=\frac{\exp(\vec{\theta}\cdot\vec{x})}{1+\exp(\vec{\theta}\cdot\vec{x})}=\frac{1}{1+\exp(-\vec{\theta}\cdot\vec{x})}=g(\vec{\theta}\cdot\vec{x})
\end{align*}
$$

最后得到的这个假设函数称之为 Logistic 函数, 也叫 **Sigmoid 函数**.其函数图像为:

![sigmoid](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210502173103.png)

其横轴就是特征量的权重和, 纵轴就是该事件发生的概率. 再根据得到的概率, 设定一个阈值, 也叫决策边界(Decision Bound). 比如这里我们设置阈值为0.5, 概率大于0.5的认为该事件会发生, 也就是银行贷款能通过, 小于0.5则不能通过. 也就是说, 不同于决策树分类得到的结果, 逻辑回归不仅可以得到最终的分类结果, 还能够得到中间产物 -- 属于某一个类别的概率 $p$.

在日常生活中, 我们会用到加权求和分类的方法. 给用户每个特征量一个权重之后, 计算加权求和. 如果分数超过了某一个阈值我们就认为可以放贷. 其实这个方法用类似上述的数学语言表达的话, 可以认为最后计算的总分减去阈值是真正的权重和. 这个特征量的权重和超过零的话就判断为该事件发生, 反之为不发生.这里也用到了一个假设函数, 就是**阶梯函数**(Step function).

![sigmoid_and_step](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210502175321.png)

如上图所示, 阶梯函数更加直接. 但是阶梯函数在加权和接近于0的部分会非常的敏感, 对数据的误差容忍度很低, 并且其在0处不能够微分. 相比之下, Sigmoid函数就显得温和一些, 且单调递增可微.

## 逻辑回归的算法描述

有了 Sigmoid 函数的加持, 从特征量 $\vec{x}$ 到对数Odds $\text{logit}(\text{p})$ 的一一映射就产生了, 问题就在于如何确定式子里的参数 $\theta$ 的值. 其实逻辑回归本质上是在用简单线性回归的预测结果去逼近对数发生比或者说对数几率, 所以在**机器学习方法**这本书中, 周老师更愿意把 Logistic Regression 翻译成"对数几率回归", 简称"对率回归". 个人感觉非常赞同! (但是基于很多人还是会用"逻辑回归"这个词, 所以本文也保持这个名称)

同线性回归一样, 为了确定参数 $\theta$ 需要定义一个代价函数, 再通过优化算法最小化代价函数. 首先假设函数(Hypothesis)为:

$$
h_\theta(x)=\text{Sigmoid}(\theta^Tx)=\frac{1}{1+\exp(-\theta^Tx)}\notag
$$

需要进行学习的目标参数(Parameter)为上式中的 $\theta$. 线性回归中采用的代价函数为:

$$
J(\theta)=\frac 1 m\sum_{i=1}^{m}\frac 1 2\left(h_\theta\left(x^{(i)}\right)-y^{(i)}\right)^2\notag
$$

其中 $m$ 是数据的数量. 但是假设函数是 Logit 函数, 所以得到的代价函数将是非凸函数. 对于非凸函数使用梯度下降法将有可能找不到全局最小值. 这里采用对数极大似然估计可以将代价函数转换为凸函数:

$$
J(\theta)=\frac 1 m \sum_{i=1}^m\left[-y^{(i)}\log\left(h_\theta\left(x^{(i)}\right)\right)-\left(1-y^{(i)}\right)\log\left(1-h_\theta\left(x^{(i)}\right)\right)\right]\notag
$$

可以求得代价函数对 $\theta$ 的导数为:

$$
\frac\partial{\partial\theta_j}J(\theta)=\frac 1 m\sum_{i=1}^m\left(h_\theta\left(x^{(i)}\right)-y^{(i)}\right)x_j^{(i)}\notag
$$

利用上述的导数不断地更新参数 $\theta$, 就能获得最小的代价函数 $\min_\theta J(\theta)$:

$$
\theta_j\Leftarrow\theta_j-\alpha\frac\partial{\partial\theta_j}J(\theta)\notag
$$

这里的 $\alpha$ 为学习速率. 有了上面的值, 算法可以被描述为:

输入: 训练数据集 D, 学习速率 $\alpha$  
输出: 模型权重参数 $\theta$  
步骤:

1. 计算代价函数平均梯度;
2. 乘上学习速率;
3. 计算更新权重参数 $\theta$;

# 基于 Python Scratch 的实现

为了方便理解, 可以使用 Scikit-Learn 的 `make_classification` 帮助我们生成一堆用来分类的, 简单的数据.

```python
from sklearn.datasets import make_classification
X, y = make_classification(
    n_samples=20,
    n_features=1,
    n_informative=1,
    n_redundant=0,
    n_clusters_per_class=1,
    class_sep=0.7,
    random_state=0
)
```

这里生成了20组拥有两个类别的数据, 特征量的数量也只有1个. 绘制成图形如下图:

![下载](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210509124118.png)

首先定义代价函数:

```python
# 后续要用的 sigmoid 函数
def sigmoid(z):
    return 1.0 / (1 + np.exp(-z))


# 正向计算得到预测值
def predict(features, weights):
    z = np.dot(features, weights).ravel()
    hx = sigmoid(z)
    return hx


# 代价函数
def cost_fuction(features, labels, weights):
    predictions = predict(features, weights)
    class1_cost = -labels * np.log(predictions)
    class2_cost = (1 - labels) * np.log(1 - predictions)
    cost = (class1_cost - class2_cost).sum() / len(labels)
    return cost
```

再定义用于更新权重参数的核心函数:

```python
def update_weights(features, labels, weights, lr=0.01):
    predictions = predict(features, weights)
    gradient = np.dot(features.T, predictions - labels) / len(features)
    gradient *= lr
    weights -= gradient
    return weights
```

这里默认学习速率 lr 为 0.01. 最后定义包含核心算法的, 用于学习的函数:

```python
def train(features, labels, weights, lr=0.01, iters=1000, epochs=10, verbose=True):
    cost_history = []
    for i in range(iters * epochs):
        cost = cost_fuction(X, y, weights)
        cost_history.append(cost)
        weights = update_weights(features, labels, weights, lr)
        if i % iters == 0 and verbose:
            print(f"Epochs:{i // iters}, iters: {i}, cost: {cost}")
    return weights, cost_history
```

训练函数中的迭代次数不限, 而是用 Epoch 来指定. 每一个 Epoch 里面默认循环 iter = 1000 次, 并且输出每个Epoch的代价函数值, 以查看训练过程. 预先使用随机函数定义好初始的权重参数, 使用默认10次Epoch来训练.

```python
initial_weights = np.random.random(X.shape[-1])
weights, cost_history = train(X, y, initial_weights, epochs=10, lr=0.01)
```

上述代码的输出为:

```
Epochs:0, iters: 0, cost: 0.32268668797387234
Epochs:1, iters: 1000, cost: 0.1632418968511627
Epochs:2, iters: 2000, cost: 0.13241899314581226
Epochs:3, iters: 3000, cost: 0.11868723129920973
Epochs:4, iters: 4000, cost: 0.1108135413966402
Epochs:5, iters: 5000, cost: 0.10568263401138037
Epochs:6, iters: 6000, cost: 0.10206687727097812
Epochs:7, iters: 7000, cost: 0.09937998342713258
Epochs:8, iters: 8000, cost: 0.09730508677348992
Epochs:9, iters: 9000, cost: 0.09565536684950605
```

可以看到, 随着循环次数的增加, 代价函数的值再不断地变小. 可视化一下看一下:

![下载 (1)](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210509152656.png)

可以看出循环了10000次也就是10个Epoch的时候, 代价函数的值已经很小了, 就是说对于学习速率 0.01 的情况, 学习到这里就可以了. 尝试不同的学习速率:

![下载](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210509153535.png)

很明显的看到, 学习速率越大, 代价函数的值下降的也越快, 至少在这个例子里是这样. 对于复杂的问题的话, 合适的学习速率的选择是非常重要的. 对于 0.01 的学习速率, 得到其计算好的权重参数后, 考察一下其模型的精度. 还是用最直观的描点看:

![下载](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210509153941.png)

对比预测的点还有实际的点, 可以看到20点中有一个点(十分接近于0)预测发生了错位(精度为95%), 虽然可以通过继续学习提高精度, 但是基本上已经算可以了. 复杂的问题中不断地学习会导致过学习问题, 这也是很常见的.

# 基于 Scikit-Learn 的实现

Scikit-Learn中提供了 `LogisticRegression` 的函数. 至于数据我们采用 Scikit-Learn 的 Toy Datasets 中的判断乳腺癌阴阳性的数据集. 并且为了便于计算, 使用最大最小值 Scaler 将特征量映射到 (0, 1) 区间上去.

```python
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import MinMaxScaler

data = load_breast_cancer()
X = data.data
y = data.target
normalized_range = MinMaxScaler(feature_range=(0, 1))
X = normalized_range.fit_transform(X)
```

```python
from sklearn.linear_model import LogisticRegression

clf = LogisticRegression()
clf.fit(X, y)
clf.score(X, y)
# => 0.9718804920913884
```

就是这样的简单, 基本上默认的参数可以保证很高的精度, 达到了0.97以上.再尝试用我们自己的函数:

```python
initial_weights = np.random.random(X.shape[-1])
weights, _ = train(X, y, initial_weights, epochs=10, iters=5000, lr=1, verbose=False)
accuracy(classify(predict(X, weights)), y)
# => 0.9736379613356766
```

在使用很大的学习速率还有足够的迭代次数之后, 也能达到较高的精度. (当然这里还没有用到交叉验证, 用了之后我们的模型应该过学习的很厉害. 这一点这篇文章里暂时不考虑.) 

上述代码的原版在这里[Github](https://github.com/simcookies/algorithm_implement/blob/master/ml/Logistic_Regression_scratch.ipynb), 以上就是对逻辑回归算法的一的简单总结.
