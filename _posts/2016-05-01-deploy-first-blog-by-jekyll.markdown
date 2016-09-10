---
layout: post
title: "Post blogs with Jekyll"
category: Blog
tags: jekyll markdown
---

Jekyll is a tool can transform plain text into static websites and blog. It's a open source project on [Github](https://github.com/jekyll/jekyll).

## Install jekyll

Jekyll writed by Ruby, they pack up it as a gem, so we can use RubyGems to install it.

```
~ $ gem install jekyll
~ $ jekyll new your_site_dir
~ $ cd your_site_dir
~/your_site_dir $ jekyll serve
```

And then check the localhost at port 4000 as inputing localhost:4000 at address column of browser. We will see the standard blog pages. Here we use `jekyll serve`, it will build the project and make a server at port 4000, we can also use `jekyll build --destrination <destrination>` directly just for build. It's enough for me.

---------------

## Directory

Because the website is static, we can modify it by CSS/HTML and JavaScript. But we need to check the directory firstly:

```
your_site_dir/
|-- README.md
|-- _config.yml
|-- _include/
|   |-- head.html
|   |-- header.html
|   |-- footer.html
|-- _layouts/
|   |-- default.html
|   |-- page.html
|   |-- post.html
|-- _plugins/
|-- _posts/
|-- _sass/
|   |-- _base.scss
|   |-- _layout.scss
|   |-- _syntax-highlighting.scss
|-- about.md
|-- css/
|   |-- main.scss
|-- feed.xml
|-- index.html
```
We also use table to give detials about them:

| File/Directory | Description |
|----------------|-------------|
|_config.yml | Stores configuration data. And it also can store global variables.|
|_include | These are the partials that can be mixed and matched by layouts and posts to facilitate reuse. |
|_layouts | These are the templates that wrap posts. |
|_post | Our post with markdown format |
|_site | The normal bulid directory, but I change it other place. |
|index.html and other HTML, Markdown files | These will be build directly to the build root directory. |
|other file or floder | These will also be build and included to root directory, such as css or script.|

-------------

## Configuration

Almost all of configurations and global variables are stored in _config.yml, however I just need a little of them. The format of configuration should be like `option: value` or `variable: value`. For example, normally , we need config the site info, just do like this:

```ruby
# Site settings
title: your blog title
email: your email
description: you can descripe your blog here.

# Social info if you want
twitter_username: your twitter
github_username: your github
facebook_username: your facebook

# Markdown seetings
makrdown: redcarpet
redcarpet:
  extensions:
    -[ something here ]
```

The point is, whenever you modify the _config.yml, server needs to be restarted again or _site needs to be rebuild.

----------

# Use Markdown

Jekyll normally supports two markdown renderers: `Redcarpet` and `Kramdown`, we can also make our own markdown processors, but it's not easy for me. In my blog project, I used `Redcarpet`. So I make configuration like here:

```ruby
markdown: redcarpet
redcarpet:
  extensions:
      - fenced_code_blocks
      - no_intra_emphasis
      - strikethrough
      - autolink
      - tables
```
The extensions are used normally:

* `fenced_code_blocks`: This will make it easy to write code.
* `no_intra_emphasis`: Do not parse emphasis inside of words. Strings such as `foo_bar_baz` will not generate `<em>` tags.
* `strikethrough`: Parse strikethrough, PHP-Markdown style. Two `~` characters mark the start of a strikethrough. Such as ~~Text~~.
* `autolink`: Parse links even when they are not enclosed in <> characters. Autolinks for the http, https and ftp protocols will be automatically detected.
* `tables`: Parse tables.

----------

## Summary

Use the jekyll to make own blog, and then we can focus on writting blogs. If we want to chage the theme of blog, we can also check [here](http://jekyllthemes.org/), fork their repository. Or we can make own themes, it's a big challenge for skills of Front-End. OK, let's enjoy blog now.

----------

## References

> * Jekyll offical docs site: https://jekyllrb.com/docs/home/
> * Jekyll GitHub repository souce code: https://github.com/jekyll/jekyll
> * Markdown processer redcarpet: https://github.com/vmg/redcarpet
> * Jekyll theme offical site: http://jekyllthemes.org/
