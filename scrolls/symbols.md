[home](index.html)

# Symbols

 - [create vector graphics in Web](symbol.html)
 - [create 3d graphics](voxel.html)

The generalized symbol: any geometry with meaning.  This includes vector graphics for the Web, microprocessors, circuit boards, building architecture, city layout, periodic structures in agriculture, letters, icons, brands, glyphs, body movements, classical geometric constructions, any kind of automation programming, etc.  

All symbols are based on the Geometron Hypercube and the Geometron Virtual Machine(GVM), operating on Geometron Glyphs.  

A Geometron Glyph is a string consisting of a list of Geometron Hypercube addresses(these are described below) separated by commas. When prompted by some user action, the GVM will split the glyph into a sequence of numbers corresponding to addresses, and carry out some type of geometric action based on what those numbers do.  The action carried out by the abstract GVM can be any of several types of geometric action: control of 2d or 3d geometry displayed in a web browser, direct control of machines, or control of physical user interfaces(keyboard or touch screen).

The GVM carries out its geometric actions by storing internal geometric variables, similar to the "turtle" which draws geometry in various old programming languages like [logo](https://en.wikipedia.org/wiki/Logo_(programming_language)).

The Hypercube is an abstraction which can have several ways of being expressed but which consists of two cubes, each made up of 8x8x8 = 512 cells.  One cube represents a set of 512 actions, each with an address consisting of 3 digits between 0 and 7 with a leading zero(base 8 notation).  So these actions are represented by addresses from 00 to 0777.  Each action has a matching symbol in the symbol cube, which is represented by a number between 01000 and 01777.  For example, the symbol for the action at 0300 is represented by the contents of address 01300.  The type of geometric action carried out by the action cube depends on the address range of the action.  

Actions between 0 and 037 represent manipulation of the hypercube itself or interaction with whatever means are used to edit it(generally an app running in a web browser).  

Actions between 040 and 0176 represent the actions taken when a physical key on a keyboard is struck, and these map to the ASCII values of the keys(e.g. lowercase 'a' is the address 0141, which maps to .

0177 represents "do nothing"

The addresses between 0200 and 0277 are themselves Geometron glyphs, which we call the shape table.  When the GVM encounters one of these addresses it fetches the value of an array of strings 1024 elements long at the address being called and splits that glyph up into addresses and runs it.  This can be recursive, and can build infinite loops if we are not careful.  It can also make extremely powerful hierarchical structures.  A small geometric structure can be repeated many times in a larger one and so on, creating complex fractal structures which can be used to build up very sophisticated constructions for things like large scale microfabrcation. By convention, the elements in 0200 through 0217 are shapes we use a lot which are not changed by the user normally, since they are needed for construction of various symbols.  The "shape stack" is the addresses 0220 through 0237, and is the easiest to edit. 

![](iconsymbols/actiontablet.svg)

The addresses between 0300 and 0377 are 2d web-based geometric constructions which are used to edit a canvas, create svg files and also export to png files.  This is carried out using the JavaScript library [jscode/geometron.js](jscode/geometron.js).  

The addresses between 0400 and 0477 represent discrete geometric actions of machine motion.  We start with discrete movements along the x,y, and z axes, along with doubling and halving the value of the discrete step.  However, we can create up to a full 8x8=64 different manipulations, and these can be along polar coordinates or whatever coordinates make the most sense with a given robotic control.  The geometric actions are independent of software, and describe physical motions. That way they can be manipulated in one type of software(generally a web browser based app) and used totally differently by another piece of software(generally Arduino code directly controlling motors using a much simpler software structure).  

The addresses between 0500 and 0577 are like the shapes in 0200 through 0277 but by convention are used for machine control, largely consisting of actions in the range from 0400 through 0477.  The first row of the tablet, from 0500 through 0577, consists of drawing pixels and moving by one pixel, and this is structured to include actions from all over the Hypercube to create icons from pixels in a way which is independent of geometric domain.  For instance, this allows us to express the same icon in a 3d printed part, a laser cut spray paint stencil, a base 64 encoded url of a bitmap which can be imported into other software, control of a nail poking depressions in clay, or a hot iron printing in a plastic bottle cap, all with the same Geometron glyph.  

The range between 0700 through 0777 are for manipulation of 3d formats in software.  This is used to create files in the x3d format which can be used for virtual reality or augmented reality, or just putting 3d active objects into a web browser.  It is also used to export files to .stl format for printing in 3d printers. The addresses between 0600 and 0677 are shapes made up of 3d actions by convention.

Everything in the range from 01000 through 01777 consists of glyph strings, and in all cases, the GVM acts on them by parsing and acting on each of the addresses stored in the strings stored in the 1024 element string array.  In particular, the elements between 01040 through 01176 represent a font, and are used to print a geometric representation of all the printable ASCII characters.  Note that these can, like all Geometron glyphs, use the whole Geometron Hypercube, so a font can simultaneously be printing in 3d printing, SVG for laser cutters, and direct motion control of a clay printing robot.




   
