---
title: "Summary of Machine Learning Algorithms -- Support Vector Machine"
date: 2018-12-02 10:10:42 +0900
category: machine learning
tags: algorithm formula
toc: true
typora-root-url: ..
---

**Support Vector Machine** (SVM) has become a more and more popular algorithm in the field of ML, even some times more than **Neural Network** (NN). It is widely used for classfication and regression. So, in this post I will give a brief about the SVM.

# Brief Introduction

支持向量机是一种监督学习学习方式, 对于分类问题有很好的性能. 而且它是一种非概率性的学习方式-- 也就是说, 它能够直接得到分类的结果, 而不像逻辑回归那样得到的是属于某个类的概率. 另外, 支持向量机中关于"核函数"的小技巧, 也使得它有着更广泛的使用范围. "核函数"的概念也被用在了其他分类学习方式当中去.

# Support Vector Machine

首先, 假设我们有两种类型的数据, 一种正类型, 一种负类型. Features 有两个$x_1$和$x_2$,在二维平面上如下图:

![SVM original dataset](/public/image/svm_original_data.png)

现在我们想画一条线将这两种类型的数据分开, 下面有三个可供选择的线条. 

![SVM with different classfication lines](/public/image/svm_with_3_lines.png)

显然, 中间的(b)最能够将数据分开. 那么怎么才能算"最能够将数据分开"呢? We can assume a hyperplane which divide dataset into two classes. And this plane has as longer distance as possiable to all the two kinds of data. We call it **separating hyperplane **(or decision boundray). Equation for hyperplane:
$$
\vec w\cdot \vec x + b=0
$$
$\vec w$ is the vector perpendicular to the hyperplane. The magnitude of $\vec w$ is unkown. $\vec x$ are the vectors on the hyperplane. $b$ is bias.

For negative objects:
$$
\vec w\cdot \vec x_- + b\leq1
$$
For positive objects:
$$
\vec w\cdot \vec x_+ + b\geq1
$$
The thing what we want to do is **very easy**,  it just is checking the result of:
$$
\text{sgn}(\vec w\cdot\vec x+b)
$$
If it's plus then it belongs to positive class, otherwise it belongs to negitive class.

The big problem is how to find the unknow $\vec w$ and $b$. We can select two parallel hyperplanes that separate the two classes of data, so that the distance between them is as large as possible. The distance between these hyperplanes is called **margin**.

The two hyperplanes can be described by:
$$
\vec w\cdot \vec x_i + b=1 \\
\vec w\cdot \vec x_i + b=-1
$$
If $y_i$ presents the class of $i$th piece of data, 1 for positive and -1 for negitive, then the two equations can be written into one:
$$
y_i(\vec w \cdot \vec x_i + b) =1
$$
Those vectors in the plane are called **support vector**. The width between two hyperplanes:
$$
\begin{align}
\text{Width} &= (\vec x_+-\vec x_-)\cdot \frac{\vec w}{||\vec w||} \notag\\
&=(\vec w\cdot\vec x_+-\vec w\cdot\vec x_-)\cdot \frac{1}{||\vec w||} \notag\\
&=(1-b+1+b)\cdot \frac{1}{||\vec w||} = \frac{2}{||\vec w||}
\end{align}
$$
The thing what we want to do is maxmum the width:
$$
\text{max Width}\to\text{max}\frac{2}{||\vec w||} \to \text{min}||\vec w||\to\text{min}\frac{1}{2}||\vec w||^2
$$
Now the problem becomes:
$$
\text{min} \frac{1}{2}||\vec w||^2, s.t., y_i(\vec w \cdot \vec x_i + b) -1\geq0, i = 1,2\dots,n
$$
This problem can be solved by **Lagrange multiplier**:
$$
L(\vec w, b, \alpha) = \frac{1}{2}||\vec w||^2-\sum_{i=1}^{n}\alpha_i\left[y_i(\vec w\cdot\vec x_i + b)-1\right]
$$
Now we need know partial difference $L$ with respect to $\vec w$ and $b$ and let them equal to 0:
$$
\begin{align}
\frac{\partial{L}}{\partial \vec w_i} &= \vec w - \sum_{i=1}^{n}\alpha_i y_i \vec x_i = 0\notag\\
\frac{\partial{L}}{\partial b} &= - \sum_{i=1}^{n}\alpha_i y_i  = 0
\end{align}
$$
We got the $\vec w$, and bring it back to the Largrange muptiplier:
$$
\begin{align}
L(\vec w, b, \alpha) &= \frac{1}{2}\left(\sum_{i=1}^n\alpha_iy_i\vec x_i\right)^2-\sum_{i=1}^n\alpha_iy_i\vec x_i\left(\sum_{i=1}^n\alpha_iy_i\vec x_i\right)-\sum_{i=1}^n\alpha_iy_ib+\sum_{i=1}^n\alpha_i\notag\\
&=\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^n\alpha_i\alpha_jy_iy_j\vec x_i\vec x_j-\sum_{i=1}^n\sum_{j=1}^n\alpha_i\alpha_jy_iy_j\vec x_i \vec x_j - b\sum_{i=1}^n\alpha_iy_i+\sum_{i=1}^n\alpha_i\notag\\
&=\sum_{i=1}^n\alpha_i-\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^n\alpha_i\alpha_jy_iy_j\vec x_i\vec x_j
\end{align}
$$
This is a quadratic problem. The most popular way to solve the problem is sequential minimal optimization, **SMO**(Microsoft).