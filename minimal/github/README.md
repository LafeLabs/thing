# README.md

This is a self-replicating README file of a thing, by default a simple web page/app.  This can be a prototype of any kind of simple app: documents, articles, markets, calculators, geometry, design, machine control, links to code...everything you might need to replicate technology.  This is a prototype of self-replicating technology in general.

[readme.html](readme.html)

[home](index.html)

The raw replicator code for this is found here:

[https://raw.githubusercontent.com/LafeLabs/thing/master/minimal/github/php/replicator.txt](https://raw.githubusercontent.com/LafeLabs/thing/master/minimal/github/php/replicator.txt)

Edit code using editor.php:

[editor.php](editor.php)

Replicate Geometron sets with set.html:

[set.html](set.html)

To replicate this set, create a new repository, get PHP working from the command line on your machine(mac, pc, linux all work), then copy the file [php/replicator.txt](php/replicator.txt) into a new file called replicator.php, and run it.  Once you've run it, be sure permissions are ok, and run 

<pre>
php -S localhost:80
</pre>

from the command line, then point a browser on your machine to "localhost://".  Then click on the [editor](editor.php) to edit the code.  Use the editor to change the value of the code in php/replicator.txt to point to the dna.txt and replicator.txt raw text files of your new repository, then run the program [text2php.php](text2php.php) to convert the text you edited to a live php script.  To add files, instead of pointing your browser to editor.php, point it to editor.php?newfile=[name of new file].  When you've added any files, run [dnagenerator.php](dnagenerator.php) to add them to your dna.  Then update the global copy of your repository on Github, and you should be able to copy your newly modified replicator code into the root web directory *anywhere* that has a running web server, run it from any browser, and your web app will replicate.  

That new instance can then be modified in the same way, the code updated in the replicator to point to the new global instance as it evolves.  Any given app can replicate an arbitrary number of times as is, or can mutate instantly and be abandoned.  It's up to you. 

 - everything replicates(all code contains self-replication scripts)
 - everything evolves(all code contains self-editing scripts)
 - there are no users, no logins

Web servers on which this have been tested include paid hosts dreamhost and bluehost, free hosting at 000webhost, php localhosts on windows, mac and linux, Apache run on a Raspberry Pi and on an Ubuntu virtual machine, on windows and linux machines with [XAMPP](https://www.apachefriends.org/index.html), on the Android using [KSWEB](https://www.kslabs.ru/), on iOS using [phpwin](https://app.phpwin.org/).  You need write permission and PHP running and you're good to go.  




