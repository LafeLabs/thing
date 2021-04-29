[home](index.html)

# Code

There are five basic types of code used in the Geometron System, corresponding to five Alchemy archetypes.  These are:

- Air: CSS
- Water: HTML
- Fire:JavaScript
- Earth:Geometron Hypercube
- Aether:PHP

Geometron is [documented here](scrolls/geometron.md).  The other four can all be learned from [W3schools.com](https://www.w3schools.com/), using [Mozilla's documentation of web developer technology](https://developer.mozilla.org/en-US/) and [https://www.php.net/](https://www.php.net/) as a reference for PHP. 

All code self-replicates. 

All code is human readable.

All code can be edited by all users.

All code can be deleted by all users.

All code can be copied by all users.

The initial location of the Trash Robot/Geometron Thing code is at [https://github.com/lafelabs/thing/](https://github.com/lafelabs/thing/). 

To create another instance of the full Trash Robot/Geometron system, we copy a program called "replicator.php" into the main web directory of the server.  The raw code can be found at either locally on this server at [php/replicator.txt](php/replicator.txt) or globally on the original lafelabs Github "thing" repository at [https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt](https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt).  


We generally run Trash Robot/Geometron in one of three ways:  

1. Run it on a hosted remote server somewhere
2. Run it on a Raspberry Pi and serve it over a local wifi network.
3. Run it locally on a computer we are using for active development

To host it on a remote server, we first buy a domain name representing a local place which is not property: a public street, public park, public body of water name for instance.  We always choose obscure domains, do not use .com, and avoid any personal information or names of businesses.  Then we pay for hosting service.  We find the root directory for web hosting, and create a new file called replicator.php.  We copy the code in the replicator into that and save it.  Then we point a browser to [your domain name]/replicator.php and wait for the script to copy all the files.  

To run it on a Raspberry Pi, after installing the normal Pi software, install Apache and PHP as follows:

<pre>
sudo apt update
sudo apt install apache2 -y
sudo apt install php libapache2-mod-php -y
</pre>

Then install the [Geometron software](https://github.com/lafelabs/thing/) type copy/paste these commands into the terminal:

<pre>
cd /var/www/html
sudo rm index.html
sudo curl -o replicator.php https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt
php replicator.php
cd ..
sudo chmod -R 0777 *
</pre>

To run on a local laptop as localserver, if you're on a mac, just open a terminal.  You can use the "command" button combined with searching for "terminal" to find it, then pin it to the menu bar.  On a Windows machine, [install Ubuntu under windows](https://ubuntu.com/tutorials/ubuntu-on-windows#1-overview).  Then as with mac you can use control-escape to bring up the Start Menu, and type in "ubuntu" and click on it to open a terminal.  Once the terminal is open, pin Ubuntu to the task bar for easy use in the future.  

In the terminal, you want to type 

<pre>
php -S localhost:80
</pre>

Or open .bashrc 

<pre>

nano ~/.bashrc

</pre> 

And copy this line after the last existing line of the file:

<pre>
alias s='php -S localhost:80'
</pre>

And then just hit the letter "s" every time you get to the command line.

When the local PHP server is running you can open a browser on that machine and point it to [http://localhost](http://localhost/) and you will be running the full Trash Robot/Geometron software on that machine.  You can use this for purely local interaction where no one in the world can see what you do, and can edit various files which you then paste into other instances of the software, send to other users, or import when other users send you date([scrolls](scrolls/scrolls.md), [maps](scrolls/maps.md), [feeds](scrolls/feeds.md), [symbols](scrolls/geometron.md)).


You can fork the whole software when you run it locally on a laptop by replicating the whole system into a directory which is a Git repository, then pushing the code to a public repository(like on Github) and then replicating the new version of the code to the whole Web by pointing the code in replicator.php which has a url for "dna.txt" to the global url for your dna.txt file.  Dna.txt has all the files to copy organized by type.  Replicator.txt uses that to figure out what to copy.  The DNA is generated using another PHP script called dnagenerator.php.  PHP files are all stored as .txt files in the directory php, and a script called text2php.php copies all of those files to the main web directory and changes the extensions from .txt to .php. 

All code is edited with the program [editor.php](editor.php). This is a code editor which edits all code directly on the server.  This is how all code development works in Trash Robot/Geometron.  It is all in the Web Browser.  Code formatting is carried out using the free [open JavaScript library Ace.js](https://ace.c9.io/), hosted on Cloudflare CDN at [https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js](https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js).  With this we can edit all the HTML, all the JavaScript, all the PHP, the raw Geometron, and various data files.  This editor is used to make and edit all kinds of files. 

To create a new file we can use "newfile" after editor.php as follows: editor.php?newfile=[filiename].  The file will appear at the very end of the list of files, with the right color coding and syntax highlighting based on the file extension.

A coffee shop-centered community code work flow is now described.  A Raspberry Pi sits on the coffee shop wifi network.  All users in the shop share in making scrolls, maps, symbols, feeds, pages and apps.  Then any user can back all that up to a full new code instance, and push that to their public facing Github page.  That copy of replicator.php is the pointed to that copy of dna.txt.  The next instance of the software can use the code from this new replicator.php and it will clone the whole code base of that coffee shop, with no reference at all to the original code. Each fork creates a fully independent copy of the code.

To fork a whole full instance of the software down a level, use [fork.html](fork.html).  This lets you create new branches with whatever name you want, as well as delete whole branches.  Deletion is real!! There are no backups.  We prevent data loss with massive redundancy of replication. If all users frequently not only replicate but pass along all information, loss is a normal part of information life cycle and easy deletion is healthy. 



