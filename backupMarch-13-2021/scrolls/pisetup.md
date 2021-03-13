# Setup of already-built Raspberry Pi Trash Robot Geometron Server

First, gather what you need:

![](https://i.imgur.com/lhwkw6c.jpg)

- The server which someone presumably gave you
- an HDMI cable which connects to some screen you have, which could be a TV or computer screen
- a usb keyboard and usb mouse
- a paint pen or permanent marker
- USB micro power supply which can supply 2.5 Amps or more, which should also be supplied by whoever gave you the server

![](https://i.imgur.com/sg95uWv.jpg)

Plug the USB mouse and keyboard into the Pi server, plug in the HDMI between the Pi and the screen, turn the screen on, set it to the correct HDMI if there are multiple HDMI inputs, and then plug the Pi into the wall power(or USB battery pack) with the micro USB cable.

![](https://i.imgur.com/s0nOIJG.jpg)

![](https://i.imgur.com/D6TqBRP.jpg)


When it's all plugged in it should boot to a desktop not unlike what you would see in a mac or pc.  Click on the wifi icon in the upper right of the screen and set up your local wifi network password like you would for a PC or mac.  When you're on the Internet, open a web browser with the link in the upper left corner of the screen.  Point the browser to "localhost/", and you should see the IP address, which is a series of 4 numbers separated by periods.  If you don't see that, try reloading the browser a couple times.  When you see the local IP address, use the paint pen or permanent marker to mark the IP address on the server in the blank area which should exist in a new server. 

![](https://i.imgur.com/JmwBwQ0.jpg)

 After you have marked the IP address on the pi, hit the off button to shut it down, unplug everything, then move it to a location convenient for being near a wall power socket, out of the way, and preferably a good work area for robotics later.  

![](https://i.imgur.com/6NW8C65.jpg)

![](https://i.imgur.com/XNluU6A.jpg)

Plug it back into the wall, and wait for a minute or two for it to boot up.  Now go to another device on the local wifi network, like a phone, tablet or laptop and point the browser on your other device to the IP address written on the Pi.  You should now see the main page of the new server!  From here, you can click on the main scroll which will link to the scrolls for various actions, and can start setting up more parts of the pi and running the system to produce various products.

Finally if you have access to a global Geometron server you can add a link to your new server from that.  To do that, use click on the editor program at [editor.php](editor.php) to add a link, and paste the code into the main part of the page next to the other "a" elements:

<pre>

<a href = "http://[your ip address here]">[name of your local wifi network or some other vague identifier]</a>

</pre>

where you make some name that doesn't tell anyone where you are but which makes sense to you, and place your specific IP address in the proper place there.  If you're doing this on some global domain that's easy to remember, you can point browsers there when you're on your home wifi network, and then click on your local link to get to the pi server.


Having set up a pi server, you should also consider making a new one from scratch to spread to the next person.  Instructions for doing that are in another scroll, link on the right.


