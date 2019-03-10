---
title: "Network Studying Note 2"
category: basics
tags: internet
typora-root-url: ../
---

In the post of [Network Studying Note 1](/2017/03/19/network_studying_note_1), I took notes about the history of Internet and Internet Protocol Suite, especially, the TCP/IP Protocol. TCP/IP contains four layers of Application, Transport, Network and Network Interface. During transmission from layer to layer, top-down is called **Encapsulation** and button-up is called **Decapsulation**. In this post, I will write about the Encapsulations of last three layers and also includes about Three-way-Handshake.

In order to transport network data, the application will send data to transport layer with some header data. The Application is just responsible for processing data logically and regardless of the transmission of it.

-------------------------------------------------------------------------------

# Transport Layer

TCP Segment & UDP Segment

The best-known transport protocol of TCP/IP is the [Transmission Control Protocol (TCP)](https://en.wikipedia.org/wiki/Transmission_Control_Protocol). It is used for connection-oriented transmissions, whereas the connectionless [User Datagram Protocol (UDP)](https://en.wikipedia.org/wiki/User_Datagram_Protocol) is used for simpler messaging transmissions. TCP is the more complex protocol, due to its stateful design incorporating reliable transmission and data stream services.

## TCP

TCP provides reliable, ordered, and error-checked delivery of a stream of octets between applications running on hosts communicating over an IP network. Major Internet applications such as the WWW, email, remote administration, and file transfer rely on TCP. This picture shows the segment structure of TCP.

![tcp_segment](/public/image/tcp_segment.png)

The most used bits are:

* **Source port** (16 bits): Identifies the sending port. Every server or client has 0 ~ 65535 port, and different ports are corresponding to different services. The most used ports:


|Port Number|Server|
|--|------|
|20 or 21|FTP|
|22|ssh|
|23|Telent|
|25|SMTP|
|80|HTTP|
|110|POP3|
|443|HTTPS|

- **Destination port** (16 bits): Identifies the receiving port

## UDP

UDP provides checksums for data integrity and port numbers for addressing different functions at the source and destination of the datagram. UDP is different with TCP without having no handshaking dialogues. This picture shows the segment structure of UDP.

![udp_segment](/public/image/udp_segment.png)

## Handshaking

TCP pays more attention to security, instead, UDP pays more attention to effectiveness. Three times handshaking was introduced into TCP for security with a set of SYN, SYN-ACK, ACK signals. As my understanding, it sounds like that a communication in a classroom. A teacher wants to communicate with a student. 

- Firstly, he calls his name and asks him is listening or not, the first handshaking.
- Secondly, the student answers Yes and asks teacher is still there or not, the second handshaking.
- Finally, the teacher makes sure and says "I will communicate with you from now" to begin this communication, the third handshaking.

After three times handshaking, the safe communication can be established. If the student is not there or after the student said "I'm here" but the teacher was gone, the communication cannot be established. By the way, if the teacher was gone after the first handshaking, the student will always wait for him and try to connect with the teacher after a period of time until the teacher answers or "his death".
This is one way of [DoS Attack](https://en.wikipedia.org/wiki/Denial-of-service_attack).

On the other hand, UDP has no handshaking. The teacher just says what he wants to say regardless of the student's attendance. So UDP has better effectiveness.

-------------------------------------------------------------------------------

# Encapsulation

How to transmit data with four layers? For UDP, the data of Application will be sent to Transport layer, and it adds UDP header in the front of data and sends to next Internet layer. Internet layer will add IP header in the front of that data and send to Data Link layer. Data Link layer add a Frame header in the front of data and add Frame footer in the behind of data. Finally, it sends the frame by physical signals. Here is the picture.

![encapsulation](/public/image/encapsulation.png)

Decapsulation has opposite steps of encapsulation.

