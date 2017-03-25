---
layout: page
permalink: /wiki/screen
---

# Usage of GNU/Screen

## Start session

|Commands|Contents|
|--------|--------|
|screen|start a new session|
|screen -t name|start a new session with a name|
|screen [commands]|start a new session with implement commond|

-------------------------------------------------------------------------------

## Commands

### Most used

Press `Ctrl + a` can enter **Command mode**, and then input command:

|Key|Contents|
|---|--------|
|`?`|Show help information.|
|`d`|Detach from the current session.|
|`c`|Create a new window.|
|`n` or `Space`|Switch to the next window.|
|`p` or `Backspace`|Switch to the previous windows.|
|`0` or other number|Switch to window of specified number.|
|`Ctrl + a`|Swith to the last used window.|
|`Shift + a`|Set title of window.|
|`"`|Display the list of windows, and you can select window with `Enter`|
|`w`|Dispaly the list of windows at the bottom of windows.|

### Copy mode

Press `Esc` or `[` when in **Command mode**, it will enter into **Copy mode**.

In **Copy mode**, the key map is similar to **Vim**. It can use `h`, `j`, `k`, `l` as the array keys. `Ctrl + u` and `Ctrl + d` to scroll the page. `Enter` can begin and stop copy.

Press `]` when in **Command mode**, it will paste the content what you copied.

### Resume session

Option `-ls` can show list of current screen sessions.

```shell
test@linux: ~ $ screen -ls
There is a screen on:
        13968.pts-0.linux      (Detached)
        1 Socket in /var/run/screen/S-test.
```
