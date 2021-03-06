---
title: "Summary of Machine Learning Algorithms -- Linear Regression"
date: 2018-09-21 14:53:00 +09000
category: machine learning
tags: algorithm formula
toc: true
---

**Regression** is one class of problems in Machine Learning. Linear Regression is a basic one class of problems of Regression. I want to write a note about the Linear Regression in this post as the beginning of Machine Learning series.

-------------------------------------------------------------------------------
# Brief Introduction

Regression problems want to find the relationship between the input variables and output variables. The *Regression* was used from a 19th-Century scientist.
*Linear Regression* is most basic problems of Regression. We want to make a model to describe the relationship between input and output.
So let's assume the input variables are $x_1, x_2, \dots , x_n$, and the output variable is $y$. This formula shows the linear relationship between them:
$$
y=m_1x_1+m_2x_2 + \dots+m_nx_n+b=m^Tx+b
$$

Here, $m_i$ is coefficient. The $m = (m_1, m_2, \dots, m_n)$ and $x = (x_1, x_2, \dots, x_n)$ are vectors, the $b$ calls bias. We have the model now, what we want to do next is to find the $m$ and $b$ with given **dataset** and then, we can use the model to make some prediction of some unknown data.

-------------------------------------------------------------------------------
# The case of 2-dimension

For the 2-dimension (one input variable $x$ with one output variable $y$), we can get $m$ and $b$ easily. The model formula becomes $y=mx+b$ which is a very simple line and we call it the *best fit line*. $$m$$ is the best fit line slope and $b$ is best fit line y-intercept.

Now, we have one dataset with $(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(m)}, y^{(m)})$. Here is the plot of them:

![dataset of linear regression](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20201102144249.png)

We can get $m$ and $b$ quite easily with these formulas (from **statistics**):

$$
\begin{align}
m&=\frac{\overline x \overline y - \overline{xy}}{\overline x^2 - \overline {x^2}} \\
b&=\overline y - m\overline x
\end{align}
$$

After this, we can draw the best fit line as blue line, which is also our model. According this line, we can make prediction of $x=40$ which plot as red point:

![linear regression prediction](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20201102144312.png)

-------------------------------------------------------------------------------
# For the generalized case

For the generalized case, $m$ is a vector. So we cannot get it easily just with those formulas upper. Now assume the $h(x)$ is the **Hypothesis** model:

$$
h(x^{(i)})=m^Tx^{(i)}+b
$$

We can use a **cost function** -- **Mean Squared Error** (MSE) to evaluate this model:

$$
J(m, b) = \frac{1}{2n}\sum_{i=1}^n\left[h(x^{(i)})-y^{(i)}\right]^2
$$

$1/2n$ here is just for calculating convenience. What we need to do it to find the $m$ and $b$ to minimize the MSE which also means the line we made is as close as possible to those dataset points:

$$
\min_{m, b}J(m,b)
$$

Now the **Find unknown $m$ and $b$** becomes **Find the min value of $J$, and get $m$ and $b$**. This problem can be solved by **Gradient Descent** (which I want to give a another post to give some details).

---

# Evaluation Metrics

Finally, after we get the value of $m$ and $b$, we will get the hypothesis model. Usually, we use **Coefficient of determination** (witch also calls $\text{R}^2$) to evaluate this model.

Firstly, define the **residuals** as $e^{(i)} = y^{(i)} - h(x^{(i)})$, and **mean** of the data as $\overline{y}$, then define these sums of squares:

- The total sum of squares (proportional to the variance of the data):

  $$
  SS_{\text{tot}} = \sum_i(y^{(i)} - \overline y)^2
  $$

- The regression sum of squares, also called the explained sum of squares:

  $$
  SS_{\text{reg}} = \sum_i(h(x^{(i)}) - \overline y)^2
  $$

- The sum of squares of residuals, also called the residual sum of squares:

  $$
  SS_{\text{res}} = \sum_i(y^{(i)} - h(x^{(i)}))^2 = \sum_i(e^{(i)})^2
  $$

lastly, define the coefficient of determination.

$$
\text{R}^2 = \frac{SS_{\text{reg}}}{SS_{\text{tot}}} = 1- \frac{SS_{\text{res}}}{SS_{\text{tot}}}
$$

>  The better the linear regression fits the data in comparison to the simple average, the closer the value of $\text{R}^2$ is to 1. 

-------------------------------------------------------------------------------

# Practice corner

For the 2-D case, it's quite easy to achieve that:

```python
from statistics import mean
import numpy as np
import matplotlib.pyplot as plt

def best_fit_slope_and_intercept(xs, ys):
    m = (mean(xs) * mean(ys) - mean(xs * ys))/(mean(xs)**2 - mean(xs**2))
    b = mean(ys) - m * mean(xs)
    return m, b

# train dataset
xs = np.array([1,2,3,4,5,6,7,8,9], dtype=np.float64)
ys = np.array([3,4,3,4,4,5,5,4,5], dtype=np.float64)

m, b = best_fit_slope_and_intercept(xs, ys)
regression_line = np.array([(m * x + b) for x in xs])

# prediction
predict_x = 10
predict_y = m * predict_x + b

# data visualization
plt.scatter(xs, ys)
plt.plot(xs, regression_line)
plt.scatter(predict_x, predict_y, color='r')
plt.show()
```

For generalized case, we can use `sklearn` package. here is the code sketch:

```python
from sklearn.linear_model import LinearRegression

# Prepare some train dataset and test dataset
clf = LinearRegression
clf.fit(X_train, Y_train)
accuracy = clf.score(X_test, Y_test)
```

The `clf.score` will return the value of coefficient of determination $\text{R}^2$.

In fact, the data preprocess is quite important step, it includes data cleaning and feature selection.
That's a big topic, so I want to make another post to give details.

> * [Linear Regression (Wiki)](https://en.wikipedia.org/wiki/Linear_regression)
> * [pythonprogramming.net](https://pythonprogramming.net/regression-introduction-machine-learning-tutorial/)
