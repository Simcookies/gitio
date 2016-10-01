---
layout: post
title: "Fix Nvidia bug in Ubuntu 16.04"
category: Solution
tags: Linux Ubuntu
---

After I found a lot of problems with Windows 10, I installed Ubuntu 16.04 together with it. However when I finished installing it, I checked the lastest driver of Nvidia and replaced it from test to offical version, errors showed out: Driver "ebridge" was registered. So I searched online, also did as they said, but it still didn't work. Finally, I just made a little change in it. Here is the way.

Firstly, get into recovery-mode (4.4.0-21-generic), and enter to shell:

```
sudo apt-get purge nvidia*
sudo apt-get purge nvidia-settings
sudo apt-get purge nvidia-prime
```

Reboot, and enter Boot with new kernel version (4.4.0-23-generic). This is what they said. But I found it still showed up with the error message. So I tried to reboot and enter normal ubuntu, offcause I can not login GUI because it has not Driver, so I used `Ctrl+Alt+F1` to get into login shell, input:

```
sudo apt-get install nvidia-current-updates
```

Finally, reboot again. OK~ It worked!
