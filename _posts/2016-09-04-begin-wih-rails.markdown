---
title: "Begin with Rails"
category: Basics
tags: Rails
---

For a new developer of Rails, it may be a quite problem to distinguish the concepts of Ruby, Rails, rvm, gem, bundle and rake. So I want post this blog to summarize them, also summarize the steps to install Rails 4 on Linux Ubuntu 16.04.


## Basic Concepts
|Name|Description|
|----|-----------|
|Ruby|The name of programming language.|
|Rails|The web develop framework mainly used ruby.|
|RVM|RVM is a command-line tool which allows you to easily install, manage, and work with multiple ruby environments from interpreters to sets of gems.|
|RubyGems|A package manager for the Ruby programming language that provides a standard format for distributing Ruby programs and libraries (in a self-contained format called a "gem").|
|gem|A self-contained RubyGem format, you can use it directly as command-line.|
|bundle|A kind of instance of gem, it provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed. It always binded with file named "Gemfile".|
|Gemfile|Binded with bundle like `bundle install`.|
|Rake|A simple ruby build program with capabilities similar to make.|
|Rakefile|Rake's version of Makefiles|

------------------

## Install Rails 4

### Test OS

> Linux -- Ubuntu 16.04

### Install RVM

```
~ $ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
~ $ \curl -sSL https://get.rvm.io | bash -s stable
```

After installing, you can use ```rvm -v``` to check version of RVM you installed. Like:

```
~ $ rvm -v
rvm 1.27.0 (latest) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
```

### Install Ruby with RVM

If you installed RVM successfully, you can use it to install RVM now. Firstly, you can use ```rvm list known``` to list all versions you can install, and choose from them.

```
~ $ rvm requirements # If without the step, it also included in next step.
~ $ rvm install 2.2.2 # Here you can decide which version by yourself.
```

Here it may be take a bit long time because of downloading and complile. This installing also includes RubyGems. After it, you can use ```rvm list``` to list all the versions you have installed. Like:

```
~ $ rvm list

rvm rubies

 * ruby-2.2.2 [ x86_64 ]
 
 # => - current
 # =* - current && default
 #  * - default
``` 

Use ```rvm use 2.2.2``` to set version of current ruby. And ```rvm use 2.2.2 --default``` can set default version and you can use that version of ruby after openning console without setting version every time.

However, when I installed rvm and use it firstly, it give me an error like this:

```
~ $ rvm use 2.2.2 --default

RVM is not a function, selecting rubies with 'rvm use ...' will not work.

You need to change your terminal emulator preferences to allow login shell.
Sometimes it is required to use `/bin/bash --login` as the command.
Please visit https://rvm.io/integration/gnome-terminal/ for an example.

```

Why showed this error? Because when we install rvm, it will add RVM path and RVM loading line to ~/.profile:

```
PATH=$PATH:$HOME/.rvm/bin # Add RVM to PATH for scripting
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function* 
```
But we the console which we openned is always non-login bash, it will not load the .profile. Here I give my solution:

> Move the loading line to .bashrc file

If we use non-login bash, it will load .bashrc, if we use login-bash, it will load .profile, and load .bashrc through:

```
# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
        . "$HOME/.bashrc"
    fi
fi
```

After this, I think it will be OK. Finally, use ```gem -v``` to check version of Gemfile.

### Install Bundler and Rails 4

```gem install bundle``` to install bundler.

```gem install rails --version=4.2.7.1``` Use ```--version``` option to install specific rails.

### Test Installing

According the offical documentation ```rails new blog``` to make new rails project. But it will bundle install the lastest Rails and related gems automaticly, so we have to specify the version of rails which we want, like this:

```
~ $ rails _4.2.7.1_ new blog
```

This is quite important point, because the gems depend with each other. When I firstly rails new a project, I use ```rails new blog``` directly, and just it generates a file named Gemfile, I just modify the version of rails in it:

```ruby
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.7.1'
```

Errors will be showed when we start server. So itt's better to spectify version.

Finally, ```rails server``` can start server at localhost:4000, you can input this address in browser and check the main page. Here we go with Rails 4!

------------------

## Surmmary

The versions of deferent parts and install order are very important, here I made a flow figure:

<strong>install RVM --> use RVM install Ruby and gem --> use gem install bundle and Rails --> make project</strong>

This post was writed to help new rails developer with deeper understanding about so many concepts. Also it helps me not to forget the install process. After them, enjoy developing in Rails!

---------------------

## References

> * Offical RVM page: https://rvm.io/
> * Chinese install guide book: https://ruby-china.org/wiki/rvm-guide
> * Offical Rails guide book: http://guides.rubyonrails.org/
> * How to solve the problem with "RVM is not a function": http://stackoverflow.com/questions/9336596/rvm-installation-not-working-rvm-is-not-a-function
