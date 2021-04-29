[link to home](index.html)

# Trash Robot/ Geometron Scrolls

Scrolls are the text documents of Trash Robot.  Think of this like the Microsoft Word of the Trash Robot ecosystem(with some drastic differences).  Scrolls, along with [maps](scrolls/maps.md), [feeds](scrolls/feeds.md), and [symbols](scrolls/symbols.md), form the basis of the user-facing system of documents which are shared on Geometron.  They are used to document the system, to share ideas, post articles, create ads or lists of ads, or really any type of document one can imagine.  

The format of scrolls can take some getting used to for people used to, as it is not WYSIWYG(What You See Is What You Get), but rather uses the Markdown language to create formatting with code.  One of the first tasks of some enterprising new Trash Robot participant will be to create the fully WYSIWYG version of the scroll editor, but for now this is what we have.  Part of the goal here is to have no documents ever be in a format other than human readable.  Even if Markdown is a little awkward to read, a real live human can always read the text and someone with very very basic understanding of code can immediately turn it into fully a formatted document.  


Symbol for scroll:

![](iconsymbols/scroll.svg)

## Create a scroll

To create a scroll, go to the scroll editor at [scrolleditor.html](scrolleditor.html), and enter the name of the new scroll in the input marked "new scroll name".  When you do this a blank document should appear with black background and green text(this is easy to change if you find it annoying).  Just type out your document if it's just text, hitting enter twice between paragraphs.  

For further information on using the Markdown language, see 

- [the wikipedia page](https://en.wikipedia.org/wiki/Markdown)
- [the official web page](https://daringfireball.net/projects/markdown/)
- [The Markdown Guide](https://www.markdownguide.org/)

The most annoying thing about markdown is putting images in, which you do as follows:

![](https://i.imgur.com/sTZWh41.jpg)


## Edit a scroll

To edit an existing scroll in the scroll editor, click on it or enter its name in the new scroll name input(no need for the "scrolls" prefix).

## copy a scroll from another place online

All things in Trash Robot self-replicate and scrolls are no exception.  To create a replicator we use the program copy.php which is on every TR server. To this scroll is called "scrolls" and to replicate it we make a link to "copy.php?from=[some web address of a trash robot server]/scrolls/scrolls&to=scrolls/scrolls".  If you run this on a server it will fetch this scroll and place it locally in the scrolls directory.  Of course as with any replication this will overwrite the scroll on the local server so be careful, as any new edits on the new server will be lost. 

To copy all the scrolls, as well as maps and other data, from another TR server, we use copydata.php.  On whatever server you are on, make a link to "copydata.php?from=[the url of the domain from which you're copying].  Note that for both copy.php and copydata.php the source domain can be the IP address of a TR server on your local network.

Also, the simplest way to copy a scroll is to open a new scroll on a new server in the scroll editor, then open the scroll to be copied in the scroll editor on the old server, and just select all, copy, and paste to the new one.  This functionality is part of why having everything be in a human readable format like Markdown is important.

## link to a scroll from a scroll

Links from a scroll to a scroll or from a map to a scroll can be realized in Trash Robot by having the target link be either "scrolls/scrollname" or "maps/mapname", and the code in the TR user page will convert those to local links.  E.g. [link to terminal scroll](scrolls/terminal).  Scrolls can also be linked to globally by using "user.php" with a scroll specified.  For example to link to the Terminal scroll on trashrobot.org we link to [https://www.trashrobot.org/user.php?scroll=scrolls/terminal](https://www.trashrobot.org/user.php?scroll=scrolls/terminal).

mathuser.php

## Delete Scrolls

Everything on every instance of Trash Robot can be deleted quickly and easily and with no backups.  When something is deleted it's really gone. Rather than backing things up or saving to "the cloud", in Trash Robot we replicate what we want to keep and whatever doesn't get replicated will probably eventually be deleted.  To get this functionality, we have a delete scroll page called [scrolldelete.html](scrolldelete.html).  To delete, click on a red X.  But this is for keeps!  Deletion really is deletion.  If you see some bad stuff on a server, just delete it.  If you want to post stuff and not have it deleted, replicate it to a quiet place where no one will see it where it can get replicated back to a live page later if it's deleted.

## Some technical details and use of Math

The basis of the scroll software is the JavaScript library [Showdown.js](http://showdownjs.com/), which is great, and it converts from markdown to html.  So scrolls are all in raw markdown but display as html.  Use of HTML tags still work as well.  By default it's commented out but by editing the code using [editor.php](editor.php) it is possible to turn math on using the [MathJax JavaScript library](https://www.mathjax.org/), making it the same [LaTeX](https://www.latex-project.org/)-like markdown that is used in markdown elements in [Jupyter](https://jupyter.org/) notebooks.  This allows for rapid free self replicating math papers to be created and shared on the Network.


## Code structure

Showdown.js, scrolls/*, filesaver.php, fileloader.php, MathJax.js, dir.php, deletefile.php, 

## LaTeX workflow


address stability issues for large documents, alternative editors

mathuser.php

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

add full work flow to create a book with multiple chapters, this book. Articles.  Links to more information.  More details on installation and use of latex, workflow with latex editors to finish the project.

