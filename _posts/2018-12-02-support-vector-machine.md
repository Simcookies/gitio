---
title: "Summary of Machine Learning Algorithms -- Support Vector Machine"
date: 2018-12-02 10:10:42 +0900
category: machine learning
tags: algorithm formula
toc: true
typora-root-url: ../
---

**Support Vector Machine** (SVM) has become a more and more popular algorithm in the field of ML, even some times more than **Neural Network** (NN). It is widely used for classification and regression. So, in this post I will give a brief about the SVM.

# Brief Introduction

SVM is a kind of supervised learning method, it has good performance for classification problems. And it is a non-probabilistic way of learning, which means it can can directly get the result of the classification instead of the probability of the class which it belongs to (like logistic regression). In addition, the support of the "**Nuclear Function**" in SVM also makes it have a wider range of use. The concept of "nuclear function" is also used in other classification learning methods.

# Support Vector Machine

First, let's say we have two types of data, one positive type and one negative type. Features have two dimensional data: $\vec{x} = (x_1, x_2)$, which can be plotted like below (Orange for positive data and blue for negative data):

![SVM original dataset](/public/image/svm_original_data.png)

Now we want to draw a line to separate the two types of data. There are three lines to choose from below.

![SVM with different classfication lines](/public/image/svm_with_3_lines.png)

Obviously, the middle (b) is the best way to separate the data. So how can we count the "most able to" separate the data? We can assume a hyperplane which divide dataset into two classes. And this plane has as longer distance as possiable to all the two kinds of data. We call it **separating hyperplane **(or decision boundray). Equation for hyperplane (here is the line (b) in the figure):
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

Here is another example (Red for positive and blue for negative).  The two gray lines are the margin.

![svm_margin](/public/image/svm_margin.png)

If $y_i$ presents the class of $i$-th piece of data, 1 for positive and -1 for negitive, then the two equations can be written into one:
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