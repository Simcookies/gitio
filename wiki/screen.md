---
layout: page
permalink: /wiki/screen
---

# Usage of GNU/Screen

## Start session

|Commands|Contents|
|--------|--------|
|screen|start a new session|
|screen -S name|start a new session with a name|
|screen -X [commands]|start a new session with implement command|

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
|`Ctrl + a`|Switch to the last used window.|
|`A`|Set title of window.|
|`"`|Display the list of windows, and you can select window with `Enter`|
|`w`|Display the list of windows at the bottom of windows.|

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

And option `-r` can resume session.

```shell
test@linux: ~ $ screen -r
```

-------------------------------------------------------------------------------

## Configuration

The file `$HOME/.screenrc` can customize Screen. Here are configurations.

```shell
# Turn welcome message off
startup_message off

# Turn off visual bell
# screen will not make screen flash instead of a bell sound.
vbell off

# Fix for residual editor text
# If not, editor will be stay visible even when close it.
altscreen on

# Use 256 colors, or can use xterm-256color or rxvt-unicode-256color
term screen-256color

# Show customizing status (line include color)
hardstatus off
hardstatus alwayslastline
hardstatus string '%{= kG}[ %{G}%H %{g}][%= %{= kw}%?%-Lw%?%{r}(%{W}%n*%f%t%?(%u)%?%{r})%{w}%?%+Lw%?%?%= %{g}][%{B} %m-%d %{W} %c %{g}]'

# Start from window 1
bind c screen 1
bind ^c screen 1
bind 0 select 10
screen 1
```

It can be a good idea to change the default escape key, not only because "a" is usually typed with the left pinky, but also because `Ctrl + a` is mapped to the common command beginning-of-line in GNU Readline and Bash. (I always use Emacs in Screen.) In my configuration, I set it to `Ctrl + ^`.

```shell
# Change the escape key to Ctrl + ^
escape ^^^
```

## References

> - [Archlinux GNU/Screen](https://wiki.archlinux.org/index.php/GNU_Screen)
> - [gentoo linux Screen](https://wiki.gentoo.org/wiki/Screen)
