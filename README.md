### [link up a level../](../)

# The Geometron Seed

### *language is how the mind parses reality*

## Replication process:

1. Create a Geometron Web Page connected to a physical place(psychogeography)
2. Learn and share the learning of how to edit Scrolls, Maps and Symbols
3. Create Shapes of Action Geometry using the Geometron language
4. Use shapes to create self-replicating book Action Geometry, add call number(in the 516's in Dewey Decimal), place in library, book store or coffee shop
5. Create a logo for this Geometron Seed instance, and use it to create a bookmark with Geometron advertising your channel address and web address, print and distribute in physical area you want to network.  [Bookmark printing company](https://www.uprinting.com/bookmark-printing.html). Create custom icons for links in local network as needed.
6. Create a channel number which can be followed as a hashtag(use dice for random numbers).  A pair of 6 sided dice can make a 2 digit base 6 number, which can be used to choose alphanumeric characters between A-Z and 0-9.  A 12 digit string will have the chances of doubling up on addresses infinitesimal for the forseeable future, but 6 digits is probably fine to begin with.
7. Use the Geometron Printer to create physical Seeds from the Trash Feed, spread them in your local physical environment, construct Treasure Maps to make Quests to find them, invite new people to learn and spread the Art Seeds, and to replicate and evolve the System.  This "printer" is an abstraction, can can be just an action taken by an artist to make things.  Geometron seeds carry with them channel numbers which allow one to track their trajectory by people using Twitter and Instagram to communicate on that address as a hashtag.  Geometron Seeds may be used as an alternative to numerical bank-debt currency.  Or in the beginning as a medium of commerce *in* bank debt currency. By creating a constant stream of new channel numbers and using them as open hashtags connected to one another, we can create a *real* sharing economy, in which all commerce is facilitated by shared open communication channels without any interaction centralized companies.

As the system grows we will put a hard copy Action Geometry book and a few bookmarks into every public library, every university library, every little free library, every bookstore, every art gallery and every coffee shop in the world.  The book starts with the basic Shapes of AG and Geometron glyphs to describe their symmetries and scales, and follows with symbols specific to a given artistic movement, faith, or cosmology. "Seeds", or pieces of physical information imprinted into trash will also grow in number and power over time, until they can be used to engage in free economics by anyone anywhere in the world.  

To replicate the system ask someone who already has how to do it and we'll show you.  If you're starting from scratch and don't know anyone to show you how, sign up for the mailing list of the architect of this system and I'll walk you through the whole thing by email.  Mailing list signup is at [actiongeometry.org](https://actiongeometry.org/).  When you sign up for the mailing list you'll get some basic instructions for the next step and there will be an exchange of emails as you find your party/team, decide on your place, and build up your customized Art Seed for your own personal Art Quest. 

### Scroll(this page)

[![](iconsymbols/scroll.svg)](scroll.html)

### Edit Scroll:

[![](iconsymbols/edit.svg)](pageeditor.html)

What you see in the edit screen(after clicking the edit icon) here is "markdown", which is language which allows people to publish things on the web without learning more complex languages. Hit return twice to get a paragraph break.  Copy the syntax you see here to get links and images and headings. You can look up markdown ([cheat sheet](https://www.markdownguide.org/cheat-sheet/), [detailed guide](https://daringfireball.net/projects/markdown/syntax), [wikipedia entry](https://en.wikipedia.org/wiki/Markdown)) for more syntax.  Also embedding <span style = "color:red;font-family:courier;">HTML</span> works if you know that.  

[Geometron Symbols](symbol/): 

[![](iconsymbols/geometron.svg)](symbol/)

[Create a fork](list.html):

[![](iconsymbols/fork.svg)](list.html)

Enter the name of the new page you want to create and click through the links to get to a new page one level down from this one.  Repeat this in the "new map" field to make a new map, which is a stack of images, symbols, words and links in a general web page layout.  Each Geometron page has a scroll and a map, as well as an inventory.  The "main" page can be either a scroll or map.  To see the map, click on its symbol, and to edit it click the edit icon from the map screen. The default map shows what the symbols mean that are used for editing.  To see the current map value go to [data/currentmap.txt](data/currentmap.txt).  Also, this JSON file can be edited directly using editor.php(see link below).  Inventory is used to track inventory at a given factory or page.  

[Map](map.html):

[![](iconsymbols/map.svg)](map.html)

Maps are a stack of web elements(images, symbols, words, links) arranged geometrically on a page.  The Map page contains an editor for adding and deleting elements, moving them around, rotating them, changing their images, symbols, words and links and changing the order in which they are stacked.  Click the edit button in the map page to edit it. Most pages in the Geometron Art Factory system have links to a map and also a scroll.  Some pages default to a map and others to a scroll, but in general all pages have both.

Pages like this need to be *hosted* on some kind of *web server*.  This can be on a free web hosting service, on a purchased domain with paid hosting, on a local wifi network only other people on that network can see, run locally on a single machine, or run on server clusters in decentralized Internet infrastructure as the network starts to scale up.

A word of warning: all Geometron servers are world-writeable and world-readable by default, with no user or login or password control.  Put nothing on any Geometron server which is private, personal or proprietary.  Do not integrate these pages into existing pages where you care about security.  The risks of a totally world-writeable and world-readable network go away if we put no money or property or personal information on the Network. And that is precisely how this Network is built: as a self-replicating shared art resource on which people can co-create art and instantly publish it both to the Web(both the centralized Web and the Geometron network).  If you want something to survive over time without being changed or deleted, copy it to places that won't get deleted like a local private hard drive, a Github repository or a pastebin paste.

What follows are some of the technical details of how to actually replicate this.  This part will be overly technical for people not used to working with the internals of Internet stuff.  If you ask around you can probably find someone who knows how to follow these instructions, though, and work together with them to build an instance of the Geometron Art Seed without digging into the very technical stuff yourself. Find someone into web things, sign both of you up for the mailing list and we'll get you set up with the more obscure details of making a new instance work.

<h3 style = "background-color:#ffbfbf">Technical Details Below This Line</h3>

All instances are replicated with a program called replicator.php, which uses a file called dna.txt to fetch all the files needed to run an instance.  These are a collection of html, javascript and php programs as well as some Geometron data which make up a copy of this whole webpage.  The entire system when copied is between 1 and 2 megabytes, and will run on any server with php installed, which is most servers.

The Github repository from all this is generated is:

[https://github.com/lafelabs/thing/](https://github.com/lafelabs/thing/)

To run the replicator, copy the code in [this file](https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt) or use the [local copy of the file here](php/replicator.txt) to a file called replicator.php in whatever directory on the server you want to copy Geometron.  Run that file by pointing your browser to [your server url]/replicator.php, then click on the link you see.  After that you can click on the "fork" icon and navigate down to "symbol/" and click on that replicator as well to replicate the Geometron symbol creation page.

To start a new Geometron web server get free web hosting at [infinityfree.net](https://infinityfree.net/) or [000webhost](https://www.000webhost.com/) or buy a domain and get paid hosting at a company like [dreamhost](https://www.dreamhost.com/), or get a [Raspberry Pi](https://www.raspberrypi.org/), install [Apache and php](https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md) on it and do the same copying of replicator.php.  Build a Raspberry Pi terminal with a screen, keyboard, mouse and power supply(this can be bought as a kit or built up from a pi motherboard and found components from other systems), put it on a local WiFi network, figure out the IP address of it, and link to that from local networks to make physically local Geometron Page only available on local wifi. 

To get to web directory, copy replicator.php, run it, change permissions, and get your local IP address use the following commands from the terminal:
<pre>
cd /var/www/html
sudo rm index.html
sudo curl -o replicator.php https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt
php replicator.php
sudo chmod -R 0777 *
hostname -I
</pre>

Once you have a IP address of a local server, put a link to that address on some global server so that without remembering the IP address or putting it in manually you can go to an existing server and just click to get to the local one.  If this is in a public place and you wish to share, you can then paint some physical thing with the address of the global page (www.yournewdomain.xyz), and edit the main top level scroll of that page to have the link to the local server be at the top, with some clear description or image(a picture of the physical server is not a bad idea).  

The longer term road map for the Geometron Art Factory network is to install server clusters locally in every basement of every library, school, town hall, church, coffee shop and office park, locally owned by the people in that local community who get value from it.  Ultimately this can completely replace the centralized Internet, with physical hardware all controlled by the people who benefit from that network in the local physical world near those servers.

To create a new fork of the code, go to a UNIX command line with PHP installed, go into a new directory which is linked to a new github repository, copy replicator.php into that directory, run the program, then start php's built in web server as follows and type from the command line:

<pre>
curl -o replicator.php https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt
php replicator.php
php -S localhost:8000
</pre>

 and navigate your browser to localhost:8000, then edit using editor.php, change references in replicator.php to your new repo address, and replicate from the new fork by changing the code in replicator.php.  Note that php code needs to be made live by cliking on txt2php.php from editor.php.  This will work on macos or linux with very minimal effort, and requires adding the Ubuntu command line or installation of [MAMP](https://www.mamp.info/en/) to work on Windows 10.  

Edit the code for any page in the Art Factory using the *editor*, another thing all instances have:

[editor.php](editor.php)

When you have created your own modifications of the code, push that to your own Github repository and change the links in replicator.php to links to the global link to the raw text for your own dna.txt file and symbol/php/replicator.txt in your new repository and all future instances will be generated from your code instead of this instance.  Any php files you edit using editor must be converted from .txt to .php by running text2php.php by clicking on the link to that program from the Editor.  If you add new files, you can add them to dna.txt by clicking dnagenerator.php.  Note that *all* files in the system can be edited. 

To learn the skills needed to [hack](https://en.wikipedia.org/wiki/Hacker_culture) the code to your purposes, you need to learn JavaScript, HTML, and some PHP, all of which are best learned from [https://www.w3schools.com/](https://www.w3schools.com/).

Note that in the Geometron system we associate the basic Five Languages with the Five Elements as follows: Fire = JavaScript, Air = CSS, Water = HTML, Aether = PHP, and Earth = Geometron. 



