#  <span style = "color:red">Γ</span><span style = "color:orange">ε</span><span style = "color:yellow">ω</span><span style = "color:green">μ</span><span style = "color:blue">ε</span><span style = "color:purple">τ</span><span style = "color:red">ρ</span><span style = "color:orange">ο</span><span style = "color:yellow">ν</span>

## The Book of Geometron

![](https://i.imgur.com/qNNcgNM.png)

by Trash Robot

 1. [Civilizations](scrolls/civilizations.md)
 2. [Organic Media](scrolls/organicmedia.md)
 3. [The Street Network](scrolls/streetnetwork.md)
 4. [Servers](scrolls/servers.md)
 5. [Scrolls](scrolls/scrolls.md)
 6. [Feeds](scrolls/feeds.md)
 7. [Maps](scrolls/maps.md)
 8. [Symbols](scrolls/symbols.md)
 9. [2d Web Graphics](scrolls/web2d.md)
 10. [Shapes and Fonts](scrolls/shapes.md)
 11. [Action Geometry](scrolls/actiongeometry.md)
 12. Machine control
 13. Geometron in 3d and beyond
 14. Full Stack Geometron
 15. Ontology
 16. Icons
 17. Trash Robot

Set up a Raspberry Pi.  To learn more about Raspberry Pi see the main page at [www.raspberrypi.org](https://www.raspberrypi.org/) and also look at what is available on [Adafruit](https://www.adafruit.com/) in terms of Raspberry Pi stuff, as well as [https://www.sunfounder.com/](https://www.sunfounder.com/) and [https://www.pishop.us/](https://www.pishop.us/).  How much stuff you need to get depends on how you want to use the server.  

### Components of a full Raspberry Pi system:

 - HDMI screen
 - HDMI cable
 - Raspberry Pi board
 - SD card
 - SD card reader/writer
 - USB keyboard
 - USB mouse
 - Wall plug
 - Rechargeable battery

![](https://i.imgur.com/4zetaPf.png)

When you have gathered the parts, assemble them, install NOOBS on the SD card, and set up your pi.  This collection of highly portable elements including the rechargeable battery is important for the portability of the system, which should have a dedicated bag to carry it around in so that it is fully mobile.  

[link to set up the Pi from raspberrypi.org](https://www.raspberrypi.org/documentation/installation/noobs.md)

Open a terminal and install Apache and php:

<pre>
sudo apt update
sudo apt install apache2 -y
sudo apt install php libapache2-mod-php -y
</pre>

Then install the [Geometron software](https://github.com/lafelabs/thing/) type copy/paste these commands into the terminal:

<pre style = "overflow:scroll">
cd /var/www/html
sudo rm index.html
sudo curl -o replicator.php https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt
php replicator.php
cd ..
sudo chmod -R 0777 *
</pre>

That Raspberry Pi is now set up to act as a Geometron server.  Log that Pi onto a local wifi hotspot, then go to the link at the top of the screen to get a QR code and link for that server.

![](https://i.imgur.com/iH9gFJC.jpg)

To evolve the system, you can make Geometron applications yourself by cloning the git repository to your local machine, editing the code, pushing it to your own git repository, and pointing the replicator code to your new repository.  Files are edited using [editor.php](editor.php).  After files have been modified, the dna file for the replicator is generated by running the script dnagenerator.php.  Then when you push your github repository to a public place, you can modify the line in replicator.php which points to the dna file and point it instead to the global link to the raw text version of your dna file.  

For local development, we use the built in web server in PHP, running it from the command line via:

<pre>
php -S localhost:80
</pre>

and then point a browser to [http://localhost/](http://localhost/).

If you have a Mac you already have a command line with PHP installed, so this is just a thing you can do.  If you have a Windows machine you'll need to install the Ubuntu extension, which [Ubuntu has instructions for how to do](https://ubuntu.com/tutorials/ubuntu-on-windows#1-overview).  And on a Linux machine you'll just install PHP.  

To replicate the system in the physical world, we will buy domain names which are not linked to any form of property.  These can be names of streets, public parks, or any other public local geography, such as bodies of water or landmarks.  We will avoid .com and use instead .net, .org and .xyz.  After a domain is purchased, we sign up for commercial web hosting, some random cheap plan.  We then create a new file in the root web directory called "replicator.php", and paste the code in [php/replicator.txt](php/replicator.txt) into the file, and save it.  We then point a web browser on any device to [your domain name]/replicator.php.  We wait for the page to load and provide  a link to the main page.  

This page can then replicate any file from anywhere to be its base form, be it a map or scroll.  The page can be used to link people to a physical time and place where physical network infrastructure can be found(a Raspberry Pi Server).  

Finally, we want to connect the physical space around an area which is referenced in the domain back to that domain.  To do this, we create physical media with the domain printed on it.  This can be on a cardboard sign with a marker, spray painted on a wall or street, spray stenciled with a laser cut stencil, printed on a clay icon token, 3d printed, stamped into plastic with a plastic melting robot.  One way to do it is with felt letters cut out and sewn on fabric as follows:

![](https://i.imgur.com/nvWedsQ.jpg)

Here is a guide for the font to use to make these:

![](https://i.imgur.com/nKHSZxC.jpg)

It is important to also have a bag to carry the Pi in, here is the replicator card for the bag:

![](https://i.imgur.com/63OwKhz.png)


