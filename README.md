### [link up a level../](../)

# The Geometron Art Factory

### *language is how the mind parses reality*

A *factory* is a collection of things which, taken together, produce something of value.  This page represents part of a global system of production of symbols called the Geometron Art Factory.  An Art Factory *instance* consists of some subset of the various things listed in this document. 

The first thing an Art Factory instance contains is a scroll, which this document is an example of.  Scrolls are symbolized by this:

![](iconsymbols/scroll.svg)

To edit this or any page, click on the edit button, type and edit at will, then click on it again to get back to this screen:

[![](iconsymbols/edit.svg)](pageeditor.html)

What you see in the edit screen(after clicking the edit icon) here is "markdown", which is language which allows people to publish things on the web without learning more complex languages. Hit return twice to get a paragraph break.  Copy the syntax you see here to get links and images and headings. You can look up markdown ([cheat sheet](https://www.markdownguide.org/cheat-sheet/), [detailed guide](https://daringfireball.net/projects/markdown/syntax), [wikipedia entry](https://en.wikipedia.org/wiki/Markdown)) for more syntax.  Also embedding <span style = "color:red;font-family:courier;">HTML</span> works if you know that.  

To go directly to the Geometron symbol editor click on the following icon or [this link](symbol/)

[![](iconsymbols/geometron.svg)](symbol/)

The Art Factory system is fractal: one can always fork down to a lower level and make another instance, and that is done by clicking the following icon:

[![](iconsymbols/fork.svg)](list.html)

Enter the name of the new page you want to create and click through the links to get to a new page one level down from this one.  Repeat this in the "new map" field to make a new map, which is a stack of images, symbols, words and links in a general web page layout.  Each Geometron page has a scroll and a map, as well as an inventory.  The "main" page can be either a scroll or map.  To see the map, click on its symbol, and to edit it click the edit icon from the map screen. The default map shows what the symbols mean that are used for editing.  To see the current map value go to [data/currentmap.txt](data/currentmap.txt).  Also, this JSON file can be edited directly using editor.php(see link below).  Inventory is used to track inventory at a given factory or page.  

This is the symbol for map, as a link to the map:

[![](iconsymbols/map.svg)](map.html)

Maps are a stack of web elements(images, symbols, words, links) arranged geometrically on a page.  The Map page contains an editor for adding and deleting elements, moving them around, rotating them, changing their images, symbols, words and links and changing the order in which they are stacked.  Click the edit button in the map page to edit it. Most pages in the Geometron Art Factory system have links to a map and also a scroll.  Some pages default to a map and others to a scroll, but in general all pages have both.

This is the symbol for inventory, as a link to the inventory:

[![](iconsymbols/inventory.svg)](inventory.html)

Inventory is a little page that tracks things which are useful to buy or find in order to run a Geometron network node--essentially art supplies and computer parts.  It can also be used to scale collaborative manufacturing out of a Geometron node as the network grows.

Pages like this need to be *hosted* on some kind of *web server*.  This can be a free web hosting service, a paid hosting with a purchased domain name, a Raspberry pi on your local wifi network(to create a factory only used by people in your physical vicinity), or a web host run locally on your computer only visible to you.  Each new instance of the Art Factory is created by copying a single small program, called the Replicator, which copies all the rest of the files needed.  The replicator is hosted on a *repository*, generally hosted by [Github](https://github.com/), but it could be anywhere, including an existing Art Factory instance.  The name of the repository that created this is 

[https://github.com/lafelabs/thing/](https://github.com/lafelabs/thing/)

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

To learn the skills needed to hack the code to your purposes, you need to learn JavaScript, HTML, and some PHP, all of which are best learned from [https://www.w3schools.com/](https://www.w3schools.com/).

Some other elements of the Art Factory are:

*Links.*  Links are just what you think: links.  In a page like this they are hyperlinks denoted with a square bracket for the words and parentheses for the URL they point to. On a physical object, a link is just a web address written out so someone can copy it into a browser by reading it.  These are in many ways the life blood of the network, as we are trying to avoid the mainstream centralized Internet for a more physically local option.  Since all pages can be edited by anyone, whatever it is *you* want to link to can be linked to from any page.  Do you want to advertise your local business? Sell some stuff to locals?  Tell people about your local club or group?  Just post a link!  If people hate it they can delete it, but if they like it you get free traffic.  If you give discounts to people who click thru from an Art Factory instance, and other local businesses do as well, you can create a value network that costs nothing to run which can pull value back into the local economy from the global one.

*Address.* An *address* is a unique string of random letters and numbers which identifies a specific factory instance.  This can be tracked in the open Internet by using the address as a hashtag on the commercial social media platforms like Twitter and Instagram.  If people interacting with the instance share products of the factory with that hashtag, other can follow that hashtag and they'll see a feed that represents the ongoing production of the factory without the factory needing any unique account on the social media platform(since anyone can post to the hashtag).  If an address gets polluted by noise, one can always create a new one.  In general these addresses are generated by rolling a bunch of physical dice and converting those numbers to letters and numbers, but anything random will do.

*book.* A great minimalist way to carry the information in this scroll is with a physical bound book.  The Books of the Geometron Art Factory system are created by folding a 8.5X11 (or A4) piece of paper in half twice(so it's 1/4 size), then cutting along one of the folds to make a stack of half-pages each of which is folded along a "spine".  Punch holes in the spine with a push-pin, then sew the booklet together with a needle and thread, and put a strip of duct tape on the outer spine to hold the thread in place.  This volume can then be filled with links and symbols from this scroll and/or the Geometron symbol scroll.

*tokens.*  A *token* is a small artifact painted with *symbols*, *addresses*, or *links* which can be carried and exchanged by people, or left for others to find.  They are used as a value exchange system in the economy of the Art Factory system.

*markers.*  A *marker* is a larger, less mobile, version of the *token*.  It is a sign of sorts which draws the attention of people toward some component of the Geometron Art Factory system: a server, a collection of tokens, a person working with a thing in the system etc.  It can be thought of as a sort of advertising display, and follows the same principles: louder, simpler, bigger and brighter and more colorful is always better.

*ArtBox.*  An *ArtBox* is a box for storing or carrying art supplies.  This can be a critical component of Art Factory production, as it can be used both to create the artifacts described here and to create the all-important *Geometron Keyboard* described in the [Geometron Scroll](symbol/).

*Street.* and *Watershed.*  The *Street* and *Watershed* are the concepts which locate an art factory in physical space.  These are physical things: the *Street* is the means by which people and goods flow in and out of wherever you are or you Factory instance is.  The *Watershed* is the means by which water flows through your physical space.  This is relevant because it is how domain names are chosen(or accounts on free web hosting sites).  Rather than focusing on people, companies, organizations or governments, we define instances by these physical spaces.  Rather than choose an "easy" domain like commercial companies do, we choose something not too hard to remember but also not intended for mass adoption, typically the name of a local stream, creek, pond, portage, bridge or confluence and then some non-standard top level domain like ".net", ".org", or even ".xyz".  Or it can be a physical street location based on a neighborhood, like an informal name of a neighborhood, the name of a shopping center, or the name of a *section* of some longer street.  In a decentralized network, geography matters.  One of the purposes of *maps* is to help navigate local geography, which can include making links to sub-instances in a place as well as local entities like shops or clubs. 

*Skeletron.*  *Skeletron* is a system of building modular structures out of sticks with holes drilled in the ends, tied together with string or rope.  In some cases, an Art Factory instance will be built in a place exposed to the elements.  In those cases a shelter will need to be built, and this is a modular and free way to build such shelters and share the components of them from one instance to another.
