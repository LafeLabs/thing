/*

A Geometron is a geometric virtual machine which has two 8x8x8 cubes of operations. Thus each cube has
512 elements, for a total of 1024 addresses
  Operations are divided into:
       - transformations of global geometric variables, e.g. x += side. 
       - creation of geometric elements such as circle in a canvas or sphere in a 3d canvas, 
       where the location, orientation, and size, e.g. createSphere(x,y,z,side) 
       - carry out a sequence of operations, which can be any of these three types
       
  operations are organized by the geometry of the two cubes:  
      One cube is the "symbol" cube which consists entirely of sequences of operations. 
      the other cube, the "action cube", is divided up into different types of action based on "layers", which are 
          8x8 arrays, which stack on top of each other(with exceptions).  The symbol which describes an action is in the same location in the symbol cube
          as the corresponding action in the action cube.  
          
      Each address in each cube is a base 8 number, indicated by a leading 0.  Therefore these addresses are *coordinates* in space, where 
      the action cube is all 3 digit addresses and the symbol cube is all 4 digit addresses starting with 1. 

    
      The Action Cube is divided into layers as follows:
         00-05: held in reserve for creation operations for making new instances of Geometron
         06-037: Root Actions, which manipulate things outside of the basic construct of geometron
         040-0176: keyboard actions, each of which maps to some other action/operation 
         0177: do nothing
         0200-0277: shape table, which is all programs/sequences/glyphs
         0207: cursor, which has special properties which affect editign of glyphs
         0300-0377: 2d geometric actions

         0400-0477: direct control of stepper motor stages
         0500-0577: symbols which refernce 04xx 
         0600-0677: shape table which refernces voxel actions
         0700-0777: voxel construction in 3d format

    The symbol cube has a "font" stored in 01040[space] to 01176[tilde], which corresponds to the printable ASCII

    */

//var newGVM = new GVM(newgeometron,newcan,hypercube,300);

function GVM(geometron,canvas2d,bytecode,width,height) {
    this.address = 0277;
    this.glyph = geometron.glyph;
    this.cleanGlyph = geometron.glyph;
    this.width = width;//width in px
    this.height = height;//width in px
    this.shapes = geometron.shapes;
    canvas2d.width = this.width;//px
    canvas2d.height = this.height;//px
    canvas2d.parentElement.style.width = this.width.toString() + "px";
    canvas2d.parentElement.style.height = this.height.toString() + "px";
    this.canvas2d = canvas2d;
    this.ctx = canvas2d.getContext("2d"); 
    this.x0 = geometron.x0*width;//convert from fractional to px
    this.x = this.x0;
    this.y0 = geometron.y0*width;
    this.y = this.y0;
    this.unit = geometron.unit*width;//convert to px from relative
    this.side = this.unit;
    this.theta0 = -Math.PI/2;
    this.theta = this.theta0;
    this.scaleFactor = 2;
    this.thetaStep = Math.PI/2;
    this.spellMode = false;
    this.word = "";
    this.font = "Arial";
    this.unicodemode = false;
    this.unicodemap = [
        {
            "ascii":"s",
            "character":"下"
        },
        {
            "ascii":"a",
            "character":"上"
        }
        ];
    this.cpy1 = this.y0;
    this.cpx2 = this.x0;
    this.cpy2 = this.y0;
    this.x1 = this.x0;
    this.y1 = this.y0;
    this.x2 = this.x0;
    this.y2 = this.y0;
    this.xOne = this.x0;
    this.yOne = this.y0;
    this.thetaOne = this.theta;
    this.sideOne = this.side;
    this.thetaStepOne = this.thetaStep;
    this.scaleFactorOne = this.scaleFactor;
 
    this.style = geometron.style;
    this.strokeStyle = this.style.color0;
    this.fillStyle = this.style.fill0;
    this.lineWidth = this.style.line0;

    this.viewStep = 50;
    this.svgString = "<svg width=\"" + this.width.toString() + "\" height=\"" + this.height.toString() + "\" viewbox = \"0 0 " + this.width.toString() + " " + this.height.toString() + "\"  xmlns=\"http://www.w3.org/2000/svg\">\n";


    this.hypercube = [];
    for(var index = 0;index < 1024;index++){
        this.hypercube.push("");
    }


    for(var index = 0;index < bytecode.length;index++) {
        if(hypercube[index].length > 1){
            var localaddress = parseInt(hypercube[index].split(":")[0],8);
            var localglyph = hypercube[index].split(":")[1];
            this.hypercube[localaddress] = localglyph;
        }
    }
    
    for(var index = 0;index < this.shapes.length;index++) {
        if(this.shapes[index].length > 1){
            var localaddress = parseInt(this.shapes[index].split(":")[0],8);
            var localglyph = this.shapes[index].split(":")[1];
            this.hypercube[localaddress] = localglyph;
        }
    }    

    this.bytecode = function(start,stop) {
        var jsonarray = [];
        for(var index = start;index < stop;index++) {
            if(this.hypercube[index].length > 1) {
                var bytecodestring = "0" + index.toString(8) + ":" + this.hypercube[index];
                jsonarray.push(bytecodestring); 
            }
        }
        return JSON.stringify(jsonarray,null,"    ");
    }

    this.importbytecode = function(bytecode){
        for(var index =0;index < bytecode.length;index++){
            var localaddress = parseInt(bytecode[index].split(":")[0],8);
            var localglyph = bytecode[index].split(":")[1];
            this.hypercube[localaddress] = localglyph;
        }
    }
    
    this.pngcode = function() {
        return this.canvas2d.toDataURL("image/png");
    }

    this.actionSequence = function(glyph) {
        var glyphArray = glyph.split(",");
        var actionSequence = [];
        for(var index = 0;index < glyphArray.length;index++){
            if(glyphArray[index].length > 1){
                actionSequence.push(parseInt(glyphArray[index],8));
            }
        }
        for(var index = 0;index < actionSequence.length;index++){
            this.action(actionSequence[index]);
        }

    }

    this.drawGlyph = function(glyph) {
        this.spellMode = false;
        this.ctx.clearRect(0,0,this.width,this.height);
        this.ctx.strokeStyle = this.style.color0;
        this.ctx.fillStyle = this.style.fill0;
        this.ctx.lineWidth = this.style.line0;
        this.svgString = "<svg width=\"" + this.width.toString() + "\" height=\"" + this.height.toString() + "\" viewbox = \"0 0 " + this.width.toString() + " " + this.height.toString() + "\"  xmlns=\"http://www.w3.org/2000/svg\">\n";
        this.svgString += "<!--<json></json>-->";
        this.action(0300);
        this.actionSequence(glyph);
        this.svgString += "</svg>";

    }

    this.saveGlyph = function(){
        var glyphArray = this.glyph.split(",");
        var cleanGlyph = "";
        for(var index = 0;index < glyphArray.length;index++) {
            if(glyphArray[index] != "0207" && glyphArray[index].length> 1){
                cleanGlyph += glyphArray[index] + ",";
            }
        }
        this.hypercube[this.address] = cleanGlyph;        
        this.cleanGlyph = cleanGlyph;
    }
    
    
    this.spellGlyph = function(glyph) {
        this.spellMode = true;
        var localGlyph = "";
        var glyphArray = glyph.split(",");
        for(var index = 0; index < glyphArray.length; index++){
            if(glyphArray[index].length > 1){
                var localAddress = parseInt(glyphArray[index],8);
                if(localAddress < 01000){
                    localAddress += 01000;
                }
                localGlyph += "0" + localAddress.toString(8) + ",";
            }
        }
        glyph = localGlyph;
        this.side = this.unit;
        this.x0 = this.unit;
        this.y0 = this.unit*1.5;

        this.ctx.clearRect(0,0,this.width,this.height);
        this.ctx.strokeStyle = this.style.color0;
        this.ctx.fillStyle = this.style.fill0;
        this.ctx.lineWidth = this.style.line0;
        this.action(0300);
        this.actionSequence(glyph);
        
    }

    
    this.cursorAction = function(action) {           
        //2d cursor is at address 0207, glyph cursor is therefore at 01207
        var currentGlyph = this.glyph;
        if(action < 040) {
            this.action(action);
        }
        if(action > 037 && action <= 01777 && action != this.address) {
            var glyphSplit = currentGlyph.split(",");
            currentGlyph = "";
            for(var index = 0;index < glyphSplit.length;index++){
                if(glyphSplit[index].length > 0 && glyphSplit[index] != "0207"){
                    currentGlyph += glyphSplit[index] + ",";
                }
                if(glyphSplit[index] == "0207"){
                    currentGlyph += "0" + action.toString(8) + ",0207,";
                }
            }
            var glyphSplit = currentGlyph.split(",");
            currentGlyph = "";
            for(var index = 0;index < glyphSplit.length;index++){
                if(glyphSplit[index].length > 0  && parseInt(glyphSplit[index]) >= 040){
                    currentGlyph += glyphSplit[index] + ",";
                }
            }
            this.glyph = currentGlyph; 
        }
        this.drawGlyph(this.glyph);

    }

    this.action = function(address) {
        if(address == 010) {
            //delete
            var bottomGlyph = this.glyph.split("0207")[0];   
            var topGlyph = this.glyph.split("0207")[1]; 
            var glyphSplit = bottomGlyph.split(",");
            this.glyph = "";
            for(var index = 0;index < glyphSplit.length - 2;index++){
                if(glyphSplit[index].length > 0){
                    this.glyph += glyphSplit[index] + ",";
                }
            }
            this.glyph += "0207,";
            this.glyph += topGlyph;
            glyphSplit = this.glyph.split(",");
            this.glyph = "";
            for(var index = 0;index < glyphSplit.length;index++){
                if(glyphSplit[index].length > 0){
                    this.glyph += glyphSplit[index] + ",";
                }
            }
        }        
        if(address == 020) {
            //cursor back
            var currentGlyph = this.glyph;
            var bottomGlyph = currentGlyph.split("0207")[0];   
            var topGlyph = currentGlyph.split("0207")[1]; 
            glyphSplit = bottomGlyph.split(",");
            if(bottomGlyph.length == 0){
                currentGlyph = topGlyph + "0207,";
            }
            else{
                currentGlyph = "";
                for(var index = 0;index < glyphSplit.length - 2;index++){
                    if(glyphSplit[index].length > 0){
                        currentGlyph += glyphSplit[index] + ",";
                    }
                }
                currentGlyph += "0207,";
                currentGlyph += glyphSplit[glyphSplit.length - 2];
                currentGlyph += topGlyph;
            }
            glyphSplit = currentGlyph.split(",");
            currentGlyph = "";
            for(var index = 0;index < glyphSplit.length;index++){
                if(glyphSplit[index].length > 0){
                    currentGlyph += glyphSplit[index] + ",";
                }
            }
            this.glyph = currentGlyph;
        }        
        if(address == 021) {
            //cursor fwd
            var currentGlyph = this.glyph;
            var bottomGlyph = currentGlyph.split("0207")[0];   
            var topGlyph = currentGlyph.split("0207")[1]; 
            if(topGlyph == ","){
                currentGlyph = "0207," + bottomGlyph;
            }
            else{
                glyphSplit = topGlyph.split(",");
                currentGlyph = bottomGlyph + ",";
                currentGlyph += glyphSplit[1] + ",";
                currentGlyph += "0207,";
                for(var index = 2;index < glyphSplit.length - 1;index++){
                    if(glyphSplit[index].length > 0){
                        currentGlyph += glyphSplit[index] + ",";
                    }
                }
            }
            glyphSplit = currentGlyph.split(",");
            currentGlyph = "";
            for(var index = 0;index < glyphSplit.length;index++){
                if(glyphSplit[index].length > 0){
                    currentGlyph += glyphSplit[index] + ",";
                }
            }
            this.glyph = currentGlyph;

        }        
        if(address == 022) {
            //next glyph in table
        }        
        if(address == 023) {
            //previous glyph in table
        }        
        if(address == 024) {
            //spell to draw, draw to spell
        }        
        if(address == 030) {
            this.y0 -= this.viewStep;
        }        
        if(address == 031) {
            this.y0 += this.viewStep;
        }        
        if(address == 032) {
            this.x0 -= this.viewStep;
        }        
        if(address == 033) {
            this.x0 += this.viewStep;
        }        
        if(address == 034) {
            this.theta0 -= Math.PI/10;
        }        
        if(address == 035) {
            this.theta0 += Math.PI/10;
        }        
        if(address == 036) {
            
            this.unit /= 1.1; 
            this.x0 = 0.5*this.width + (this.x0 - 0.5*this.width)/1.1;
            this.y0 = 0.5*this.height + (this.y0 - 0.5*this.height)/1.1;
    
        }        
        if(address == 037) {
            this.unit *= 1.1; 
            this.x0 = 0.5*this.width + (this.x0 - 0.5*this.width)*1.1;
            this.y0 = 0.5*this.height + (this.y0 - 0.5*this.height)*1.1;

        }        

        //040-0176: put ASCII on the word stack, to be dumped out to screen via 0365 command
        if( address >= 040 && address <= 0176){
            this.word += String.fromCharCode(address);
        }

        //02xx,05xx,06xx
        if( (address >= 0200 && address <= 0277) || (address >= 01000 && address <= 01777) || (address >= 0500 && address <= 0677)){
            
            if(address >= 01000 && address <= 01777 && this.spellMode && this.x > this.width - 1.5*this.unit){
                this.y += this.unit*1.2;
                this.x = this.x0;
            }
            
            this.actionSequence(this.hypercube[address]);

        }
        
        //03xx
        if(address == 0300) {
            this.x = this.x0;
            this.y = this.y0;
            this.side = this.unit;
            this.thetaStep = Math.PI/2;
            this.theta = this.theta0;
            this.scaleFactor = 2;      
            this.word = "";
            this.ctx.strokeStyle = this.style.color0;
            this.ctx.fillStyle = this.style.fill0;
            this.ctx.lineWidth = this.style.line0;    
        }
        if(address == 0304) {
            this.thetaStep = Math.PI/2;
        }
        if(address == 0305) {
            this.thetaStep = 2*Math.PI/5;
        }
        if(address == 0306) {
            this.thetaStep = Math.PI/3;
        }

        if(address == 0310) {
            this.scaleFactor = Math.sqrt(2);
        }
        if(address == 0311) {
            this.scaleFactor = (Math.sqrt(5) + 1)/2;
        }
        if(address == 0312) {
            this.scaleFactor = Math.sqrt(3);
        }
        if(address == 0313) {
            this.scaleFactor = 2;
        }
        if(address == 0314) {
            this.scaleFactor = 3;
        }
        if(address == 0315) {
            this.scaleFactor = 1.1755705;
        }
        if(address == 0316) {
            this.scaleFactor = 5;
        }
        if(address == 0320) {
            this.ctx.strokeStyle = this.style.color0;
            this.ctx.fillStyle = this.style.fill0;
            this.ctx.lineWidth = this.style.line0;    
        }
        if(address == 0321) {
            this.ctx.strokeStyle = this.style.color1;
            this.ctx.fillStyle = this.style.fill1;
            this.ctx.lineWidth = this.style.line1;    
        }
        if(address == 0322) {
            this.ctx.strokeStyle = this.style.color2;
            this.ctx.fillStyle = this.style.fill2;
            this.ctx.lineWidth = this.style.line2;    
        }
        if(address == 0323) {
            this.ctx.strokeStyle = this.style.color3;
            this.ctx.fillStyle = this.style.fill3;
            this.ctx.lineWidth = this.style.line3;    
        }
        if(address == 0324) {
            this.ctx.strokeStyle = this.style.color4;
            this.ctx.fillStyle = this.style.fill4;
            this.ctx.lineWidth = this.style.line4;    
        }
        if(address == 0325) {
            this.ctx.strokeStyle = this.style.color5;
            this.ctx.fillStyle = this.style.fill5;
            this.ctx.lineWidth = this.style.line5;    
        }
        if(address == 0326) {
            this.ctx.strokeStyle = this.style.color6;
            this.ctx.fillStyle = this.style.fill6;
            this.ctx.lineWidth = this.style.line6;    
        }
        if(address == 0327) {
            this.ctx.strokeStyle = this.style.color7;
            this.ctx.fillStyle = this.style.fill7;
            this.ctx.lineWidth = this.style.line7;    
        }

        if(address == 0330) {
            this.x += this.side*Math.cos(this.theta);
            this.y += this.side*Math.sin(this.theta);    
        }
        if(address == 0331){
            this.x -= this.side*Math.cos(this.theta);
            this.y -= this.side*Math.sin(this.theta);    
        }
        if(address == 0332) {
            this.x += this.side*Math.cos(this.theta - this.thetaStep);
            this.y += this.side*Math.sin(this.theta - this.thetaStep);    
        }
        if(address == 0333) {
            this.x += this.side*Math.cos(this.theta + this.thetaStep);
            this.y += this.side*Math.sin(this.theta + this.thetaStep);    
        }
        if(address == 0334) {
            this.theta -= this.thetaStep; // CCW
        }
        if(address == 0335) {
            this.theta += this.thetaStep; // CW
        }
        if(address == 0336) {
            this.side /= this.scaleFactor; // -
        }
        if(address == 0337) {
            this.side *= this.scaleFactor; // +
        }
    
        if(address == 0340) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.ctx.lineWidth, 0, 2 * Math.PI);
            this.ctx.fill();	
            this.ctx.closePath();
            this.svgString += "<circle cx=\"";
            this.svgString += Math.round(this.x).toString();
            this.svgString += "\" cy = \"";
            this.svgString += Math.round(this.y).toString();
            this.svgString += "\" r = \"" + this.ctx.lineWidth.toString() + "\" stroke = \"" + this.ctx.strokeStyle + "\" stroke-width = \"" + (this.ctx.lineWidth).toString() + "\" ";
            this.svgString += "fill = \"" + this.ctx.strokeStyle + "\" />\n";	
        }
        if(address == 0341) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.side, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.stroke();   
            this.svgString += "<circle cx=\"";
            this.svgString += Math.round(this.x).toString();
            this.svgString += "\" cy = \"";
            this.svgString += Math.round(this.y).toString();
            this.svgString += "\" r = \"" + this.side.toString() + "\" stroke = \"" + this.ctx.strokeStyle + "\" stroke-width = \"" + (this.ctx.lineWidth).toString() + "\" ";
            this.svgString += "fill = \"none\" />\n";			
        }
        if(address == 0342) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x,this.y);
            this.ctx.lineTo(this.x + this.side*Math.cos(this.theta),this.y + this.side*Math.sin(this.theta));
            this.ctx.stroke();		
            this.ctx.closePath();    
            var x2 = Math.round(this.x + this.side*Math.cos(this.theta));
            var y2 = Math.round(this.y + this.side*Math.sin(this.theta));
            this.svgString += "    <line x1=\""+Math.round(this.x).toString()+"\" y1=\""+Math.round(this.y).toString()+"\" x2=\"" + x2.toString()+"\" y2=\"" + y2.toString()+"\" style=\"stroke:" + this.ctx.strokeStyle + ";stroke-width:" + (this.ctx.lineWidth).toString() + "\" />\n"
    
        }
        if(address == 0343) {
            //arc
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.side, this.theta - this.thetaStep,this.theta + this.thetaStep);
            this.ctx.stroke();
            this.ctx.closePath();
            var localString = "";
            localString += "  <path d=\"";	
            localString += "M";
            var localInt = this.x + this.side*Math.cos(this.theta - this.thetaStep);
            localString += localInt.toString();
            localString += " ";
            localInt = this.y + this.side*Math.sin(this.theta - this.thetaStep);
            localString += localInt.toString();
            this.svgString += localString;
            localString = "           A" + this.side.toString() + " " + this.side.toString() + " 0 0 1 ";
            localInt = this.x + this.side*Math.cos(this.theta + this.thetaStep);
            localString += localInt.toString() + " ";
            localInt = this.y + this.side*Math.sin(this.theta + this.thetaStep);
            localString += localInt.toString() + "\" fill = \"none\" stroke = \"" + this.ctx.strokeStyle + "\" stroke-width = \"" + (this.ctx.lineWidth).toString() + "\" />\n";
            this.svgString += localString;

        }
        if(address == 0344) {
            //line segment as part of path
            this.ctx.lineTo(this.x + this.side*Math.cos(this.theta),this.y + this.side*Math.sin(this.theta));
            this.ctx.stroke();		
            var x2 = Math.round(this.x + this.side*Math.cos(this.theta));
            var y2 = Math.round(this.y + this.side*Math.sin(this.theta));
            this.svgString += "L" + x2 + " " + y2 + " ";
    
        }
        if(address == 0345) {
            //arc as part of path, to the right (CW)
            this.ctx.arc(this.x, this.y, this.side, this.theta - this.thetaStep,this.theta + this.thetaStep);
            this.ctx.stroke();
            var localString = "";
            localString += "M";
            var localInt = this.x + this.side*Math.cos(this.theta - this.thetaStep);
            localString += localInt.toString();
            localString += " ";
            localInt = this.y + this.side*Math.sin(this.theta - this.thetaStep);
            localString += localInt.toString();
            this.svgString += localString;
            localString = "           A" + this.side.toString() + " " + this.side.toString() + " 0 0 1 ";
            localInt = this.x + this.side*Math.cos(this.theta + this.thetaStep);
            localString += localInt.toString() + " ";
            localInt = this.y + this.side*Math.sin(this.theta + this.thetaStep);
            localString += localInt.toString();
            this.svgString += localString;
        }
        if(address == 0346) {
            //arc, reverse direction (CCW)
            this.ctx.arc(this.x, this.y, this.side, this.theta + this.thetaStep,this.theta - this.thetaStep,true);
            this.ctx.stroke();   
            localString = "";
            localString += "M";
            var localInt = this.x + this.side*Math.cos(this.theta - this.thetaStep);
            localString += localInt.toString();
            localString += " ";
            localInt = this.y + this.side*Math.sin(this.theta - this.thetaStep);
            localString += localInt.toString();
            this.svgString += localString;
            localString = "           A" + this.side.toString() + " " + this.side.toString() + " 0 0 1 ";
            localInt = this.x + this.side*Math.cos(this.theta + this.thetaStep);
            localString += localInt.toString() + " ";
            localInt = this.y + this.side*Math.sin(this.theta + this.thetaStep);
            localString += localInt.toString();
            this.svgString += localString;
    
        }
        if(address == 0347) {
            //filled circle
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.side, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.fill();
            this.svgString += "    <circle cx=\"";
            this.svgString += Math.round(this.x).toString();
            this.svgString += "\" cy = \"";
            this.svgString += Math.round(this.y).toString();
            this.svgString += "\" r = \"" + this.side.toString() + "\" stroke = \"" + this.ctx.strokeStyle + "\" stroke-width = \"" + (this.ctx.lineWidth).toString() + "\" ";
            this.svgString += "fill = \"" + this.ctx.fillStyle + "\" />\n";
        }
        if(address == 0350) {
            this.thetaStep /= 2;  //angle/2
        }
        if(address == 0351) {
            this.thetaStep *= 2;  //angle/2
        }
        if(address == 0352) {
            this.thetaStep /= 3;  //angle/2
        }
        if(address == 0353) {
            this.thetaStep *= 3;  //angle/2
        }
        if(address == 0354) {
            //end a closed but not filled path
            this.ctx.closePath();
            this.ctx.stroke();		
            this.svgString += "Z\""+ " stroke = \"" + this.ctx.strokeStyle + "\" stroke-width = \"" + (this.ctx.lineWidth).toString() + "\" fill = \"" + "none" + "\" "+"/>";

        }
        if(address == 0356){
            this.pendown = true;
        }
        if(address == 0357){
            this.pendown = false;
        }
        if(address == 0360) {
            //first part of bezier in middle of a path
            this.ctx.moveTo(Math.round(this.x),Math.round(this.y));
            this.cpx1 = Math.round(this.x + this.side*Math.cos(this.theta));
            this.cpy1 = Math.round(this.y + this.side*Math.sin(this.theta));
            this.svgString += " M";
            this.svgString += (Math.round(this.x)).toString() + ",";
            this.svgString += (Math.round(this.y)).toString() + " C";
            this.svgString += this.cpx1.toString() + "," + this.cpy1.toString() + " ";

        }
        if(address == 0361) { 

            //second part of bezier in middle of a path
            this.x2 = Math.round(this.x);
            this.y2 = Math.round(this.y);
            this.cpx2 = Math.round(this.x + this.side*Math.cos(this.theta));
            this.cpy2 = Math.round(this.y + this.side*Math.sin(this.theta));
            this.ctx.bezierCurveTo(this.cpx1,this.cpy1,this.cpx2,this.cpy2,this.x2,this.y2);
            this.ctx.stroke();
            this.svgString += this.cpx2.toString() + "," + this.cpy2.toString() + " ";
            this.svgString += this.x2.toString() + "," + this.y2.toString() + " ";		
    
        }
        if(address == 0362) {
            //start a path
            this.ctx.beginPath();
            this.ctx.moveTo(this.x,this.y);
            this.svgString += "	<path d = \"M";
            this.svgString += Math.round(this.x).toString() + " ";
            this.svgString += Math.round(this.y).toString() + " ";
    
        }
        if(address == 0363) {
            //terminate a closed path with fill
            this.ctx.closePath();
            this.ctx.stroke();		
            this.ctx.fill();		            
            this.svgString += "Z\""+ " stroke = \"" + this.ctx.strokeStyle + "\" stroke-width = \"" + (this.ctx.lineWidth).toString() + "\" fill = \"" + this.ctx.fillStyle + "\" "+"/>";
        }
        if(address == 0364) {
            this.ctx.closePath();
            this.svgString += "\""+ " stroke = \"" + this.ctx.strokeStyle + "\" stroke-width = \"" + (this.ctx.lineWidth).toString() + "\" fill = \"" + "none" + "\" "+"/>";
        }
        if(address == 0365) {
            if(this.unicodemode){
                var tempword = "";
                for(var index = 0;index < this.word.length;index++){
                    var hasreplacement = false;
                    for(var uindex = 0;uindex < this.unicodemap.length;uindex++){
                        if(this.unicodemap[uindex].ascii == this.word[index]){
                            hasreplacement = true;
                            tempword += this.unicodemap[uindex].character;
                        }
                    }
                    if(!hasreplacement){
                        tempword += this.word[index];
                    }
                    console.log(index);
                }
                this.word = tempword;
            }
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(-this.theta0 + this.theta);
            this.ctx.translate(-this.x, -this.y);
            this.ctx.font = this.side.toString(8) + "px " + this.font;
            this.ctx.fillText(this.word,this.x,this.y);    
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(+this.theta0 - this.theta);
            this.ctx.translate(-this.x, -this.y);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            
            this.svgString += "    <text x=\"";
            this.svgString += Math.round(this.x).toString();
            this.svgString += "\" y = \"";
            this.svgString += Math.round(this.y).toString();
            this.svgString += "\" fill = \"" + this.ctx.strokeStyle + "\""; 
            this.svgString += " font-size = \"";
            this.svgString += this.side + "px\"";
            this.svgString += " font-family = \"" + this.font + "\"";
            this.svgString += ">";
            if(this.word == "&"){
                this.word = "&amp;";
            }
            if(this.word == "<"){
                this.word = "&lt;";
            }
            if(this.word == ">"){
                this.word = "&gt;";
            }
            this.svgString += this.word;
            this.svgString += "</text>\n";	
            this.word = "";
 
        }
        if(address == 0366) {
            // start a self-contained cubic Bezier path        
            this.ctx.beginPath();
            this.ctx.moveTo(Math.round(this.x),Math.round(this.y));
            this.cpx1 = Math.round(this.x + this.side*Math.cos(this.theta));
            this.cpy1 = Math.round(this.y + this.side*Math.sin(this.theta)); 
            this.svgString += "<path    d = \"M";
            this.svgString += (Math.round(this.x)).toString() + ",";
            this.svgString += (Math.round(this.y)).toString() + " C";
            this.svgString += this.cpx1.toString() + "," + this.cpy1.toString() + " ";
    
        }
        if(address == 0367) {
            // finish a self-contained cubic Bezier path
            this.x2 = Math.round(this.x);
            this.y2 = Math.round(this.y);
            this.cpx2 = Math.round(this.x + this.side*Math.cos(this.theta));
            this.cpy2 = Math.round(this.y + this.side*Math.sin(this.theta));
            this.ctx.bezierCurveTo(this.cpx1,this.cpy1,this.cpx2,this.cpy2,this.x2,this.y2);
            this.ctx.stroke();
            this.svgString += this.cpx2.toString() + "," + this.cpy2.toString() + " ";
            this.svgString += this.x2.toString() + "," + this.y2.toString() + "\" fill = \"none\" stroke-width = \"" + (this.ctx.lineWidth).toString() + "\" stroke = \"" + this.ctx.strokeStyle + "\" />";	


        }
        if(address == 0370) {
            this.xOne = this.x;
            this.yOne = this.y;
            this.thetaOne = this.theta;
            this.sideOne = this.side;
            this.thetaStepOne = this.thetaStep;
            this.scaleFactorOne = this.scaleFactor;
        }
        if(address == 0371) {
            this.x = this.xOne;
            this.y = this.yOne;
            this.theta = this.thetaOne;
            this.side = this.sideOne;
            this.thetaStep = this.thetaStepOne;
            this.scaleFactor = this.scaleFactorOne;    
        }
    }
}

function Map(w,h,div) {

    this.w = w;//width of div element map will be drawn in
    this.h = h;//height of div element
    this.div = div; //div element in document
    this.div.style.width = this.w.toString() + "px"; //set width of div
    this.div.style.height = this.h.toString() + "px";//set height of div
    this.array = [];
    this.linkArray = [];
    this.linkindex = 0;
    //MapLink(x,y,w,aspectRatio,angle,text,href,src,maplinkmode)
    var newLink  = new MapLink(0.1,0.1,0.2,0.2,0,"text","","",false,{});
    this.array.push(newLink);

    this.draw = function() {
        this.div.innerHTML = "";
        this.linkArray = [];
        for(var index = 0;index < this.array.length;index++){
            
            var newa = document.createElement("A");
            newa.style.position = "absolute";
            this.div.appendChild(newa);
            newa.style.left = (this.array[index].x*this.w).toString() + "px";
            newa.style.top  = (this.array[index].y*this.w).toString() + "px";
            newa.style.width  = (this.array[index].w*this.w).toString() + "px";
            newa.style.height  = (this.array[index].h*this.w).toString() + "px";
            newa.style.transform  = "rotate(" + (this.array[index].angle).toString() + "deg)";
            if(this.array[index].href.length == 0){
                newa.style.color = "black";
            }
            if(this.array[index].src.length > 0) {
                var newimg = document.createElement("IMG");
                newimg.style.position = "absolute";
                newimg.style.left = "0px";
                newimg.style.top = "0px";
                newimg.style.width = "100%";
                
                newa.appendChild(newimg);
                newimg.src = this.array[index].src;
                newimg.alt = this.array[index].text;
                newimg.onload = function(){
                    this.parentElement.style.height = this.height + "px";
                }
            }
            else{
                newa.innerHTML = this.array[index].text;
                newa.style.fontSize = (0.1*this.array[index].w*this.w).toString() + "px"; 
            }
            if(this.array[index].href.length > 0){
                if(this.array[index].maplinkmode == true){
                    var newspan = document.createElement("SPAN");
                    newspan.innerHTML = this.array[index].href;
                    newspan.className = "maplink";
                    newspan.style.display = "none";
                    newa.style.color = "brown";
                    newa.style.cursor = "pointer";
                    newa.appendChild(newspan);
                }
                else{
                    newa.href = this.array[index].href;
                }
            }
            if(JSON.stringify(this.array[index].geometron) != "{}" && this.array[index].geometron != undefined){
               
                var newcan = document.createElement("CANVAS");
                newa.appendChild(newcan);
                newcan.style.position = "absolute";
                newcan.style.left = "0px";
                newcan.style.top = "0px";
                newcan.class = "geometroncanvas";
                //GVM(x0,y0,unit,theta0,canvas2d,width,height,bytecode)
                var newg = new GVM(this.array[index].geometron.x0rel*this.array[index].w*this.w,this.array[index].geometron.y0rel*this.array[index].w*this.w,this.array[index].geometron.unitrel*this.array[index].w*this.w,this.array[index].geometron.theta0,newcan,this.array[index].w*this.w,this.array[index].w*this.array[index].geometron.height*this.w/this.array[index].geometron.width,hypercube);
//                newg.importbytecode(this.array[index].geometron.shapes);
                var thisstyle = this.array[index].geometron.style;
                newg.style = thisstyle;
                newg.drawGlyph(this.array[index].geometron.glyph);
                newa.style.height = (this.array[index].w*this.array[index].geometron.height*this.w/this.array[index].geometron.width).toString() + "px";
                
                
            }

            this.linkArray.push(newa);
        }
    }

    this.deletelink = function () {
        var localArray = [];
        for(var index = 0;index < this.array.length;index++){
            if(index != this.linkindex) {
                localArray.push(this.array[index]);
            }
        }
        this.array = localArray;
        this.draw();
        this.linkindex--;
        if(this.linkindex < 0){
            this.linkindex = 0;
        }    
        this.linkArray[this.linkindex].style.border = "solid";
        this.linkArray[this.linkindex].style.borderWidth = "0.1px";

    }

    this.newlink = function() {
        
        if(this.array.length > 0 ){
            this.linkArray[this.linkindex].style.border = "none";
            var newLink  = new MapLink(this.array[this.linkindex].x + this.array[linkindex].w*0.05,this.array[this.linkindex].y + this.array[this.linkindex].w*0.05,this.array[this.linkindex].w,this.array[this.linkindex].h,this.array[this.linkindex].angle,this.array[this.linkindex].text,this.array[this.linkindex].href,this.array[this.linkindex].src,this.array[this.linkindex].maplinkmode,this.array[this.linkindex].geometron);
        }
        else{
            var newLink  = new MapLink(0.1,0.1,0.1,0.1,0,"text","","",false,{});
            this.linkindex = 0;
        }
        this.array.push(newLink);
        this.linkindex = this.array.length - 1;
        this.draw();
        this.linkArray[this.linkindex].style.border = "solid";
        this.linkArray[this.linkindex].style.borderWidth = "0.1px";

    }

    this.nextlink = function() {

        this.linkArray[this.linkindex].style.border = "none";
        this.array[this.linkindex].x = parseInt(this.linkArray[this.linkindex].style.left.substring(0,this.linkArray[this.linkindex].style.left.length-2))/this.w;
        this.array[this.linkindex].y = parseInt(this.linkArray[this.linkindex].style.top.substring(0,this.linkArray[this.linkindex].style.top.length-2))/this.w;
        this.array[this.linkindex].w = parseInt(this.linkArray[this.linkindex].style.width.substring(0,this.linkArray[this.linkindex].style.width.length-2))/this.w;
        this.array[this.linkindex].angle = parseInt(this.linkArray[this.linkindex].style.transform.substring(7,this.linkArray[this.linkindex].style.transform.length - 4));
    
        this.linkindex++;
        if(this.linkindex > this.array.length - 1){
            this.linkindex = 0;
        }
        this.linkArray[this.linkindex].style.border = "solid";
        this.linkArray[this.linkindex].style.borderWidth = "0.1px";
    }
    this.prevlink = function() {

        this.linkArray[this.linkindex].style.border = "none";
        this.array[this.linkindex].x = parseInt(this.linkArray[this.linkindex].style.left.substring(0,this.linkArray[this.linkindex].style.left.length-2))/this.w;
        this.array[this.linkindex].y = parseInt(this.linkArray[this.linkindex].style.top.substring(0,this.linkArray[this.linkindex].style.top.length-2))/this.w;
        this.array[this.linkindex].w = parseInt(this.linkArray[this.linkindex].style.width.substring(0,this.linkArray[this.linkindex].style.width.length-2))/this.w;
        this.array[this.linkindex].angle = parseInt(this.linkArray[this.linkindex].style.transform.substring(7,this.linkArray[this.linkindex].style.transform.length - 4));
    
        this.linkindex--;
        if(this.linkindex < 0){
            this.linkindex = this.array.length - 1;
        }
        
        this.linkArray[this.linkindex].style.border = "solid";
        this.linkArray[this.linkindex].style.borderWidth = "0.1px";
    
    }

    this.movelinkup = function() {
        if(this.linkindex < this.array.length - 1) {
            var localArray = [];
            for(var index = 0;index < this.array.length;index++){
                if(index < this.linkindex || index > this.linkindex + 1) {
                    localArray.push(this.array[index]);
                }
                if(index == this.linkindex) {
                    localArray.push(this.array[this.linkindex + 1]);
                }
                if(index == this.linkindex + 1) {
                    localArray.push(this.array[this.linkindex]);
                }
            }
            this.array = localArray;
            this.linkindex++;
            this.draw();
            this.linkArray[this.linkindex].style.border = "solid";
            this.linkArray[this.linkindex].style.borderWidth = "0.1px";

        }
    }

    this.movelinkdown = function() {
        if(this.linkindex > 0) {
            var localArray = [];
            for(var index = 0;index < this.array.length;index++){
                if(index < this.linkindex - 1 || index > this.linkindex) {
                    localArray.push(this.array[index]);
                }
                if(index == this.linkindex - 1) {
                    localArray.push(this.array[this.linkindex]);
                }
                if(index == this.linkindex) {
                    localArray.push(this.array[this.linkindex - 1]);
                }
            }
            this.array = localArray;
            this.linkindex--;
            this.draw();
            this.linkArray[this.linkindex].style.border = "solid";
            this.linkArray[this.linkindex].style.borderWidth = "0.1px";

        }
    }

}


function MapLink(x,y,w,h,angle,text,href,src,maplinkmode,geometron) {
 
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.text = text;
    this.href = href;//either an href property of an anchor element or the url of a json file with another map in it with which to load
    this.src = src;
    this.maplinkmode = maplinkmode;
    this.geometron = geometron;

}

hypercube = [
  "040:",
  "041:0321,",
  "042:0177,",
  "043:0323,",
  "044:0324,",
  "045:0325,",
  "046:0327,",
  "047:021,",
  "050:0177,",
  "051:0177,",
  "052:0300,",
  "053:0211,",
  "054:032,",
  "055:0314,",
  "056:033,",
  "057:020,",
  "060:0313,",
  "061:0305,",
  "062:0306,",
  "063:0350,",
  "064:0351,",
  "065:0352,",
  "066:0353,",
  "067:0310,",
  "070:0311,",
  "071:0312,",
  "072:0177,",
  "073:037,",
  "074:0247,",
  "075:0316,",
  "076:0177,",
  "077:0177,",
  "0100:0322,",
  "0101:0230,",
  "0102:0244,",
  "0103:0242,",
  "0104:0232,",
  "0105:0222,",
  "0106:0233,",
  "0107:0234,",
  "0110:0235,",
  "0111:0227,",
  "0112:0236,",
  "0113:0237,",
  "0114:0177,",
  "0115:0246,",
  "0116:0245,",
  "0117:0177,",
  "0120:0177,",
  "0121:0220",
  "0122:0223,",
  "0123:0231,",
  "0124:0224,",
  "0125:0226,",
  "0126:0243,",
  "0127:0221",
  "0130:0241,",
  "0131:0225,",
  "0132:0240,",
  "0133:0365,",
  "0134:0201,",
  "0135:0204,",
  "0136:0326,",
  "0137:0210,",
  "0140:0304,",
  "0141:0330",
  "0142:0200,",
  "0143:0342,",
  "0144:0332,",
  "0145:0363,",
  "0146:0333,",
  "0147:0334,",
  "0150:0335,",
  "0151:0370,",
  "0152:0336,",
  "0153:0337,",
  "0154:036,",
  "0155:031,",
  "0156:030,",
  "0157:0371,",
  "0160:0347,",
  "0161:0362,",
  "0162:0354,",
  "0163:0331,",
  "0164:0364,",
  "0165:0367,",
  "0166:0343,",
  "0167:0203,",
  "0170:0341,",
  "0171:0366,",
  "0172:0340,",
  "0173:0213,",
  "0174:0177,",
  "0175:0214,",
  "0176:0320,",
  "0200:0362,0203,0334,0203,0334,0203,0334,0203,0334,0354,",
  "0201:0342,0330,",
  "0202:0304,0313,0350,0335,0336,0336,0342,0333,0342,0333,0342,0333,0342,0333,0334,0304,0337,0337,",
  "0203:0344,0330,",
  "0204:0362,0203,0334,0203,0334,0203,0334,0203,0334,0363,",
  "0205:0362,0203,0335,0203,0203,0335,0203,0335,0203,0203,0335,0363,0336,0330,0333,0336,0331,0332,0337,0365,0336,0332,0331,0337,0337,",
  "0206:0336,0332,0337,0362,0203,0334,0336,0203,0335,0350,0335,0337,0310,0337,0203,0335,0335,0203,0335,0304,0335,0336,0313,0336,0203,0334,0337,0203,0363,0335,0335,0336,0332,0337,",
  "0207:0342,0334,0342,0335,0335,0342,0334,0336,0330,0340,0331,0337,0337,0330,0340,0331,0336,",
  "0210:0310,0337,0311,0336,0313,",
  "0211:0311,0337,0310,0336,0313,",
  "0212:0336,0336,0333,0331,0333,0331,0332,0330,0336,0332,0334,0337,0362,0203,0335,0203,0334,0336,0203,0335,0350,0335,0310,0337,0203,0203,0335,0335,0203,0203,0335,0335,0335,0336,0203,0334,0334,0337,0337,0203,0304,0335,0313,0354,0335,0330,0336,0332,0337,0337,0337,",
  "0213:0313,0336,0336,0336,0336,0336,0336,0336,0316,0337,0337,0337,0313,",
  "0214:0316,0336,0336,0336,0313,0337,0337,0337,0337,0337,0337,0337,",
  "0500:0406,0406,0403,0407,0405,0404,0407,0336,0336,0336,0336,0330,0330,0330,0347,0337,0337,0337,0337,",
  "0501:0406,0406,0402,0407,0405,0404,0407,0336,0336,0336,0336,0331,0331,0331,0347,0337,0337,0337,0337,",
  "0502:0406,0406,0401,0407,0405,0404,0407,0336,0336,0336,0336,0332,0332,0332,0347,0337,0337,0337,0337,",
  "0503:0406,0406,0400,0407,0405,0404,0407,0336,0336,0336,0336,0333,0333,0333,0347,0337,0337,0337,0337,",
  "0504:0406,0406,0403,0407,0407,0336,0336,0336,0336,0330,0330,0330,0337,0337,0337,0337,",
  "0505:0406,0406,0402,0407,0407,0336,0336,0336,0336,0331,0331,0331,0337,0337,0337,0337,",
  "0506:0406,0406,0401,0407,0407,0336,0336,0336,0336,0332,0332,0332,0337,0337,0337,0337,",
  "0507:0406,0406,0400,0407,0407,0336,0336,0336,0336,0333,0333,0333,0337,0337,0337,0337,",
  "0510:0403,0336,0336,0336,0342,0330,0337,0337,0337,",
  "0511:0402,0336,0336,0336,0331,0342,0337,0337,0337,",
  "0512:0400,0336,0336,0336,0334,0342,0330,0335,0337,0337,0337,",
  "0513:0401,0336,0336,0336,0335,0342,0330,0334,0337,0337,0337,",
  "0514:0406,0406,0406,0401,0403,0401,0403,0401,0403,0401,0403,0401,0403,0401,0403,0401,0403,0401,0403,0407,0407,0407,0336,0336,0336,0350,0310,0337,0335,0201,0334,0336,0313,0304,0337,0337,0337,",
  "0515:0406,0406,0406,0401,0402,0401,0402,0401,0402,0401,0402,0401,0402,0401,0402,0401,0402,0401,0402,0407,0407,0407,0336,0336,0336,0350,0310,0337,0335,0335,0335,0201,0334,0336,0313,0304,0334,0337,0337,0337,",
  "0516:0406,0406,0406,0400,0402,0400,0402,0400,0402,0400,0402,0400,0402,0400,0402,0400,0402,0400,0402,0407,0407,0407,0336,0336,0336,0350,0310,0337,0335,0335,0335,0335,0335,0201,0334,0336,0313,0304,0335,0335,0337,0337,0337,",
  "0517:0406,0406,0406,0400,0403,0400,0403,0400,0403,0400,0403,0400,0403,0400,0403,0400,0403,0400,0403,0407,0407,0407,0336,0336,0336,0350,0310,0337,0335,0335,0335,0335,0335,0335,0335,0201,0334,0336,0313,0304,0335,0335,0337,0337,0337,0335,0335,0335,",
  "0520:0411,0410,0412,",
  "0521:0413,0410,0414,",
  "0522:0415,0410,0416,",
  "0523:0417,0410,0420,",
  "0524:0500,0500,0505,0501,0501,0501,0504,0504,0502,0502,0507,0507,0503,0503,0506,0506,",
  "0525:0506,0506,0506,0506,0506,0506,0506,0506,0506,0506,",
  "0526:0504,0504,0504,0504,0504,0504,0504,0504,0504,0504,",
  "0527:0507,0507,0507,0507,0507,0507,0507,0507,0507,0507,",
  "0530:0406,0406,0403,0405,0404,0407,0407,0336,0336,0336,0336,0330,0330,0330,0347,0337,0337,0337,0337,",
  "0531:0406,0406,0402,0405,0404,0407,0407,0336,0336,0336,0336,0331,0331,0331,0347,0337,0337,0337,0337,",
  "0532:0406,0406,0401,0405,0404,0407,0407,0336,0336,0336,0336,0332,0332,0332,0347,0337,0337,0337,0337,",
  "0533:0406,0406,0400,0405,0404,0407,0407,0336,0336,0336,0336,0333,0333,0333,0347,0337,0337,0337,0337,",
  "0534:0530,0530,0530,0530,",
  "0535:0531,0531,0531,0531,",
  "0536:0532,0532,0532,0532,",
  "0537:0533,0533,0533,0533,",
  "0540:0406,0406,0403,0407,0407,0336,0336,0336,0336,0330,0330,0330,0337,0337,0337,0337,",
  "0541:0406,0406,0402,0407,0407,0336,0336,0336,0336,0331,0331,0331,0337,0337,0337,0337,",
  "0542:0406,0406,0401,0407,0407,0336,0336,0336,0336,0332,0332,0332,0337,0337,0337,0337,",
  "0543:0406,0406,0400,0407,0407,0336,0336,0336,0336,0333,0333,0333,0337,0337,0337,0337,",
  "0544:0505,0505,0505,0505,0505,0505,0505,0505,0505,0505,",
  "0545:0524,0526,0526,0526,0524,0525,0525,0525,0524,0544,0544,0544,0524,0544,0544,0544,0524,0527,0527,0527,0524,0527,0527,0527,0524,0526,0526,0526,0524,0526,0526,0526,0524,0525,0525,0525,0544,0544,0544,",
  "0546:0524,0526,0526,0524,0525,0525,0524,0544,0544,0524,0544,0544,0524,0527,0527,0524,0527,0527,0524,0526,0526,0524,0526,0526,0524,0525,0525,0544,0544,",
  "0547:0526,0526,0525,0525,0524,0544,0544,0544,0544,0524,0527,0527,0527,0527,0524,0526,0526,0526,0526,0524,0525,0525,0544,0544,",
  "0550:0321,0337,0337,0341,0336,0336,0320,",
  "0551:0321,0337,0337,0347,0336,0336,0320,",
  "0552:0321,0337,0337,0331,0333,0337,0200,0336,0330,0332,0336,0336,0320,",
  "0553:0321,0337,0337,0331,0333,0337,0204,0336,0330,0332,0336,0336,0320,",
  "0600:0640,0640,0640,0640,0640,0644,0644,0644,0644,0644,0644,0643,0643,0643,0643,0643,0643,0643,",
  "0601:0700,0702,0703,0700,0700,0700,0700,0700,",
  "0620:0304,0313,0342,0330,0335,0335,0336,0336,0306,0350,0335,0362,0203,0334,0334,0334,0334,0203,0334,0334,0334,0334,0203,0363,0335,0337,0337,0331,0304,0313,0360,0313,",
  "0640:0700,0400,",
  "0641:0701,0401,",
  "0642:0705,0402,",
  "0643:0403,0704,",
  "0644:0702,0404,",
  "0645:0703,0405,",
  "01010:0333,0200,0350,0334,0310,0337,0342,0336,0332,0335,0335,0337,0342,0336,0333,0334,0351,0313,",
  "01020:0304,0333,0200,0336,0330,0332,0336,0336,0332,0337,0200,0333,0333,0200,0332,0332,0336,0330,0335,0337,0342,0330,0350,0335,0335,0351,0333,0350,0336,0334,0342,0334,0334,0342,0337,0335,0351,0333,0336,0333,0331,0337,0337,0331,0337,0304,0336,0330,0330,0336,0330,0334,0331,0337,0337,",
  "01021:0304,0333,0200,0336,0330,0332,0336,0336,0332,0337,0200,0333,0333,0200,0332,0332,0336,0330,0335,0337,0342,0330,0350,0335,0335,0335,0336,0342,0335,0335,0342,0337,0335,0351,0333,0336,0333,0331,0337,0337,0331,0337,0304,",
  "01022:0333,0200,0336,0336,0330,0330,0332,0332,0332,0336,0336,0333,0337,0337,0336,0330,0336,0333,0337,0337,0200,0333,0200,0333,0200,0331,0331,0332,0332,0200,0333,0200,0333,0200,0336,0333,0331,0337,0337,0332,0330,0336,0336,0331,0337,0342,0330,0335,0350,0335,0336,0342,0335,0335,0342,0337,0335,0335,0335,0351,0331,0331,0331,0333,0333,0336,0330,0337,0337,0337,",
  "01023:0333,0200,0336,0336,0330,0330,0332,0332,0332,0336,0336,0333,0337,0337,0336,0330,0336,0333,0337,0337,0200,0333,0200,0333,0200,0331,0331,0332,0332,0200,0333,0200,0333,0200,0336,0333,0331,0337,0337,0332,0330,0336,0336,0331,0337,0335,0335,0331,0342,0330,0335,0350,0335,0336,0342,0335,0335,0342,0337,0335,0335,0335,0351,0331,0331,0331,0333,0333,0336,0330,0337,0337,0337,0335,0335,0331,0333,",
  "01024:0333,0200,0336,0336,0330,0332,0337,0200,0336,0336,0330,0332,0337,0200,0336,0336,0330,0332,0337,0200,0333,0333,0333,0331,0331,0331,0336,0331,0333,0337,0337,0337,0337,",
  "01025:0333,0200,0336,0330,0332,0336,0330,0332,0331,0336,0337,0123,0126,0107,0365,0335,0321,0330,0335,0336,0330,0337,0201,0335,0335,0350,0334,0336,0330,0335,0335,0335,0335,0362,0203,0334,0334,0203,0364,0331,0334,0304,0337,0337,0333,0336,0336,0331,0337,0337,0337,0320,",
  "01026:0333,0200,0336,0330,0332,0336,0336,0333,0331,0337,0200,0306,0335,0342,0332,0342,0330,0335,0335,0342,0335,0335,0335,0335,0331,0334,0304,0332,0306,0335,0342,0330,0350,0335,0342,0334,0331,0335,0304,0334,0331,0332,0335,0336,0332,0337,0342,0330,0350,0335,0335,0335,0336,0342,0335,0335,0342,0335,0304,0331,0331,0331,0331,0333,0333,0333,0333,0333,0337,0337,0337,",
  "01027:0333,0200,0336,0330,0332,0336,0336,0333,0331,0337,0332,0200,0306,0335,0342,0332,0342,0330,0335,0335,0342,0335,0335,0335,0335,0331,0334,0304,0332,0306,0335,0342,0330,0350,0335,0342,0334,0331,0335,0304,0334,0331,0333,0333,0330,0335,0342,0330,0350,0335,0335,0335,0336,0342,0335,0335,0342,0335,0304,0331,0331,0331,0331,0331,0333,0337,0337,0337,",
  "01030:0333,0200,0336,0330,0332,0336,0334,0362,0203,0335,0350,0335,0310,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0364,0304,0335,0313,0337,0333,0331,0337,",
  "01031:0333,0200,0336,0330,0332,0336,0334,0335,0335,0362,0203,0335,0350,0335,0310,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0364,0304,0335,0335,0335,0313,0337,0333,0331,0337,",
  "01032:0333,0200,0336,0330,0332,0334,0336,0334,0362,0203,0335,0350,0335,0310,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0364,0304,0335,0335,0313,0337,0333,0331,0337,",
  "01033:0333,0200,0336,0330,0332,0335,0336,0334,0362,0203,0335,0350,0335,0310,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0364,0304,0313,0337,0333,0331,0337,",
  "01034:0333,",
  "01035:0333,",
  "01036:0333,0200,0336,0332,0330,0336,0332,0362,0203,0335,0350,0335,0310,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0364,0335,0335,0330,0334,0337,0362,0203,0335,0335,0335,0336,0203,0203,0335,0335,0335,0337,0203,0364,0331,0335,0336,0304,0313,0333,0331,0337,0337,",
  "01037:0333,0200,0336,0332,0330,0336,0332,0362,0335,0335,0203,0335,0350,0335,0310,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0364,0335,0335,0330,0334,0335,0331,0331,0331,0331,0334,0337,0362,0203,0335,0335,0335,0336,0203,0203,0335,0335,0335,0337,0203,0364,0331,0335,0336,0304,0313,0333,0331,0337,0332,0335,0335,0337,0331,",
    "01040:0507,0507,0507,0507,0507,0507,",
  "01041:0507,0507,0503,0503,0500,0502,0504,0500,0503,0500,0502,0500,0503,0500,0502,0500,0503,0507,0507,0505,0505,0505,0505,0505,0505,0505,",
  "01042:0507,0507,0504,0504,0504,0504,0500,0500,0500,0507,0503,0501,0501,0505,0505,0505,0505,0507,0505,0507,",
  "01043:0507,0503,0500,0500,0500,0500,0500,0500,0505,0505,0502,0505,0501,0503,0503,0503,0500,0500,0502,0507,0500,0500,0505,0505,0503,0505,0501,0502,0506,0507,0501,0501,0507,0507,",
  "01044:0507,0500,0503,0503,0503,0506,0500,0500,0500,0500,0500,0505,0502,0505,0502,0501,0503,0507,0504,0504,0503,0503,0506,0505,0501,0503,0501,0505,0505,0506,0502,0507,0507,0507,",
  "01045:0503,0500,0507,0500,0503,0500,0500,0500,0500,0502,0502,0501,0501,0503,0507,0503,0507,0500,0500,0505,0505,0505,0506,0506,0505,0501,0501,0503,0503,0500,0500,0502,0507,0507,0505,0505,",
  "01046:0503,0500,0500,0507,0500,0506,0500,0500,0507,0500,0507,0501,0501,0505,0501,0505,0503,0505,0502,0502,0507,0507,0507,0504,0500,0505,0501,0507,",
  "01047:0507,0507,0507,0504,0504,0504,0500,0500,0500,0505,0505,0505,0505,0505,0505,0507,0507,0507,",
  "01050:0507,0507,0503,0504,0502,0500,0500,0500,0500,0507,0500,0507,0507,0507,0505,0505,0505,0505,0505,0505,",
  "01051:0507,0507,0503,0507,0500,0500,0500,0500,0500,0504,0502,0507,0507,0505,0505,0505,0505,0505,0505,0507,",
  "01052:0507,0500,0507,0500,0500,0502,0507,0500,0504,0502,0507,0503,0500,0505,0501,0501,0501,0501,0501,0507,0504,0500,0500,0500,0507,0500,0505,0501,0505,0501,0505,0507,0505,0504,",
  "01053:0507,0507,0504,0503,0500,0500,0500,0500,0505,0505,0502,0502,0507,0507,0503,0503,0505,0505,0505,0507,",
  "01054:0507,0507,0503,0505,0502,0507,0507,0504,0507,0507,",
  "01055:0504,0504,0503,0503,0503,0503,0503,0505,0505,0507,",
  "01056:0507,0507,0503,0500,0503,0501,0507,0507,",
  "01057:0503,0507,0500,0507,0500,0507,0500,0507,0500,0505,0505,0505,0505,0507,",
  "01060:0507,0500,0500,0500,0500,0500,0507,0500,0503,0503,0507,0501,0501,0501,0501,0501,0505,0502,0502,0502,0507,0507,0500,0506,0500,0500,0506,0500,0500,0507,0507,0507,0507,0505,0505,0505,0505,0505,",
  "01061:0503,0503,0503,0503,0503,0506,0506,0500,0500,0500,0500,0500,0500,0505,0502,0507,0507,0507,0507,0505,0505,0505,0505,0505,",
  "01062:0503,0503,0503,0503,0503,0502,0502,0502,0500,0507,0500,0507,0500,0507,0500,0500,0506,0500,0502,0502,0505,0502,0505,0505,0505,0505,0505,0507,0507,0507,0507,0507,",
  "01063:0507,0500,0505,0503,0503,0503,0507,0500,0500,0504,0502,0502,0507,0507,0500,0500,0504,0502,0502,0502,0505,0502,0505,0505,0505,0505,0505,0507,0507,0507,0507,0507,",
  "01064:0507,0504,0500,0500,0507,0500,0507,0500,0507,0500,0501,0501,0501,0501,0502,0502,0507,0507,0503,0506,0501,0501,0507,0507,",
  "01065:0507,0500,0505,0503,0503,0503,0507,0500,0500,0500,0504,0502,0502,0502,0502,0500,0500,0503,0503,0503,0503,0505,0505,0505,0505,0505,0505,0507,",
  "01066:0507,0500,0500,0500,0500,0500,0507,0500,0503,0503,0505,0503,0506,0506,0506,0505,0505,0506,0503,0503,0503,0507,0501,0501,0505,0502,0502,0502,0507,0507,0507,0507,",
  "01067:0507,0507,0503,0500,0500,0500,0507,0500,0507,0500,0500,0502,0502,0502,0502,0507,0507,0507,0507,0507,0505,0505,0505,0505,0505,0505,",
  "01070:0507,0500,0500,0507,0500,0506,0500,0500,0507,0500,0503,0503,0507,0501,0501,0505,0502,0502,0507,0507,0501,0501,0505,0502,0502,0502,0507,0507,0507,0507,",
  "01071:0507,0500,0505,0503,0503,0503,0507,0500,0500,0500,0500,0500,0504,0502,0502,0502,0506,0501,0501,0505,0503,0503,0503,0507,0507,0505,0505,0505,",
  "01072:0507,0507,0507,0500,0502,0500,0503,0504,0500,0502,0500,0503,0507,0507,0507,0505,0505,0505,0505,0505,",
  "01073:0507,0507,0507,0504,0502,0504,0503,0504,0500,0502,0500,0503,0507,0507,0507,0505,0505,0505,0505,0505,",
  "01074:0507,0507,0507,0503,0504,0502,0504,0502,0507,0500,0507,0500,0505,0505,0505,0505,0507,0507,",
  "01075:0507,0504,0500,0503,0503,0503,0503,0504,0500,0502,0502,0502,0502,0505,0505,0505,0505,0507,0507,0507,0507,0507,",
  "01076:0507,0503,0507,0500,0507,0500,0506,0500,0506,0500,0505,0505,0505,0505,0507,0507,0507,0507,",
  "01077:0507,0507,0503,0504,0500,0500,0503,0507,0500,0500,0504,0502,0502,0502,0506,0501,0501,0505,0505,0505,0505,0507,0507,0507,0507,0507,",
  "01100:0507,0503,0503,0503,0503,0504,0506,0506,0506,0502,0500,0500,0500,0500,0507,0500,0503,0503,0505,0503,0501,0502,0502,0501,0501,0503,0507,0500,0505,0505,0505,0507,",
  "01101:0507,0505,0500,0500,0500,0500,0500,0500,0507,0500,0503,0503,0505,0503,0501,0501,0501,0501,0501,0504,0504,0504,0502,0502,0502,0507,0507,0507,0507,0505,0505,0505,",
  "01102:0507,0505,0500,0500,0500,0500,0500,0500,0500,0503,0503,0503,0507,0501,0501,0505,0502,0502,0502,0507,0507,0507,0501,0501,0505,0502,0502,0502,0507,0507,0507,0507,",
  "01103:0507,0500,0500,0500,0500,0500,0504,0503,0503,0503,0507,0501,0505,0505,0505,0501,0505,0502,0502,0502,0507,0507,0507,0507,",
  "01104:0507,0505,0500,0500,0500,0500,0500,0500,0500,0503,0503,0505,0503,0505,0503,0501,0501,0505,0502,0505,0502,0502,0507,0507,0507,0507,",
  "01105:0507,0505,0500,0500,0500,0500,0500,0500,0500,0503,0503,0503,0503,0505,0505,0505,0506,0502,0502,0505,0505,0505,0506,0503,0503,0503,0503,0507,",
  "01106:0507,0505,0500,0500,0500,0500,0500,0500,0500,0503,0503,0503,0503,0505,0505,0505,0506,0502,0502,0505,0505,0505,0507,0507,0507,0507,",
  "01107:0507,0500,0500,0500,0500,0500,0507,0500,0503,0503,0505,0503,0505,0505,0502,0502,0507,0503,0501,0501,0501,0502,0502,0502,0507,0507,0507,0507,",
  "01110:0507,0505,0500,0500,0500,0500,0500,0500,0500,0505,0505,0505,0503,0503,0503,0503,0500,0500,0500,0505,0505,0505,0501,0501,0501,0507,",
  "01111:0507,0503,0503,0503,0506,0500,0500,0500,0500,0500,0500,0502,0507,0503,0505,0505,0505,0505,0505,0505,0507,0507,",
  "01112:0507,0500,0505,0503,0503,0507,0500,0500,0500,0500,0500,0500,0502,0507,0503,0505,0505,0505,0505,0505,0505,0507,",
  "01113:0507,0505,0500,0500,0500,0500,0500,0500,0500,0505,0505,0505,0503,0507,0500,0507,0500,0507,0500,0505,0505,0505,0506,0506,0501,0507,0501,0507,0501,0507,",
  "01114:0507,0505,0500,0500,0500,0500,0500,0500,0500,0505,0505,0505,0505,0505,0505,0503,0503,0503,0503,0507,",
  "01115:0505,0507,0500,0500,0500,0500,0500,0500,0500,0505,0503,0507,0501,0501,0507,0504,0500,0507,0500,0501,0501,0501,0501,0501,0501,0507,",
  "01116:0507,0505,0500,0500,0500,0500,0500,0500,0500,0507,0505,0501,0507,0501,0507,0501,0507,0501,0501,0504,0500,0500,0500,0500,0500,0507,0505,0505,0505,0505,0505,0505,",
  "01117:0507,0500,0500,0500,0500,0500,0507,0500,0503,0503,0505,0503,0501,0501,0501,0501,0505,0502,0502,0502,0507,0507,0507,0507,",
  "01120:0507,0505,0500,0500,0500,0500,0500,0500,0500,0503,0503,0503,0507,0501,0501,0505,0502,0502,0502,0505,0505,0505,0507,0507,0507,0507,",
  "01121:0507,0500,0500,0500,0500,0500,0507,0500,0503,0503,0505,0503,0501,0501,0501,0505,0502,0504,0502,0505,0505,0502,0503,0507,0503,0507,",
  "01122:0507,0505,0500,0500,0500,0500,0500,0500,0500,0503,0503,0503,0507,0501,0501,0505,0502,0502,0502,0507,0501,0505,0503,0505,0503,0507,",
  "01123:0507,0500,0505,0503,0503,0503,0507,0500,0500,0504,0502,0502,0502,0506,0500,0500,0507,0500,0503,0503,0507,0501,0505,0505,0505,0505,0505,0507,",
  "01124:0507,0504,0504,0504,0504,0504,0500,0503,0503,0503,0503,0506,0506,0501,0501,0501,0501,0501,0501,0507,0507,0507,",
  "01125:0507,0500,0500,0500,0500,0500,0500,0505,0505,0505,0505,0505,0505,0503,0503,0503,0507,0500,0500,0500,0500,0500,0500,0505,0505,0505,0505,0505,0505,0507,",
  "01126:0507,0504,0500,0500,0500,0500,0500,0505,0505,0505,0505,0505,0503,0505,0503,0507,0500,0507,0500,0500,0500,0500,0500,0505,0505,0505,0505,0505,0505,0507,",
  "01127:0507,0500,0500,0500,0500,0500,0500,0505,0505,0505,0505,0505,0505,0503,0507,0500,0500,0500,0505,0505,0505,0503,0507,0500,0500,0500,0500,0500,0500,0505,0505,0505,0505,0505,0505,0507,",
  "01130:0507,0505,0500,0500,0507,0500,0507,0500,0506,0500,0506,0500,0500,0507,0507,0507,0505,0501,0505,0501,0507,0501,0501,0504,0504,0504,0504,0500,0500,0505,0505,0505,0505,0505,0505,0507,",
  "01131:0507,0504,0504,0504,0500,0500,0500,0507,0505,0505,0501,0507,0501,0501,0501,0507,0504,0504,0500,0507,0500,0500,0500,0505,0505,0505,0505,0505,0505,0507,",
  "01132:0507,0505,0500,0500,0507,0500,0507,0500,0507,0500,0507,0500,0500,0502,0502,0502,0502,0505,0505,0505,0505,0505,0505,0503,0503,0503,0503,0507,",
  "01133:0507,0503,0503,0503,0504,0506,0502,0500,0500,0500,0500,0500,0503,0503,0505,0505,0505,0505,0505,0505,0507,0507,",
  "01134:0507,0504,0504,0504,0504,0500,0505,0503,0505,0503,0505,0503,0505,0503,0505,0507,",
  "01135:0507,0507,0503,0503,0503,0500,0500,0500,0500,0500,0500,0502,0502,0507,0507,0507,0505,0505,0505,0505,0505,0505,",
  "01136:0504,0504,0504,0504,0504,0503,0504,0503,0504,0503,0505,0503,0505,0503,0505,0505,0505,0505,0505,0507,",
  "01137:0503,0503,0503,0503,0503,0507,",
  "01140:0507,0504,0504,0504,0504,0504,0500,0505,0503,0505,0503,0505,0505,0505,0505,0507,0507,0507,",
  "01141:0507,0500,0504,0503,0503,0503,0503,0500,0504,0502,0502,0502,0507,0507,0507,0505,0505,0501,0501,0502,0502,0502,0507,0507,0507,0507,",
  "01142:0503,0500,0500,0500,0500,0500,0500,0507,0505,0505,0501,0507,0500,0503,0505,0503,0501,0501,0505,0502,0502,0502,0507,0507,0507,0507,",
  "01143:0507,0500,0500,0500,0507,0500,0503,0503,0505,0505,0505,0501,0502,0502,0507,0507,0507,0507,",
  "01144:0507,0500,0500,0500,0507,0500,0503,0505,0503,0503,0500,0500,0500,0505,0505,0505,0501,0501,0501,0502,0502,0502,0507,0507,0507,0507,",
  "01145:0507,0500,0500,0500,0507,0500,0503,0503,0507,0501,0501,0502,0502,0502,0505,0501,0503,0503,0507,0507,",
  "01146:0507,0507,0503,0500,0500,0500,0500,0500,0507,0500,0503,0505,0505,0505,0502,0506,0502,0507,0507,0507,0507,0505,0505,0505,",
  "01147:0507,0503,0503,0503,0507,0500,0500,0500,0500,0502,0502,0502,0506,0501,0507,0501,0503,0503,0507,0507,0505,0505,",
  "01150:0503,0500,0500,0500,0500,0500,0500,0500,0507,0505,0505,0505,0501,0507,0500,0503,0507,0501,0501,0501,0501,0507,",
  "01151:0507,0503,0503,0503,0506,0500,0500,0500,0500,0502,0507,0504,0500,0507,0507,0505,0505,0505,0505,0505,0505,0507,",
  "01152:0507,0507,0503,0503,0507,0500,0500,0500,0500,0502,0507,0504,0500,0505,0505,0505,0505,0505,0505,0507,",
  "01153:0507,0503,0500,0500,0500,0500,0500,0500,0507,0505,0505,0505,0501,0507,0500,0507,0500,0505,0505,0505,0502,0505,0503,0507,",
  "01154:0507,0503,0503,0503,0506,0500,0500,0500,0500,0500,0500,0502,0507,0507,0507,0507,0505,0505,0505,0505,0505,0505,",
  "01155:0503,0500,0500,0500,0500,0503,0505,0503,0501,0501,0501,0504,0504,0504,0504,0503,0505,0503,0501,0501,0501,0507,",
  "01156:0503,0500,0500,0500,0500,0505,0503,0507,0500,0503,0505,0503,0501,0501,0501,0507,",
  "01157:0507,0500,0500,0500,0507,0500,0503,0503,0505,0503,0501,0501,0505,0502,0502,0502,0507,0507,0507,0507,",
  "01160:0503,0500,0500,0500,0500,0503,0503,0503,0505,0503,0505,0502,0502,0502,0505,0505,0507,0507,0507,0507,",
  "01161:0507,0504,0504,0500,0507,0500,0503,0503,0503,0501,0501,0502,0502,0502,0505,0507,0507,0503,0501,0507,",
  "01162:0503,0500,0500,0500,0500,0507,0501,0507,0500,0503,0505,0503,0505,0505,0505,0507,",
  "01163:0503,0503,0503,0503,0507,0500,0504,0502,0502,0502,0504,0502,0507,0500,0503,0503,0503,0505,0505,0505,0505,0507,",
  "01164:0507,0507,0500,0500,0500,0500,0500,0500,0505,0502,0507,0503,0505,0505,0505,0505,0501,0503,0507,0500,0505,0507,",
  "01165:0507,0500,0500,0500,0500,0507,0505,0505,0505,0501,0503,0507,0500,0503,0500,0500,0500,0505,0505,0505,0501,0507,",
  "01166:0507,0504,0504,0504,0500,0501,0505,0503,0501,0505,0503,0507,0500,0500,0507,0500,0500,0505,0505,0505,0505,0507,",
  "01167:0507,0500,0500,0500,0500,0505,0505,0505,0505,0503,0507,0500,0500,0505,0505,0503,0507,0500,0500,0500,0500,0505,0505,0505,0505,0507,",
  "01170:0503,0507,0500,0503,0500,0500,0504,0502,0502,0507,0507,0505,0503,0507,0500,0505,0505,0505,0505,0502,0503,0507,",
  "01171:0503,0503,0504,0503,0500,0503,0506,0506,0500,0506,0500,0505,0505,0507,0507,0507,0507,0500,0500,0505,0505,0505,0505,0507,",
  "01172:0503,0503,0503,0503,0503,0504,0506,0506,0502,0507,0500,0507,0500,0507,0500,0502,0502,0502,0502,0507,0507,0507,0507,0507,0505,0505,0505,0505,",
  "01173:0507,0507,0503,0504,0502,0500,0504,0502,0507,0500,0500,0504,0503,0505,0505,0505,0505,0505,0505,0507,0507,0507,",
  "01174:0507,0507,0503,0500,0500,0500,0500,0500,0500,0507,0507,0507,0505,0505,0505,0505,0505,0505,",
  "01175:0507,0507,0503,0507,0500,0500,0507,0500,0504,0502,0500,0504,0502,0505,0505,0505,0505,0505,0505,0507,0507,0507,",
  "01176:0507,0507,0504,0504,0504,0504,0500,0507,0500,0505,0503,0507,0500,0505,0505,0505,0505,0505,0507,0505,",
  "01200:0333,0200,0336,0336,0330,0332,0337,0200,0336,0331,0333,0337,0337,",
  "01201:0304,0313,0333,0200,0336,0336,0330,0330,0332,0332,0332,0335,0336,0337,0337,0342,0330,0335,0350,0335,0336,0336,0342,0335,0335,0342,0335,0304,0337,0331,0331,0333,0337,0337,",
  "01202:0202,0200,",
  "01203:0304,0313,0202,0332,0333,0200,0336,0336,0330,0330,0332,0332,0332,0335,0336,0337,0337,0342,0330,0335,0350,0335,0336,0336,0342,0335,0335,0342,0335,0304,0337,0331,0331,0333,0337,0337,",
  "01204:0202,0200,0336,0336,0330,0332,0337,0200,0336,0331,0333,0337,0337,",
  "01205:0202,0200,0336,0336,0330,0332,0332,0332,0330,0205,0331,0331,0332,0337,0337,0333,",
  "01206:0202,0200,0336,0332,0206,0333,0337,",
  "01207:0333,0336,0330,0332,0336,0336,0341,0337,0333,0333,0331,0331,0337,0337,",
  "01210:0333,0200,0336,0336,0330,0332,0337,0200,0311,0337,0310,0336,0200,0337,0311,0336,0313,0336,0330,0332,0336,0335,0331,0337,0342,0334,0333,0333,0336,0333,0337,0331,0331,0337,0337,",
  "01211:0333,0200,0336,0336,0330,0332,0337,0200,0311,0337,0310,0336,0200,0337,0311,0336,0313,0336,0330,0332,0336,0335,0331,0337,0342,0334,0336,0333,0342,0335,0335,0342,0335,0335,0333,0337,0333,0336,0333,0337,0331,0331,0337,0337,",
  "01212:0336,0330,0333,0337,0212,0336,0336,0333,0331,0337,0200,0336,0333,0331,0337,0337,0200,",
  "01213:0333,0200,0336,0330,0332,0336,0331,0332,0336,0330,0332,0332,0337,055,062,045,0211,0211,0211,0365,0210,0210,0210,0336,0337,0331,0336,0331,0337,0337,0337,0333,",
  "01214:0333,0200,0336,0330,0332,0336,0331,0332,0336,0330,0332,0332,0337,053,062,045,0211,0211,0211,0365,0210,0210,0210,0336,0337,0331,0336,0331,0337,0337,0337,0333,",
  "01220:0333,0200,",
  "01221:0333,0200,",
  "01222:0333,0200,",
  "01223:0333,0200,",
  "01224:0333,0200,",
  "01225:0333,0200,",
  "01226:0333,0200,",
  "01227:0333,0200,",
  "01230:0333,0200,",
  "01231:0333,0200,",
  "01232:0333,0200,",
  "01233:0333,0200,",
  "01234:0333,0200,",
  "01235:0333,0200,",
  "01236:0333,0200,",
  "01237:0333,0200,",
  "01240:0333,0200,",
  "01241:0333,0200,",
  "01242:0333,0200,",
  "01243:0333,0200,",
  "01244:0333,0200,",
  "01245:0333,0200,",
  "01246:0333,0200,",
  "01247:0333,0200,",
  "01300:0333,0200,0336,0330,0332,0340,0350,0335,0336,0330,0342,0331,0331,0331,0342,0330,0330,0335,0335,0331,0331,0342,0330,0330,0330,0342,0331,0334,0334,0334,0351,0331,0331,0333,0333,0337,0337,",
  "01301:0333,0200,",
  "01302:0333,0200,",
  "01303:0333,0200,",
  "01304:0333,0200,0336,0330,0332,0341,0342,0335,0342,0335,0342,0335,0342,0350,0335,0351,0336,0336,0330,0330,0341,0331,0331,0335,0330,0330,0341,0331,0331,0335,0330,0330,0341,0331,0331,0335,0330,0330,0341,0331,0331,0350,0334,0351,0337,0337,0330,0335,0335,0333,0337,",
  "01305:0333,0200,0336,0330,0332,0305,0342,0335,0342,0335,0342,0335,0342,0335,0342,0335,0341,0350,0335,0351,0336,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0350,0335,0304,0337,0331,0333,0337,",
  "01306:0333,0200,0336,0330,0332,0306,0342,0335,0342,0335,0342,0335,0342,0335,0342,0335,0341,0350,0335,0351,0336,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0350,0335,0335,0335,0337,0342,0334,0336,0330,0336,0336,0341,0337,0337,0331,0304,0335,0337,0331,0333,0337,",
  "01307:0333,0200,",
  "01310:0333,0200,0336,0332,0350,0335,0310,0337,0342,0330,0334,0334,0342,0330,0334,0334,0342,0330,0334,0334,0342,0330,0334,0334,0334,0351,0336,0313,0333,0337,",
  "01311:0333,0200,0334,0305,0335,0311,0337,0362,0203,0334,0334,0203,0334,0350,0336,0334,0203,0354,0334,0334,0334,0334,0201,0335,0335,0335,0336,0201,0334,0334,0334,0336,0201,0331,0335,0335,0335,0337,0331,0334,0334,0334,0337,0331,0334,0304,0335,0313,",
  "01312:0304,0313,0333,0200,0334,0306,0335,0362,0203,0334,0334,0203,0364,0335,0335,0335,0350,0335,0312,0336,0330,0334,0334,0342,0335,0335,0335,0335,0342,0335,0335,0335,0335,0342,0335,0335,0331,0335,0335,0337,0304,0313,",
  "01313:0333,0200,0336,0336,0330,0332,0362,0203,0334,0203,0203,0334,0203,0334,0203,0203,0354,0334,0332,0342,0333,0333,0331,0337,0337,",
  "01314:0333,0200,0314,0336,0332,0332,0330,0200,0333,0200,0333,0200,0331,0337,0313,",
  "01315:0333,0200,0336,0330,0332,0336,0331,0334,0331,0337,0305,0362,0203,0335,0203,0335,0203,0335,0203,0335,0203,0354,0335,0350,0335,0350,0335,0335,0335,0304,0336,0331,0333,0337,0337,",
  "01316:0333,0200,0336,0336,0330,0332,0332,0332,0336,0341,0330,0330,0330,0330,0341,0333,0333,0331,0331,0341,0333,0333,0330,0330,0341,0331,0331,0331,0331,0341,0333,0333,0331,0331,0337,0337,0337,",
  "01317:0333,0200,",
  "01320:0320,0333,0200,0320,0336,0330,0332,0336,0333,0331,0337,0204,0336,0331,0336,0330,0334,0337,0337,0342,0335,0320,0330,0336,0332,0332,0330,0336,0330,0332,0335,0335,0335,0335,0332,0337,0337,0337,0331,0333,",
  "01321:0320,0333,0200,0321,0336,0330,0332,0336,0333,0331,0337,0204,0336,0331,0336,0330,0334,0337,0337,0342,0335,0320,0330,0336,0332,0332,0330,0336,0330,0332,0335,0335,0342,0335,0335,0332,0337,0337,0337,0331,0333,",
  "01322:0320,0333,0200,0322,0336,0330,0332,0336,0333,0331,0337,0204,0336,0331,0336,0330,0334,0337,0337,0342,0335,0320,0330,0336,0332,0332,0330,0336,0330,0332,0335,0335,0342,0332,0342,0333,0335,0335,0332,0337,0337,0337,0331,0333,",
  "01323:0320,0333,0200,0323,0336,0330,0332,0336,0333,0331,0337,0204,0336,0331,0336,0330,0334,0337,0337,0342,0335,0320,0330,0336,0332,0332,0330,0336,0330,0332,0335,0335,0342,0332,0342,0332,0342,0333,0333,0335,0335,0332,0337,0337,0337,0331,0333,",
  "01324:0320,0333,0200,0324,0336,0330,0332,0336,0333,0331,0337,0204,0336,0331,0336,0330,0334,0337,0337,0342,0335,0320,0330,0336,0332,0332,0330,0336,0330,0332,0335,0335,0342,0332,0342,0332,0342,0332,0342,0333,0333,0333,0335,0335,0332,0337,0337,0337,0331,0333,",
  "01325:0320,0333,0200,0325,0336,0330,0332,0336,0333,0331,0337,0204,0336,0331,0336,0330,0334,0337,0337,0342,0335,0320,0330,0336,0332,0332,0330,0336,0330,0332,0335,0335,0342,0332,0342,0332,0342,0332,0342,0332,0342,0333,0333,0333,0333,0335,0335,0332,0337,0337,0337,0331,0333,",
  "01326:0320,0333,0200,0326,0336,0330,0332,0336,0333,0331,0337,0204,0336,0331,0336,0330,0334,0337,0337,0342,0335,0320,0330,0336,0332,0332,0330,0336,0330,0332,0335,0335,0342,0332,0342,0332,0342,0332,0342,0332,0342,0332,0342,0333,0333,0333,0333,0333,0335,0335,0332,0337,0337,0337,0331,0333,",
  "01327:0320,0333,0200,0327,0336,0330,0332,0336,0333,0331,0337,0204,0336,0331,0336,0330,0334,0337,0337,0342,0335,0320,0330,0336,0332,0332,0330,0336,0330,0332,0335,0335,0342,0332,0342,0332,0342,0332,0342,0332,0342,0332,0342,0332,0342,0333,0333,0333,0333,0333,0333,0335,0335,0332,0337,0337,0337,0331,0333,",
  "01330:0333,0200,0336,0332,0330,0337,0212,0336,0331,0333,0337,",
  "01331:0333,0200,0336,0332,0330,0337,0335,0335,0212,0335,0335,0336,0331,0333,0337,",
  "01332:0333,0200,0336,0332,0330,0337,0335,0335,0335,0212,0335,0336,0331,0333,0337,",
  "01333:0333,0200,0336,0332,0330,0337,0335,0212,0335,0335,0335,0336,0331,0333,0337,",
  "01334:0333,0200,0336,0330,0332,0336,0350,0343,0334,0334,0343,0334,0334,0343,0334,0330,0350,0335,0351,0335,0330,0335,0335,0335,0335,0362,0203,0334,0334,0203,0364,0331,0350,0335,0330,0335,0335,0304,0337,0333,0331,0337,",
  "01335:0333,0200,0336,0330,0332,0336,0335,0350,0335,0335,0343,0335,0335,0343,0335,0335,0343,0335,0330,0350,0335,0304,0350,0331,0362,0203,0334,0334,0203,0364,0331,0335,0335,0331,0334,0335,0330,0350,0334,0331,0334,0334,0304,0337,0333,0331,0337,",
  "01336:0333,0200,0336,0330,0334,0336,0330,0337,0342,0336,0331,0335,0337,0331,0337,",
  "01337:0333,0200,0336,0330,0332,0336,0342,0334,0342,0334,0342,0334,0342,0330,0330,0334,0337,0331,0337,",
  "01340:0333,0200,0336,0330,0332,0340,0333,0331,0337,",
  "01341:0333,0200,0336,0330,0332,0341,0340,0333,0331,0337,",
  "01342:0333,0200,0336,0330,0332,0334,0336,0342,0330,0340,0331,0335,0335,0342,0330,0340,0333,0333,0330,0334,0337,0337,",
  "01343:0333,0200,0336,0330,0332,0350,0343,0335,0342,0334,0334,0342,0335,0340,0351,0331,0333,0337,",
  "01344:0333,0200,0336,0330,0332,0336,0332,0340,0335,0337,0342,0330,0340,0334,0332,0336,0331,0332,0331,0337,0337,0202,",
  "01345:0202,0200,0350,0334,0343,0335,0304,",
  "01346:0202,0200,0350,0334,0332,0335,0335,0343,0333,0335,0304,0334,",
  "01347:0304,0313,0333,0200,0336,0332,0336,0330,0330,0347,0331,0331,0337,0333,0337,",
  "01350:0333,0200,0336,0330,0332,0350,0335,0330,0335,0335,0335,0335,0362,0203,0334,0334,0203,0364,0331,0334,0336,0336,0201,0330,0201,0331,0331,0331,0334,0334,0304,0337,0337,0333,0331,0337,",
  "01351:0333,0200,0336,0330,0332,0335,0350,0335,0330,0335,0335,0335,0335,0362,0203,0335,0335,0336,0336,0203,0364,0330,0201,0330,0201,0331,0331,0331,0331,0331,0335,0337,0337,0342,0336,0336,0334,0334,0304,0337,0337,0333,0331,0337,",
  "01352:0333,0200,0336,0330,0332,0335,0350,0352,0334,0334,0334,0342,0335,0335,0336,0336,0342,0330,0330,0342,0331,0331,0335,0335,0342,0330,0330,0342,0331,0331,0335,0335,0337,0337,0342,0335,0335,0335,0351,0353,0330,0334,0334,0333,0337,",
  "01353:0333,0200,0336,0330,0332,0335,0350,0352,0334,0342,0335,0335,0342,0335,0335,0336,0336,0342,0330,0330,0342,0331,0331,0334,0334,0334,0334,0334,0334,0342,0330,0330,0342,0331,0331,0335,0335,0335,0351,0353,0337,0337,0333,0330,0334,0337,",
  "01354:0333,0200,0330,0332,0336,0336,0333,0331,0335,0337,0362,0203,0335,0203,0364,0340,0335,0335,0350,0336,0336,0335,0342,0334,0334,0342,0337,0337,0310,0337,0342,0335,0304,0336,0313,0336,0333,0331,0337,0337,",
  "01355:0333,0200,",
  "01356:0333,0200,",
  "01357:0333,0200,",
  "01360:0333,0200,0336,0336,0332,0332,0332,0330,0335,0337,0342,0340,0366,0330,0332,0335,0335,0367,0335,0336,0333,0330,0337,0337,0331,0332,0202,",
  "01361:0333,0200,0336,0336,0332,0332,0332,0330,0335,0337,0366,0330,0332,0335,0335,0367,0335,0336,0340,0334,0337,0342,0336,0333,0330,0337,0337,0331,0335,0331,0336,0332,0337,0332,0202,",
  "01362:0333,0200,0336,0330,0332,0336,0331,0332,0340,0337,0362,0203,0335,0203,0364,0334,0334,0336,0350,0335,0330,0304,0335,0335,0362,0203,0335,0203,0364,0331,0350,0335,0304,0335,0333,0330,0337,0337,0331,",
  "01363:0202,0200,0330,0332,0336,0336,0333,0331,0337,0335,0362,0203,0335,0203,0364,0335,0335,0336,0350,0334,0330,0335,0335,0335,0335,0362,0203,0334,0334,0203,0364,0331,0340,0334,0304,0333,0331,0337,0337,",
  "01364:0333,0200,0330,0332,0336,0336,0333,0331,0337,0335,0362,0203,0335,0203,0364,0335,0335,0336,0350,0334,0330,0335,0335,0335,0335,0362,0203,0334,0334,0203,0364,0331,0340,0334,0304,0333,0331,0337,0337,",
  "01365:0333,0200,0336,0330,0332,0336,0330,0336,0331,0337,0335,0335,0306,0210,0210,0350,0335,0337,0330,0335,0335,0335,0335,0330,0335,0335,0335,0335,0335,0335,0362,0203,0334,0334,0334,0334,0203,0335,0335,0335,0335,0203,0334,0334,0334,0334,0203,0364,0331,0334,0334,0330,0335,0211,0211,0304,0333,0331,0331,0336,0336,0330,0337,0330,0337,0337,",
  "01366:0333,0200,0336,0336,0332,0332,0332,0330,0335,0337,0342,0340,0366,0330,0332,0335,0335,0367,0335,0336,0333,0330,0337,0337,0331,",
  "01367:0333,0200,0336,0336,0332,0332,0332,0330,0335,0337,0366,0330,0332,0335,0335,0367,0335,0336,0340,0334,0337,0342,0336,0333,0330,0337,0337,0331,0335,0331,0336,0332,0337,",
  "01370:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0347,0337,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0335,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0335,0313,0304,0330,0337,0337,0333,0331,0336,0333,0331,0337,0337,0337,",
  "01371:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0347,0337,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0335,0335,0332,0332,0332,0332,0332,0332,0335,0335,0331,0331,0331,0331,0331,0332,0333,0333,0333,0333,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0330,0313,0335,0335,0332,0337,0337,0330,0336,0330,0336,0330,0337,0337,0337,0337,0333,0331,",
  "01372:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0332,0337,0341,0333,0341,0332,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0335,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0330,0313,0335,0335,0332,0337,0337,0330,0336,0330,0336,0330,0337,0337,0337,0337,0333,0331,0334,0333,0330,0336,0336,0331,0336,0331,0336,0333,0337,0337,0337,0337,",
  "01373:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0332,0337,0341,0333,0341,0332,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0335,0335,0333,0332,0332,0332,0332,0332,0332,0335,0335,0331,0331,0331,0331,0331,0332,0333,0333,0333,0333,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0330,0313,0335,0335,0332,0337,0337,0330,0336,0330,0336,0330,0337,0337,0337,0337,0333,0331,",
  "01374:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0332,0337,0331,0332,0335,0336,0332,0336,0333,0330,0337,0337,0337,0362,0306,0203,0334,0334,0203,0334,0334,0203,0354,0335,0304,0335,0336,0332,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0331,0332,0332,0332,0332,0331,0335,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0330,0313,0335,0335,0332,0337,0337,0330,0336,0330,0336,0330,0337,0337,0337,0337,0333,0331,0334,0333,0330,0336,0336,0331,0336,0331,0336,0336,0333,0331,0337,0337,0337,0337,0337,",
  "01375:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0332,0337,0331,0332,0335,0336,0332,0336,0333,0330,0337,0337,0337,0362,0306,0203,0334,0334,0203,0334,0334,0203,0354,0335,0304,0335,0336,0332,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0331,0332,0332,0332,0332,0331,0335,0335,0335,0335,0331,0331,0331,0331,0332,0333,0333,0333,0333,0333,0333,0333,0333,0333,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0330,0313,0335,0335,0332,0337,0337,0330,0336,0330,0336,0330,0337,0337,0337,0337,0333,0331,0334,0333,0330,0336,0336,0331,0336,0331,0336,0336,0333,0331,0337,0337,0337,0337,0337,0335,0336,0333,0331,0331,0336,0336,0336,0333,0337,0337,0337,0337,",
  "01376:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0332,0337,0331,0332,0335,0336,0332,0336,0333,0330,0337,0337,0337,0362,0203,0334,0203,0334,0203,0334,0203,0354,0335,0304,0335,0336,0332,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0331,0332,0332,0332,0332,0331,0335,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0330,0313,0335,0335,0332,0337,0337,0330,0336,0330,0336,0330,0337,0337,0337,0337,0333,0331,0334,0333,0330,0336,0336,0331,0336,0331,0336,0336,0333,0331,0337,0337,0337,0337,0337,",
  "01377:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0332,0337,0331,0332,0335,0336,0332,0336,0333,0330,0337,0337,0337,0362,0203,0334,0203,0334,0203,0334,0203,0354,0335,0304,0335,0336,0332,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0331,0331,0331,0331,0333,0333,0333,0333,0331,0331,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0330,0313,0335,0335,0332,0337,0337,0330,0336,0330,0336,0330,0337,0337,0337,0337,0333,0331,0334,0333,0330,0336,0336,0331,0336,0331,0336,0336,0333,0331,0337,0337,0337,0337,0337,0335,0336,0333,0336,0336,0336,0333,0337,0337,0337,0337,0331,",
  "01400:0333,0200,0336,0330,0332,0322,0335,0340,0620,0334,0320,0333,0331,0337,",
  "01401:0333,0200,0336,0330,0332,0334,0322,0620,0335,0340,0331,0333,0337,0320,",
  "01402:0333,0200,0336,0330,0332,0325,0340,0335,0306,0350,0334,0620,0306,0350,0334,0334,0304,0320,0331,0333,0337,",
  "01403:0333,0200,0336,0330,0332,0325,0335,0335,0340,0335,0306,0350,0334,0304,0306,0620,0306,0350,0335,0304,0335,0331,0333,0337,0320,",
  "01404:0333,0200,0336,0330,0332,0326,0620,0340,0333,0331,0337,0320,",
  "01405:0333,0200,0336,0330,0332,0335,0335,0326,0620,0340,0335,0335,0320,0333,0331,0337,",
  "01406:0333,0200,0336,0330,0332,0336,0336,0336,0330,0334,0337,0337,0362,0203,0336,0334,0203,0334,0337,0203,0203,0334,0336,0203,0334,0337,0203,0354,0335,0336,0336,0331,0337,0337,0337,0331,0333,0337,",
  "01407:0333,0200,0336,0330,0332,0336,0336,0336,0330,0334,0330,0335,0337,0337,0362,0203,0335,0336,0203,0335,0337,0203,0334,0203,0335,0336,0203,0335,0337,0203,0334,0203,0335,0336,0203,0335,0337,0203,0334,0203,0335,0336,0203,0335,0337,0203,0354,0334,0336,0336,0331,0333,0337,0337,0337,0331,0333,0337,",
  "01410:0333,0200,0336,0330,0332,0336,0332,0335,0337,0342,0334,0336,0336,0331,0337,0342,0333,0333,0342,0331,0336,0331,0337,0333,0337,0337,",
  "01411:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,061,0365,0331,0333,0337,0337,",
  "01412:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,061,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01413:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,062,0365,0331,0333,0337,0337,",
  "01414:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,062,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01415:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,063,0365,0331,0333,0337,0337,",
  "01416:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,063,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01417:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,064,0365,0331,0333,0337,0337,",
  "01420:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,064,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01421:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,065,0365,0331,0333,0337,0337,",
  "01422:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,065,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01423:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,066,0365,0331,0333,0337,0337,",
  "01424:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,066,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01425:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,067,0365,0331,0333,0337,0337,",
  "01426:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,067,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01427:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,070,0365,0331,0333,0337,0337,",
  "01430:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,070,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01431:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,071,0365,0331,0333,0337,0337,",
  "01432:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,071,0365,0336,0331,0337,0333,0331,0337,0337,",
  "01433:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,061,060,0332,0365,0333,0331,0333,0337,0337,",
  "01434:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,061,060,0332,0365,0333,0336,0331,0337,0333,0331,0337,0337,",
  "01435:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,061,061,0332,0365,0333,0331,0333,0337,0337,",
  "01436:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,061,061,0332,0365,0333,0336,0331,0337,0333,0331,0337,0337,",
  "01437:0333,0200,0336,0330,0332,0336,0331,0332,0335,0201,0334,0201,0201,0335,0201,0325,0336,0336,0347,0337,0337,0320,0334,0331,0331,061,062,0332,0365,0333,0331,0333,0337,0337,",
  "01440:0333,0200,0336,0330,0332,0336,0330,0332,0335,0201,0335,0201,0201,0334,0201,0322,0336,0336,0347,0337,0337,0320,0334,0336,0330,0337,061,062,0332,0365,0333,0336,0331,0337,0333,0331,0337,0337,",
  "01477:0520,0336,0330,0332,0336,0331,0332,0330,0336,0332,0337,0335,0362,0203,0334,0203,0335,0203,0335,0203,0334,0203,0364,0336,0334,0334,0350,0335,0310,0337,0342,0334,0334,0342,0336,0335,0335,0335,0304,0313,0333,0337,0337,0331,0337,",
  "01500:0333,0200,0336,0330,0332,0336,0336,0336,0347,0330,0330,0330,0347,0331,0331,0331,0337,0337,0337,0331,0333,0337,",
  "01501:0333,0200,0336,0330,0332,0336,0336,0336,0347,0331,0331,0331,0347,0330,0330,0330,0337,0337,0337,0331,0333,0337,",
  "01502:0333,0200,0336,0330,0332,0336,0336,0336,0347,0332,0332,0332,0347,0333,0333,0333,0337,0337,0337,0331,0333,0337,",
  "01503:0333,0200,0336,0330,0332,0336,0336,0336,0347,0333,0333,0333,0347,0332,0332,0332,0337,0337,0337,0331,0333,0337,",
  "01504:0333,0200,0336,0330,0332,0336,0336,0336,0341,0337,0337,0330,0336,0336,0341,0337,0337,0330,0337,0331,0333,0331,0337,",
  "01505:0333,0200,0336,0330,0332,0336,0336,0336,0341,0331,0331,0331,0331,0341,0331,0331,0331,0331,0337,0337,0337,0333,0337,",
  "01506:0333,0200,0336,0330,0332,0336,0336,0336,0341,0332,0332,0332,0332,0341,0332,0332,0332,0332,0337,0337,0337,0331,0337,0333,",
  "01507:0333,0200,0336,0330,0332,0336,0336,0336,0341,0333,0333,0333,0341,0333,0333,0333,0333,0333,0337,0337,0337,0331,0337,",
  "01510:0333,0200,0336,0330,0332,0336,0342,0330,0335,0335,0350,0335,0336,0342,0334,0334,0342,0335,0304,0335,0335,0337,0330,0337,0333,0337,0331,",
  "01511:0333,0200,0336,0330,0332,0335,0335,0336,0342,0330,0335,0335,0350,0334,0336,0342,0335,0335,0342,0334,0337,0304,0331,0337,0333,0337,",
  "01512:0333,0200,0336,0330,0332,0336,0334,0342,0330,0335,0350,0335,0336,0342,0335,0335,0342,0334,0337,0304,0334,0332,0337,0331,0337,0333,",
  "01513:0333,0200,0336,0330,0332,0336,0335,0342,0330,0335,0335,0350,0335,0336,0342,0334,0334,0342,0335,0335,0335,0304,0337,0333,0337,0331,0337,",
  "01514:0333,0200,0336,0330,0332,0336,0350,0310,0335,0337,0201,0335,0335,0335,0336,0336,0342,0335,0335,0342,0335,0335,0304,0337,0333,0330,0313,0337,0337,0331,",
  "01515:0333,0200,0336,0330,0332,0336,0350,0335,0335,0335,0310,0337,0201,0335,0335,0335,0336,0336,0342,0335,0335,0342,0337,0313,0304,0331,0333,0337,0337,",
  "01516:0333,0200,0336,0330,0332,0334,0350,0334,0310,0336,0201,0335,0335,0335,0336,0336,0342,0335,0335,0342,0334,0334,0337,0313,0304,0331,0332,0337,0337,0333,",
  "01517:0333,0200,0336,0330,0332,0336,0310,0350,0334,0337,0201,0335,0335,0335,0336,0336,0342,0335,0335,0342,0335,0335,0335,0335,0337,0313,0304,0330,0332,0337,0337,0331,0333,",
  "01520:0333,0200,0336,0330,0332,0336,0331,0333,0336,0331,0337,0337,0200,0336,0336,0330,0332,0337,01015,0332,0101,0365,0330,0336,0333,0337,0330,0334,0336,0310,0350,0362,0203,0335,0335,0335,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0363,0335,0335,0304,0313,0337,0333,0333,0330,0337,0337,0331,",
  "01521:0333,0200,0336,0330,0332,0336,0331,0333,0336,0331,0337,0337,0200,0336,0336,0330,0332,0337,01015,0332,0101,0365,0330,0336,0333,0337,0330,0334,0335,0335,0336,0332,0337,0336,0310,0350,0362,0203,0335,0335,0335,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0363,0335,0335,0304,0335,0335,0313,0337,0333,0336,0333,0333,0330,0337,0337,0337,0331,",
  "01522:0333,0200,0336,0330,0332,0336,0331,0333,0336,0331,0337,0337,0200,0336,0336,0330,0332,0337,01015,0332,0102,0365,0330,0336,0333,0337,0330,0334,0336,0310,0350,0362,0203,0335,0335,0335,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0363,0335,0335,0304,0313,0337,0333,0333,0330,0337,0337,0331,",
  "01523:0333,0200,0336,0330,0332,0336,0331,0333,0336,0331,0337,0337,0200,0336,0336,0330,0332,0337,0332,0102,0365,0330,0336,0333,0337,0330,0334,0335,0335,0336,0332,0337,0336,0310,0350,0362,0203,0335,0335,0335,0337,0203,0335,0335,0203,0335,0335,0335,0336,0203,0363,0335,0335,0304,0335,0335,0313,0337,0333,0336,0333,0333,0330,0337,0337,0337,0331,",
  "01524:0333,0200,0336,0330,0332,0524,0331,0333,0337,",
  "01525:0333,0200,0336,0330,0332,0321,0334,0342,0335,0331,0333,0337,0320,",
  "01526:0333,0200,0336,0330,0332,0321,0342,0331,0333,0337,0320,",
  "01527:0333,0200,0336,0330,0332,0335,0321,0342,0334,0331,0333,0337,0320,",
  "01530:0333,0200,0336,0330,0332,0336,0336,0336,0347,0330,0330,0330,0347,0331,0331,0331,0337,0337,0337,0331,0333,0337,",
  "01531:0333,0200,0336,0330,0332,0336,0336,0336,0347,0331,0331,0331,0347,0330,0330,0330,0337,0337,0337,0331,0333,0337,",
  "01532:0333,0200,0336,0330,0332,0336,0336,0336,0347,0332,0332,0332,0347,0333,0333,0333,0337,0337,0337,0331,0333,0337,",
  "01533:0333,0200,0336,0330,0332,0336,0336,0336,0347,0333,0333,0333,0347,0332,0332,0332,0337,0337,0337,0331,0333,0337,",
  "01534:0333,0200,0336,0330,0332,0336,0336,0336,0336,0347,0330,0330,0330,0347,0330,0330,0330,0347,0330,0330,0330,0347,0330,0330,0330,0330,0330,0330,0330,0337,0337,0337,0337,0333,0337,0331,",
  "01535:0333,0200,0336,0330,0332,0336,0336,0336,0336,0347,0331,0331,0331,0347,0331,0331,0331,0347,0331,0331,0331,0347,0331,0331,0331,0331,0331,0331,0331,0337,0337,0337,0337,0333,0337,",
  "01536:0333,0200,0336,0330,0332,0336,0336,0336,0336,0347,0332,0332,0332,0347,0332,0332,0332,0347,0332,0332,0332,0347,0332,0332,0332,0332,0332,0332,0332,0337,0337,0337,0337,0331,0337,0333,",
  "01537:0333,0200,0336,0330,0332,0336,0336,0336,0336,0347,0333,0333,0333,0347,0333,0333,0333,0347,0333,0333,0333,0347,0333,0333,0333,0333,0333,0333,0333,0337,0337,0337,0337,0331,0337,",
  "01540:0333,0200,0336,0330,0332,0336,0336,0336,0341,0337,0337,0330,0336,0336,0341,0337,0337,0330,0337,0331,0333,0331,0337,",
  "01541:0333,0200,0336,0330,0332,0336,0336,0336,0341,0331,0331,0331,0331,0341,0331,0331,0331,0331,0337,0337,0337,0333,0337,",
  "01542:0333,0200,0336,0330,0332,0336,0336,0336,0341,0332,0332,0332,0332,0341,0332,0332,0332,0332,0337,0337,0337,0331,0337,0333,",
  "01543:0333,0200,0336,0330,0332,0336,0336,0336,0341,0333,0333,0333,0341,0333,0333,0333,0333,0333,0337,0337,0337,0331,0337,",
  "01544:0333,0200,0336,0330,0332,0335,0335,0321,0342,0335,0335,0331,0333,0337,0320,",
  "01545:0333,0200,0336,0330,0332,0336,0336,0336,0545,0337,0337,0337,0331,0333,0337,",
  "01546:0333,0200,0336,0330,0332,0336,0336,0336,0546,0337,0337,0337,0331,0333,0337,",
  "01547:0333,0200,0336,0330,0332,0336,0336,0336,0547,0337,0337,0337,0331,0333,0337,",
  "01550:0333,0200,0336,0330,0332,0321,0341,0331,0333,0337,0320,",
  "01551:0333,0200,0336,0330,0332,0321,0347,0331,0333,0337,0320,",
  "01552:0333,0200,0336,0336,0330,0332,0337,0321,0200,0320,0336,0331,0333,0337,0337,",
  "01553:0333,0200,0336,0336,0330,0332,0337,0321,0204,0320,0336,0331,0333,0337,0337,",
  "01600:0333,0200,0336,0330,0332,0336,0336,0341,0333,0333,0322,0341,0332,0332,0332,0332,0341,0333,0333,0330,0330,0326,0341,0331,0331,0331,0331,0341,0332,0332,0325,0341,0333,0333,0330,0333,0330,0333,0330,0330,0341,0333,0333,0330,0330,0331,0331,0331,0332,0332,0332,0331,0332,0337,0326,0342,0335,0335,0342,0322,0335,0342,0335,0335,0342,0325,0350,0334,0342,0335,0335,0335,0335,0342,0335,0335,0335,0304,0337,0331,0333,0337,0320,",
  "01601:0333,0200,0336,0332,0336,0330,0332,0337,01015,061,0365,0333,0336,0333,0331,0337,0337,",
  "01602:0333,0200,0336,0332,0336,0330,0332,0337,01015,062,0365,0333,0336,0333,0331,0337,0337,",
  "01603:0333,0200,0336,0332,0336,0330,0332,0337,01015,063,0365,0333,0336,0333,0331,0337,0337,",
  "01604:0333,0200,0336,0332,0336,0330,0332,0337,01015,064,0365,0333,0336,0333,0331,0337,0337,",
  "01605:0333,0200,0336,0332,0336,0330,0332,0337,01015,065,0365,0333,0336,0333,0331,0337,0337,",
  "01606:0333,0200,0336,0332,0336,0330,0332,0337,01015,066,0365,0333,0336,0333,0331,0337,0337,",
  "01607:0333,0200,0336,0332,0336,0330,0332,0337,01015,067,0365,0333,0336,0333,0331,0337,0337,",
  "01620:0333,0200,0336,0330,0332,0336,0331,0337,0620,0333,0336,0331,0337,0337,",
  "01640:0304,0313,0333,0200,0336,0330,0332,0322,0336,0336,0341,0333,0333,0341,0333,0333,0335,0335,0337,0350,0335,0342,0335,0335,0342,0334,0330,0330,0304,0334,0337,0330,0335,0335,0333,0337,0320,",
  "01641:0304,0313,0333,0200,0336,0330,0332,0322,0336,0336,0341,0332,0332,0341,0332,0332,0337,0350,0335,0342,0335,0335,0342,0334,0330,0330,0304,0334,0337,0331,0333,0337,0320,",
  "01642:0333,0200,0336,0330,0332,0336,0336,0325,0341,0350,0334,0304,0333,0333,0341,0333,0333,0334,0350,0335,0337,0342,0334,0334,0342,0335,0335,0335,0304,0337,0332,0350,0335,0304,0331,0333,0320,0337,",
  "01643:0333,0200,0336,0330,0332,0336,0336,0325,0341,0350,0334,0304,0332,0332,0341,0332,0332,0334,0350,0334,0334,0334,0337,0342,0334,0334,0342,0335,0335,0335,0304,0337,0332,0350,0335,0304,0330,0335,0335,0333,0337,0320,",
  "01644:0333,0200,0336,0330,0332,0336,0336,0326,0341,0330,0330,0341,0330,0330,0335,0335,0337,0350,0335,0342,0334,0334,0342,0335,0304,0335,0335,0337,0333,0337,0331,0320,",
  "01645:0333,0200,0336,0330,0332,0336,0336,0326,0341,0331,0331,0341,0331,0331,0337,0350,0335,0342,0334,0334,0342,0335,0304,0337,0333,0337,0320,",
  "01700:0333,0200,0336,0330,0332,0322,0335,0340,0620,0334,0320,0333,0331,0337,",
  "01701:0333,0200,0336,0330,0332,0334,0322,0620,0335,0340,0331,0333,0337,0320,",
  "01702:0333,0200,0336,0330,0332,0326,0620,0340,0333,0331,0337,0320,",
  "01703:0333,0200,0336,0330,0332,0335,0335,0326,0620,0340,0335,0335,0320,0333,0331,0337,",
  "01704:0333,0200,0336,0330,0332,0325,0335,0335,0340,0335,0306,0350,0334,0304,0306,0620,0306,0350,0335,0304,0335,0331,0333,0337,0320,",
  "01705:0333,0200,0336,0330,0332,0325,0340,0335,0306,0350,0334,0620,0306,0350,0334,0334,0304,0320,0331,0333,0337,"
];
