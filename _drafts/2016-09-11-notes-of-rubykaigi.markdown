---
layout: post
title: "Surmaries of Ruby Kaigi"
category: Notes
tags: Ruby Meeting
---

Ruby Kaigi

## Ruby3 Typing

We can know the Ruby3 from the 3 different view point:

* Performantce
* Concurrency
* Typing ( * )

Recently change of Dynamic Programming Laguage:

SmallTalk -> Java -> Ruby/Javascript -> Swift/Go -> ? Future of Dynamic Typing

### 1. Duck typing

> If it looks like a duck, and eat like a duck, then we can assume it is a duck.

We can ingore inside details, ask computer to dispatch. This will take **lower mental** cost in development.

Duck typing will be opened for the future. "Duck" is an expected behavior, expectation in our mind, typing by class is only an approximation.

### 2. Structural subtyping Nominal Subtyping

### 3. DRY typing

The weak point of Dynamic language:

* Errors only found in run-time.
* Bad error messages.
* Coverage.
* Less Documentation.
* Contradiction.

Mixed/Gradual typing is bad idea. And instead of it, use Static typing with Duck typing.

### 3. Soft typing

Interfed typing has no name.Do not have to worry about to name. Use run-time type information.More Accurate Compile-time check.

--------

## ErRuby

Erlang/OTP :Erlang is a general-purpose, concurrent, functional programming language. It supports Eager, Single assignment, and dynamic typing.

Immutable varible: 
Actor Model: shares nothing with each other, send messages to others.
Light weight process:
Concurrency:

How to deal with errors background? How much it take resourses of server?

In future, exception will be out. He had not make a research about, but it seems not so much.

-------

## Who reordered my code? (I have no idea about it.)

JRuby + Truffle: Fast Ruby implentment.

Compiler, Cache, Processor.

> Fast Ruby implementation
> Paraller execution
> Shared memory

-> Reordering + Memory Model -> Shared Variable

## A proposal of new concurrency model for Ruby 3

[Presentation Slide](http://atdot.net/~ko1/diary)

MRI

* Difficulty of Multi-threads programming.
* copy and move

------

## A Tale of Two String Representations

RStrings

* Multable
* Flat representations

Ropes (算法上面的提升，copy不需要)

* Immultable
* Three repr
* logical string frangment oriented

Concatenation (+) and Append(<<) performance, Apppend is faster.

Rope Other benifits

* Allow for interning of strings
* Metaprogramming
* Final values are great for Graal
* Implicitly thread-safe

-------

## Unifying Fixnum and Bignum into Integer

For Ruby: Fixnum and Bignum

F: class for small integer
B: class for big integer

Range of fixnum: range isnot portable.

* There is integer class which range unbounded;
* implementation may define subclass of integer;
* Fixnum and Bignum class are not defined.

Pros(After Ruby 2.4)

* Cannnot misure Fixnum and Bignum;
* Learn ruby easily;
* Simplify document;
* Simplify TextBooks;
* Simpleer, cleanerm and more Mathmatical;

Metaprogramming and DSL may be broken;
Integer Unification at C-level;
Update Extension Library;

See more [details](https://www.hsbt.org/diary/20160829.html#p01)

---------

## Ups and Downs of Ruby Internationalization

Upcase and Downcase unicode.

----------

## Fearlessly Refactoring Legacy Ruby

Surgical Refactors

Early Success: Can make new things;
Later Success: Make it easy to maintain old things.

Refator some legacy code (Can not understand).

Refactoring is Hard and Unsafe.

Business Priority
Bug fixes New Fixture
cost/risk 
Teting Refactoring

Selling refactor to Business: Up

* scare them.
* absorb the cost.
* Take hostages

Move Right

* Refactoring to patterns
* characterization Testing
* A/B Testing /Experiments

Github suture:

Keep the old one and new one, finally delete all of the old one.

Gilded Rose Kata (Rails)

-----------

## Writting a Gameboy Emulator in Ruby

|CPU|PPU|Memory|Screen|Cartridge|
|:----:|:---:|:----:|:----:|:---:|

Define each of them by class, use varibales and methods to represent instructions.

```ruby
# define of CPU
class CPU
	Registers (variables)
	Instructions (Variables and methods)
	Fetching and Excutation (Variables)
	Timing Clock
end

# define of Memory Map
class MMU
	Container(Methods)
	Steps(Methods)
	# when insert new game, it needs update initialize method here
end

# define of PPU
# Sprite read -> Video read -> Horizontal Blank -> Vertical Blank
class PPU
	Container(Methods)
	Steps(Methods)
end

# define of Catridge
class Cartridge
end
```

------------

## How DSL works on Ruby

### 1. Introducation of Rake
### 2. Introducation of DSL

Bulid simple DSL used Ruby's module.
Define method via eval for simple DSL.
Provide class scoped DSL via instance_val.

### 3. DSL in RubyGems

P.S. Capitrano, Thor

### 4. Long live to Rake

-------------

## Learn Programming Essence from Ruby patches

What is Programming Knowladge?

* Language feature
* How to use libbraries
* How to use framework

具体的な知識:

* Algorithm
* Data Structure

How to study?

Learn implementation of algorithms or pros/cons on that. But is not easy to understand how to use in actual codes.

> Let's to the more familar that have to learn to read the path of ruby.

Why patch?

clear conde of interest 
information that many explaintatinon for the patch
choose the ones likely to read suit your level

Advice: Improving GC algorithms or JIT.

<Ruby under a Microscope>

-----------

## Web Server Concurrency Architecture

Scrawls

----------

## Pwrake: Distributed Workflow Engine based on Rake

Rwrake: Parallel Workflow extension for Rake

* Background: Scientic Flow
* Workflow Definition Language
* Perake structure
* Gfarm Distributed File System
* Locality-Aware Task Scheduling
* Fault Tolerant
* Science Data Processing with Pwrake and Gfarm

-----------

## Modern Black Mages Fighting in the real world

Topic: Fluented

Open source log controller. Singleton Class of Ruby. 

------------

## SciRuby Machine Learning

### 1. Introducation

Data Science Flow:

* Collect data;
* analysis
* cleansing data
* inegrating multiple data source
* Preprocessing
*  ..
	
### 2. Machine learning

Why we need Machine learning?

* make business decisions from real data.
* algorithms is optional
* drive business

Machine learning Problems:

* Supervised learning (*)
* Unsupervised learing
* Reinforcement learning

Current Status:

Existing gems for Machine learning: **liblnear**, **rb-libsvm**, **decisiontree**.

Issues of Existing Gems: ...

### 3. SciRuby
### 4. Scikit-learn

Machine learning framework of [Scipy stack](http://www.scipy.org/index.html).

* Use scikit-learn itself.
* Make scikit-learn like libraries.

--------

## Ruby Committers VS the world

## Web Clients For Ruby and What they  should be in the future

* Human-drive client written in Ruby that accesses a Web API
* The idea of Web client


Adaptable to 
Need to rewrite he code beacuse of coupling:

Decoupled client

HTTP Client for Ruby:

* net/http
* open-uri
* etc

Web API is easy to use. There are so many gems decicated to each Web API.

State Management 状态管理

* HTTP服务器没有状态
* APP拥有状态
* 经典的Web APP的状态就是当前的URL

Web API 状态转移

简单Rack, Faraday的介绍

-----

## Deletion Driven Development: Code to delete code!

What if we find unuseful code to delte?

1. Paring the code: ruby_parser
2. Processing the S-expression

Github/Debride

-------

## Recent Advances in HTTP and Controlling them using ruby

### Current state of HTTP

HTTP/2 Released on May 2015 1/3在使用HTTP/2

Main Feature:

* Header compression: Working well 
* Multiplexing  & proritization: Multiplexes responses into one conn.
* Push:  Many Negitave comments.

Fixes:

Flow of ideal HTTP trancaction

* respond to high-priority requests
* send resourses in right order | send 
* push only the resourses not cached by the client

Blocked by unsent data in TCP( TCP head-of-line blocking)

1. write only what can be sent immedately; 
2. adjust poll threadold tp delay write notification until TCP beacomes ready to send some data immeadtely

HTTP2 prioritization: using weights and chaining(Firefox is doing like this. But Safari and Blink and old Chrome are not ding this.)

solution:

1. bandwidth distribution on server-side:
2. detect dumb clients and fallback to server-driven prooritizaiton

Hidden resourse

solution:

1. avoid use of hidden resoursces
2. specify them use link like rel=preload;

Push (3 cases)

* priorization
* push while processing request
* push from edge

Push va. cache: Is's waste of bandwidth and time to push cached resources.

How to avoid it:

* Cookies-based
* cache-digest

Summary:

* HTTP/2 is becoming popular;
* some effectives
* H2O is the leader in HTTP/2 server performance

--------

## Optimizing Ruby

Ruby is slow:

1. Not optimized
2. Because `Interger #+` can be redifined

## Game Development + Ruby = Happiness

## Dive into CRuby

New methods and New Platforms
Speed and Memory: Cocurrency
