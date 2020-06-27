---
title: "使用 PicGo 与 Github 为 Typora 搭建图床"
date: 2020-06-27 23:21:01 +0900
category: blog
tags: typora
toc: false
typora-root-url: ../
---

一直使用 Markdown 编辑器 [Typora](https://typora.io/), 因为除了最基本的 Markdown 语法之外, 他还非常好地支持了 LaTex 公式以及 Mermaid 图表库. 但是之前一直有些在意的地方就是 Typora 的图片存放位置的问题. 之前的版本支持复制到当前文件夹或者其他指定文件夹, 但是这样就导致了, 每次同步或者拷贝某一个 md 文档的时候, 要带着这个图片文件夹一起"跑", 感觉总是怪怪的.

从版本 0.9.84 开始忽然收到更新通知, 开始支持图片上传功能了(通过 PicGo 或者其他自定义命令)! 在这里我就用了官方推荐的 **PicGo 加上 Github 仓库的方案**尝试了一段时间, 感觉确实不错. 图片可以存放在一个地方, 而且每次移动文档时也不用担心其中的图片丢失链接了. 这篇文章里, 我想大概总结一下这个方案的做法.

# Github 设置

可以新建或者用现有的仓库[^1], 这个仓库就是用来存放未来所有上传上来的图片的, 当作云存储来用的感觉. 这里的仓库名称和 branch 名称留以备用.

[^1]: 这个代码仓库必须要是 public 性质的才能在各个地方都能够被访问到. 这里涉及到了图片访问权限的问题, 所以请针对情况使用.

另外为了让 PicGo 能够上传图片至 Github, 需要给予其访问权限, 这里 PicGo 采用的就是 token. 在 Github 设置的地方新建一个 token 备用.

![image-20200628000403915](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20200628000404.png)

# 下载安装 [PicGo](https://molunerfinn.com/PicGo/)

安装好之后的 PicGo 长成这个样子[^2]:

[^2]: 其中图床设置的地方应当有很多项, 但是因为其他项暂时都用不到, 所以都关闭了

![image-20200627235009023](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20200627235009.png)

开始对 Github 图床进行设置, 把上面所提到的仓库名, 分支名, Token 都填上 (有需要的话, 仓库中的存储目录也是可以指定的), 基本上就算是结束了.

![image-20200628001038711](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20200628001038.png)

个人习惯性会将图片的名称全部自动改为日期之后上传, 正好 PicGo 自带了这样的设置 (其他设置可自由折腾):

![image-20200628001409831](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20200628001409.png)

到了这里, PicGo 自身已经可以用来上传图片了. 在上传区中"点击上传"或者"拖拽文件上传"都可以实现上传图片到 Github. 而 Github 仓库里面也能够看到传过来的图片了. 最后开始设置 Typora.

# Typora 连接 PicGo

在偏好设置 > 图像里面选择: 插入图片时上传图片, 并且设置上传服务为 PicGo(App) 并且指定一下 PicGo 的安装路径. 最后可以使用`验证图片上传选项` 来查看效果, 会返回上传成功的 JSON 消息.

![image-20200628001949008](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20200628001949.png)

![image-20200628002355088](https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20200628002355.png)

同时, 在 Github 的图床里面会多出来两张 Typora 的 logo. 至此, 所有的设置都完成了, 再次向 Typora 中插入或者直接拷贝图片的时候, 便会自动触发 PicGo 自动上传图片到 Github 功能. 加上 OneDrive, 一个本地的 Markdown 编辑器 Typora 彻底变成了一个方便易用的云端笔记工具 (真的推荐 Latex 公式功能) :smiley: