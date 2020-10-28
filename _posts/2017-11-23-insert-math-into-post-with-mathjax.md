---
title: "Insert Math into post with MathJax"
date: 2017-11-23 19:50:32 +0900
category: blog
tags: jekyll latex
toc: false
---

Sometimes we may need to insert math equation into posts. [MathJax](https://www.mathjax.org/#about) can help us to do this. We can write LaTeX-like equations in posts with MathJax. And it's also easy to config into Jekyll.

-------------------------------------------------------------------------------

## Add script tag into HTML head.

Add the script below into every page (or add it into template page "default.html"):

```html
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

> This CDN has been retired, so I changed it to cdnjs.cloudflare.com:
>
> ```html
> <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
> ```

## Use redcarpet or karmdown as Markdown compiler[^footnote]

Set it in `_config.yml` file:

```ruby
markdwon: kramdown # or redcarpet
```

## Use LaTeX-like code

MathJax use `\\( \\)` for inline math and `\\[ \\]` or `$$ $$` for displayed math. For instance:

```latex
$$ E = mc^2 $$
```

You can get:

$$
E=mc^2
$$

`\\( \alpha\times\beta\times\gamma \\)` can get \\(\alpha\times\beta\times\gamma\\)

[^footnote]: Because some strange things will happen when you use default Markdown compiler.
