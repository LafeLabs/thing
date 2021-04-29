[home](index.html)

# Geometron

Geometron is a geometric meta-langauge.  That is it is a language for building geometric languages, which is itself expressed entirely through geometry.  The three main components of Geometron are the "Geometron Virtual Machine", or GVM, the Geometron Hypercube, and the Cursor. 

The cursor is like a "turtle" in other geometry languages such as [Logo](https://en.wikipedia.org/wiki/Logo_(programming_language)), it is a collection of global geometric variable which can be acted on.  These global variables might be the position of a cursor in an xy plane, of a cube in an xyz space, of a physical robot tool, or of any technology with geometry in it.  The geometric actions discussed below are on this abstraction, which can also be thought as a "tool", which in some cases it literally is.  However "tool" can be misleading since the state of the cursor is not simply a position but can include variables like "step size" which are abstract and not embodied in the physical state of a physical tool. 

The GVM is an abstract "machine" of pure thought which carries out geometric actions.  The actions of the GVM are arranged geometrically into two cubes(hence "hypercube") each composed of 8x8x8 cells.  Each of these 512 cells has an address based on its geometric location.  All addresses start with the number "0", and indexes count up from 0 rather than 1.  One cube has addresses from 0 through 0777, and the other has addresses from 01000 through 01777. Each cell in the Hypercube represents either a geometric action or a list of addresses in the hypercube which the GVM will execute in order. The GVM is fed a "glyph" which is a sequence of Hypercube addresses, and it executes the actions in the glyph in order. Some actions are therefore themselves glyphs, which in turn can be composed of sub-glyphs and so on. Infinite loops can easily be created this way.

The zero cube from 0 through 0777 is the "Action Cube", which represents actions themselves we wish to use the GVM for.  Each action has a corresponding symbol in the symbol cube or 1 cube from 01000 through 01777, which is a glyph designed to communicate the meaning of the action to a human user.  

The Action Cube is divided into layers, which organize the types of information into different categories.  

0-07: left open for future use.
 
010-037: "root magic", or actions which act on the Hypercube itself or the document being used to interact with Geometron.

040-0176: Printable ASCII. These are used to either place a ASCII character on the Word Stack( to be printed using the action at 0365) or to identify the action taken when a key is struck on a keyboard connected to a GVM

0177: do nothing

0200-0217: Fixed shapes, glyphs composed of sequences of actions which are left alone for general use, not edited frequently

0220-0277: General shapes.  Glyphs used to create geometric languages such as schematic symbols, graph theory arrows, cross stitch patterns, flow charts etc.

0300-0377: Primary two dimensional geometric actions used on computer screens.  These are further broken down into the Action Tablet documented below.

0400-0477: Machine actions.  These include manipulation of global machine variables such as step size or speed of movement.  They will generally be machine specific although we will document the specific values for the Token Printer below.  IN actual Arduino code these are generally mapped to ASCII, as is the set below.

0500-0577: Shapes made up of sequences of actions in the 0400-0477 space.  These can also include the entire rest of the Hypercube, and allow for a combination of 2d, 3d, and mechanical actions, so that for instance a cutting tool path can be saved as a 2d image in addition to the direct control of the machine using Arduino.

0600-0677: Shapes made up of sequences of actions in the 0700-0777 space.  These can be used to build whole complex languages of three dimensional shapes for 3d printing design as well as VR and AR.

0700-0777: 3d actions. These actions are used to construct three dimensional abstract geometry.  Specifically in the Trash Robot Geometron system they are used to build .x3d and .stl files which can be used for VR and 3d printing respectively. Learn more from [3d scroll](scrolls/geometron3d).  Or just try out the system on [voxel.html](voxel.html).

This arrangement then maps to symbols which have meaning to humans pointing to the actions.  Note that for the ASCII values this maps to a font of the printable ASCII, which can be in any human language.  Building more complex human languages like the CJK characters or fractal Arabic calligraphy, we can add whole cubes to the Hypercube.  The range of characters between 01040 and 01176 are called a "font".

The software presented here allows us to use Geometron to make computer files in either the vector graphics .svg format or the bitmap format .png of all sizes, styles and shapes, save them, edit them, replicate and share them.  These can be used as icons, as symbols in Maps, as figures in Scrolls, as art, or as patterns which can be directly transferred to a laser cutter to create all the laser cut acrylic shapes which are used for the arts and crafts projects presented in this work.

In addition, the software presented here uses the same Hypercube and GVM to create, edit, and replicate 3d files which are saved in .stl for 3d printing or x3d for VR and AR or games.

Perhaps most importantly, however, the software presented here allows us to create generalized symbols using Geometron which use physical machines to make physical matter with the symbols we create in Geometron.  Extending the system to more cubes in higher address spaces can allow for a totally generalized methodology for creating geometric languages for any kind of fabrication, media, display or design technology.

Symbols are created using [symbol.html](symbol.html).  One edits a glyph which is displayed in a canvas element on the screen by either hitting keys which correspond to actions or soft keys on the screen.   Another canvas element displays the sequence of symbols corresponding to the actions in the glyph.  The arrow and delete keys are used for editing by keyboard, and there are equivalent symbols on the soft key menu. 

![](iconsymbols/keyboard.svg)

Glyphs are stored in software as strings formed from sequences of numbers separated by commas.  As you edit a glyph the string will change in an input.  That string can be copied to the clip board and saved, emailed or text messaged to someone who can paste it in their own Geometron software to copy the symbol. 


Actions of symbol.html

![](iconsymbols/actiontablet.svg)

[Learn to operate Geometron with the Hello Geometron Scroll](scrolls/hellogeometron)

[read a book ish document of an obsolete version of Geometron in the Book of Geometron here](https://lafelabs.github.io/book_of_geometron.html)


