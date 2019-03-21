## Gradient Desent

Repeat below code until convergence:
$$
\theta_j :=\theta_j-\alpha\frac{\part}{\part\theta_j}J(\theta_0, \dots,\theta_n)\space \text{(for}\  j = 0, \dots, n )
$$
The $\alpha$ means *learning rate* here. What you need to notice is that, all of the assignments must be after caculcation.

As we approach a local minimum, gradient desent will automatically take smaller steps (the determine gets smaller). So no need to decrease the $\alpha$.

When we apply the GD to the Linear Regression's const Function $J(\theta_0, \theta_1)$:
$$
\frac{\part}{\part\theta_j}J(\theta_0,\theta_1) =\frac{\part}{\part\theta_j} \frac{1}{2n}\sum_{i=1}^n\left[h(x^{(i)})-y^{(i)}\right]^2 \\
=\frac{\part}{\part\theta_j} \frac{1}{2n}\sum_{i=1}^n\left[\theta_1x^{(i)}+\theta_0-y^{(i)}\right]^2 \\
=\frac{1}{n}\sum_{i=1}^n\left[h(x^{(i)})-y^{(i)}\right]\ \text{For}\ j=0;\\
=\frac{1}{n}\sum_{i=1}^n\left[h(x^{(i)})-y^{(i)}\right]\cdot x^{(i)}\ \text{For}\ j=1;\\
$$
This gradient desent is also called 'Batch' gradient desent. **Batch**: Each step of gradient desent uses all the trainning examples.