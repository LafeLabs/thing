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
2. 16 gigabyte SD card
3. custom robot hat board [link to order them from pcbway.com](https://www.pcbway.com/project/shareproject/pi_hat_to_connect_to_pololu_MP6500_stepper_motor_drover_boards.html)
4. samtec headers [digikey link to samtec part](https://www.digikey.com/product-detail/en/samtec-inc/TSW-104-07-G-S/SAM1029-04-ND/1101323)
5. raspberry pi 40 pin header [link to buy from pololu](https://www.pololu.com/product/1037)
5. 3 buttons [digikey part number P8079STB-ND, cheap and good panasonic button](https://www.digikey.com/product-detail/en/panasonic-electronic-components/EVQ-11L05R/P8079STB-ND/259532)
6. pololu potentiometer stepper motor control boards [potentiometer-adjust MP6500 stepper driver](https://www.pololu.com/product/2966)
6. cardboard
7. duct tape
8. 12 V power supply cable [amazon link to buy](https://www.amazon.com/gp/product/B07C7VSRBG/)
9. USB/12 V power pack battery [amazon link to buy 35 dollar 6000 mAh battery that works](https://www.amazon.com/gp/product/B00ME3ZH7C/) [amazon link to buy 25 dollar 3000 mAh](https://www.amazon.com/gp/product/B01M7Z9Z1N/)
10. USB wall plug
11. USB power cord
12. 12 V charger to wall for battery pack

steps to setup physical pi server:

1. solder all components onto printed circuit board, put board onto pi
2. assemble cardboard and duct tape enclosure with space for USB perriferals, power, HDMI, buttons, cables

Steps to set up software on pi server:

1. put raspbian on the SD card [flash images onto SD cards using Raspberry Pi Imager](https://www.raspberrypi.org/documentation/installation/installing-images/)
2. boot system, set it up
2. install apache and php(see below)
3. install geometron(see below)
4. install button control scripts(see below)
5. get IP address of server and write it on the unit(see below)

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


Hit the off button and go to the "set up new server" scroll for the next operator


