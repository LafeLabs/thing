[home](index.html)

[![](iconsymbols/map.svg)](maps/iconfactory)


 - [google images](https://images.google.com/)
 - [global image feed](globalimagefeed.html)
 - [local image feed](localimagefeed.html)
 - [imgur.com](https://imgur.com/)
 - [image aligner](alignimage.html)
 - [icon tracer](traceicon.html)
 - [icon feed](iconfeed.html)
 - [program arduino](programarduino.html)
 - [inject icon into a Geometron map](icon64.html)
 - [3d print an icon](icon3d.html)
 - [spray paint stencil pattern of icon](lasericon.html)

# Icon Factory

An Icon is a sequence of [Geometron](scrolls/bookofgeometron.md) actions which creates a symbol from an array of 64x64 pixels.  This can be used to create clay printed coins, clay printed jewelry, clay systems of self-replicating media, printed plastic trash, 3d printed parts, and spray stencils which can be printed in a laser cutter or paper printer with a pin.  Icons can also be integrated into other documents and pages in the [Geometron](scrolls/bookofgeometron.md) system, especially [maps](scrolls/maps.md).

This [Scroll](scrolls/scrolls.md) documents how to create icons from start to finish.  There are many ways to use this, and we will show you how to do several of them here.  We try to make this as widely usable as possible, allowing you to mix and match parts of the system so you can participate with minimal resources.

## Step 1: Think of a symbol

This is the most creative step.  This can be anything: words, computer icons, symbols, signs, emoticons, or really any symbol in the most generalized sense. The only real limitation is that the limited number of pixels limits the resolution, so you should pick simple icons without too much detail.  It is good to first think of a thing you want to represent, then figure out the symbol for that thing.  "Thing" in this case can be a very generalized thing: ideas, objects, actions, places, people, brands, concepts, institutions, businesses, teams, logos, organisms, really anything.  

## Step 2: Either find or create an image of the symbol 

There are two paths to this: the [global image feed](globalimagefeed.html) and the [local image feed](localimagefeed.html).  We use the global image feed to capture the addresses of images on the World Wide Web which we will trace.  We can do this by doing an image search for whatever we decided we want to trace.  Having done the image search, you right click the image and "copy image link" to copy the address of the image.  Then when you go to [globalimagefeed.html](globalimagefeed.html) you just paste the address into the address bar and you have captured the image.  You can do this with an image you take yourself by uploading an image to the image sharing page [imgur.com/](https://imgur.com/), and again right clicking on your image and copying the link to paste in the global image feed.  That procedure can also be carried out on a Geometron server by uploading your image to the [local image feed](localimagefeed.html).  Note that before doing this you will need to make the image smaller by taking a screen shot of the image and cropping it(you ideally want it under 1 megabyte).  Tracing images you record on your mobile devices is used for converting symbols you draw on paper to digital icons, as well as symbols, logos and brands found in your environment.

### Step 3: Align the image for tracing

Once you have the image of the symbol you want to trace in one of the image feeds, you need to line it up for tracing.  This is done with [alignimage.html](alignimage.html).  When you are on that page, click on the image in the feed that you want to use to select it and it will appear inside the alignment circle.  You then want to use either the slider bar or the little plus and minus symbols to adjust the size of the image so the whole symbol you want to trace appears inside the alignment circle.  When you have it the size you want, hit the SAVE button to save the image selection and scale.  Then move it around by dragging on the image to get the alignment all inside the circle.  Again, save whenever you get it how you want. You can also rotate with either the rotate bar or the buttons, and re-adjust the zoom and pan again, and finally hit the SAVE button when you have it how you want it.  When you have aligned the image, you can click on TRACE to get to the next step.

### Step 4: Trace the image into an icon glyph

Clicking from TRACE from the [image aligner](alignimage.html) will get you to [traceicon.html](traceicon.html), which is where you trace the icon.  If you are on a computer with a proper keyboard, which is much easier than mobile, you can use the keys a,s,d,f to control the movement of the tool with a pixel being drawn, and if you use the keys z,x,c,v you can control tool movement without drawing a pixel.  These keys are shown below:

![pixel movements](https://i.imgur.com/csr4ZMb.png)

These exact commands are also accessible via touch screen buttons, which can be used if a keyboard is not available.  Color is selected using the number keys or the soft keys.  The layers are as shown below:

![pixel colors](https://i.imgur.com/MCA8IT3.png)

A glyph is cleared with the vertical bar above the backslash as shown:

![clear key](https://i.imgur.com/2GEtsfK.png)

As a glyph is created, you can edit it with the forward and back arrow keys and backspace as you would text: move the cursor, and delete individual commands.  Each command(moves, pixel drawing, colors) is represented by a number beginning with zero.  These numbers are part of the [Geometron language documented in the Book of Geometron](scrolls/bookofgeometron.md), but you do not need to understand what that means to work with them.  All you need to understand is that the series of numbers which changes as you edit is the text you need to share with other people to share your icon you created.  At any time in the editing process you can copy and paste the sequence of numbers separated by commas which make up the glyph.    

share the glyph manually, copy and paste and save and send

### Step 5: Share and save glyphs, replicate

### Step 6: Set up robot

### Step 7: Print

### Step 8: Make stamp

### Step 9: Make tokens/coins

### Step 10: Make 3d printed icon

### Step 11: Make laser cut stencil icon



