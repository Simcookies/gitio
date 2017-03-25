---
title: "Virtual Environment for Python"
date: 2017-01-02 13:07:57 +0900
category: tool
tags: python environment
toc: false
---

As a student, I need to deal with a lot of experiment data and have to make mess data to porcelain figures. [Matlab](https://www.mathworks.com/products/matlab.html) seems a good idea, but you know, we can not pay for it. Naturally, I chose [Python](https://www.python.org/). Python has two famous stable version--2.7 and 3.5. But unfortunately, they can not compatible with each other. For scientific computing, it's better to use 2.7 because lots of modules only support 2.7. But there is a trend to use high version finally.

For example, I am using 2.7 to learn [matplotlib](http://matplotlib.org/), using 3.5 to learn [Django](https://www.djangoproject.com/). The Mac or GNU/Linux also has the default version of Python. Finally, there will be three different versions of Python and at least two versions for [pip](https://en.wikipedia.org/wiki/Pip_(package_manager)). It will be very troublesome to deal with such a mess. Sometimes, I forget which version I am using. And the other reason I feel uncomfortable is I have to install module twice on my Mac which just used for one time.

For this state, virtualenv is a good choice for us:

> A Virtual Environment is a tool to keep the dependencies required by different projects in separate places, by creating virtual Python environments for them. It solves the “Project X depends on version 1.x but, Project Y needs 4.x” dilemma, and keeps your global site-packages directory clean and manageable.

-------------------------------------------------------------------------------

# Installing & Basic

Installing is very easy, we can install virtualenv via pip:

```shell
~ $ pip install virtualenv
```

After installing, we can check installed modules list via `pip freeze`. We can install all the modules in virtualenv, so the modules except virtualenv can be uninstalled via `pip uninstall one_package`. OK, it's time to use virtualenv now!

Enter your project folder, make a new virtual environment:

```shell
~ $ virtualenv venv
```

This command will make a new folder named venv in the current directory. (As a convention, we use venv.) This venv folder contains Python executable files and pip library where you can install modules(Of cause, except virtualenv). The Python executable files will use the version which you use to install virtualenv defaultly. For example, you install virtualenv via pip3 which represent of python3, so the Python excutable files of venv will be python3 too. However, you can change this:

```shell
~ $ virtualenv -p /usr/bin/python2.7 venv
```

Now, it's time to activate the virtual environment via `source`.

```shell
~ $ source venv/bin/active
```

And then the name of virtual environment will appear on the left of prompt, like this:

```shell
(venv) username@computer: ~ $ 
```

 From now, we can use the environment isolated from the global environment because the modules which we install will be installed into the `venv`. You can leave this virtual environment:
 
```shell
~ $ deactivate
```
-------------------------------------------------------------------------------

# Management of packages

In order to keep your environment consistent, it’s a good idea to “freeze” the current state of the environment packages:

```shell
~ pip freeze > requirements.txt
```

This command can create a list file of packages which you installed via pip. This can file can be reused for other environment or by your collaborators. This can help ensure consistency across installations, across deployments, and across developers. They can install necessary packages with the file:

```shell
~ pip install -r requirements.txt 
```

In fact, this is a little similar to [Gemfile](http://bundler.io/gemfile.html) which used in Ruby bundle.

-------------------------------------------------------------------------------

# References

> * Offical Python page: <https://www.python.org/>
> * Guide to Python: <http://docs.python-guide.org/en/latest/dev/virtualenvs/>
> * Python Package Index: <https://pypi.python.org/pypi/pip>
