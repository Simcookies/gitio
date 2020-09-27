---
title: "树莓派上安装并使用 Mosquitto"
date: 2020-09-27 15:53:04 +0900
category: tool
tags: mqtt raspberrypi server
typora-root-url: ../
---

在物联网设备开发中经常需要用到 MQTT 协议进行通信. MQTT 是一个基于发布 (Publish) 和 订阅 (Subscribe) 的消息协议. 位于通信中心的设备称为 MQTT broker. 其他的设备之间的消息传递都是经由这个 broker. 以前一直选择 [CloudMQTT](https://www.cloudmqtt.com/), Free Trail是足够一般情况下的使用, 但是速度上存在一定的问题 (毕竟服务器在美国). 另外, 在自定义特性上面也没有那么的好.

相比之下, Mosquitto 是一款开源的 MQTT broker 软件. 包括了服务端和客户端. 在实际的开发中, 经常将 broker 设置在本地. 这篇文章就记录了如何在树莓派上安装并且使用 Mosquitto.

# Mosquitto 的安装和配置

> 这里使用的树莓派中, 安装的是 Raspbian. 因为是基于 Debian 的, 使用方法基本上没有差别.

## 安装

```shell
$ sudo apt install mosquitto
```

这样就可以了. mosquitto 作为一个服务一般都是后台运行的 (作为一个daemon), 安装成功之后就会自动开始运行了. 使用 service 查看运行状况.

```shell
$ sudo service mosquitto status
● mosquitto.service - Mosquitto MQTT v3.1/v3.1.1 Broker
   Loaded: loaded (/lib/systemd/system/mosquitto.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2020-09-27 15:50:35 JST; 34min ago
     Docs: man:mosquitto.conf(5)
           man:mosquitto(8)
 Main PID: 14971 (mosquitto)
    Tasks: 1 (limit: 2319)
   Memory: 788.0K
   CGroup: /system.slice/mosquitto.service
           └─14971 /usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf

Sep 27 15:50:35 openhab systemd[1]: Starting Mosquitto MQTT v3.1/v3.1.1 Broker...
Sep 27 15:50:35 openhab systemd[1]: Started Mosquitto MQTT v3.1/v3.1.1 Broker.
```

从上面的输出的 Active 可以得到 mosquitto 运行正常. 另外通过 `netstat` 指令查看这个服务的接口 IP 以及 Port 的状态.

```shell
$ sudo netstat -ltnp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:1883            0.0.0.0:*               LISTEN      14971/mosquitto
```

可以看出服务面向了所有 IP 地址, 以及使用了 1883 端口, 而这些都是 mosquitto 的默认配置. 

## 配置

首先为了保证最基本的安全通信, **可以为 broker 设置用户名和密码.**

```shell
$ sudo mosquitto_passwd -c /etc/mosquitto/passwd username
```

为一个叫做 username 的人生成一个相应的密码, 存储在 `/etc/mosquitto/passwd` 中. 并且在配置文件  `/etc/mosquitto/mosquitto.conf` 中进行指定.

```shell
allow_anonymous false
password_file /etc/mosquitto/passwd
```

这样在之后的连接中, 就能够使用用户名 username 和密码进行登录来了. 如果并不需要用户名密码登录的话, 可以设置匿名用户登录, 这样任何设备都可以直接连接 broker 了.

```shell
allow_anonymous true
```

**另外通过修改配置文件也可以修改开放 IP 和端口**.

```shell
bind_address 0.0.0.0 # 使用 ip 地址或者主机名
port 1883            #开发端口
```

有的时候在一些特殊情况下不支持基本的 MQTT 协议, 比如 Python 或者 JavaScript 的 Paho 包, 需要使用 websockets 的协议. 同样也是在配置文件中修改.

```shell
listener 8083
protocol websockets
```

不同于基本的 MQTT broker, 这里相当于新建一个 websockets 协议, 8083 端口的新的 `listener`.

以上基本的配置就结束了. 需要注意的是, 文件末尾必须留下换行符号, 而且配置好文件之后需要重新启动 mosquitto 服务.

# 使用 MQTTBox 进行测试

为了测试上述的安装与配置, 以及实际的通信没有问题, 可以使用一个 [MQTTBox](http://workswithweb.com/mqttbox.html) 的小工具. 当然也是可以使用 mosquitto 自带的 clients 功能, 只不过没有那么可视化.

最开始添加一个 MQTT Client. 填入红框中的基本参数就可以了.

<img src="https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20200927172533.png" alt="Snipaste_2020-09-27_17-24-49" style="zoom: 80%;" />

其中 "MQTT Client Name" 随意记入. 因为上述的配置中没有选择特殊的 websockets, 所以 Protocol 中选择 mqtt/tcp, 而不选择 ws. Host 中填入安装 mosquitto 的设备的可访问的局域网 IP 地址. 最后填入用户名和密码保存就可以了.

显示连接成功的话, 就可以进行测试. 一开始 MQTTBox 会默认打开一个 publish 和一个 subscribe. 通过发布和订阅一样的 Topic (例中使用了 EdgeDevice/Status 作为 Topic) 就能测试通信了.

<img src="https://raw.githubusercontent.com/simcookies/image-host/master/imgs/20200927173300.png" alt="Snipaste_2020-09-27_17-32-04" style="zoom: 80%;" />

左侧发布的 Payload 的内容, 右侧订阅也能收到一样的内容就表示通信没有问题.

# 特殊的 Topic

在 mosquitto 中有一些特殊的主题, 通过订阅他们可以获得当前 broker 的实时情况. 这些内容可以使用 man 手册查看 mosquitto 得到, 这里我列出两个一下个人觉得有用的.

| Topic                         | 内容                                   |
| ----------------------------- | -------------------------------------- |
| $SYS/broker/clients/connected | 当前连接着的客户端数量                 |
| $SYS/broker/clients/expired   | 因为超过持续连接时间而中断的客户端数量 |


# Trouble shouting

基本配置能够保证绝大部分的通信, 但比如下面 Log 中的错误.

```
Client XXX has exceeded timeout, disconnecting.
```

这只是因为在 keepalive 时间内(默认15秒) 没有进行任何通信而产生的自动断开, 并不是Mosquitto的问题, 而是通信设备连接软件的问题.

解决办法也很简单: 

1. 在 keepalive 时间内保证通信;
2. 在主循环中使用client.loop()方法保证通信.