[home](index.html)

# Feeds

A Feed is a sequence of elements.  The elements don't have geometric structure like a Map.  They can be text, links, symbols, or any other kind of media.  They are generally stored in the "[data](data/)" directory as JSON format files which end with ".txt" so that they can be read by humans in a browser.

The Feed is a general framework for building formats, but in the basic Trash Robot server we implement a few versions.  

## [Global Image Feed](globalimagefeed.html)

This is an array of image urls.  This is a key component of how Icon Tokens are made.  We often start by doing an image search on the Web for some symbol, logo, image, or icon.  We then right click the image and "copy image location" to the clipboard.  Then we drop the url in the input in the global image feed to add it to the feed. Click the red "x" to delete the image.  Image feeds can be exported from the text area, copied, and pasted into the same window of any other Trash Robot, imported and used anywhere on the Network.  Since this data is just text it can be sent via text message or email so that feeds can be privately shared. The local image feed is stored at [data/imagefeed.txt](data/imagefeed.txt)

We can make global image links in this Feed by uploading images to [www.imgur.com](https://imgur.com/), then right clicking the image to get the url and putting that url in the image feed.  This method is used to document much of the Trash Robot system or for general rapid information sharing.

## [Link Feed](linkfeed.html)

This is a feed of "links" in a general sense which can be images, links, or just text.  They are edited using the "operator screen", which should be in the link feed itself, and can be found at [linkfeededitor.html](linkfeededitor.html). Each element has three fields: "href", "src", and "text", which are the url the link points to, the image if there is one, and the text.  The data are stored on each Trash Robot at [data/linkfeed.txt](data/linkfeed.txt).  As with the image feed, the whole feed can be copied, pasted, imported and exported using a text area, but in this case it is on the editor screen not the feed display.  The input is used to put in urls of other link feed files.  These can be anywhere on the Web.  This can be used to make anonymous pastebin links which are link feeds which can display on any local Trash Robot without ever posting to a global server, for private exchange of link feeds.
f
## [Text Feed](textfeed.html)

The Text Feed is used for a number of Trash Robot applications.  In spite of its name, it is not just a feed of text, but consists of three feeds(arrays): "text", "src" and "href".  These really are what they sound like, three feeds in one.  Users can add links, add images, add text, or delete any of them, and can copy and paste and share and import feeds.  Text feed has a number of functions in the Trash Robot/Geometron system.  It is used for the Map Editor as a source of links, images, and text which do not need to be entered in a keyboard.  It is also used in the [Poetry Engine](poetryengine.html) and [Duality](duality.html).  These are documented with the [poetry engine scroll](scrolls/poetryengine) and [duality scroll](scrolls/duality).  

## [Chaos Feed](chaosfeed.html)

Chaos Feed is a user friendly text feed. Type in the input to post. Hit red "x" to delete.  Nuke the feed with the explode emoji.  Reload with the arrow loop emoji.  HTML works, so you can manually enter html for links and images, allowing a link out to be added.  Chaos Feed can be set to be the top level of a Trash Robot Server for text feed sharing mayhem and fun.  Chaos feeds are stored at [data/chaosfeed.txt](data/chaosfeed.txt).

## [Icon Feed](iconfeed.html)

This is a critical feed for the overall system work flow, as it is how we share the Token Icons which are printed into clay.  See the [workflow map](maps/workflow) for links to the elements of the process by which these are made.  Here again is where the copying, pasting, importing and exporting of feeds is very important.  Users can create a whole feed of icons locally on a private server, then send that via private message to other users anywhere in the world, who can then edit on their own private servers, without any data ever leaking to the public Internet, while still having no users and no databases on each individual server.

## [Symbol Feed](symbolfeed.html)

This is not really a feed in the strict sense above, but it behaves like a feed in the user interface. Every time a symbol is saved using [symbol.html](symbol.html) an SVG and PNG file are both created, and these are saved in a directory called [symbolfeed/](symbolfeed/).  These can be saved locally and then used for anything.  The pairs of files are also used when programming the Dremel laser cutter to directly create laser cut acrylic geometry shapes.  The SVG files alone, with different layers as different colors are used for the cut and etch layers when making laser cut shapes ordered from [Ponoko.com](https://www.ponoko.com/).  Clicking on an SVG file also loads it up into [symbol.html](symbol.html), including the structural JSON information which sets styles and positions of the symbol.

## [Wall](wall.html)

The Wall is a feed of one element.  It is just a text document, stored at [data/wall.txt](data/wall.txt), which is edited and read by users. Type to edit. Delete to delete. There are no users, no databases and no logins. Just information freely shared.




