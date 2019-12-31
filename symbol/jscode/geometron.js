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

    
function GVM(x0,y0,unit,theta0,canvas2d,width,height,bytecode) {
    this.pendown = false;
    this.address = 0277;
    this.glyph = "";
    this.cleanGlyph = "";
    this.width = width;
    this.height = height;
    canvas2d.width = width;
    canvas2d.height = height;
    this.canvas2d = canvas2d;
    this.ctx = canvas2d.getContext("2d"); 
    this.x0 = x0;
    this.x = x0;
    this.y0 = y0;
    this.y = y0;
    this.unit = unit;
    this.side = unit;
    this.theta0 = theta0;
    this.theta = theta0;
    this.scaleFactor = 2;
    this.thetaStep = Math.PI/2;
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
    this.cpy1 = y0;
    this.cpx2 = x0;
    this.cpy2 = y0;
    this.x1 = x0;
    this.y1 = y0;
    this.x2 = x0;
    this.y2 = y0;
    this.xOne = x0;
    this.yOne = y0;
    this.thetaOne = this.theta;
    this.sideOne = this.side;
    this.thetaStepOne = this.thetaStep;
    this.scaleFactorOne = this.scaleFactor;
 
    this.style = {
        color0: "black",
        fill0: "black",
        line0: 2,
        color1: "black",
        fill1: "black",
        line1: 3,
        color2: "red",
        fill2: "red",
        line2: 1,
        color3: "#FF7900",
        fill3: "#FF7900",
        line3: 1,
        color4: "yellow",
        fill4: "yellow",
        line4: 1,
        color5: "green",
        fill5: "green",
        line5: 1,
        color6: "blue",
        fill6: "blue",
        line6: 1,
        color7: "purple",
        fill7: "purple",
        line7: 1
    };
    this.strokeStyle = this.style.color0;
    this.fillStyle = this.style.fill0;
    this.lineWidth = this.style.line0;

    this.viewStep = 50;
    this.svgString = "<svg width=\"" + this.width.toString() + "\" height=\"" + this.height.toString() + "\" viewbox = \"0 0 " + this.width.toString() + " " + this.height.toString() + "\"  xmlns=\"http://www.w3.org/2000/svg\">\n";

    //    this.svgString += "\n<!--\n<json>\n" + JSON.stringify(currentJSON,null,"    ") + "\n</json>\n-->\n";

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
        this.canvas2d.height = this.unit + 2;
        this.canvas2d.width = this.unit*(glyphArray.length - 1 ) + 4;
        this.height = this.unit + 2;
        this.x0 = 1;
        this.y0 = this.unit +1;
        this.side = this.unit;
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



