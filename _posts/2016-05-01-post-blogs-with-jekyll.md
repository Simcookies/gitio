---
title: "Post blogs with Jekyll"
category: blog
tags: jekyll markdown
---

Jekyll is a tool can transform plain text into static websites and blog. It's a open source project on [Github](https://github.com/jekyll/jekyll). In this blog, I will talk about how to install Jekyll and use it to generate our static blogs.

-------------------------------------------------------------------------------

# Install jekyll

Jekyll writed by Ruby, they pack up it as a gem, so we can use RubyGems to install it. Use command like these:

```
~ $ gem install jekyll
~ $ jekyll new your_site_dir
~ $ cd your_site_dir
~/your_site_dir $ jekyll serve
```

And then check the localhost at port 4000 as inputing localhost:4000 at address column of browser. We will see the standard blog pages. Here we use `jekyll serve`, it will build the project and make a server at port 4000, we can also use `jekyll build --destrination <destrination>` to specify build path directly. Here you can repalce `<destrination>` to directory which you want to build. The default path is `./_site`.

As time goes, the project will need another gems, so we can make a Gemfile to collect the gems together at root path. Here is context of Gemfile:

```ruby
# Gemfile
source "https://rubygems.org"
gem "jekyll", "3.2.1"
end
```

After making Gemfile, we can use `bundle install` to install all gems we need, if we want to add some other gems, we can add into Gemfile, and run `bundle install` again.

-------------------------------------------------------------------------------

# Directory

Because the website is static, we can modify it by CSS/HTML and JavaScript. Let's check the directory firstly:

```
your_site_root_dir/
|-- README.md
|-- _config.yml
|-- Gemfile
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
Here I made a table to give detials about them:

| File/Directory | Description |
|----------------|-------------|
|_config.yml | Stores configuration data. And it also can store global variables.|
|Gemfile| I made it by myself (The lastest version Jekyll will make it for you) |
|_include | These are the partials that can be mixed and matched by layouts and posts to facilitate reuse. |
|_layouts | These are the templates that wrap posts. |
|_post | Our post with markdown format |
|_site | The normal bulid directory, but I change it other place. |
|index.html and other HTML, Markdown files | These will be build directly to the build root directory. |
|other file or floder | These will also be build and included to root directory, such as css or script.|

-------------------------------------------------------------------------------

# Configuration

Almost all of configurations and global variables are stored in _config.yml. The format of configuration should be like `option: value` or `variable: value`. For example, normally , we need config the site info, just do like this:

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

If you set variables in _config.yml, you can use them in HTML as Liquid Language. For instance:

{% raw %}
```html
<p>{{ github_username }}</p>
```
{% endraw %}

It will turned into real HTML context:

```html
<p>your_github_username</p>
```
For more information about Liquid language, you can check [Jekyll offical docs site](https://jekyllrb.com/docs/home/).
The point is, whenever you modify the _config.yml, server needs to be restarted again or `_site` needs to be rebuild.

-------------------------------------------------------------------------------

# Write Post

After some basic setting, you can write your own blog now. You can use any editor to write blog at the path of `_post`, at the same time, Jekyll server can keep watch over your post and refresh the web page. Here is the point you should be care about:

  * The extension of post file should be `.markdown`,`.md`(and so on, I use `.md`).
  * Post filename should be write like: `YYYY-MM-DD-your-blog-name.md`

Open one post, write below code at first of file:

{% raw %}
```markdown
---
title: "Your blog title"
date:   2016-03-21 15:35:16 +0900
category: Blog
tag: Test
---
```
{% endraw %}

Go on write something you want after these code. These code are provided to Jekyll for explaining some info of post. Index page can use ttile variable to show posts order by date variable, and also we can sort out posts with category and tag variables. Well, you can find more information about how to use these varibale at [offical page](https://jekyllrb.com/docs/home/) or I will post new blog about it, you can subscribe it.

-------------------------------------------------------------------------------

# Use Markdown

Why we use Jekyll to write blog is beacuse we do not need to focus on HTML pages every time, just concentrate on writting. And with Markdwon, this process will be more easy and happy. 

[Markdown](https://en.wikipedia.org/wiki/Markdown) is a lightweight markup language with plain text. We just write some text, and Markdown processers help us to translate it into beautiful HTML pages. Jekyll normally supports two markdown renderers: `Redcarpet` and `Kramdown`, even we can also make our own markdown processors. In my blog project, I used `Redcarpet`. So I make configuration like here:

```ruby
# Here are write at _config.yml
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

There are some basic syntax rules, please have a look at [Github Guide](https://guides.github.com/features/mastering-markdown/).

-------------------------------------------------------------------------------

# Summary

Use the jekyll to make own blog, and then we can focus on writting blogs. If we want to chage the theme of blog, we can also check [here](http://jekyllthemes.org/), fork their repository. Or we can make own themes, it's a big challenge for skills of Front-End. OK, let's enjoy blog now.

-------------------------------------------------------------------------------

# References

> * Jekyll offical docs site: <https://jekyllrb.com/docs/home/>
> * Jekyll GitHub repository souce code: <https://github.com/jekyll/jekyll>
> * Markdown processer redcarpet: <https://github.com/vmg/redcarpet>
> * Jekyll theme offical site: <http://jekyllthemes.org/>
