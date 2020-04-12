
# Text feed

Enter text in the input, hit enter.  Delete bad things, replicate or back up good things. Delete old things. Share. Replicate.  Create.  Use emoji.

[![](iconsymbols/feed.svg)](index.html)

[![](iconsymbols/edit.svg)](pageeditor.html)

What you see in the edit screen(after clicking the edit icon) here is "markdown", which is language which allows people to publish things on the web without learning more complex languages. Hit return twice to get a paragraph break.  Copy the syntax you see here to get links and images and headings. You can look up markdown ([cheat sheet](https://www.markdownguide.org/cheat-sheet/), [detailed guide](https://daringfireball.net/projects/markdown/syntax), [wikipedia entry](https://en.wikipedia.org/wiki/Markdown)) for more syntax.  Also embedding <span style = "color:red;font-family:courier;">HTML</span> works if you know that.  


[Create a fork](fork.html):

[![](iconsymbols/fork.svg)](fork.html)

Enter the name of the new page you want to create and click through the links to get to a new page one level down from this one.  Repeat this in the "new map" field to make a new map, which is a stack of images, symbols, words and links in a general web page layout.  Each Geometron page has a scroll and a map.  The "main" page can be either a scroll or map.  To see the map, click on its symbol, and to edit it click the edit icon from the map screen. The default map shows what the symbols mean that are used for editing.  To see the current map value go to [data/currentmap.txt](data/currentmap.txt).  Also, this JSON file can be edited directly using editor.php(see link below).  Inventory is used to track inventory at a given factory or page.  

To create your own instance of this on a local raspberry pi, contact the author at lafelabs [at] gmail.com

Edit the code for any page using the *editor*, another thing all instances have:

[editor.php](editor.php)

When you have created your own modifications of the code, push that to your own Github repository and change the links in replicator.php to links to the global link to the raw text for your own dna.txt file and symbol/php/replicator.txt in your new repository and all future instances will be generated from your code instead of this instance.  Any php files you edit using editor must be converted from .txt to .php by running text2php.php by clicking on the link to that program from the Editor.  If you add new files, you can add them to dna.txt by clicking dnagenerator.php.  Note that *all* files in the system can be edited. 

To learn the skills needed to [hack](https://en.wikipedia.org/wiki/Hacker_culture) the code to your purposes, you need to learn JavaScript, HTML, and some PHP, all of which are best learned from [https://www.w3schools.com/](https://www.w3schools.com/).

Note that in the Geometron system we associate the basic Five Languages with the Five Elements as follows: Fire = JavaScript, Air = CSS, Water = HTML, Aether = PHP, and Earth = Geometron. 



