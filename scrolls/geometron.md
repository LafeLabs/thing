[home](index.html)

# Geometron

Geometron is a geometric meta-langauge.  That is it is a language for building geometric languages, which is itself expressed entirely through geometry.  The two main components of Geometron are the "Geometron Virtual Machine", or GVM, and the Geometron Hypercube. The GVM is an abstract "machine" of pure thought which carries out geometric actions.  The actions of the GVM are arranged geometrically into two cubes(hence "hypercube") each composed of 8x8x8 cells.  Each of these 512 cells has an address based on its geometric location.  All addresses start with the number "0", and indexes count up from 0 rather than 1.  One cube has addresses from 0 through 0777, and the other has addresses from 01000 through 01777. Each cell in the Hypercube represents either a geometric action or a list of addresses in the hypercube which the GVM will execute in order. The GVM is fed a "glyph" which is a sequence of Hypercube addresses, and it executes the actions in the glyph in order. Some actions are therefore themselves glyphs, which in turn can be composed of sub-glyphs and so on. Infinite loops can easily be created this way.

The zero cube from 0 through 0777 is the "Action Cube", which represents actions themselves we wish to use the GVM for.  Each action has a corresponding symbol in the symbol cube or 1 cube from 01000 through 01777, which is a glyph designed to communicate the meaning of the action to a human user.  

The Action Cube is divided into layers, which organize the types of information into different categories.   