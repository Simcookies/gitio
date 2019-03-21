## ハードウェアの決定と構成
### SCSI(Small Computer System Interface)

SCSIはハードディスクやCD-ROMなどの周辺機器を接続するための規格の1つです。

SCSIには大きく分けてバス幅が8bitと16bitの2種類があります。8bitのSCSIでは8台の、16bitのSCSIでは16台のデバイスを扱うことができますが、そのうちの1台はSCSIコントローラになります。したがって、接続できる周辺機器の数はそれぞれ7台と15台です。また、SCSIに接続されているデバイスにはSCSI IDという番号が割り当てられます。8bitのSCSIの場合は0～7、16bitのSCSIの場合は0～15が割り当てられます。

### USBデバイス
主な USB コントローラ、USB の規格、モジュール:

| コントローラ | 規格   | USB モジュール(Kernel 2.4) | USB モジュール(Kernel 2.6) |
|--------------|--------|----------------------------|----------------------------|
| UHCI         | USB1.1 | usb-uhci                   | uhci_hcd                   |
| OHCI         | USB1.1 | usb-ohci                   | ohci_hcd                   |
| EHCI         | USB2.0 | サポートされていない       | ehci_hcd                   |

主な USB デバイス:

| デバイスクラス                 | デバイス                                       |
| ------------------------------ | ---------------------------------------------  |
| HID(Human Interface Device)    | キーボード、マウス、ジョイスティック(Joystick) |
| Mass Storage Class             | ハードディスク、USBメモリー                    |
| ACM Communication Device Class | モデム、TA(Terminal Adapter)                   |
| Audio Class                    | スピーカー、マイク                             |

接続されたUSBデバイスの情報を表示するコマンドは`lsusb`です。また、`/proc/bus/usb/devices`には接続されたUSBデバイスの情報が格納されています。ファイルの内容はcatコマンドなどで確認できます。

### /proc 以下のファイル

/proc中存放着进程，按照各个进程号进行存储。其中/proc/[PID]/*中比较重要的两个文件：

* cmdline：这个程序被启动的字符串
* environ：这个程序的环境变量内容

而在/proc下存放的文件则是针对 Linux 的文件。

| ファイル名            | 説明                                                 |
| --------------------- | -------------------------------                      |
| /proc/cmdline         | 载入 Kernel 时下达的命令和参数(可以看出是如何启动的) |
| /proc/cpuinfo         | CPUの情報                                            |
| /proc/devices         | 记录系统各个设备代号                                 |
| /proc/filesystems     | 目前系统载入的文件系统                               |
| /proc/meminfo         | メモリの情報                                         |
| /proc/interrupts      | IRQの情報                                            |
| /proc/ioports         | I/Oポートの情報                                      |
| /proc/kcore           | 内存的大小                                           |
| /proc/loadavg         | top 或者 uptime 的平均负载时间                       |
| /proc/modules         | 目前 Linux 已经载入的模块列表(lsmod)                 |
| /proc/mounts          | 目前 Linux 已经挂载的数据                            |
| /proc/swaps           | 系统挂载的内存                                       |
| /proc/partions        | 分区记录                                             |
| /proc/uptime          | uptime                                               |
| /proc/bus/*           | 一些总线的设备记录                                   |
| /proc/bus/usb/devices | USBデバイスの情報(lsusb)                             |
| /proc/bus/pci/devices | PCIデバイスの情報(lspci)                             |
| /proc/scsi/scsi       | SCSIデバイスの情報                                   |

### udev

周辺機器(デバイス)にはコールドプラグデバイスとホットプラグデバイスの2つがあります。

* コールドプラグデバイス

  システムが停止している状態でのみデバイスの差し替えができるデバイスのことです。システムは起動時にデバイスを認識します。

  コールドプラグデバイスにはネットワークカード(NIC)などがあります。

* ホットプラグデバイス

  システムが起動している状態でもデバイスの差し替えができるデバイスのことです。これらはプラグアンドプレイデバイスとも呼ばれます。ホットプラグデバイスにはUSBやPCカード(PCMCIA)、IEEE1394などがあります。

なお、ホットプラグデバイスの制御は**udev**(Userspace DEVice management)によって行われます。 

カーネルはデバイスを検知すると「/sys」以下（sysfsと呼ばれます）の情報を更新しますが、その更新をudevは検知し、/dev以下にデバイスファイルを動的に作成します。

デバイスファイル作成時の動作は、「/etc/udev/rules.d」ディレクトリに配置された設定ファイル（拡張子「.rules」）に記述された情報に基づいて行われます。

### modprobe

依存関係を考慮してカーネルモジュールをロードまたはアンロードするコマンドはmodprobeです。

------
## システムのブート
### 系统开机流程

0. 按下电源
1. 载入 BIOS 的硬件信息以及自我检测（Power-on self test），并依据设置取得第一个可开机的设备；
2. 读取第一个开机设备内的 MBR 的 bootloader（grub2, spfdisk 等程序）；
3. 依据 boot loader 设置的载入 Kernel 到内存，Kernel 会开始侦测硬件与载入驱动程序；
4. 硬件驱动成功之后，Kernel 会主动调用 systemd 程序，并以 default.target 流程开机；

### systemctlコマンド

systemctl subcommond [Unit]

> Unit 没有扩展名的话，默认以.service 扩展名结尾

主要的 subcommond:

| subcommond      | 用途                                   |
| -----------     | -------                                |
| disable         | サービスの自動起動を無効にする         |
| enable          | サービスの自動起動を有効にする         |
| get-default     | 次回起動のターゲットを表示する         |
| halt            | システムを停止halt状態にする           |
| is-active       | サービスが稼働しているかを表示する     |
| list-unit-files | 全てのUnit定義ファイルを一覧表示する   |
| reboot          | システムを再起動する                   |
| reload          | サービスの設定ファイルを再読み込みする |
| restart         | サービスを再起動する                   |
| set-default     | 次回起動時のターゲットを設定する       |
| start           | サービスを起動する                     |
| status          | サービスの状態を表示する               |
| stop            | サービスを停止する                     |
| poweroff        | システムを停止し電源を切断する         |

systemdで扱う処理はUnitという単位で管理する。Unitには各機能ごとに拡張子が割り当てられており、拡張子を見ることでどいった機能のためのUnitかが判別できるになっている。

| 拡張子  | 機能                                           |
|---------|------------------------------------------------|
| device  | 各種デバイスを管理するUnit                     |
| mount   | ファイルシステムのマウントを管理するUnit       |
| service | サービスを制御するUnit                         |
| swap    | スワップ領域を管理するUnit                     |
| target  | 複数のサービスを一つのグループにするためのUnit |

SysVinitのランレベルとsystemdのターゲットは以下のように対応している。
| ランレベル | ターゲット        |
|------------|-------------------|
| 0          | poweroff.target   |
| 1          | rescue.target     |
| 2,3,4      | multi-user.target |
| 5          | graphical.target  |
| 6          | reboot.target     |

### Upstart

UpstartはSysVinitを改善した新しい仕組みである。Red Hat Enterprise Linux(RHEL)やUbuntuに採用されていましたが、現在はsystemdへの置き換えが進められている。

Upstartではバックグラウンドで動作するデーモンプロセス（サービス）や、一度だけ実行させたい処理（タスク）を「ジョブ」と呼び、ジョブ単位で起動処理の管理を行う。

Upstartは各ジョブの実行に必要な前提条件を「イベント」で管理し、前提条件がすべて成立した時点でジョブを実行する。SysVinitのように順次起動していくのと異なり、サービスの起動に必要な条件が成立した時点で起動処理が行われるため不要な待機時間がなくなる。また、各ジョブの実行が並列に行われるため、関連のない独立したサービスは同時に起動させることができる。

イベントはシステム上の変化を検知するだけではなく、initctlコマンドで発行することもできる。
