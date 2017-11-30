---
title: "Rails error of 'key must be 32 bytes'"
date: 2017-11-30 15:49:44 +0900
category: solution
tags: ruby rails
toc: false
---

I made a Rails Application with Rails 5.0.0.1, and got an strange error when I run the server by localhost.

```
ArgumentError in WelcomeController#index
	key must be 32 bytes
```

And details are here:

```ruby
Extracted source (around line #72):
70 cipher = new_cipher
71 cipher.encrypt
72 cipher.key = @secret
73
74 # Rely on OpenSSL for the initialization vector
75 iv = cipher.random_iv
```

It seems the version of the Rails need to be update. So I changed Gemfile:

```Ruby
# gem 'rails', '5.0.0.1' => '5.0.1'
```

And then `bundle update` to update the gems. The error will be gone.

Some people said they sitll got the error after they change the Gemfile. It's a better way to update Ruby version too. :)

[refference is here](https://github.com/rails/rails/issues/25185)