[home](index.html)

[terminal map](maps/terminal)

# Trash Robot Raspberry Pi Terminal Replication

## Steps

1. Find this document, the Terminal Scroll at scrolls/terminal.md
2. Gather pi hardware
3. Gather Trash Magic materials and tools
4. Gather bag kit elements
5. Assemble Pi terminal
6. [Make NOOBS SD card, turn on PI, set it up](https://www.raspberrypi.org/documentation/installation/noobs.md)
7. Install Apache and PHP
8. Replicate Geometron Server code
9. Point top level map to terminal replicator scroll(this document)
10. Buy domain, make [flag](scrolls/textile) pointing to domain, point map of domain to terminal IP address
11. Assemble pi terminal enclosure
12. Assemble pi terminal bag


## Parts

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

Trash Magic kit including:

 - HDPE plastic milk bottles
 - rainbow duct tape
 - googly eyes
 - scissors, box cutter
 - paint pens
 


## Bag Fabrication

Cut out black cotton flannel according to pattern.  Get a Trash Tie(6' clothesline with both ends taped with duct tape).  Cut out [P3 Rhombus Penrose Tiles](https://en.wikipedia.org/wiki/Penrose_tiling#Rhombus_tiling_(P3)) as shown from red and green felt.  Stitch trash tie into top of bag.  Stitch tiles to bag for pi logo. Double stitch bag together, put terminal in, carry and use.

![](https://i.imgur.com/Acso1rT.jpg)
![](https://i.imgur.com/eWW5y68.jpg)
![](https://i.imgur.com/blwfAUM.jpg)
![](https://i.imgur.com/stbiMPC.jpg)
![](https://i.imgur.com/wCAJgf0.jpg)
![](https://i.imgur.com/yvbgOm0.jpg)
![](https://i.imgur.com/ij5KATT.png)
![](https://i.imgur.com/eOU5AkW.jpg)


## Terminal Fabrication

![](https://i.imgur.com/3uUfJRQ.jpg)
![](https://i.imgur.com/N3408qu.jpg)
![](https://i.imgur.com/Nq6ql9O.jpg)
![](https://i.imgur.com/SteZ5V8.jpg)

## Installation


![](https://i.imgur.com/At1oYEl.jpg)

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


Then hover the mouse over the wifi icon on the Pi desktop to see the IP address of your serer.  To operate the Trash Robot terminal either open a browser on the PI and open [http://localhost](http://localhost) or open a browser on any machine on the same local wifi network and point it to "http://[the ip address of your pi]".  Then you should be back in a familiar Trash Robot/ Geometron Dark Web space.


The system is used to create, share, edit, and replicate documents primarily of the following types:

- [scrolls(like this)](scrolls/scrolls.md)
- [maps](scrolls/maps.md)
- [symbols](scrolls/symbols.md)
- [feeds](scrolls/feeds.md)






