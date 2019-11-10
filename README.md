# Self Replicating Web Page

## The Geometron Network

To edit, click on the edit button, type and edit at will, then click on it again.  No logins, no usernames, no passwords, no databases.  You just edit and share and replicate.  This is the free web.  Edit icon looks like this:

[![](iconsymbols/edit.svg)](pageeditor.html)

What you see here is "markdown", which is a simple way to publishing things on the web. Hit return twice to get a paragraph break.  Copy the syntax you see here to get links and images and headings. You can look up markdown ([cheat sheet](https://www.markdownguide.org/cheat-sheet/), [detailed guide](https://daringfireball.net/projects/markdown/syntax), [wikipedia entry](https://en.wikipedia.org/wiki/Markdown)) for more syntax.  Also embedding <span style = "color:red;font-family:courier;">HTML</span> works if you know that.  

To fork down a level and make a new page, click on the tree icon:

[![](iconsymbols/fork.svg)](list.html)

Enter the name of the new page you want to create and click through the links to get to a new page one level down from this one.  Repeat this in the "new map" field to make a new map, which is a stack of images, symbols, words and links in a general web page layout.  

To replicate this to a new web server copy the code [here (php/replicator.txt)](php/replicator.txt) into a file called replicator.php on the new server, then point a browser to [your new web site domain]/replicator.php to run the replicator.

To start a new Geometron web server get free web hosting at [000webhost](https://www.000webhost.com/) or buy a domain and get paid hosting at [bluehost](https://www.bluehost.com/) or [dreamhost](https://www.dreamhost.com/), or get a Raspberry Pi, install Apache and php on it and do the same copying of replicator.php.  Build a Raspberry Pi terminal with a screen, keyboard, mouse and power supply, put it on a local WiFi network, figure out the IP address of it, and link to that from local networks to make physically local Geometron Page only available on local wifi. 

To fork the code, go to a UNIX command line with PHP installed, go into a new directory which is linked to a new github repository, copy replicator.php into that directory and type from the command line:

<pre>
php replicator.php
php -S localhost:8000
</pre>

 and navigate your browser to localhost:8000, then edit using editor.php, change references in replicator.php to your new repo address, and replicate from the new fork.  This will work on macos or linux with very minimal effort, and requires adding the Ubuntu command line to work on Windows 10.  


[link up a level../](../)

Edit code using this program:

[editor.php](editor.php)

## Some General Principles of the Geometron Network:

- everything replicates(all things copy themselves, anyone can copy them)
- everything evolves(anyone can edit any file)
- everything dies(anyone can delete any file)
- everything describes its own replication
- everything is connected to something in the physical world

Our physical world is defined by the Watershed we are in(what water flows through our physical space), the Street(how we are connected to physical transport of people and goods around us), the Replicators/Factories(how things are replicated in the world of information and things we care about), and the Network, or how we are linked to other places, things and people.  All these things our our Universe that we understand in our minds are linked to both physical media and digital media in this format.  

*language is how the mind parses reality*

*from each according to their desire, to each according to their desire*

