---
title: "Network Studying Note 1"
category: basics
tags: internet
typora-root-url: ../
---

There are some basic pieces of knowledge for programmers, C, Data Structure and Algorithm, Network, Operation System. So it's time to learning about them deeply. This blog is about my learning note of Network. It includes the history of Internet, theory, and application in Linux. If I want to know a new technology, I will first be interested in its history. Knowing the history of some tech will help me to understand why this tech is necessary and why it's fixtures work like this. So let me begin with history.

-------------------------------------------------------------------------------

History of Internet
==========

|Development Stage|History|
|:-----------------:|-------|
|**Concept was born**|In order to make computer cooperate with other devices(etc. Printer, Fax), we need to connect them physically with communication devices and lines. Here comes the concept of Network.|
|**Independent Technology**|Since we have the concept of Network, during 70th and 80th at 20 century, many companies began to develop their own communication technology which just can be used for their own devices, include the software and hardware. And the most famous are Xerox and IBM. (Well, maybe you know the Xerox is the company which developed windows-based GUI and Mouse but did not commercialize them. Finally, Apple and Microsoft found business opportunities.) <br/><br/>Xerox developed [Ethernet](https://en.wikipedia.org/wiki/Ethernet), and IBM developed [Token-Ring](https://en.wikipedia.org/wiki/Token_ring). They were quite fine at that moment, but the question is, the different company has different devices, and they can not talk with each other. For the formal users, it seems they still can not use Network if they use devices from the different company.|
|**Integration with Protocol**|Advanced Research Project Agency, which knew as ARPA of U.S.A, was also focusing on the development project of net communication. At 1967, they put forward the idea of [ARPANET](https://en.wikipedia.org/wiki/ARPANET) and put in into operation at the end of 1969. Different from other net technology, ARPANET introduced Network Control Protocol (NCP) as the communications protocol and provided a standard method to establish reliable communications among different computers and other devices. <br/><br/>However, even it tried to make everything connected together, ARPANET still can not communicate with few important devices, especially, SAT-NET and ALOHA NET. So developer made a new protocol which named Transmission Control Protocol and Internet Protocol (TCP/IP) and knew by everyone. The new protocol made ARPANET connected with other devices. <br/><br/>ARPANET was transferred to Defense Department Communicationg Agence of U.S.A at 1975. After that, many new networks were created at the base of ARPANET, like Computer Science Research Network (CSRNET), Canadian Network (CDNET), Because It's Time Network (BITNET), National Science Foundation Network (NSFNET) and so on. TCP/IP protocols replaced NCP as the ARPANET's principal protocol, even it was written as a part of BSD Unix. During the development of the different network, NSFNET became core between universities and ARPANET was closed at 1989 finally.|
|**Open to Public**|The creation of [NSFET](https://en.wikipedia.org/wiki/National_Science_Foundation_Network) is a very important flag of the Internet development. It turned into commercial operation at 1994, and after that, Internet was open to the public.|

The history of Internet shows the importance of the **standard**. Only with the protocol, the different devices can connect with each other. The Application can focus on data processing instead of data transmission. So I will go on the blog with some protocols.

-------------------------------------------------------------------------------

# Internet Protocol Suite (IPS)

## OSI Model

Open Systems Interconnection model ([OSI model][OSI]) partitions a communication system into 7 abstraction layers. And here is the structure and composition of 7 layers:

|Layers|Protocol data unit|Function|
|------|:----------------:|:------:|
|7.Application|Data|High-level APIs, including resource sharing, remote file access|
|6.Presentation|Data|Translation of data between a networking service and an application; including character encoding, data compression and encryption/decryption|
|5.Session|Data|Managing communication sessions, i.e. continuous exchange of information in the form of multiple back-and-forth transmissions between two nodes|
|4.Transport|Segment(TCP)/Datagram(IP)|Reliable transmission of data segments between points on a network, including segmentation, acknowledgement and multiplexing|
|3.Network|Packet|Structuring and managing a multi-node network, including addressing, routing and traffic control|
|2.Data link|Frame|Reliable transmission of data frames between two nodes connected by a physical layer|
|1.Physical|Bit|Transmission and reception of raw bit streams over a physical medium|

The higher layer will package its data with a header at beginning of itself, and then send the package to next layer. This operation will be repeated and host device sends packaged data by physical line finally:

![OSI model](/public/image/osi_layers.gif)

OSI model does not provide some methods which can be realized, just gives some concepts. So it is not a standard but a concept framework which can be referred when createing a new standard. TCP/IP is such an instance.

## TCP/IP model

[TCP/IP][tcp_ip] is a quite successful protocol, so it was used to replace NCP in ARPANET. There are two reasons. First, it is easier than OSI model because it just has four layers. Second, it can support so many protocols at low layers (Physical layer and Data link layer in OSI model), include Ethernet, Token-Ring, FDDI, PPP, ATM and so on. We can think TCP/IP model is an easier version of OSI model. Here is their relationship and the most used protocols and servers:

![TCP/IP protocol suite](/public/image/tcp_ip_structure.png)

As we know, TCP/IP is most used in fact. Just like OSI model, communication just exists between the same layer, higher will make header or footer to the data package and send it to the lower layer. The receiver host will make inverse operations to get final data. Understanding about these processes is important, and then it's time to understand every layer, but this post is just until here. I will go on with a new one. >= =<

-------------------------------------------------------------------------------

# References

> * Wiki
> * [Linux tutorial about TCP/IP](http://www.linux-tutorial.info/modules.php?name=MContent&obj=page&pageid=142)
> * [Linux鸟哥的私房菜（服务器篇）](http://cn.linux.vbird.org/linux_server/)

[OSI]: https://en.wikipedia.org/wiki/OSI_model
[tcp_ip]: https://en.wikipedia.org/wiki/Internet_protocol_suite
