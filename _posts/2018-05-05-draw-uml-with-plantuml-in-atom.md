---
title: "Draw UML with PlantUML in Atom"
date: 2018-05-05 14:23:16 +0900
category: tool
tags: plantUML atom
typora-root-url: ../
---

I want to use UML to help me understanding how Jekyll works, so I found [PlantUML](http://plantuml.com/). It's an open source tool which can draw UML pictures quickly. In this post, I will config PlantUML into [Atom](https://atom.io/).

# Install Atom
Just download the Atom and install it.

# Install Java
Java runtime environment is necessary because PlantUML is written in Java. Check if Java is installed in your PC or *nix by `java --version`. If Java is installed, it will return messages like:

``` shell
java 9.0.1
Java(TM) SE Runtime Environment (build 9.0.1+11)
Java HotSpot(TM) 64-Bit Server VM (build 9.0.1+11, mixed mode)
```

# Install graphviz
Graphviz is a package of open-source tools for drawing graphs with **dot language** script. It is used by PlantUML to draw UML graphs. In Mac, you can install it by brew.

``` shell
brew install graphviz
```

Now we can type `dot -V` in the bash command line to check if it was installed successfully.

# Check installation of Java and graphviz
Official site provide a way to check if the environment of PlantUML is ready or not. First download [plantuml.jar](https://jaist.dl.sourceforge.net/project/plantuml/plantuml.jar) and then type `java -jar plantuml.jar -testdot`. If each installation is OK, it will say: `Installation seems OK. File genration OK.`

# Install plugins of Atom
There are two plugins necessary for using PlantUML in Atom.

- languange-plantuml
- plantuml-preview

[Language-plantuml](https://atom.io/packages/language-plantuml) provide syntax highlight or autocomplete.
[plantuml-preview](https://atom.io/packages/plantuml-preview) will create UML diagrams and display it. It also updates on save.
You can install these two packages with `apm` or directly install them in Atom GUI.

After installation, plantuml-preview needs some configurations.

![setting_of_plantuml](/public/image/setting_of_plantuml.png)

- **Graphviz Dot Executable**: The path of dot which you get it by `which dot`.
- **Additional PlantUML Arguments**: It's `-jar` with default value.
- **PlantUML Jar**: The file you have downloaded before, and put it at some where.
- **Java Executable**: Default is `java` if you can run java in command line directly. If not, use `which java` to find the path.

# Write PlantUML code
Congrulations! We have done all the preparation, and now we can write PlantUML code at Atom. The extension can be `.pu`. For example:

``` 
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```

The shortcut key `Ctrl + Option + p` can preview the UML diagrams.
![demo_of_plantuml_in_atom](/public/image/demo_of_plantuml_in_atom.png)

OK! It's done! Enjoy it~ :tada:

