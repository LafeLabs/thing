### [link up a level../](../)

## Geometron: Geometric Meta-Language

### *language is how the mind parses reality*

To go directly to the Geometron symbol editor click on the following icon or [this link](symbol/)

[![](iconsymbols/geometron.svg)](symbol/)

To edit this or any page, click on the edit button, type and edit at will, then click on it again to get back to this screen:

[![](iconsymbols/edit.svg)](pageeditor.html)

What you see in the edit screen here is "markdown", which is language which allows people to publish things on the web without learning more complex languages. Hit return twice to get a paragraph break.  Copy the syntax you see here to get links and images and headings. You can look up markdown ([cheat sheet](https://www.markdownguide.org/cheat-sheet/), [detailed guide](https://daringfireball.net/projects/markdown/syntax), [wikipedia entry](https://en.wikipedia.org/wiki/Markdown)) for more syntax.  Also embedding <span style = "color:red;font-family:courier;">HTML</span> works if you know that.  

To fork down a level and make a new page, click on the tree icon:

[![](iconsymbols/fork.svg)](list.html)

Enter the name of the new page you want to create and click through the links to get to a new page one level down from this one.  Repeat this in the "new map" field to make a new map, which is a stack of images, symbols, words and links in a general web page layout.  Each Geometron page has a scroll and a map, as well as an inventory.  The "main" page can be either a scroll or map.  To see the map, click on its symbol, and to edit it click the edit icon from the map screen. The default map shows what the symbols mean that are used for editing.  To see the current map value go to [data/currentmap.txt](data/currentmap.txt).  Also, this JSON file can be edited directly using editor.php(see link below).  Inventory is used to track inventory at a given factory or page.  

This is the symbol for map, as a link to the map:

[![](iconsymbols/map.svg)](map.html)

This is the symbol for inventory, as a link to the inventory:

[![](iconsymbols/inventory.svg)](inventory.html)

Inventory is a little page that tracks things which are useful to buy or find in order to run a Geometron network node--essentially art supplies and computer parts.  It can also be used to scale collaborative manufacturing out of a Geometron node as the network grows.

To replicate this to a new web server copy the code [here (php/replicator.txt)](php/replicator.txt) into a file called replicator.php on the new server, then point a browser to [your new web site domain]/replicator.php to run the replicator.

To start a new Geometron web server get free web hosting at [000webhost](https://www.000webhost.com/) or buy a domain and get paid hosting at a company like [dreamhost](https://www.dreamhost.com/), or get a [Raspberry Pi](https://www.raspberrypi.org/), install [Apache and php](https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md) on it and do the same copying of replicator.php.  Build a Raspberry Pi terminal with a screen, keyboard, mouse and power supply(this can be bought as a kit or built up from a pi motherboard and found components from other systems), put it on a local WiFi network, figure out the IP address of it, and link to that from local networks to make physically local Geometron Page only available on local wifi. 


To get to web directory, copy replicator.php, run it, change permissions, and get your local IP address use the following commands from the terminal:
<pre>
cd /var/www/html
sudo rm index.html
sudo curl -o replicator.php https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt
php replicator.php
sudo chmod -R 0777 *
hostname -I
</pre>


To fork the code, go to a UNIX command line with PHP installed, go into a new directory which is linked to a new github repository, copy replicator.php into that directory, run the program, then start php's built in web server as follows and type from the command line:

<pre>
curl -o replicator.php https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt
php replicator.php
php -S localhost:8000
</pre>

 and navigate your browser to localhost:8000, then edit using editor.php, change references in replicator.php to your new repo address, and replicate from the new fork by changing the code in replicator.php.  Note that php code needs to be made live by cliking on txt2php.php from editor.php.  This will work on macos or linux with very minimal effort, and requires adding the Ubuntu command line or installation of [MAMP](https://www.mamp.info/en/) to work on Windows 10.  

Edit the code using this program:

[editor.php](editor.php)

Note that everything in the Geometron system is designed to replicate and also to create a stream of newly replicated things, and that this type of self replicating structure is called a "factory".  So this page is a "scroll factory", the map editing pages are called "map factories" and the pages that let you build symbols are called "symbol factories".

To build a symbol factory, click one level down from this to the subdirectory [symbol/](symbol/), and click on replicator.php there to replicate the symbol factory software.  This can be repeated below any Geometron page.  When you create symbols using the symbol factory, they can be imported into any scroll(a document like this) or any map(the meme editing software linked to all Geometron pages).  Documentation for geometron symbol factories can be found in the scroll for that, linked from the main symbol page.











