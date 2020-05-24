# Replicate Geometron Pi server

This is the instructions to replicate the Geometron Raspberry Pi based trash robot server.  If you already have a server, click on the scroll link to go to "pisetup".

First, the tools you'll need for each installation, which are not consumable:

1. SD card USB reader to create new SD card
2. HDMI screen/display of some kind, either a TV or monitor
3. HDMI cable
4. A computer to flash new SD cards
5. a USB keyboard
6. a USB Mouse
7. box cutter
8. soldering iron and solder
9. someplace with wifi

Next are the consumables you will need:

1. raspberry pi 3 B+([buy 3B+ from pishop.us](https://www.pishop.us/product/raspberry-pi-3-model-b-plus/))
2. SD card
3. custom robot hat board
4. samtec headers
5. raspberry pi 40 pin header
5. 3 buttons
6. cardboard
7. duct tape
8. 12 V power supply cable
9. USB/12 V power pack battery
10. USB wall plug
11. USB power cord
12. 12 V charger to wall for battery pack

steps to setup physical pi server:

1. solder all components onto printed circuit board, put board onto pi
2. assemble cardboard and duct tape enclosure with space for USB perriferals, power, HDMI, buttons, cables

Steps to set up software on pi server:

1. put raspbian on the SD card
2. boot system, set it up
2. install apache and php
3. install geometron
4. install button control scripts
5. get IP address of server and write it on the unit

## apache and php install code, to be copy/pasted into terminal on pi:

<pre>
sudo apt update
sudo apt install apache2 -y
sudo apt install php libapache2-mod-php -y
</pre>


## Geometron install code to be copy/pasted into terminal window on pi:

<pre>
cd /var/www/html
sudo rm index.html
sudo curl -o replicator.php https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt
php replicator.php
sudo chmod -R 0777 *
hostname -I
</pre>

## Button setup script, copy/paste:

<pre>
sudo bash buttonsetup.sh
</pre>

This will copy two shell scripts and two python scripts to the proper directories, make them executable, and set up both to run on restart of the pi.  To start the shutdown script so it's running right now, type in 

<pre>
sudo /etc/init.d/listen-for-shutdown.sh start
</pre>

