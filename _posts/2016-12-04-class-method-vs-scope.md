---
title: "Class Method V.S Scope"
date: 2016-12-04 16:12:10 +0900
category: programming
tags: refactoring
---

In this post, I want to write something about Class Mehotd and Scope. Firstly, let's look some Rails code in Controller:

```ruby
class PostController < ApplicationController
  def index
    @posts = Post.where('created_at > ?', 5.days.ago)
  end
end
```

-------

# Give Problems

For MVC framework, of course, there are some problems with this code.

1. It **exposes implementation details**. In fact, we should not see the details about data in Controller, logic should be put into Model.
2. It **produces unnecessary duplication**. This code may be used in other places, so we should be DRY(Don't Repeat Yourself).
3. It **complicates writing tests**. If you write this code in Controller, it will be necessary to write test for Controller, but this is not what we want. We want to just write unit test.

-------

# Solutions

Here are two solutions to fix these problems:

Put query into Model as a **Class Method**:

```ruby
class Post < ActiveRecord
  def self.recent
    where('created_at > ?', 5.days.ago)
  end
end
```

Or put query into Model as a **Scope**:

```ruby
class Post < ActiveRecord
  scope :recent, -> { where('created_at > ?', 5.days.ago) }
end
```
Both of these methods can be used directly at Controller:

``` ruby
class PostsController < ApplicationController
  def index
    @posts = Post.recent
  end
end
```

------

# Comparison

Class Method looks similar to scope, but what difference do they have? Or, which is better? In my opinions, it's better to use scopes.
For instance, if you make two class methods in Model.

``` ruby
class Post < ActiveRecord
  def self.find_by_author(author)
    where(author: author)
  end
  
  def self.recent
    where('created_at > ?', 5.days.ago)
  end
end
```

Becasue both of `find_by_author` and `recent` return ActiveRecord of Post, so we can use chain query. Let's try it in Rails console.

``` sql
> Post.find_by_author("Potter").recent
SELECT "posts".* FORM "posts" WHERE "posts"."author" = "Potter" AND (CREATED_AT > '...')
```
Fine, it found posts which be posted by Potter and be posted in recent 5 days correctly. But if the author is a nil, what it will happen?

``` sql
> Post.find_by_author(nil).recent
SELECT "posts".* FORM "posts" WHERE "posts"."author" IS NULL AND (CREATED_AT > '...')
```

Ops, it found posts which author is nil, but we want to find all post if we do not specify the author. Let's come back to class methods in Model and refactor `find_by_author` method. Now we need a judgment here:

``` ruby
class Post < ActiveRecord
  def self.find_by_author(author)
    if author
      where(author: author)
    else
      all
    end
  end
  ...
end
```

We fixed problem indeed. But if we use scopes, it can be solved better. (We don't want to use if judgment here...)

``` ruby
class Post < ActiveRecord
  scope :find_by_author, ->(author) { where(author: author) if author.present? }
  scope :recent, -> { where('created_at > ?', 5.days.ago) }
end
```

Because scope always returns a chainable object, so we do not need to worry about it anymore.

``` sql
> Post.find_by_author(nil).recent
SELECT "posts".* FROM "posts" WHERE (created_at > '...')
```

-------

# Scope merge

Use scope merge, we can combine conditions from different Models. For example, you have two related Models named `Comment` and `Post`.

``` ruby
class Comment < ActiveRecord
  belongs_to :post
  scope :approved, -> { where(approved: true) }
end

class Post < ActiveRecord
  has_many :comments
  scope :with_approved_comments, -> { joins(:comments).where('comments.approved = ?', true) }
end
```

In this two Models, there are same query logic `where('comments.approved = ?', true)`. We can use merge them with `merge`.

``` ruby
class Post < ActiveRecord
  has_many :comments
  scope :with_approved_comments, -> { joins(:comments).merge(Comment.approved) }
end
```
Of course, we can get some SQL query code and returns.

# Summary

Whatever Class Methods or Scopes can get same returns. Class Method maybe more understandable, it can describe more details for complicated queries. But Scopes can simplify logic relationship, it always returns chainable object. In my opinion, MVC thinkings will recommend using the scope.
