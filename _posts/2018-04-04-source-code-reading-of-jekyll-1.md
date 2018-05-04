---
title: "Source code reading of Jekyll -- 1"
date: 2018-04-04 15:27:12 +0900
category: programming
tags: source jekyll
---

It has been long time since I wanted to study Ruby by reading source code of some project from some open source project. I choosed the Jekyll because it's small and popular in static pages generator. It is my first time to read source codes, I will choose the appropriate way for me. It you have any advices for me, please feel free to reply this article.

I plan to begin from files at root dir, and then go on directories. Finally, return root dir and make a summary of this project.

# jeykll.gemspec

> `gemspec` includes basic infos of the Jekyll project. It is necessary in a RubyGem project.

```ruby
lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "jekyll/version"
```

Load the `lib/` dir into built-in var `$LOAD_PATH` and require `jekyll/version.rb` which includes version info of Jekyll. `File.expand_path` converts a pathname to an absolute pathname. `unshift` can prepend objects to the front of self.

```ruby
Gem::Specification.new do |s|
  ...
  all_files = `git ls-files -z`.split("\x0")
  ...
  s.bindir = "exe"
  ...
  s.add_runtime_dependency("addressable", "~> 2.4")
  ...
end
```

Use \` \` to execute a shell script, the script here can get all files under the management of git.
`s.bindir = "exe"` specify the executable ruby script in `exe/`.
`add_runtime_dependency` adds a runtime dependency named gem with requirements to this gem.

We can install Jekyll by `gem install jekyll`, and gem will create a exculatable ruby script in `gems/ruby-2.X.X/bin`. Implement in console of `jekyll` will call `exe/jekyll`.

-------------------------------------------------------------------------------

# exe/jekyll

> Execulatable ruby script which defined in jekyll.gemspec.

```ruby
STDOUT.sync = true
```

Normally `puts` does not write immediately to `STDOUT`, but this can write every single character immediately to the console[^1]. It is very useful when build websocket server.

```ruby
Jekyll::PluginManager.require_from_bundler
```

Call the `require_from_bundler` method which defined in `lib/jekyll/plugin_manager.rb`. In fact, `require "jekyll"` will load jekyll.rb file, and all other modules are loaded in this file by `autoload :XXX, "jekyll/xxx"`.

```ruby
Jekyll::Deprecator.process(ARGV)
```

This method will deal with arguments deprecated which defined in `lib/jekyll/deprecator.rb`. It will show the error messages and abort calling.

```ruby
require "mercenary"
...
Mercenary.program(:jekyll) do |p|
  ...
end
```

[Mercenary](https://github.com/jekyll/mercenary) is lightweight and flexible library for writing command-line apps in Ruby which is also a sub-repo of Jekyll. This gem may be useful in development of gem.

```ruby
Jekyll::Command.subclasses.each { |c| c.init_with_program(p)
```

Initilization of Jekyll commands in block of Mercenary. These commands are defined in `lib/jekyll/command.rb`.

`Jekyll.logger` is using to manage logs.

# lib/jekyll.rb

> Require necessary libs to this project in lib/jekyll.rb

``` ruby
def require_all(path)
  glob = File.join(__dir__, path, "*.rb")
  Dir[glob].sort.each do |f|
    require f
  end
end
```

As it said of comment, this method requires all of the Ruby files in the given directory.

``` ruby
# internal requires
autoload :Cleaner, "jekyll/cleaner"
...
# extensions
require "jekyll/plugin"
```

`lib/jekyll.rb` requires `rubygems`, stdlib and 3rd party libs firstly. Also it will claim its own modules using `autoload` and `require`.[^2]

``` ruby
class << self
  def some_method
    ...
  end
end
```

`class << self` opens up `self`'s singleton class, so that methods can be redefined for the current `self` object. With this syntax, we don't need to write `def self.some_method` in the module everytime.[^3]

There are such a set of methods defined in the `class << self` block:

``` ruby
env            # jekyll environment
configuration  # configuration Hash by merging the default options with anything in _config.yml
set_timezone   # Set the TZ environment variable
logger         # logger instance
logger=        # set logger writer
sites          # Jekyll sites created
sanitized_path # Returns the sanitized path
```

-------------------------------------------------------------------------------

[^1]: Stackoverflow: [What STDOUT.sync = true means?](https://stackoverflow.com/questions/29998728/what-stdout-sync-true-means).

[^2]: About the difference between `autoload` and `require`, reference is [here](https://stackoverflow.com/questions/804297/when-to-use-require-load-or-autoload-in-rubyutm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa). And I plan to write an another article about this.

[^3]: Stackoverflow: [class << self idiom in Ruby](https://stackoverflow.com/questions/2505067/class-self-idiom-in-rubyutm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa).
