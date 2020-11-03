---
title: "'Web Full-stack develop reference'"
date: 2017-12-02 15:49:44 +0900
category: basics
tags: ruby python server
---

I finished reading the book of *[Web Full-stack Develop Reference](https://www.gitbook.com/book/coin8086/getfullstack/details)* at one weekend[^1]. As writing in the book, it focuses on the principles, general methods and tools of Web developing, not a specific programming language. The first half of the book's content is mainly introduced the basic knowledge of the Web includes the three elements of the web page elements -- HTML, CSS, JavaScript, so I just looked through it. I focused on reading the third chapter -- Programming Languages and Technologies. Besides, I made some others related researches about it and write a new post as below. (It's terriable to write in English:joy:)

-------------------------------------------------------------------------------

# (Dynamic content) Some ways for Server Programming

## Common Gateway Interface, CGI

Although no one is using it today basically, the mainstream Web server still supports it. Here are the processing steps of it:

  1. User's requests are sent to the server through the Internet.
  2. The server sends the received request to the CGI program for processing.
  3. CGI program passes the results to the server.
  4. The server sends the responses to users.

While CGI handles one process for per request, so CGI is not a good choice for lots of requests that consume a lot of resources.

## PHP[^2]

## Java (Servlet)

Java Servlet just provides servers for Java. Here is it's processing steps:

  1. User's requests are sent to the server through the Internet.
  2. The server starts and calls Servlet.
  3. Servlet processes according to user's requests and passes the results to the server.
  4. The server sends the responses to users.

Java Servlet handles one thread for per request which is different from CGI, so it has better performance than CGI (If you want to know more about this, please read this [reference](http://www.c4learn.com/java/servlet/servlet-vs-cgi/). In fact, we use more frameworks such as [Spring](https://spring.io/) instead of using Java Servlet directly.

## Python

Python mainly depends on the WSGI (Web Server Gateway Interface) specification on the server side. This specification defines the main interface between the server and the application.

There is a Middleware concept in WSGI: after the server receives the request, the middleware responds firstly, and then send to the next level which may be an application or another middleware. Simply say, it adds one or more middlewares which can achieve log or handle errors between the server and the application.

## Ruby

Ruby is the programming language which I am always using. Rack specification defines the interface between the server and the Ruby application which is similar to WSGI in Python. I never heard about Rack even I am using Ruby on Rails (it is based on Rack :cold_sweat:). As WSGI in Python, Rack also has the concept of middleware.[^3]

## Node.js[^4]

-------------------------------------------------------------------------------

# Server architecture

I was vague about this concept before, but I got a rough outline after reading the book. I will sort out various concepts includes well known Apache, Nginx or IIS.

## Basic situation

If the site's traffic is not a lot, we can put the server directly on the network. Here is an instance:

![basic instance](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20201102143913.png)

The web server here may be Apache HTTP Server, Nginx, Microsoft's IIS and so on; dedicated Servlet which I said above, it just provides servers for Java; and the web server embedded in Node.js.

## Load balancing

In general, one Web Server for one website is not enough, we need a group of servers. The load balancer accepts the HTTP request and distributes it to the internal web server. There is a well-known load balancer named [HAProxy](https://en.wikipedia.org/wiki/HAProxy), the Apache, Nginx which I said above can also act as a load balancer.

## Specifi analysis

I often hear the Web Server Architecture composed of Nginx + Passenger + Ruby on Rails or Apache + Unicorn + Ruby on Rails, here are the details explanations for each link:

Nginx or Apache is the load balancer and also the web server, which responds to client requests and sends them to the application. Unicorn is an HTTP server for Ruby. It will load the Ruby application in its own process space, and the package HTTP contents outside and communicate with Ruby application. Unicorn is easy to debug, and it's applied to manage Rack application. Some other server such to Thin, Puma is similar as Unicorn. And Passenger is a bit special, it's directly integrated into Nginx and Apache and becomes the module which they can use directly.

> From Wikipedia
> Phusion Passenger (informally also known as mod\_rails and mod\_rack among the Ruby community) is a free web server and application server with support for Ruby, Python and Node.js

Passenger can also manage the number of Rails processes, life cycles, request queues and so on. This fig can help you to understand the relationship between them.

![server analysis](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20201102144000.png)

-------------------------------------------------------------------------------

# Refferences

> * [ApacheとNginxとPassengerとUnicornの違い【すごい初心者向け】](http://fujiike.hateblo.jp/entry/2015/08/20/170751)
> * [Ruby on Rails Server options](https://stackoverflow.com/questions/4113299/ruby-on-rails-server-options)
> * [Web全栈技术指南](https://www.gitbook.com/book/coin8086/getfullstack/details)

[^1]: Strictly speaking, it is only the author's own summary of the Gitbook.
[^2]: I am not very understanding for PHP, after all, I am an 'entery level' player.
[^3]: I want to write an another post to introduce WSGI and Rack.
[^4]: Still in studying process, I may write a new post about it after it~
