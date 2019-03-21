---
title: "Source code reading of Jekyll -- 2"
date: 2018-05-04 15:27:12 +0900
category: programming
tags: source jekyll
---

It's too busy and a little boring to read source code, but I still persist with reading this. I will go on into `lib/jekyll/` directly from this blog.

By the way, the comment `# frozen_string_literal: true` at the begining of files is a magic comment, supported for the first time in Ruby 2.3, that tells Ruby that all string literals in the files are implicitly frozen, as if `freeze` had been called on eachof them.

OK, let's begin from the `command.rb`.

# command.rb



# cleaner.rb


# version.rb

It includes version info of Jekyll.


