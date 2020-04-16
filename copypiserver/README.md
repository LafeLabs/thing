### [link up a level../](../)

# Raspberry Pi Geometron server

These are the steps required to create a web server hosting Geometron on a local network, then make it visible to the Internet at large.

1. Get the Raspberry pi parts:
    - pi 3b+ or pi 4
    - pi wall plug power supply
    - SD card   
    - SD card reader/writer
    - converter to HDMI mini if you have the 4, HDMI cable if not
    - display with HDMI input, can be a tv or regular computer monitor
    - USB keyboard
    - USB mouse
    
2. flash NOOBs on the SD card, install the OS, set up the pi, get wifi set up
3. install apache and php on the pi 
4. delete default page, copy replicator to server, change permissions, run replicator, change permissions again, get the ip address of the pi, test it on local wifi
5. log into router, connect port 80 to the ip address of the pi
6. buy a domain name connected in some conceptual way to your local place, point the DNS A record for your domain to the IP address of your router as seen by the rest of the Internet
6. [add off switch, this is not done yet]
7. Put pi into headless mode, plugged in in an out of the way place
8. make "things" forked down from main page, replicate various apps, pages, scrolls, maps etc to forks from top level, make top level make sense in context for its intended use
8. create physical media with the domain, share it in vicinity of server


<h3 style = "background-color:#ffbfbf">Technical Details Below This Line</h3>

[edit code with editor.php](editor.php)

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

Edit the code for any page using the *editor*, another thing all instances have:

[editor.php](editor.php)

When you have created your own modifications of the code, push that to your own Github repository and change the links in replicator.php to links to the global link to the raw text for your own dna.txt file and symbol/php/replicator.txt in your new repository and all future instances will be generated from your code instead of this instance.  Any php files you edit using editor must be converted from .txt to .php by running text2php.php by clicking on the link to that program from the Editor.  If you add new files, you can add them to dna.txt by clicking dnagenerator.php.  Note that *all* files in the system can be edited. 

To learn the skills needed to [hack](https://en.wikipedia.org/wiki/Hacker_culture) the code to your purposes, you need to learn JavaScript, HTML, and some PHP, all of which are best learned from [https://www.w3schools.com/](https://www.w3schools.com/).

Note that in the Geometron system we associate the basic Five Languages with the Five Elements as follows: Fire = JavaScript, Air = CSS, Water = HTML, Aether = PHP, and Earth = Geometron. 



