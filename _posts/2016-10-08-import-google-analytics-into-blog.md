---
title: "Import Google Analytics into Blog"
date: 2016-10-08 09:20:00 +900
category: blog
tags: jekyll
typora-root-url: ../
---

[Google Analytics](https://en.wikipedia.org/wiki/Google_Analytics) is a freemium web analytics service offered by Google that tracks and reports website traffic. It is now the most widely used web analytics service on the Internet. You can get many information with Google analytic. For example, where is the user who visited you blog from, how long he stay at your pages and so on.

-------------------------------------------------------------------------------

# Make a new Google Analytic account

Firstly, we need to sign up a new Google Analytic account, or just use google account. [Here](https://analytics.google.com/analytics/web/?authuser=0#provision/SignUp/) you can sign up a account.

And then input your ID and website, after it you can get `Tracking ID` and `Tracking Code`. You just need to copy and paste this JavaScript code into every webpage you want to track. Or if you miss that guide page, you also can find this code at google analytics pages here:

![tracking_code](/public/image/tracking_code.jpg)

-------------------------------------------------------------------------------

# Improt Tracking Code to your blog

Now we get the tracking code, as google said, we need to copy and paste it into every page. Of course with Jekyll Liquid Language, we do not do this. Instead of it, we should make a new file `analytics.html` in `_include/` and paste JS code into analytics.html.

Because every pages will apply `default` layout, so we just need to include analytics code in `_layout/default.html`:

{% raw %}
```html
  ...
  
  {% include analytics.html %}
  
  </body>
</html>
```
{% endraw %}

OK! After build and run you site (`jekyll s`), you can use inspect to find analytics code in every pages of your blog!

-------------------------------------------------------------------------------

# Exclude developmet environment

Here is a problem: Google analytics code was included into every page, when someone visit your site, it will send necessary information to Google automaticlly. But if we run jekyll server locally, every pages will also send information. That is not we hope, because we want to get info of visitors not-self.

In other word, we should just use google analytic code in production environment not development environment. By the way, the default environment of `jekyll s` is development. So we need a judgement before include JS code. `jekyll.environment` will give the answer.

{% raw %}
```html
  ...
  {% if jekyll.enviroment == 'production' %}
    {% include analytics.html %}
  {% endif %}
  
  </body>
</html>
```
{% endraw %}

Well, now, you can inspect your site, it does not show JS code indeed. Before you public your blog, you need use `JEKYLL_ENV` to specify enviroment of jekyll: `JEKYLL_ENV=production jekyll build` and the JS code will be included in your blog site. You can make a sure after deploying or just use `JEKYLL_ENV=production jekyll server` to make sure locally.

-------------------------------------------------------------------------------

# Summay

Use Jekyll include Google Analytics Code into our blog site. This can help us to get information about our visitors. By doing this, we may see some information about both Pros and Cons, this remind us we need take some actions to improve our article writing skills, make site more valuable and readable. 

> Only good articles can attract more visitors.

So let's try our best to be a good writer!

-------------------------------------------------------------------------------

# References

> * Blog by Michael Lee: [Google Analytics setup for Jekyll](https://michaelsoolee.com/google-analytics-jekyll/)
> * Google Analytics Site: <https://www.google.com/analytics/>
