[home](index.html)

# Scrolls

![](iconsymbols/scroll.svg)

 - [edit scrolls](scrolleditor.html)
 - [math scroll](mathuser.php?scroll=scrolls/math.md)
 - [copy scrolls](copy.html)
 - [delete scrolls](scrolldelete.html)
 - [textconvert.html](textconvert.html)
 - [texeditor.html](texeditor.html)
 - [copytex.html](copytex.html)

Scrolls are the text documents of the Organic Web.  The are formatted in Markdown.  

The format of scrolls can take some getting used to for people used to, as it is not WYSIWYG(What You See Is What You Get), but rather uses the Markdown language to create formatting with code.  One of the first tasks of some enterprising new Trash Robot participant will be to create the fully WYSIWYG version of the scroll editor, but for now this is what we have.  Part of the goal here is to have no documents ever be in a format other than human readable.  Even if Markdown is a little awkward to read, a real live human can always read the text and someone with very very basic understanding of code can immediately turn it into fully a formatted document.  


For further information on using the Markdown language, see 

- [the wikipedia page](https://en.wikipedia.org/wiki/Markdown)
- [the official web page](https://daringfireball.net/projects/markdown/)
- [The Markdown Guide](https://www.markdownguide.org/)

The most annoying thing about markdown is putting images in, which you do as follows:

![](https://i.imgur.com/FCGxWiv.png)

Hyperlinks in scrolls are made with square brackets for the text followed parenthesis for the link.  If the link is in the form "maps/mapname", it will link to a map stored locally on the server, and if it links to "scrolls/scrollname" it will link to a local scroll.  

## Some technical details and use of Math

The basis of the scroll software is the JavaScript library [Showdown.js](http://showdownjs.com/), which is great, and it converts from markdown to html.  So scrolls are all in raw markdown but display as html.  Use of HTML tags still work as well.  By default it's commented out but by editing the code using [editor.php](editor.php) it is possible to turn math on using the [MathJax JavaScript library](https://www.mathjax.org/), making it the same [LaTeX](https://www.latex-project.org/)-like markdown that is used in markdown elements in [Jupyter](https://jupyter.org/) notebooks.  This allows for rapid free self replicating math papers to be created and shared on the Network.

## LaTeX workflow

To convert a scroll to a tex document, copy the scroll into a new directory at the *nix command line.  Then create a header and footer text file as follows:

header.txt = 

<pre style = "background-color:white;color:black">
\documentclass[12pt,a4paper]{amsart}
\usepackage{amsfonts}
\usepackage{amsmath}
\usepackage[latin2]{inputenc}
\usepackage{t1enc}
\usepackage[mathscr]{eucal}
\usepackage{indentfirst}
\usepackage{graphicx}
\usepackage{hyperref}
\usepackage{graphics}
\usepackage{pict2e}
\usepackage{epic}
\numberwithin{equation}{section}
\usepackage[margin=2.9cm]{geometry}
\usepackage{epstopdf} 

\def\numset#1{{\\mathbb #1}}
\begin{document}
</pre>

and 

footer.txt = 

<pre style = "background-color:white;color:black">
\end{document}
</pre>

in the new project directory using your favorite text editor.  Now be sure you have [Pandoc](https://pandoc.org/) installed, as well as pdflatex, and any stuff that needs to be installed for latex to work.

Now convert the scroll to a .tex file using pandoc as follows:

<pre style = "background-color:white;color:black">
pandoc -o filename.tex filename.md
</pre>

Then concatenate with header and footer using 

<pre style = "background-color:white;color:black">
cat header.txt filename.tex footer.txt > filename-pdf.tex
</pre>

And finally compile from text to pdf using

<pre style = "background-color:white;color:black">
pdflatex filename-pdf.tex
</pre>

and if there are no errors in the tex code you will have a printable pdf document.

After scrolls are converted to LaTeX, they can form the basis of more permanent documents like Books.
