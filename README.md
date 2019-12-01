### [link up a level../](../)

## The Geometron Network

### Self-replicating web page(organic media)

*language is how the mind parses reality*

- no usernames
- no logins
- no passwords
- no databases
- no patents
- no copyrights
- no trademarks
- no corporate structure
- no employees
- no equity
- no debt
- no permanent domain names
- no land ownership
- no central servers
- no code that cannot be edited live on the server
- the Watershed is the primary geography
- everything self-replicates
- everything can be edited
- everything can be deleted
- everything is physical
- everything is fractal

To edit this or any page, click on the edit button, type and edit at will, then click on it again to get back to this screen:

[![](iconsymbols/edit.svg)](pageeditor.html)

What you see here is "markdown", which is a simple way to publishing things on the web. Hit return twice to get a paragraph break.  Copy the syntax you see here to get links and images and headings. You can look up markdown ([cheat sheet](https://www.markdownguide.org/cheat-sheet/), [detailed guide](https://daringfireball.net/projects/markdown/syntax), [wikipedia entry](https://en.wikipedia.org/wiki/Markdown)) for more syntax.  Also embedding <span style = "color:red;font-family:courier;">HTML</span> works if you know that.  

To fork down a level and make a new page, click on the tree icon:

[![](iconsymbols/fork.svg)](list.html)

Enter the name of the new page you want to create and click through the links to get to a new page one level down from this one.  Repeat this in the "new map" field to make a new map, which is a stack of images, symbols, words and links in a general web page layout.  

To replicate this to a new web server copy the code [here (php/replicator.txt)](php/replicator.txt) into a file called replicator.php on the new server, then point a browser to [your new web site domain]/replicator.php to run the replicator.

To start a new Geometron web server get free web hosting at [000webhost](https://www.000webhost.com/) or buy a domain and get paid hosting at [bluehost](https://www.bluehost.com/) or [dreamhost](https://www.dreamhost.com/), or get a Raspberry Pi, install [Apache](https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md) and php on it and do the same copying of replicator.php.  Build a Raspberry Pi terminal with a screen([Amazon link](https://www.amazon.com/gp/product/B01J51CXU4/)), keyboard, mouse and power supply, put it on a local WiFi network, figure out the IP address of it, and link to that from local networks to make physically local Geometron Page only available on local wifi. 


To get to web directory, copy replicator.php, run it, change permissions, and get your local IP address use the following commands from the terminal:
<pre>
cd /var/www/html
sudo rm index.html
curl -o replicator.php http://www.maplelawn.net/php/replicator.txt
php replicator.php
sudo chmod -R 0777 *
hostname -I
</pre>


To fork the code, go to a UNIX command line with PHP installed, go into a new directory which is linked to a new github repository, copy replicator.php into that directory and type from the command line:

<pre>
php replicator.php
php -S localhost:8000
</pre>

 and navigate your browser to localhost:8000, then edit using editor.php, change references in replicator.php to your new repo address, and replicate from the new fork by changing the code in replicator.php.  Note that php code needs to be made live by cliking on txt2php.php from editor.php.  This will work on macos or linux with very minimal effort, and requires adding the Ubuntu command line to work on Windows 10.  


Edit code using this program:

[editor.php](editor.php)

Trash Magic is a system for technology development, an artistic movement, a world view, and a way of life.  Trash Magic is a system of creating free(free of any form of property relations) self-replicating value.  Geometron is a language which is used as the medium to transmit Trash Magic. This language consists of the software documented here, including creating and using symbols and symbolic languages, making "maps", scrolls and memes.  The Geometron symbolic language is based on Action Geometry, a method for practical geometric constructions using tools of symmetry and scale.

Factories in Trash Magic are self-replicating information structures which produce something of value.  This can be information, like a scroll factory(this is a scroll factory), or map factory or symbol factory, or media like the Book Factory, or something much more complex, like one of the various Trash Robot machines which can be used to create complex artifacts from a feed of trash using transformative manufacturing.

To build a symbol factory, click one level down from this to the subdirectory [symbol/](symbol/), and click on replicator.php there to replicate the symbol factory software.  This can be repeated below any Geometron page.

Our physical world is defined by the Watershed we are in(what water flows through our physical space), the Street(how we are connected to physical transport of people and goods around us), the Replicators/Factories(how things are replicated in the world of information and things we care about), and the Network, or how we are linked to other places, things and people.  All these things our our Universe that we understand in our minds are linked to both physical media and digital media in this format.  





