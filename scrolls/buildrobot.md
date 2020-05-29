# Replicate a New Robot

This assumes you have the raspberry pi geometron server, and are just building the robot part.

## Tools

1. soldering iron
2. solder
3. box cutter
4. tiny screwdriver
5. voltmeter

## Consumables

1. DVD/CD drives/players (3)
2. cardboard
3. epoxy
4. elmer's glue
5. samtec 4 wire ribbon cable, stripped and tinned one end (3)
6. stiff plastic
7. bendy plastic
8. rare earth magnets(2)
9. nails(1)
10. super sculpey III clay
11. paint pens


## Steps

1. strip down drives to get out stages
3. solder 4 wire cables to stages
4. epoxy strain relief as needed for all three, on one side
5. glue stacks of cardboard on 4 corners of each stage on bottom side so they're even
6. create cardboard chassis board
7. epoxy all 3 linear stages onto chassis
8. epoxy cardboard stacks on each stage
9. cut bend and epoxy bendy and stiff plastic into tool holder
10. assemble magnets and nail to set up tool in tablet print mode
12. use tiny screwdriver, battery, volt meter and power supply to set current limit correctly for stepper motors
13. connect the server to the robot
14. change boolean isrobot to true
15. move probe right and left, up and down, forward and back, check directions, set direction pin booleans in robot.py
16. do test prints, make tablets, bake, paint and distribute



<pre>
#robotExists = True #python has capitalized booleans because it is dumb
robotExists = False #python has capitalized booleans because it is dumb
</pre>


- DVD or CD drives(3) or other linear stepper motor stages
- 4 wire samtecs from stripped tinned leads to female or female to female and male headers to break out on motors
- samtec pin-pin's to connect wires to header [samtec TSW-104-08-G-S](https://www.digikey.com/product-detail/en/samtec-inc/TSW-104-08-G-S/SAM1038-04-ND/1101770)
- gorilla epoxy, elmers glue, JB weld
- modeling clay and sculpey
- plastic trash sheet(polyprpelyne) 
- magnets
- nails


## Tasks

- buy or scavenge everything, store it, distribute it(supply chain within geometron network)
- [flash images onto SD cards using Raspberry Pi Imager](https://www.raspberrypi.org/documentation/installation/installing-images/)
- do the geometron-specific software setup described here
- assemble electronics--solder parts on, rotate potentiometer all the way to the left
- assemble cardboard chassis
- mount stages on cardboard, mount cardboard on stages
- cut plastic, bend it, mount it on cardboard and add magnets and nail
- use meter to find right wire pairs, connect 4 wire samtec 
- change robotExists from False to True in robot.py
- connect everything and run tests of basic x,y,z motions 
- put soft modelling clay under nail probe, flatten it, use robot controls to set height, do test prints of lines, squares, words
- make prints of symbols and words on slabs of sculpey, bake, paint, epoxy to rocks, distribute into public spaces with geometron maps to locate them
- improve all elements of system, document improvements, merge with main project or fork and replicate
- replicate the whole system again, pass it along to another user and guide them to replicate another one after that
- solicit donations from people of parts, tools, materials
- build more robots, release them into public spaces with maps that guide users to them and from them to more robots and more robot factories
- develop and use clay and metal circuit fabrication to make interconnects to use all-upcycled technology for the whole system, including energy generation, storage, motor control, and geometron server, ultimately building full bottom-up electrical fabrication

Buy a raspberry Pi 3 B+ preferably but 4 also works.

Buy 16 gigabyte SD card and SD card reader

Here are the commands to install everything on the pi:

<pre>
sudo apt update
sudo apt install apache2 -y
sudo apt install php libapache2-mod-php -y
</pre>

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

To set up a raspberry pi server, you can run it headless but you need a TV or monitor that has HDMI input with an HDMI, a mouse and a keyboard.

- [pi 4 b 40 dollars](https://www.sparkfun.com/products/15446)
- [micro hdmi converter 6 dollars](https://www.sparkfun.com/products/15796)
- [wall plug power for pi 4 8 dollars](https://www.sparkfun.com/products/15448)
- [micro sd card, 16 gb, 20 dollars](https://www.sparkfun.com/products/15051)

so to buy the whole pi server and set it up headless if you have basic computer stuff around like a screen, keyboard and mouse is about 75 dollars.  If you have to buy a screen, keyboard and mouse that probably adds 50 + 10 + 10 = about 70 dollars, then add a large lipo battery pack with usb c power cable for another 30-50 dollars or as high as 100 with a solar panel.  So the total cost for a fully portable system is in the range of 200 dollars.

 [robot.html](robot.html)

the robot needs a button added to "run" the python robot program on GPIO2.  this should be added in the same script as the off button(off button is on pin 3), both of which need to be run on boot, instructions for adding these are found here:

both buttons are added with a script called buttonsetup.sh, which you an  run from the command line with 

<pre>
sudo bash buttonsetup.sh
</pre>

This will copy two shell scripts and two python scripts to the proper directories, make them executable, and set up both to run on restart of the pi.  To start the shutdown script so it's running right now, type in 

<pre>
sudo /etc/init.d/listen-for-shutdown.sh start
</pre>

And just press the button to shut it all down.  When it's shut down, you can write the IP address on it, restart it in headless mode as you did for the first server you set up, and now you're ready to pass that server along t

Now you can turn off the pi by 

[https://howchoo.com/g/mwnlytk3zmm/how-to-add-a-power-button-to-your-raspberry-pi](https://howchoo.com/g/mwnlytk3zmm/how-to-add-a-power-button-to-your-raspberry-pi)

But are repeated here:

# shutdown button installation:

<pre>
sudo nano listen-for-shutdown.py
</pre>

## listen-for-shutdown.py:

<pre>
#!/usr/bin/env python

import RPi.GPIO as GPIO
import subprocess


GPIO.setmode(GPIO.BCM)
GPIO.setup(3, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.wait_for_edge(3, GPIO.FALLING)

subprocess.call(['shutdown', '-h', 'now'], shell=False)

</pre>

move the file and make it executable:

<pre>
sudo mv listen-for-shutdown.py /usr/local/bin/
sudo chmod +x /usr/local/bin/listen-for-shutdown.py
</pre>

make the shell script:

<pre>
sudo nano listen-for-shutdown.sh
</pre>

## listen-for-shutdown.sh:

<pre>
#! /bin/sh

### BEGIN INIT INFO
# Provides:          listen-for-shutdown.py
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
### END INIT INFO

# If you want a command to always run, put it here

# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting listen-for-shutdown.py"
    /usr/local/bin/listen-for-shutdown.py &
    ;;
  stop)
    echo "Stopping listen-for-shutdown.py"
    pkill -f /usr/local/bin/listen-for-shutdown.py
    ;;
  *)
    echo "Usage: /etc/init.d/listen-for-shutdown.sh {start|stop}"
    exit 1
    ;;
esac

exit 0
</pre>

Move it and make it executable:

<pre>
sudo mv listen-for-shutdown.sh /etc/init.d/
sudo chmod +x /etc/init.d/listen-for-shutdown.sh
</pre>

register to run on boot:

<pre>
sudo update-rc.d listen-for-shutdown.sh defaults
</pre>

and start it now:

<pre>
sudo /etc/init.d/listen-for-shutdown.sh start
</pre>



# Go Button:


<pre>
sudo nano listen-for-go-button.py
</pre>

## listen-for-go-button.py:

<pre>
#!/usr/bin/env python

import RPi.GPIO as GPIO
import subprocess


GPIO.setmode(GPIO.BCM)
GPIO.setup(2, GPIO.IN, pull_up_down=GPIO.PUD_UP)
while True:
	GPIO.wait_for_edge(2, GPIO.FALLING)
	subprocess.call('python /var/www/html/robot.py', shell=True)
</pre>

move the file and make it executable:

<pre>
sudo mv listen-for-go-button.py /usr/local/bin/
sudo chmod +x /usr/local/bin/listen-for-go-button.py
</pre>

make the shell script:

<pre>
sudo nano listen-for-go-button.sh
</pre>

## listen-for-go-button.sh:

<pre>
#! /bin/sh

### BEGIN INIT INFO
# Provides:          listen-for-go-button.py
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
### END INIT INFO

# If you want a command to always run, put it here

# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting listen-for-go-button.py"
    /usr/local/bin/listen-for-go-button.py &
    ;;
  stop)
    echo "Stopping listen-for-go-button.py"
    pkill -f /usr/local/bin/listen-for-go-button.py
    ;;
  *)
    echo "Usage: /etc/init.d/listen-for-go-button.sh {start|stop}"
    exit 1
    ;;
esac

exit 0
</pre>

Move it and make it executable:

<pre>
sudo mv listen-for-go-button.sh /etc/init.d/
sudo chmod +x /etc/init.d/listen-for-go-button.sh
</pre>

register to run on boot:

<pre>
sudo update-rc.d listen-for-go-button.sh defaults
</pre>

and start it now:

<pre>
sudo /etc/init.d/listen-for-go-button.sh start
</pre>


![](https://a.pololu-files.com/picture/0J8411.600.png)

pinout to jumpers from pi header :


![](https://www.raspberrypi.org/documentation/usage/gpio/images/GPIO-Pinout-Diagram-2.png)

samtec cables can be tinned ends or female both ends

female both ends is 

IDSS-04-D-xx.00, xx inches long

and stripped and tinned is 

IDSS-04-S-06.00-ST4
IDSS-04-S-08.00-ST4


some information on samtec headers:

the headers used here, which will be for most things will be in the series 

TSW-104-[pin type from chart]-G-S

![](https://i.imgur.com/nXaHf9n.png)