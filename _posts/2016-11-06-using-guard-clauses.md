---
title: "Using Guard Clauses"
date: 2016-11-06 20:46:41 +0900
category: programming
tags: refactoring
toc: false
---

During my Rails develop process, sometimes I need to use many conditions in code and code will be a little chubbby like this:

```ruby
# Ruby code
def publish_book
  if @book.is_approved?
    if @book.author != "Bad"
      @book.publish_on = Time.now
      @book.save
    else
      return false
    end
  else
    return false
  end
end
```

It is a bit unclear and unreadable. When I study in [Code School](https://www.codeschool.com/), I learned about a new concept called `Guard Clauses`. We can use it to replace nested conditional with Guard Clauses.

```ruby
# Ruby code
def publish_book
  return false unless @book.is_approved?
  return false if @book.author == "Bad"

  @book.publish_on = Time.now
  @book.save
end
```

It becomes clear and readable indeed. So I recommend this way to replace nested conditional during refactoring.
