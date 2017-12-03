---
title: "Web 全栈开发指南"
date: 2017-12-02 15:49:44 +0900
category: basic
tags: ruby python server
---

周末一天的时间看完了*[Web 全栈开发指南](https://www.gitbook.com/book/coin8086/getfullstack/details)*这本书[^1]. 正如书中所说的一样, 其着重于Web 开发的原理,一般方法和工具, 而不是某一种特殊的语言. 书的前面一半的内容主要是介绍 Web 相关的基本知识包括了网页三要素 HTML, CSS, JavaScript 三个部分的基本内容, 因此我就大概地翻看了一遍. 主要是第三章的_编程语言与技术_开始着重看了一下.再加上其他的一些调查, 写成下面的博客. (这一篇实在不想用英语写了 :joy:)

-------------------------------------------------------------------------------

# (动态内容)服务端编程方式

## 通用网关接口CGI

  虽然目前已经基本上没有人在用了, 但是Web 服务器还是在支持着它.它的处理步骤:

  1. 通过 Internet 把用户的请求送到服务器.
  2. 服务器把接收到的请求交给 CGI 程序处理.
  3. CGI 程序把处理的结果传给服务器.
  4. 服务器再把响应送给用户

  而 CGI 在处理的时候是每一个请求对应一个进程的, 因此对于较大请求量的时候 会消耗很多资源, CGI 就不是一个好的选择了.

## PHP[^2]

## Java (Servlet)

  Java Servlet 只能为 Java 提供服务器. 它的处理步骤:

  1. 通过 Internet 把用户的请求送到服务器.
  2. 服务器启动并调用 Servlet
  3. Servlet 根据用户的请求进行处理并传递给服务器
  4. 服务器再把响应送给用户

  和 CGI 不同的地方在于, Servlet 每一个请求对应一个线程. 在性能方面比 CGI 高很多. 具体的这里有一篇[参考文章](http://www.c4learn.com/java/servlet/servlet-vs-cgi/). 而在真正开发的过程中我们接触到的是框架, 比如 [Spring](https://spring.io/) 之类的.

## Python

  Python 在服务端主要依赖于 WSGI (Web Server Gateway Interface) 规范. 这个规范定义了服务器和应用程序的交互接口. 

  在 WSGI 中有一个中间件(Middleware) 的概念: 服务器在接收到请求之后, 由中间件先进行响应, 然后再传递给下一级的应用或者下一层的中间件. 简单的说, 就是在服务器与应用程序之间加上了一层或者多层中间处理, 在中间件里面, 可以实现日志, 错误处理等等.

## Ruby

  Ruby 是我一直使用的开发语言. 虽然一直在使用 Ruby on Rails, 但是居然没有听说过 Rack, 实在是汗颜.:cold_sweat: 同样类似于 Python 的 WSGI, Rack 也有中间件的概念[^3].

## Node.js[^4]

-------------------------------------------------------------------------------

# 服务器架构

以前对这一块也是模模糊糊, 看完之后有了一个大概的轮廓. 包括我们常听说的 Apache 或者 Nginx, IIS 之类的各种概念进行一下整理.

## 最基本的情况

如果站点的访问量不是很多, 可以直接把服务器放在网络上, 给出下图的例子:

![basic instance](/public/image/basic_web_server.png)

这里的 Web 服务器可以是 Apache HTTP Server, Nginx, Microsoft 的 IIS 等等. 还有上面说到的专供的 Servlet, 只为 Java 服务之类的服务器. 还有 Node.js 自带的 Web 服务器.

## Load balancing

一般来说网站一个服务器是不够的, 需要一组服务器. 负载均衡器接受 HTTP 请求, 并分发给内部的 Web 服务器. 知名的负载均衡器有 [HAProxy](https://en.wikipedia.org/wiki/HAProxy), 而上面说的 Apache, Nginx 也可以充当负载均衡器.

## 具体分析

之前的开发中总是会听到 Nginx + Passenger + Ruby on Rails 或者 Apache + Unicorn + Ruby on Rails 的服务器结构, 详细解释每一个环节的作用就是: 

Nginx 或者 Apache 是 负载均衡器同时也是 Web 服务器, 它们用来响应客户端的请求进而转发给应用程序. Unicorn 是 Ruby 的一个 HTTP 服务器. 他会在自己的进程空间内加载 Ruby 的应用, 并且将外部的 HTTP 内容进行包装后和 Ruby 应用进行通信.Unicorn 易于调试, 用于管理 Rack 类的应用程序. 与之类似的还有 Thin, Puma 等等.而 Passenger 有点特殊, 它直接融入到了Nginx 或者 Apache, 成为他们能够直接使用的模块:

> From Wikipedia
> Phusion Passenger (informally also known as mod\_rails and mod\_rack among the Ruby community) is a free web server and application server with support for Ruby, Python and Node.js

Passenger 也可以统一管理 Rails 的进程数量, 生命周期, 请求队列等等. 最后这张图可能有助于理解上述的关系:

![server analysis](/public/image/server_analysis.png)

-------------------------------------------------------------------------------

# 参考

> * [ApacheとNginxとPassengerとUnicornの違い【すごい初心者向け】](http://fujiike.hateblo.jp/entry/2015/08/20/170751)
> * [Ruby on Rails Server options](https://stackoverflow.com/questions/4113299/ruby-on-rails-server-options)
> * [Web全栈技术指南](https://www.gitbook.com/book/coin8086/getfullstack/details)

[^1]: 严格地说只是作者自己的总结写成的 Gitbook.
[^2]: 对于 PHP 不是很了解, 毕竟我是入门级玩家.
[^3]: 对于 WSGI 和 Rack 的介绍, 我想再具体写一个博客.
[^4]: 在学习过程中, 可能学完之后再写博客~
