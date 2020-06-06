[link back to main page](index.html)

[link to robot](robot.html)

# Building a Robot

##  Acquire and wire up linear stages

To begin, gather 3 DVD or CD drives or players.  DVD drives from computers are ideal as they are what all current development has been for.  The important part here is not the drawer that is used to insert and eject the disk but the little part inside that moves the optics back and forth.  Ask people you know if they have any old computer or audio or video equipment, take it apart and look for the stages shown in the images here.

![three DVD drives](https://i.imgur.com/pl6lOeA.jpg)

Extract the stages to their most basic components: just a motor that drives a threaded rod which moves the stage back and forth.

![three linear motion stages removed from DVD drives](https://i.imgur.com/ZOhBsui.jpg)

Lay out the three stages as shown so that the round part that spins the disk is facing away from the center for all three.  Try to match the two horizontal stages to each other if there are two that look the most alike of the three.  Acquire the four wire cables with female header connectors from Samtec or find a replacement from other wires.  The three Samtec parts are:

- [idss-04-s-04.00-st8](https://www.samtec.com/products/idss-04-s-04.00-st8)
- [idss-04-s-06.00-st8](https://www.samtec.com/products/idss-04-s-06.00-st8)
- [idss-04-s-08.00-st8](https://www.samtec.com/products/idss-04-s-08.00-st8)

![linear motion stages laid out with samtec cables](https://i.imgur.com/EfYJOiV.jpg)

When you have wires and stages ready to wire, you need to use an ohm-meter to determine which pairs of leads are connected on the motors.  These are called bipolar stepper motors, and you can read about them more on [Wikipedia](https://en.wikipedia.org/wiki/Stepper_motor).  For most DVD drives the resistances you'll measure with the ohm meter are in the range from 8 to 12 ohms, occasionally as high as 18 ohms on the pairs that are connected, and effectively infinite on the leads that are not pairs.  If the layout is confusing, use a paint pen or marker to mark which are pairs.

![testing leads with ohm meter](https://i.imgur.com/pNO6BIR.jpg)

Solder the wires to the motor so that the first two wires go to one coil and the second two of the four go to the other.  Which pair goes to which coil does not matter, you will set the polarity of the motor in software when the robot is completed.

![closeup of solder joint to stepper motor](https://i.imgur.com/04yUdjz.jpg)

## Build linear stage chassis

First gather large quantities of corrugated cardboard, get a ruler, a box cutter, a marker, Elmer's glue and some kind of epoxy with some body to it(not superglue).  Use this to cut out the following patterns:

![photograph of corrugated cardboard cutouts](https://i.imgur.com/low2lId.jpg)

The cutouts are:

- 0.6" x 0.6", 36 units
- 1.6" x 1.6", 6 units
- 4.5" x 5.5", 3 units

You will be making feet for each stage using stacks of small squares of cardboard.  To do this, flip over each linear stage and test heights of feet.  The bottoms of stages are often a different height on one side from the other, use the number of layers of cardboard needed to have the whole thing sit flat when it sits on the feet.  Note that these feet can also be made from wood, plastic, metal, clay, Legos, or anything else, this is just one method.  As long as you can fabricate feet that set the object flat it will work.

Use Elmer's glue to stack small squares into feet, use large cutouts and a weight to hold them together while they dry.

![Elmer's glue bottle and three small cardboard squares](https://i.imgur.com/ylKRcJL.jpg)

![Elmer's glue dab on a small cardboard square](https://i.imgur.com/UiMiqZi.jpg)

![stack of three glued small squares](https://i.imgur.com/IN0JrX1.jpg)

Now epoxy all the feet to all three stages.

![image of four cardboard feed on bottom of linear stage with epoxy dispenser](https://i.imgur.com/BQN3K7e.jpg)

Put each stage on the larger rectangular cutouts, which are about 4.5 by 5.5 inches. Use the marker to trace roughly the outline of the stage, then cut it to the exact size for each of the three stages and epoxy it to the feet.

![stage and pen outline of exact shape on large cardboard rectangle](https://i.imgur.com/MhpdpMh.jpg)

The last step is to glue the medium sized cardboard squares into three stacks of 2, and epoxy them onto the stages on the computer parts so that they're flat.  This can take some experimentation to get right.

![fully assembled linear stage unit](https://i.imgur.com/JFIaIpD.jpg)

## Build the Bridge Tool

You will need to scavenge the thin milky plastic sheet used for both milk jugs and some juice containers.  

![plastic milk jug in refrigerator](https://i.imgur.com/Vdr5ifE.jpg)

This plastic is called HDPE, you can see the recycle symbol code(number 2) shown here:

![bottom of plastic milk jug with HDPE recycle symbol](https://i.imgur.com/WHCyt4B.jpg)

Now you will need a scissors, ruler, and marker.

![tools to measure and cut plastic](https://i.imgur.com/ar7oM8P.jpg)

Cut out the patterns as shown:

![HDPE plastic cutout patterns and dimensions](https://i.imgur.com/rfncgHZ.jpg)

The cutouts are:

- 1"x1", 2 units
- 1.65"x1", 1 unit

These pieces should be marked with a marker or pen directly down the middle for the squares and 0.5 inches in from the ends for the rectangle.

Now get something you can score an indent line into plastic with like a fork or can opener, along with a ruler.

![tools to score the HDPE cutouts](https://i.imgur.com/UI0SVPc.jpg)

Score along the dotted lines, and bend away from the scoring.  If it's hard to bend, you can re-score deeper.

![scored and bent pieces of HDPE](https://i.imgur.com/AQTgIzb.jpg)

Now you need some thick plastic or thin wood.  The plastic from big plastic storage totes can work for this, but not generally the transparent kind as that can be brittle.  Many kinds of trash contain flat and stiff plastic sheet in the range of 1/16 inch(about 1.5 mm) thick.  With a box cutter and a ruler carefully cut out two rectangles 1 inch by 4 inches in size.

![thick plastic rectangular cutouts](https://i.imgur.com/9UchnK8.jpg)

Now put together the full bridge kit with 5 high strength magnets, a nail, and the above plastic parts.  This kit can be assembled by someone else if you want to break this task down into "things that use a box cutter" and things that don't for safety, as the next step is more fun and uses no sharp tools.

![full bridge tool assembly kit](https://i.imgur.com/qA1pwyx.jpg)

Assemble the full bridge tool as shown, using duct tape to hold the thin plastic hinges to the thick plastic arms.

![bottom of bridge assembly detail](https://i.imgur.com/Au8AlVc.jpg)

![top of bridge assembly detail](https://i.imgur.com/k6LV3f7.jpg)

![fully assembled bridge tool](https://i.imgur.com/9Ir07ml.jpg)

## Build the electronics assembly 

First, you need to acquire all the parts as shown.

![electronics kit parts](https://i.imgur.com/jqJxB0x.jpg)

In order for this to be cost effective, these should be bought in some quantity, generally for printed circuit boards at least a couple dozen, at which point the price is under 1 dollar.  Find a donor who wants to contribute financially to Trash Robot to buy all the parts in bulk and distribute them, and a Librarian to store and give them out as kits through the public library.  Or buy it all yourself and distribute as you see fit.  

The parts are:

- [custom PCB ordered from pcbway.com, 1 unit](https://www.pcbway.com/project/shareproject/pi_hat_to_connect_to_pololu_MP6500_stepper_motor_drover_boards.html)
- [MP6500 stepper motor driver boards with potentiometer from Pololu.com, 3 units](https://www.pololu.com/product/2966)
- [40 pin Raspberry Pi header from Pololu.com, 1 unit](https://www.pololu.com/product/1037)
- [4 pin male Samtec(samtec part number ) connectors from Digikey(digikey part number), 3 units)](https://www.digikey.com/product-detail/en/samtec-inc/TSW-104-07-G-S/SAM1029-04-ND/1101323)
- [momentary buttons from Digikey(digikey part number P8079SCT-ND, Panasonic part number EVQ-11L05R), 3 units](https://www.digikey.com/product-detail/en/panasonic-electronic-components/EVQ-11L05R/P8079SCT-ND/259564)
- [barrel power connector for 12 volt connection(Amazon), 1 unit](https://www.amazon.com/gp/product/B07C7VSRBG/)

Remove stepper drivers from package.

![stepper motor control board detail](https://i.imgur.com/MGvJI0Z.jpg)

Snap headers in exactly half to fit into the two sides of the stepper driver board.

![pliers snapping stepper control board header](https://i.imgur.com/G0BHRQ5.jpg)

Balance the board on the headers so it sits flat, and double check it's really flat.

![stepper control board on headers no solder](https://i.imgur.com/DlDcObj.jpg)

Solder all connections, then carefully inspect every single one to make sure they're all complete.

![stepper control boards with soldered headers](https://i.imgur.com/9zQUczE.jpg)

Double check that alignment between stepper boards and main board is correct by checking that when you flip it over "VMOT" will indeed go into "VMOT".

![image of how labels line up between stepper board and main board](https://i.imgur.com/V3Bgeru.jpg)

Put in all three boards.

![all three stepper boards in main board from top view](https://i.imgur.com/zagCGqZ.jpg)

Solder all boards into main board, then carefully inspect to make absolutely sure every single solder joint is complete.

![bottom solder joints of stepper boards in main board](https://i.imgur.com/JadWf4w.jpg)

Insert 40 pin header.

![bottom view of 40 pin pi header in board](https://i.imgur.com/c50vHjX.jpg)

Solder and inspect every pin.

![top view of solder joints of 40 pin header](https://i.imgur.com/6ubw8XR.jpg)

Insert 4 pin headers.

![4 pin headers inserted into main board](https://i.imgur.com/3ng3kuv.jpg)

Solder and inspect all pins.

![solder joints of 4 pin headers](https://i.imgur.com/azZrohH.jpg)

Clip buttons from cardboard strip if they're still in one.

![three buttons and a nail clipper](https://i.imgur.com/vyhzMfX.jpg)

![three separated buttons](https://i.imgur.com/GrK2qpe.jpg)

Insert buttons into board.

![top view of three buttons inserted into board](https://i.imgur.com/TFEv0DG.jpg)

Bend out leads so they will stay in place, flip over and solder.

![three button bottom solder joints with leads still attached](https://i.imgur.com/zOuzCfl.jpg)

Clip off excess leads.

![solder joints with button leads clipped](https://i.imgur.com/kIWnEoa.jpg)

Solder the power supply 12 V barrel connector to the board, making sure the black wire goes to "GND" and the red one goes to "Vpower".  Use a female barrel.  Note this is flexible: this could be replaced by a scavenged 12 volt wall power supply that has at least an amp of current spliced into here, or anything else that can go to a 12 V battery.

![power supply cord soldered into board](https://i.imgur.com/zil4pXn.jpg)

The electronics "hat" is now complete, put it on the Raspberry Pi as shown:

![board on pi](https://i.imgur.com/LQ6FEzc.jpg)

Use cardboard and duct tape to create an enclosure for the unit.

![server unit and some cardboard](https://i.imgur.com/grTggWX.jpg)

Plug the three cables into the three headers to complete the robot.

![fully assembled server unit](https://i.imgur.com/uEr2Sh6.jpg)

Finally, set up the three stages either where they will be used or fixed to a board where they can be carried around and duct tape the ends of the bridge tool to the stages as shown.  Mount the nail and magnets also as shown.  Having a supply of random magnets and nails increases versatility of the system.  

![fully assembled robot](https://i.imgur.com/u42Ua4d.jpg)

To set up the robot, you will need to first set up the Raspberry Pi.  To do this you will need:

- A Raspbery Pi board
- A Raspberry Pi power supply. This is USB micro for Pi 3 and below and USB C for Pi 4.
- A HDMI screen or monitor or TV of some kind
- An HDMI cable or HDMI mini to HDMI if you are using the Pi 4(as opposed to the Pi 3)
- A USB keyboard
- A USB mouse
- An internet connection
- An SD card with at least 16 gigabytes 
- An SD card reader/writer to write to the card

First, put the Raspbian operating system on the SD card by putting the SD card writer into the USB slot of a computer and installing the operating system using Raspberry Pi Imager. Instructions to do that are found on the official Raspberry Pi website at [https://www.raspberrypi.org/documentation/installation/installing-images/](https://www.raspberrypi.org/documentation/installation/installing-images/).

With the operating system installed, boot up the pi as you would a normal computer with keyboard and mouse and screen plugged in.  Plugging it in turns it on, so you'll need it all connected before you plug it in.  Go through the standard installation process, clicking on defaults and setting the pi up.  When it's set up, put it on your local wifi by clicking the wifi icon in the top of the screen as you would for most computers.  Once you are on the wifi you can proceed to install the Trash Robot and Geometron software.

With the Internet connected to your pi, you can open a web browser pointed at a copy of this document on the Web and use that to copy/paste the commands below without having to type them.  

Now go to the terminal(there should be a link to do this on your Pi desktop) and type in the following sequence of commands(or copy/paste) to install the web server and the PHP language:

<pre>
sudo apt update
sudo apt install apache2 -y
sudo apt install php libapache2-mod-php -y
</pre>

To install the Geometron software type copy/paste these commands into the terminal:

<pre>
cd /var/www/html
sudo rm index.html
sudo curl -o replicator.php https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt
php replicator.php
cd ..
sudo chmod -R 0777 *
</pre>


Now to install the buttons which run the robot and turn the pi off, run the button setup script as follows:

<pre>
sudo bash buttonsetup.sh
</pre>

Now to start the off button working so you can turn the machine off with the button type this:

<pre>
sudo /etc/init.d/listen-for-shutdown.sh start
</pre>

Now open a web browser, and put in "localhost" into the browser.  That will display the IP address(a series of 4 numbers separated by periods) in big letters.  Write that on the main control unit somewhere in big letters with a marker or paint pen(assuming this is the network you'll be using the robot on).  

With that IP address noted down, navigate another computer or device on the network to that IP address by copying it into the browser.  You should now see the same screen on your other device/computer as you do on the Pi.  Click the link to go to the robot.  

Now you want to disconnect the stages from the system, and connect the 12 volt battery or wall power supply and turn that on.  With the 12 V and the pi both on, use a tiny flat head screwdriver to very carefully turn the little screw knob on the boards until the voltage between the ground pin and the little metal-plated hole next to the knob is 0.1 volts(you'll need the volt meter for this, it might be easier with two people).  This is a very important step, and sets the current limit of the boards to be about 0.33 A.  This step lets us leave the exact power supply and motor choice open for future changes.

Once the current levels are set on all three stepper driver boards, turn the 12 volt power back off, reconnect all three stages, and turn it back on.  Now use the touch screen(or click with mouse) interface to hit the delete button which is a big black "X" to remove all symbols, then make a program that is a red arrow to the left or right a couple times by just clicking on that symbol.   Now hit the "GO" button on your robot board and the two outer stages should move.  At this point the polarity of the motors is still random.  Check to see if both move the direction you want, both move the opposite way or one moves right and one moves wrong.  Now delete the red arrows and put a couple of green arrow symbols for the y direction of motion in and hit go.  Again the motion is either correct for your arrow or incorrect.  Write down which of these are which for all three, or remember them, then click on the robot setup link which looks like this:

![](http://localhost/iconsymbols/robotconfig.svg)

For any motor that is opposite of what it should be click on the button to reverse it.  Leave the ones that are correct alone, then click back to the main robot page and repeat the test of x and y motion.  If it's still not right repeat until you can control x,y and z according to the symbols in the code.

Once your robot tool moves as programmed, get a blob of Super Sculpey III clay, roll it into a smooth ball, then flatten it on both sides with a smooth flat object.  Place the clay tablet under the tool.  Use the minus sign symbol which decreases travel distance by a factor of 2 combined with the up and down arrows to adjust height with the "Go" button.  If any program is running too long and not working hit the "stop" button to stop it in the middle of operation.  When the nail is 1 or 2 mm over the clay, try using the solid dot symbols to make a simple line and hit go.  Make some simple patterns.  Use the un-filled circle symbols to add motion without dots to the program and experiment.  Keep wiping the clay clean and starting again until you get the hang of it.

Now to do a first print of a tablet go to letter mode by clicking the far left button which has a little upside down "T" on it.  When you click it it should change to an "abc" icon.  Now reload the browser window or put your cursor in the tiny box in the upper right of the screen. HIT THE CAPS LOCK and type a word.  Put the nail just where you want it and hit "go".  Try this a few times to get a good write.  When you have a nice write, remove the clay, slice off the edges flat with a thin sharp blade and bake in an oven for 15 minutes at 275 F.  Remove and allow to cool for another 15 to 30 minutes.  Then paint, and you've made your first Trash Robot Geometron tablet.

![paint pens and a printed clay tablet that says "hello world"](https://i.imgur.com/RH3FvJP.jpg)

![baked and painted tablet](https://i.imgur.com/v5pcfr0.jpg)

It is very important that before turning your system off you turn off the 12 volt power. After doing that, hit the "off" button to shut down the pi.  Having done that you can now disconnect everything from the Pi but the power.  The next time you want to use it, just plug in the pi and leave everything else disconnected(this is called "headless mode" on the Pi) and you can operate the robot from any other device on the network by going back to the IP address you wrote on the Pi.  That address will be different on each wifi network and can sometimes randomly change. So if you ever don't have the ability to see the Pi after turning it on, hook it back up with a screen and keyboard, boot it with the screen, make sure it's on the proper network, direct the Pi's browser to "localhost" and again write down the new IP address. Then turn the whole thing off and try headless mode again. You will also repeat this process whenever you install a robot in a new location(home, office, coffee shop, classroom, library, public park etc).

Having built a robot, find students and artists who can use it and distribute it directly to them, distribute it in public directly to passerby, or donate it to a public library which can distribute it via their existing educational programming.







