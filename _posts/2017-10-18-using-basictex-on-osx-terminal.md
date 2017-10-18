---
title: "Using BasicTex on OSX Terminal"
category: tool
tags: latex OXS
toc: false
---

MacTeX is a great GUI Application for Latex Distribution. But it is too big with 2.8GB which make me can not accept it. Luckly MacText also provides a smaller distribution named BaiscTeX. I wrote this blog to take notes of installing BasicTeX and subsequent steps. The goal is to write and compile tex file in Emacs.

# Installing BasicTeX

- Download & install [BasicTeX](http://www.tug.org/mactex/morepackages.html)
- Download & install [TeX Live Utility](http://amaxwell.github.io/tlutility/): TeX Live Utility is a GUI App for management of updating, install and otherwis managing TeX Live.

After these two steps, latex can be used correctly. `latex xxx.tex` to compile tex file to dvi file. `dvipdfmx` to make dvi file to pdf file. However, it just can be useful for english writting, if you want to write for Chinese or Japanese, it needs other configurations.

## Install platex

Use Tex Live Utility can install different compilers include `platex` or some font packages.

## Errors

Solutions of some errors.

1. "jsartile" can not be found: Tex Live Utility(TLU) install "jsclasses";
2. ! LaTeX Error: File 'newpxtext.sty' not found.: TLU install "newpx";
3. ! LaTeX Error: File 'fontaxes.sty' not found.: TLU install "fontaxes";
4. ! LaTeX Error: File 'newtxmath.sty' not found.: TLU install "newtx";
5. Here is a big error when output dvi to pdf:
    > kpathsea: Running mktexpk --mfmode / --bdpi 600 --mag 1+0/600 --dpi 600 qtmr.pfb
    > mktexpk: don't know how to create bitmap font for qtmr.pfb.
    > mktexpk: perhaps qtmr.pfb is missing from the map file.
    > kpathsea: Appending font creation commands to missfont.log.
    >
    > dvipdfmx\:warning : Could not locate a virtual/physical font for TFM "ntx-Regular-tlf-t1".
    > dvipdfmx\:warning : >> This font is mapped to a physical font "qtmr.pfb".
    > dvipdfmx\:warning : >> Please check if kpathsea library can find this font: qtmr.pfb
    > dvipdfmx:fatal: Cannot proceed without .vf or "physical" font for PDF output...

    TLU to install `kastrup` and `tex-gyre`

6. When transfer dvi to pdf with dvipdfmx, it said: Could not locate a virtual/physical font for TFM "rml".: Find file of /usr/local/texlive/2017basic/texmf-config/dvipdfmx/dvipdfmx.cfg, and uncomment "cid-x.map". After that, make `sudo mktexlsr`.
7. dvipdfmx can load cid-x.map, but it said: dvipdfmx:fatal: Could not find encoding file "H". : Tex Live Utility installed "adobemapping".
    
