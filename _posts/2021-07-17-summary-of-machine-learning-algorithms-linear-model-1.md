---
title: "机器学习算法系列 - 最小二乘法/岭回归/Lasso"
date: 2021-07-17 16:36:31 +0900
category: machine learning
tags: algorithm formula
---
**普通最小二乘法**(Ordinary Least Squares, OLS), **岭回归**(Ridge Regression), 最小绝对值收留和选择算子(Least absolute shrinkage and selection operator, **Lasso**), 这三个算法是线性模型中比较基本的算法. 这一篇文章里一次性对这三个进行一个简单的总结.

首先, 因为三者都是线性模型, 所以首先假设我们该模型为:

$$
y(w,x)=w_0+w_1x_1+\dots+w_mx_m\notag
$$

其中 $w=(w_1,\dots,w_m)$ 称为系数 (coefficient), 而 $w_0$ 称为截距 (intercept), 而三个算法就是为了找出系数和截距. 使用矩阵的方式表达显得更亲切:

$$
y=\begin{bmatrix}y_1\\y_2\\\vdots\\y_n\end{bmatrix},
X=\begin{bmatrix}
1&x_{11}&x_{12}&\dots&x_{1m}\\
1&x_{21}&x_{22}&\dots&x_{2m}\\
\vdots&\vdots&\vdots&\dots&\vdots\\
1&x_{n1}&x_{n2}&\dots&x_{nm}
\end{bmatrix},w=\begin{bmatrix}w_0\\w_1\\w_2\\\vdots\\w_m\end{bmatrix}\\\notag
y=Xw
$$

# 普通最小二乘法

最小二乘法可能是我接触到最早的机器学习的算法了. 研究生期间经常通过推导出的传递函数去拟合电路仿真的理想结果, 从而确定电路参数, 这本身就是最小二乘法的一个非常重要的应用 -- [曲线拟合](https://zh.wikipedia.org/wiki/%E6%9B%B2%E7%B7%9A%E6%93%AC%E5%90%88). 而最小二乘法中的线性或者说普通的最小二乘法, 作为统计回归分析中的一个手段, 是比较容易理解的一个算法. 其可以分解成:

1. 随机给出一组系数 $w$;

2. 使用 $w$ 结合数据集的特征量 $X$ 计算出预测值 $Xw$;

3. 计算预测值和实际值之间的差, 即模型的损失函数, 这里特指残差平方和 (也就是L2范数) $e^2=\left\|y-Xw\right\|_2^2$

4. 求出使得残差平方和取得最小值的 $w$[^1], 也可以使用更简单的矩阵的方法求出 $w$.

用一个简单的图表示出来就是:

![OLS](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210619195655.png)

一堆蓝色的点为观测数据, 看着是满足线性关系的感觉. 而橙色的直线就近似的表达了 $x$ 和 $y$ 之间这种线性的关系, 蓝色短线就是预测值和实际数据之间残差大小. 使得所有蓝线距离之和最小的参数就是我们要找的参数. 具体的数学表达为:

$$
\min_{w}\left\|y-Xw\right\|_2^2=\min_w\sum_{i=1}^n\left(y_i-x_i^Tw\right)^2\notag\\
\rightarrow \hat w=(X^TX)^{-1}X^Ty
$$

这里的 $\hat w$ 是利用矩阵的方式求得的参数结果.

---

**矩阵的解法(TL;DR)**:

假设满足使得 $X$ 和 $y$ 线性关系的参数矩阵为 $\hat w$. 那么就有:

$$
\begin{align*}
X\hat w &= y\\
X^TX\hat w &= X^Ty\\
\hat w&=(X^TX)^{-1}X^Ty
\end{align*}
$$

而最后一步成立的条件就是 $X^TX$ 是可逆的, 也就是说是满秩的. 但是如果特征量之间的相关性很强时 (也称之为变量的共线性), $X^TX$ 就会很小, 甚至趋于0. 这个时候就需要对这个矩阵做些处理了, 也就带来了岭回归.

---

在 Scikit-Learn 中, 实现普通最小二乘法算法的是 `LinearRegression` 模型.

```python
from sklearn.linear_model import LinearRegression
from sklearn.datasets import make_regression

# 生成数据
X, y = make_regression(
    n_samples=50, n_features=1, n_informative=1, random_state=0, noise=4
)

# 训练模型
model = LinearRegression()
model.fit(X, y)

# 配置参数并绘图
w, b = model.coef_[0], model.intercept_
y_dash = w * X + b
plt.scatter(X, y)
plt.plot(X, y_dash, c="C1")
plt.show()
```

模型的参数反映在 `coef_` 和 `intercept_` 中, 有了这两个值就得到了近似直线. 绘图结果:

![OLS_sklearn](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210619203040.png)

最小二乘法估算系数的手段在统计学中也称为**最小二乘估计**. 正如上面提到的为了能够使用最小二乘估计得到唯一的参数解, 特征量 $X$ 必须满足线性无关. 如果线性相关了, 得到的解会对特征量非常的敏感, 这种情况称为**多重共线性** (multicollinearity), 因此数据一定要经过处理, **特别是要去除掉高度相关的特征量**, 也就出现了改良的算法.

# 岭回归

有时也被称作脊回归、吉洪诺夫正则化(Tikhonov regularization). 可以看作是最小二乘法的改良版. 其目的在于改善普通最小二乘法的多重共线性问题. 主要做法是向损失函数增加一个L2范数的惩罚项:

$$
\begin{align*}
&\min_w\left\|Xw-y\right\|_2^2+\lambda\left\|w\right\|_2^2\\
=&\min_w\sum_{i=1}^m\left(y_i-x_i^Tw\right)^2+\lambda\sum_{i=1}^nw_i^2
\end{align*}
$$

其中 $\lambda\geq0$ (有时也用 $\alpha$, 两者是等价的) 称为正则化参数, 复杂系数或者岭参数, 该值越大对于异常的 $w$ 的惩罚越大, 使得训练得到的系数对于多重共线性问题更加的稳健. 以矩阵的形式表达出来:

$$
\hat w =(X^TX+\lambda I)^{-1}X^Ty\notag
$$

L2范数惩罚项的加入, 使得原本的 $(X^TX)$ 变成了 $(X^TX+\lambda I)$ 从而保证了满秩和可逆. 但同时也放弃了最小二乘法的无偏性, 以降低精度为代价解决了病态矩阵问题. (好像因为 $I$ 是单位矩阵, 只有对角线有值, 所以名字叫岭回归.)

另外为了从物理角度理解岭回归, 上述的损失函数还可以等价为:

$$
f(w)=\sum_{i=1}^m\left(y_i-x_i^Tw\right)^2\\\notag
s.t.\sum_{i=1}^nw_i^2\leq t
$$

可以理解为在一个约束条件下的最小二乘法. 假设变量的个数为两个, 那么残差平方和就可以表示为 $w_1, w_2$ 的一个二次函数, 它是一个在三维空间中的抛物面, 可以使用等值线表示. 如果没有限制条件, 那么通过梯度下降法一定能够找到位于椭圆中心的那个最优值点. 而限制条件 $w_1^2+w_2^2\leq t$ 则相当于二维平面中的一个圆, 限制了两个变量的取值范围. 所以当等值线与圆相切的时候, 才能得到了约束条件下的最优点.

<img src="https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210620101826.png" alt="ridge_geometry" style="zoom: 50%;" />

---

在 Scikit-learn 中, 实现岭回归的方式是 `Ridge` 模型. 使用方法和 `LinearRegression` 基本一致, 只是需要一个岭参数 $\alpha$, 这里不再赘述. 需要关注的官方文档中给出的一个参数值随正则化参数 $\alpha$ 变化而变化的趋势图([参考连接](https://scikit-learn.org/stable/auto_examples/linear_model/plot_ridge_path.html#sphx-glr-auto-examples-linear-model-plot-ridge-path-py)):

<img src="https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210717203842.png" alt="sphx_glr_plot_ridge_path_001" style="zoom: 80%;" />

这个图可以看出, 对于一个病态矩阵的问题 (任何一个元素的些许变动, 比如说数据的噪声, 导致整个矩阵的行列式值和逆矩阵发生很大的变化), 当正则化参数取值很大时(图的左侧), 损失函数受到惩罚项的影响就会占到主要作用, 各个特征参数都表现会<u>接近于 0</u>, 呈现出欠拟合状态; 而取值很小时(接近于0, 图的右侧), 损失函数则趋于最小二乘法的损失函数, 呈现出过拟合状态, 并且此时特征参数表现出了很大的震荡. 

这再次说明了最小二乘法在面临病态矩阵问题时, 受到数据噪声的影响太大. 而岭回归则通过引入L2范数的惩罚项使得影响减弱. **正是这个特性, 使得岭回归相比于最小二乘法更适用于共线性和病态数据的拟合, 常用于多维问题.** 不过同时需要注意的是, 作为超参数的 $\alpha$, 取值大小的平衡是非常重要的. 而 Scikit-learn 中内置的 `RidgeCV` 是集成了交叉验证的岭回归模型训练器, 能够帮助我们找到适合的正则化参数.

# Lasso

也叫套索回归, 也是OLS的改良版. 和岭回归的区别是, Lasso向损失函数增加一个L1范数的惩罚项.

$$
\begin{align*}
&\min_w\left\|Xw-y\right\|_2^2+\lambda\left\|w\right\|_1^2\\
=&\min_w\sum_{i=1}^m\left(y_i-x_i^Tw\right)^2+\lambda\sum_{i=1}^n|w_i|
\end{align*}
$$

因为L1范数是绝对值的形式, 损失函数在零点处不可导, 所以不能求得解析解. 所以使用梯度下降法求解最小值. 和岭回归一样, 从物理角度去看, 上述的式子等价为:

$$
f(w)=\sum_{i=1}^m\left(y_i-x_i^Tw\right)^2\\\notag
s.t.\sum_{i=1}^n|w_i|\leq t
$$

也是一个在约束条件下求解最小值的问题. 假设变量也是两个, 则限制条件 $\|w_1\|+\|w_2\|\leq t$ 则相当于二维平面中的一个矩形. 两者相交时得到最优点.

<img src="https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20210711235439.png" alt="Lasso_geometry" style="zoom:50%;" />

Scikit-learn中使用 `Lasso` 模型实现 Lasso 算法. 使用方法也是传入一个正则化参数即可, 这里不赘述.

需要注意的是, 与岭回归不同的地方在于, Lasso回归引入的L1范数惩罚项会使得某些特征参数的值<u>变成 0</u>(岭回归只会使得参数更容易趋于0但不等于0). 那么为什么L1范数会比L2范数更能使得参数为 0 呢? 因为从上面的两张物理意义图中可以看出, 概率上方形的约束条件更容在坐标轴的顶点上与等值线产生交点. 圆形则是更容易在除坐标轴以外的地方产生相切点.

由于上述的特征, Lasso算法可以通过调整正则化参数, 使得一些特征量的权重参数为 0, 也就是删除这些特征量 (这也会使得计算量会变小). **因此Lasso回归也能够用来做特征选择.**  Lasso名字中的 Selection Operator 也指出了这一点. 另外和岭回归一样, 通过交叉验证, 选择出一个合适的正则化参数也是非常重要的.

---

以上就是线性模型中常用的基本的三个算法. 写的内容不是很难, 但是在写的过程中我发现文章当中"统计模型" 以及 "机器学习" 的内容似乎混杂在了一起. 这不禁让我对这两者的区别产生了思考, 所以这篇文章花了相当长的时间. 估计之后会写一篇新的文章, 以总结自己针对两者的区别的调查和思考.

[^1]: 这篇文章暂时不涉及求取最小值的方法, 多是采用梯度下降法.