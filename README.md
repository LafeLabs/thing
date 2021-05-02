# The Organic Web

##  <span style = "color:red">Γ</span><span style = "color:orange">ε</span><span style = "color:yellow">ω</span><span style = "color:green">μ</span><span style = "color:blue">ε</span><span style = "color:purple">τ</span><span style = "color:red">ρ</span><span style = "color:orange">ο</span><span style = "color:yellow">ν</span>

## Geometron

## [Link to Map](maps/home)

 - [localhost/](http://localhost/)
 - [fork](fork.html)
 - [editor.php](editor.php)
 - [dna generator](dnagenerator.php)

The Organic Web is a network of self-replicating documents.  There are no users.  Only documents.  Documents can serve any purpose.  Documents can be edited, replicated, and destroyed.

The five types of document we create on the system are:

 - [Hyperlinks](qrcode.html)
 - [Scrolls](scrolls/scrolls.md)
 - [Maps](scrolls/maps.md)
 - [Feeds](scrolls/feeds.md)
 - [Symbols](scrolls/symbols.md)

The Organic Web operates on the LAP(Linux Apache PHP) stack.  The local wifi web servers are all Raspberry Pis running the Apache web server, with php installed, and with the Organic Web/Geometron code replicated via PHP from the command line.

To build a mobile terminal to bring the OW to the Street, buy the following components:

[$100 Sunfounder compact screen perfect for terminals](https://www.sunfounder.com/collections/displays-monitors/products/7-inch-hdmi-monitor)

or

[7 inch screen from sunfounder for $80](https://www.sunfounder.com/collections/monitors/products/7inch-capacitive-touchscreen)

[$50 buy raspberry pi board from sunfounder](https://www.sunfounder.com/products/raspberrypi-4b)

[$36 talentcell 12 volt battery pack compatible with sunfounder screen/pi combo](https://www.amazon.com/dp/B00ME3ZH7C)

[$66 talentcell 12 volt/5 volt solar battery charger](https://www.amazon.com/dp/B01J7VPHXC)

[$7 sd card on Amazon](https://www.amazon.com/gp/product/B003WIRFD2/)

[$12 sd card reader/writer from Amazon](https://www.amazon.com/Anker-Portable-Reader-RS-MMC-Micro/dp/B006T9B6R2/)

[$12 mini keyboard from amazon](https://www.amazon.com/gp/product/B01IQL2VCE/)

[$10 mouse from amazon](https://www.amazon.com/gp/product/B005EJH6RW/)

When you have gathered the parts, assemble them, install NOOBS on the SD card, and set up your pi.  This collection of highly portable elements including the rechargeable battery is important for the portability of the system, which should have a dedicated bag to carry it around in so that it is fully mobile.  

[link to set up the Pi from raspberrypi.org](https://www.raspberrypi.org/documentation/installation/noobs.md)

Open a terminal and install Apache and php:

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

That Raspberry Pi is now set up to act as a server on the OW.  Log that Pi onto a local wifi hotspot, and if you hover the mouse over the wifi logo in the upper right corner of the screen, you can get the ip address. To log users on the local wifi onto the server, use a [hyperlink](scrolls/hyperlink.md), either a QR code scanable on the screen or a text URL which can be copied and pasted via text message, email, pastebin, or chat.

To evolve the system, you can make Geometron/OW applications yourself by cloning the git repository to your local machine, editing the code, pushing it to your own git repository, and pointing the replicator code to your new repository.  Files are edited using [editor.php](editor.php).  After files have been modified, the dna file for the replicator is generated by running the script dnagenerator.php.  Then when you push your github repository to a public place, you can modify the line in replicator.php which points to the dna file and point it instead to the global link to the raw text version of your dna file.  

For local development, we use the built in web server in PHP, running it from the command line via:

<pre>
php -S localhost:80
</pre>

and then point a browser to [http://localhost/](http://localhost/).

If you have a Mac you already have a command line with PHP installed, so this is just a thing you can do.  If you have a Windows machine you'll need to install the Ubuntu extension, which [Ubuntu has instructions for how to do](https://ubuntu.com/tutorials/ubuntu-on-windows#1-overview).  And on a Linux machine you'll just install PHP.  

To replicate the system in the physical world, we will buy domain names which are not linked to any form of property.  These can be names of streets, public parks, or any other public local geography, such as bodies of water or landmarks.  We will avoid .com and use instead .net, .org and .xyz.  After a domain is purchased, we sign up for commercial web hosting, some random cheap plan.  We then create a new file in the root web directory called "replicator.php", and paste the code in [php/replicator.txt](php/replicator.txt) into the file, and save it.  We then point a web browser on any device to [your domain name]/replicator.php.  We wait for the page to load and provide  a link to the main page.  

This page can then replicate any file from anywhere to be its base form, be it a map or scroll.  The page can be used to link people to a physical time and place where physical network infrastructure can be found(a Raspberry Pi Server).  

Finally, to connect the loops.


