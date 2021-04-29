[home](index.html)

[map of map tools](maps/maps)

# Maps

Maps are a format in Trash Robot/Geometron which are a generalized meme.  They represent an ordered list of objects, each of which has a position in a rectangular area on the screen.  Each element in the ordered array has an x and y position and width all normalized to the size of the square area, as well as an angle in degrees. The other properties each element has are a url for an image if they're an image, HTML text for both if they are not an image and for alt text if they are, and a link destination which can be either a url or a map or scroll link inside the geometron system.  Maps can link to scrolls as well as other maps.  Also, each element has a Boolean variable "maplinkmode" which is false if it is just a normal HTML link and true if it is a map or scroll link.  Maps are all stored in the "[maps/](maps/)" sub-directory of each Trash Robot/Geometron instance.  They are in [JSON](https://www.json.org/json-en.html) format. 

Scrolls are all stored in the [scrolls/](scrolls/) directory.  Links inside the Geometron system are identified as to whether they are scolls or maps by the full name of the file.  For instance one would link to this scroll from anywhere in the system using the name "scrolls/maps" as the destination of either a link in a map element which has maplinkmode set to "true" or in a hyperlink in the markdown format of the [Scroll](scrolls/scrolls).

Maps are defined with the JavaScript library "mapfactory.js" which is in the "jscode" directory at [jscode/mapfactory.js](jscode/mapfactory.js).  

Maps are created in Javascript by for example in a DIV element called "mainmap" with following code:

<pre>
 

newmap = [ 
  {
    "x": 0.3448687350835322,
    "y": 0.17780429594272076,
    "w": 0.32100238663484487,
    "angle": 0,
    "text": "some text",
    "href": "",
    "src": "https://i.imgur.com/LgcLdus.png",
    "maplinkmode": true
  }
];

mainmap = new Map([mapwidth],[mapheight],document.getElementById("mainmap"));
mainmap.array = newmap;
mainmap.draw();

</pre>


Maps are edited using the program [mapeditor.html](mapeditor.html).  Click on all the things at random to figure out how to use that program.  Save often.  Copy/paste JSON code from the text area to share maps across the Internet or privately with other users. You can email JSON code, store it, copy it etc, and anyone can import it with a paste into their Geometron instance and save it locally on their server.  This generalized meme format replaces both meme making software and PowerPoint as well as a large number of HTML frameworks and formats.  It allows for a generalized system for encoding information on an image, which can be critical to documenting self-replicating physical technology.  The three pillars of all Geometron/Trash Robot software are the Map, the Scroll, and the Symbols which are created with the Geometron language.  This "symbol" is generalized to include those made in all physical media, so that includes things like lab-on-chip fluidic circuits, hybrid upcycled electronic circuits, laser cut shapes etc.  Once Geometron is used to encode all human language and all symbols and also all technology, it can drive the hardware which displays maps and scrolls.  When all of this lives on fully upcycled hardware, the system if fully metabolized and we can build self-replicating technology that does not have any mining, money, or property, the ultimate goal of Trash Magic.

## Deletion

Maps are deleted with [mapdelete.html](mapdelete.html). Just click "delete" to delete.  Be careful, there is no backup.  Also on public servers this might break, as do all file creation and editing functions from time to time. It will work instantly on a [Raspbery Pi Terminal](scrolls/terminal).  

## Replication

When you create a new map, run [dnagenerator.php](dnagenerator.php), and the next time the whole tree is replicated that map will come along for the ride.  To replicate a specific map, find the URL of that map and use copy.php.  The syntax is 

<pre>
[domain you're on]/copy.php?from=[domain you're copying from]/maps/[nameofmap]&to=maps/[nameofmap]
</pre>

The "from" url can be anywhere on the Open Web or anywhere visible on the local network.  For example, [pastebin.com](https://www.pastebin.com) or a raw code link on [Github](https://www.github.com)


## Map editor Icon Meanings

Save:
![](iconsymbols/save.svg)
Increment current element:
![](iconsymbols/upelement.svg)
Increment current element:
![](iconsymbols/downelement.svg)
Move current element down:
![](iconsymbols/elementdown.svg)
Move current element down:
![](iconsymbols/elementup.svg)
Delete current element:
![](iconsymbols/delete.svg)
Create new element:
![](iconsymbols/add.svg)
Remove image from element:
![](iconsymbols/deleteimage.svg)
Remove link from element:
![](iconsymbols/deletelink.svg)


