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

         0400-0477: unused
         0500-0577: unused
         unused space can be JSON structures, urls of links and images, links to other addresses in the hypercube, physicsl robotic actions

         0600-0677: 3d shapes, bytecode which references 3d actions
         0700-0777: 3d geometric actions, combined with actions on geometric variables of quantum states in higher dimensions

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

        //02xx
        if( (address >= 0200 && address <= 0277) || (address >= 01000 && address <= 01777) ){
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


hypercube = [
    "041:0321,",
    "042:023,",
    "043:0323,",
    "044:0324,",
    "045:0325,",
    "046:0327,",
    "047:021,",
    "050:034,",
    "051:035,",
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
    "072:0371",
    "073:037,",
    "074:0247,",
    "075:0316,",
    "076:0177,",
    "077:022,",
    "0100:0322,",
    "0101:0230",
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
    "0114:0370",
    "0115:0246,",
    "0116:0245,",
    "0117:0213,",
    "0120:0214,",
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
    "0151:0345,",
    "0152:0336,",
    "0153:0337,",
    "0154:036,",
    "0155:031,",
    "0156:030,",
    "0157:0346,",
    "0160:0347,",
    "0161:0362,",
    "0162:0360,",
    "0163:0331,",
    "0164:0366,",
    "0165:0361,",
    "0166:0343,",
    "0167:0203,",
    "0170:0341,",
    "0171:0367,",
    "0172:0340,",
    "0173:024,",
    "0174:0364,",
    "0175:0354,",
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
    "0220:0336,0336,0336,0330,0337,0337,0337,0306,0334,0362,0203,0335,0335,0203,0335,0203,0335,0335,0203,0363,0335,0335,0336,0336,0336,0331,0337,0337,0337,",
    "0221:0326,0220,0322,0335,0335,0220,0335,0335,0325,0220,0335,0335,",
    "0222:0226,0333,0226,0330,",
    "0223:0336,0336,0330,0330,0221,0333,0337,0337,0222,0331,0332,0336,0330,0332,0332,0336,0332,0337,0336,0333,0336,0332,0337,0337,0337,",
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
    "01040:0333,",
    "01041:0333,0336,0336,0332,0332,0332,0330,0336,0331,0336,0341,0330,0330,0330,0337,0337,0337,0342,0336,0336,0336,0331,0331,0331,0331,0331,0337,0337,0333,0337,0337,",
    "01042:0333,0330,0336,0332,0336,0332,0331,0342,0333,0342,0333,0330,0337,0337,0331,",
    "01043:0333,0336,0336,0332,0332,0332,0333,0336,0332,0337,0337,0337,0342,0336,0336,0333,0337,0337,0342,0336,0336,0332,0332,0336,0332,0330,0330,0330,0335,0337,0337,0337,0342,0336,0336,0336,0332,0332,0337,0337,0337,0342,0336,0336,0336,0332,0332,0332,0337,0337,0337,0330,0334,0331,",
    "01044:0333,0336,0330,0332,0336,0330,0350,0335,0335,0334,0350,0343,0334,0334,0343,0334,0334,0343,0334,0334,0343,0334,0334,0343,0334,0334,0330,0330,0343,0335,0335,0343,0335,0335,0334,0334,0334,0334,0334,0334,0343,0334,0334,0343,0334,0334,0343,0334,0334,0343,0335,0335,0335,0335,0335,0335,0335,0335,0351,0351,0330,0335,0335,0333,0333,0337,0337,0336,0332,0337,0342,0336,0333,0337,",
    "01045:0336,0333,0330,0336,0332,0330,0335,0335,0366,0335,0332,0332,0331,0367,0335,0335,0366,0335,0335,0334,0332,0331,0331,0334,0336,0331,0337,0367,0336,0335,0335,0366,0332,0332,0334,0333,0337,0336,0334,0334,0367,0337,0335,0335,0201,0336,0342,0335,0335,0331,0331,0333,0333,0333,0333,0337,0337,0337,",
    "01046:0333,0336,0332,0330,0336,0330,0341,0331,0334,0350,0334,0342,0334,0330,0343,0335,0335,0343,0334,0334,0334,0334,0334,0334,0351,0333,0350,0334,0342,0335,0335,0335,0335,0342,0334,0334,0336,0342,0334,0351,0331,0331,0333,0333,0337,0337,0337,",
    "01047:0333,0336,0330,0332,0336,0330,0342,0333,0333,0331,0331,0331,0337,0337,",
    "01050:0333,0336,0330,0334,0331,0331,0337,0337,0350,0350,0350,0343,0350,0334,0334,0343,0335,0335,0335,0335,0335,0343,0334,0334,0334,0351,0351,0351,0351,0336,0330,0335,0336,0332,0331,0337,",
    "01051:0333,0336,0330,0335,0337,0331,0331,0337,0350,0350,0350,0343,0350,0334,0334,0343,0335,0335,0335,0335,0343,0334,0334,0351,0351,0351,0351,0330,0335,0335,0335,0336,0336,0331,0336,0333,0337,0337,",
    "01052:0333,0336,0332,0330,0352,0342,0335,0335,0342,0335,0335,0342,0335,0335,0342,0335,0335,0342,0335,0335,0342,0335,0335,0353,0331,0333,0337,",
    "01053:0333,0336,0330,0332,0336,0342,0335,0342,0335,0342,0335,0342,0335,0331,0331,0333,0333,0337,0337,",
    "01054:0333,0336,0332,0336,0334,0350,0334,0342,0335,0351,0335,0333,0337,0337,",
    "01055:0333,0336,0330,0332,0335,0336,0342,0331,0342,0333,0333,0330,0330,0330,0334,0337,0337,",
    "01056:0333,0336,0332,0336,0336,0341,0333,0333,0333,0337,0337,0337,",
    "01057:0333,0332,0350,0335,0310,0337,0342,0336,0313,0334,0351,0333,",
    "01060:0313,0304,0336,0336,0330,0333,0330,0330,0343,0331,0331,0334,0334,0343,0332,0334,0334,0337,0342,0332,0342,0336,0331,0337,0337,0350,0350,0335,0350,0350,0335,0350,0334,0311,0337,0310,0336,0342,0337,0311,0336,0335,0351,0334,0351,0351,0334,0304,0333,0336,0336,0332,0337,0337,0313,",
    "01061:0304,0313,0335,0336,0342,0336,0330,0334,0337,0337,0342,0330,0334,0350,0334,0336,0336,0310,0337,0342,0336,0313,0335,0351,0335,0337,0331,0331,0333,0336,0336,0332,0337,0337,0337,",
    "01062:0304,0336,0335,0342,0350,0334,0366,0333,0334,0330,0304,0335,0335,0336,0336,0331,0337,0367,0335,0335,0310,0337,0366,0336,0332,0332,0337,0367,0336,0333,0333,0331,0331,0313,0337,0337,0336,0336,0336,0331,0337,0337,0337,0336,0336,0336,0333,0337,0337,0337,",
    "01063:0313,0304,0336,0336,0330,0333,0335,0343,0332,0332,0343,0334,0350,0343,0331,0331,0335,0335,0335,0335,0343,0330,0334,0334,0334,0334,0304,0333,0336,0333,0337,0337,0337,",
    "01064:0333,0336,0332,0337,0342,0336,0330,0334,0342,0330,0335,0350,0335,0342,0334,0351,0331,0337,0336,0333,0336,0333,0337,0337,",
    "01065:0313,0304,0336,0336,0330,0333,0335,0343,0335,0335,0350,0334,0350,0334,0343,0334,0351,0351,0331,0331,0331,0334,0342,0335,0335,0342,0330,0334,0342,0330,0342,0330,0334,0342,0330,0333,0333,0334,0333,0336,0333,0337,0337,0337,",
    "01066:0304,0313,0336,0336,0332,0337,0337,0333,0336,0336,0332,0332,0330,0341,0332,0350,0350,0335,0337,0337,0342,0336,0336,0334,0351,0351,0333,0333,0333,0331,0336,0332,0337,0337,0337,",
    "01067:0336,0332,0336,0336,0333,0337,0337,0337,0333,0336,0332,0350,0350,0335,0337,0342,0330,0334,0334,0334,0334,0334,0336,0342,0351,0351,0335,0350,0350,0335,0337,0331,0334,0351,0351,0336,0333,0337,",
    "01070:0304,0313,0336,0336,0336,0332,0332,0337,0337,0337,0333,0336,0332,0336,0330,0341,0330,0330,0341,0333,0333,0331,0331,0331,0336,0332,0337,0337,0337,",
    "01071:0304,0313,0336,0336,0332,0337,0337,0333,0336,0336,0332,0337,0337,0342,0336,0330,0336,0330,0332,0341,0333,0333,0330,0337,0337,0331,",
    "01072:0333,0336,0332,0330,0336,0336,0336,0341,0331,0331,0331,0331,0331,0331,0331,0341,0333,0333,0333,0333,0331,0337,0337,0337,0337,",
    "01073:0333,0336,0332,0330,0336,0336,0336,0341,0331,0331,0331,0331,0334,0334,0337,0337,0350,0335,0342,0335,0351,0335,0331,0333,0337,0337,",
    "01074:0333,0336,0330,0332,0350,0335,0342,0335,0335,0342,0335,0351,0330,0335,0335,0333,0337,",
    "01075:0333,0336,0336,0332,0330,0334,0337,0342,0336,0333,0337,0342,0336,0332,0332,0335,0333,0337,0337,",
    "01076:0333,0336,0330,0332,0350,0334,0342,0334,0334,0342,0335,0335,0335,0351,0331,0333,0337,",
    "01077:0333,0336,0336,0332,0332,0330,0336,0331,0341,0330,0330,0342,0330,0330,0330,0343,0335,0335,0350,0334,0343,0335,0351,0330,0342,0335,0335,0337,0331,0331,0331,0336,0330,0333,0333,0333,0337,0337,0337,",
    "01100:0333,0336,0332,0330,0336,0336,0341,0337,0343,0334,0343,0334,0334,0336,0330,0342,0331,0337,0350,0335,0335,0343,0351,0330,0330,0335,0335,0333,0333,0337,0337,",
    "01101:0304,0313,0311,0305,0350,0350,0335,0342,0351,0335,0336,0333,0334,0334,0337,0342,0336,0336,0330,0334,0334,0342,0335,0335,0331,0350,0335,0337,0337,0304,0313,0336,0336,0336,0333,0337,0337,0337,",
    "01102:0304,0313,0336,0336,0336,0333,0337,0337,0337,0342,0330,0335,0336,0336,0342,0333,0333,0342,0332,0330,0343,0333,0333,0343,0333,0331,0342,0334,0337,0333,0336,0336,0333,0337,0337,0337,0304,0313,",
    "01103:0333,0336,0330,0332,0334,0343,0335,0335,0350,0334,0334,0343,0335,0335,0335,0335,0343,0351,0330,0335,0335,0333,0337,0304,0313,",
    "01104:0333,0332,0342,0336,0330,0350,0335,0343,0335,0335,0343,0335,0351,0330,0335,0335,0336,0333,0337,0333,0337,0304,0313,",
    "01105:0304,0313,0333,0336,0332,0336,0332,0332,0337,0337,0342,0335,0336,0342,0332,0336,0342,0337,0332,0342,0336,0331,0334,0337,0337,0333,0331,0304,0313,",
    "01106:0304,0313,0333,0336,0332,0336,0332,0332,0337,0337,0342,0335,0336,0332,0336,0342,0337,0332,0342,0336,0331,0334,0337,0337,0333,0331,0304,0313,",
    "01107:0304,0313,0333,0336,0330,0332,0334,0343,0335,0335,0350,0334,0334,0343,0335,0335,0335,0335,0343,0351,0330,0335,0335,0333,0337,0336,0336,0332,0336,0333,0337,0342,0330,0334,0342,0335,0331,0333,0337,0337,0304,0313,",
    "01110:0304,0313,0333,0336,0336,0332,0332,0337,0337,0342,0336,0332,0337,0342,0336,0330,0335,0342,0330,0334,0331,0336,0333,0337,0337,0304,0313,",
    "01111:0304,0313,0333,0336,0336,0332,0332,0334,0337,0342,0336,0330,0335,0337,0337,0342,0330,0336,0336,0334,0342,0335,0335,0342,0330,0330,0334,0337,0337,0331,",
    "01112:0304,0313,0333,0336,0330,0332,0342,0330,0335,0336,0342,0334,0334,0342,0334,0330,0330,0342,0330,0333,0343,0335,0335,0333,0331,0333,0336,0333,0337,0337,0337,",
    "01113:0304,0313,0333,0336,0332,0332,0337,0342,0336,0330,0350,0335,0310,0337,0342,0336,0313,0335,0335,0310,0337,0342,0336,0313,0335,0351,0330,0335,0335,0333,0337,0304,0313,0336,0336,0336,0333,0337,0337,0337,",
    "01114:0333,0336,0332,0336,0332,0337,0337,0342,0336,0335,0342,0330,0336,0330,0334,0337,0337,",
    "01115:0304,0310,0342,0330,0335,0306,0335,0311,0336,0342,0330,0334,0334,0342,0330,0334,0334,0334,0334,0350,0335,0337,0342,0330,0304,0335,0335,0313,0336,0336,0336,0333,0337,0337,0337,",
    "01116:0342,0330,0335,0306,0335,0313,0337,0312,0336,0342,0330,0334,0334,0350,0334,0337,0313,0336,0304,0342,0336,0336,0336,0333,0337,0337,0337,",
    "01117:0333,0336,0330,0332,0341,0331,0333,0337,",
    "01120:0333,0332,0336,0336,0333,0337,0337,0342,0336,0330,0336,0330,0333,0341,0333,0333,0330,0337,0337,0331,",
    "01121:0333,0336,0330,0332,0341,0335,0335,0336,0330,0332,0350,0334,0337,0342,0334,0351,0334,0333,0331,0336,0330,0337,0337,",
    "01122:0304,0313,0336,0336,0336,0333,0337,0337,0337,0342,0330,0335,0336,0336,0342,0333,0333,0342,0332,0330,0343,0333,0335,0337,0306,0350,0334,0337,0312,0336,0342,0337,0313,0336,0335,0330,0304,0334,0334,0333,0336,0336,0336,0332,0337,0337,0337,0337,",
    "01123:0313,0304,0336,0336,0332,0337,0337,0336,0330,0333,0336,0330,0343,0334,0350,0334,0343,0332,0332,0334,0334,0334,0334,0343,0335,0335,0335,0351,0343,0335,0335,0333,0331,0333,0337,0337,",
    "01124:0333,0336,0332,0337,0342,0330,0336,0335,0342,0331,0342,0330,0330,0334,0337,0331,",
    "01125:0333,0336,0336,0330,0332,0337,0342,0330,0336,0342,0331,0331,0332,0332,0342,0330,0342,0330,0342,0331,0331,0333,0335,0335,0343,0330,0335,0335,0337,0333,0337,",
    "01126:0333,0336,0332,0350,0350,0335,0337,0342,0334,0334,0342,0335,0335,0334,0351,0351,0336,0333,0337,",
    "01127:0336,0336,0336,0333,0333,0337,0337,0337,0304,0313,0350,0350,0350,0334,0342,0335,0335,0336,0342,0330,0304,0335,0350,0350,0335,0335,0335,0342,0330,0304,0334,0350,0334,0350,0334,0337,0342,0334,0350,0335,0304,0336,0336,0333,0336,0333,0337,0337,0337,",
    "01130:0313,0306,0350,0337,0312,0336,0335,0342,0334,0304,0337,0313,0336,0330,0335,0306,0335,0337,0312,0336,0342,0330,0334,0304,0334,0337,0313,0336,0336,0336,0336,0333,0337,0337,0337,",
    "01131:0304,0313,0336,0336,0336,0332,0337,0337,0337,0336,0333,0342,0330,0306,0350,0334,0337,0312,0336,0342,0335,0335,0342,0337,0313,0336,0334,0304,0331,0333,0337,0336,0336,0336,0332,0337,0337,0337,",
    "01132:0304,0335,0312,0336,0342,0337,0332,0336,0342,0337,0333,0306,0336,0334,0313,0337,0342,0335,0304,0336,0330,0334,0312,0337,0313,0336,0336,0336,0333,0337,0337,0337,",
    "01133:0333,0336,0336,0332,0332,0337,0337,0342,0330,0335,0336,0336,0342,0337,0337,0333,0336,0336,0342,0330,0330,0334,0337,0337,",
    "01134:0333,0336,0336,0332,0337,0337,0350,0350,0334,0342,0335,0351,0351,0336,0336,0333,0337,0337,",
    "01135:0333,0336,0336,0332,0337,0337,0342,0336,0336,0334,0342,0333,0333,0333,0333,0342,0335,0333,0337,0337,0331,",
    "01136:0333,0330,0336,0332,0334,0334,0350,0335,0342,0334,0334,0342,0334,0351,0334,0333,0337,0331,",
    "01137:0333,0334,0336,0336,0330,0337,0342,0336,0331,0335,0337,0337,",
    "01140:0333,0336,0332,0330,0336,0330,0350,0334,0342,0335,0351,0330,0333,0333,0337,0337,0331,",
    "01141:0304,0313,0336,0336,0336,0332,0332,0337,0337,0337,0333,0336,0332,0336,0330,0341,0333,0342,0331,0342,0330,0330,0332,0333,0333,0331,0331,0337,0337,0336,0336,0336,0332,0337,0337,0337,0313,0304,",
    "01142:0304,0313,0336,0336,0332,0337,0337,0333,0336,0336,0332,0332,0332,0337,0337,0342,0336,0336,0330,0333,0341,0333,0333,0331,0337,0337,0336,0336,0336,0332,0337,0337,0337,0304,0313,",
    "01143:0304,0313,0336,0336,0332,0337,0337,0333,0336,0332,0336,0330,0350,0343,0334,0334,0343,0334,0334,0343,0334,0334,0330,0330,0334,0334,0351,0331,0336,0332,0337,0337,0337,",
    "01144:0333,0336,0336,0332,0332,0337,0337,0342,0336,0336,0330,0332,0341,0333,0333,0331,0337,0337,",
    "01145:0304,0313,0336,0336,0332,0337,0337,0333,0336,0336,0332,0330,0332,0343,0334,0334,0350,0335,0343,0334,0343,0335,0335,0342,0351,0335,0335,0342,0333,0330,0330,0334,0336,0332,0337,0337,0337,",
    "01146:0304,0313,0336,0336,0332,0337,0337,0333,0336,0336,0332,0332,0337,0342,0330,0336,0336,0342,0330,0333,0343,0332,0331,0331,0335,0337,0336,0342,0334,0334,0342,0335,0331,0331,0331,0333,0333,0333,0333,0337,0337,0337,0304,0313,0336,0336,0336,0332,0337,0337,0337,",
    "01147:0304,0313,0336,0336,0336,0332,0332,0337,0337,0337,0333,0336,0332,0336,0330,0341,0333,0342,0331,0342,0331,0342,0331,0342,0332,0335,0335,0343,0331,0331,0332,0332,0334,0334,0337,0337,0336,0336,0336,0332,0337,0337,0337,",
    "01150:0304,0313,0342,0336,0330,0333,0336,0331,0332,0343,0333,0334,0334,0342,0330,0334,0334,0336,0333,0337,0337,0337,",
    "01151:0333,0336,0336,0332,0332,0332,0342,0330,0336,0342,0330,0330,0330,0336,0341,0331,0331,0331,0331,0331,0331,0331,0331,0331,0331,0337,0333,0333,0337,0337,0337,",
    "01152:0333,0336,0336,0332,0332,0332,0342,0331,0342,0332,0335,0335,0343,0332,0331,0331,0331,0336,0336,0341,0330,0330,0330,0330,0330,0330,0330,0330,0335,0335,0337,0333,0333,0337,0337,0337,",
    "01153:0304,0313,0336,0336,0332,0337,0337,0333,0336,0336,0332,0332,0332,0337,0342,0330,0336,0342,0331,0350,0335,0342,0335,0335,0310,0337,0342,0336,0313,0334,0351,0334,0331,0333,0336,0333,0337,0337,0337,0304,0313,",
    "01154:0304,0313,0336,0336,0336,0332,0337,0337,0337,0333,0336,0336,0332,0332,0332,0336,0336,0350,0335,0342,0334,0337,0337,0337,0342,0330,0336,0342,0330,0334,0334,0334,0336,0342,0335,0351,0335,0337,0331,0331,0331,0333,0337,0337,",
    "01155:0304,0313,0333,0336,0332,0336,0332,0336,0332,0332,0337,0337,0342,0336,0333,0330,0336,0332,0343,0333,0333,0343,0332,0331,0342,0331,0342,0337,0333,0342,0333,0337,0337,",
    "01156:0304,0313,0333,0336,0332,0336,0332,0336,0332,0332,0337,0337,0342,0336,0333,0330,0336,0332,0343,0333,0331,0331,0337,0342,0333,0337,0337,",
    "01157:0304,0313,0333,0336,0332,0336,0332,0330,0341,0333,0333,0331,0337,0337,",
    "01160:0304,0313,0336,0336,0332,0337,0337,0333,0336,0332,0336,0332,0342,0335,0335,0337,0342,0336,0331,0332,0341,0333,0334,0334,0342,0331,0333,0333,0333,0337,0337,",
    "01161:0304,0313,0333,0336,0332,0336,0330,0332,0341,0333,0342,0331,0331,0337,0342,0336,0333,0334,0334,0336,0333,0343,0335,0335,0330,0330,0333,0337,0337,0337,",
    "01162:0333,0336,0332,0336,0332,0337,0342,0330,0336,0336,0342,0350,0335,0350,0337,0337,0335,0342,0335,0351,0351,0330,0334,0331,0336,0336,0333,0337,0337,0337,",
    "01163:0304,0313,0336,0336,0332,0337,0337,0333,0336,0336,0332,0332,0330,0336,0330,0350,0343,0334,0334,0343,0334,0350,0334,0343,0334,0351,0330,0330,0343,0334,0334,0343,0334,0334,0335,0343,0334,0351,0331,0333,0333,0337,0337,0337,",
    "01164:0304,0313,0333,0336,0332,0342,0330,0336,0342,0334,0342,0335,0335,0342,0333,0333,0336,0330,0335,0343,0335,0335,0333,0333,0333,0337,0337,0337,",
    "01165:0304,0313,0336,0336,0330,0342,0333,0334,0334,0343,0332,0334,0334,0342,0334,0334,0342,0330,0335,0335,0336,0333,0337,0337,0337,",
    "01166:0304,0313,0336,0336,0332,0337,0337,0333,0336,0332,0350,0350,0334,0342,0335,0335,0342,0334,0351,0351,0333,0337,0336,0336,0336,0332,0337,0337,0337,",
    "01167:0336,0336,0336,0333,0337,0337,0337,0313,0304,0336,0336,0336,0333,0337,0350,0350,0334,0337,0342,0335,0335,0336,0342,0330,0335,0335,0335,0335,0335,0335,0342,0330,0334,0334,0334,0334,0334,0334,0337,0342,0334,0304,0336,0333,0336,0333,0337,0337,0337,",
    "01170:0304,0313,0336,0306,0350,0335,0342,0351,0336,0333,0334,0337,0342,0350,0335,0304,0336,0336,0333,0337,0337,0337,",
    "01171:0304,0313,0336,0336,0332,0337,0337,0333,0336,0332,0336,0350,0335,0337,0350,0334,0342,0334,0334,0342,0334,0334,0334,0334,0334,0334,0342,0334,0351,0351,0335,0335,0333,0337,0336,0336,0336,0332,0337,0337,0337,",
    "01172:0304,0313,0336,0350,0335,0310,0337,0342,0330,0334,0334,0334,0336,0342,0334,0337,0330,0334,0334,0334,0336,0342,0330,0334,0334,0304,0313,0337,0336,0336,0336,0333,0337,0337,0337,",
    "01173:0333,0336,0330,0332,0336,0336,0330,0334,0350,0334,0342,0335,0335,0335,0342,0330,0335,0342,0334,0331,0331,0331,0334,0342,0335,0331,0342,0335,0335,0335,0342,0335,0351,0335,0335,0331,0331,0333,0333,0337,0337,0337,",
    "01174:0333,0336,0332,0337,0342,0330,0336,0336,0342,0337,0337,0331,0336,0336,0331,0342,0330,0333,0337,0337,",
    "01175:0333,0336,0336,0332,0332,0330,0330,0336,0330,0342,0330,0350,0334,0342,0335,0331,0335,0335,0335,0342,0335,0330,0330,0334,0334,0334,0342,0335,0335,0335,0342,0330,0335,0342,0334,0351,0330,0330,0335,0335,0333,0333,0333,0337,0337,0337,",
    "01176:0330,0336,0336,0336,0331,0331,0333,0333,0341,0331,0331,0331,0331,0331,0331,0333,0333,0333,0333,0337,0337,0337,",
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
    "01220:0333,0200,0336,0332,0332,0330,0220,0336,0332,0337,0331,0337,0320,",
    "01221:0333,0200,0336,0330,0332,0336,0332,0332,0336,0221,0336,0333,0337,0337,0337,0331,0337,0335,0335,0331,0333,0335,0335,0331,0333,0320,",
    "01222:0333,0200,0336,0332,0330,0332,0333,0222,0333,0331,0337,",
    "01300:0333,0200,0336,0330,0332,0340,0350,0335,0336,0330,0342,0331,0331,0331,0342,0330,0330,0335,0335,0331,0331,0342,0330,0330,0330,0342,0331,0334,0334,0334,0351,0331,0331,0333,0333,0337,0337",
    "01301:0336,0333,0337,0307,0350,0335,0351,0201,0304,0335,0335,0301,0335,0317,0336,0201,0304,0335,0335,0337,0301,0335,0201,0334,0304,0313,0334,0336,0333,0337,0200,",
    "01302:0333,",
    "01303:0333,",
    "01304:0333,0200,0336,0330,0332,0341,0342,0335,0342,0335,0342,0335,0342,0350,0335,0351,0336,0336,0330,0330,0341,0331,0331,0335,0330,0330,0341,0331,0331,0335,0330,0330,0341,0331,0331,0335,0330,0330,0341,0331,0331,0350,0334,0351,0337,0337,0330,0335,0335,0333,0337",
    "01305:0333,0200,0336,0330,0332,0305,0342,0335,0342,0335,0342,0335,0342,0335,0342,0335,0341,0350,0335,0351,0336,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0350,0335,0304,0337,0331,0333,0337",
    "01306:0333,0200,0336,0330,0332,0306,0342,0335,0342,0335,0342,0335,0342,0335,0342,0335,0341,0350,0335,0351,0336,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0335,0330,0336,0336,0341,0337,0337,0331,0350,0335,0335,0335,0337,0342,0334,0336,0330,0336,0336,0341,0337,0337,0331,0304,0335,0337,0331,0333,0337",
    "01307:0333,0336,0330,0332,0307,0342,0335,0342,0335,0342,0335,0342,0335,0342,0335,0342,0335,0342,0335,0341,0304,0331,0333,0337,0200,",
    "01310:0333,0200,0336,0332,0350,0335,0310,0337,0342,0330,0334,0334,0342,0330,0334,0334,0342,0330,0334,0334,0342,0330,0334,0334,0334,0351,0336,0313,0333,0337",
    "01311:0333,0200,0334,0305,0335,0311,0337,0362,0203,0334,0334,0203,0334,0350,0336,0334,0203,0354,0334,0334,0334,0334,0201,0335,0335,0335,0336,0201,0334,0334,0334,0336,0201,0331,0335,0335,0335,0337,0331,0334,0334,0334,0337,0331,0334,0304,0335,0313,",
    "01312:0304,0313,0333,0200,0334,0306,0335,0362,0203,0334,0334,0203,0364,0335,0335,0335,0350,0335,0312,0336,0330,0334,0334,0342,0335,0335,0335,0335,0342,0335,0335,0335,0335,0342,0335,0335,0331,0335,0335,0337,0304,0313,",
    "01313:0333,0200,0336,0336,0330,0332,0362,0203,0334,0203,0203,0334,0203,0334,0203,0203,0354,0334,0332,0342,0333,0333,0331,0337,0337,",
    "01314:0333,0200,0314,0336,0332,0332,0330,0200,0333,0200,0333,0200,0331,0337,0313",
    "01315:0333,",
    "01316:0333,0200,0336,0336,0330,0332,0332,0332,0336,0341,0330,0330,0330,0330,0341,0333,0333,0331,0331,0341,0333,0333,0330,0330,0341,0331,0331,0331,0331,0341,0333,0333,0331,0331,0337,0337,0337,",
    "01317:0336,0333,0337,0307,0350,0335,0351,0201,0304,0335,0335,0301,0335,0317,0336,0201,0304,0335,0335,0337,0301,0335,0201,0334,0304,0313,0334,0336,0333,0337,0200,0336,0332,0342,0317,0336,0330,0340,0331,0337,0337,0330,0340,0331,0336,0313,0333,0337,",
    "01320:0333,0200,0336,0336,0330,0332,0337,0320,0204,0336,0333,0331,0337,0337,",
    "01321:0333,0200,0336,0336,0330,0332,0337,0321,0204,0336,0333,0320,0331,0337,0337,",
    "01322:0333,0200,0336,0336,0330,0332,0337,0322,0204,0320,0336,0333,0331,0337,0337,",
    "01323:0333,0200,0336,0336,0330,0332,0337,0323,0204,0320,0336,0333,0331,0337,0337,",
    "01324:0333,0200,0336,0336,0330,0332,0337,0324,0204,0320,0336,0333,0331,0337,0337,",
    "01325:0333,0200,0336,0336,0330,0332,0337,0325,0204,0320,0336,0333,0331,0337,0337,",
    "01326:0333,0200,0336,0336,0330,0332,0337,0326,0204,0336,0320,0333,0331,0337,0337,",
    "01327:0333,0200,0336,0336,0330,0332,0337,0327,0204,0336,0320,0333,0331,0337,0337,",
    "01330:0333,0200,0336,0332,0330,0337,0212,0336,0331,0333,0337,",
    "01331:0333,0200,0336,0332,0330,0337,0335,0335,0212,0335,0335,0336,0331,0333,0337,",
    "01332:0333,0200,0336,0332,0330,0337,0335,0335,0335,0212,0335,0336,0331,0333,0337,",
    "01333:0333,0200,0336,0332,0330,0337,0335,0212,0335,0335,0335,0336,0331,0333,0337,",
    "01334:0333,0200,0336,0330,0332,0336,0350,0343,0334,0334,0343,0334,0334,0343,0334,0330,0350,0335,0351,0335,0330,0335,0335,0335,0335,0362,0203,0334,0334,0203,0364,0331,0350,0335,0330,0335,0335,0304,0337,0333,0331,0337,",
    "01335:0333,0200,0336,0330,0332,0336,0335,0350,0335,0335,0343,0335,0335,0343,0335,0335,0343,0335,0330,0350,0335,0304,0350,0331,0362,0203,0334,0334,0203,0364,0331,0335,0335,0331,0334,0335,0330,0350,0334,0331,0334,0334,0304,0337,0333,0331,0337,",
    "01336:0333,0200,0336,0330,0334,0336,0330,0337,0342,0336,0331,0335,0337,0331,0337,",
    "01337:0333,0200,0336,0330,0332,0336,0342,0334,0342,0334,0342,0334,0342,0330,0330,0334,0337,0331,0337",
    "01340:0333,0200,0336,0330,0332,0340,0333,0331,0337",
    "01341:0333,0200,0336,0330,0332,0341,0340,0333,0331,0337",
    "01342:0333,0200,0336,0330,0332,0334,0336,0342,0330,0340,0331,0335,0335,0342,0330,0340,0333,0333,0330,0334,0337,0337",
    "01343:0333,0200,0336,0330,0332,0350,0343,0335,0342,0334,0334,0342,0335,0340,0351,0331,0333,0337",
    "01344:0333,0200,0336,0330,0332,0336,0332,0340,0335,0337,0342,0330,0340,0334,0332,0336,0331,0332,0331,0337,0337,0202,",
    "01345:0202,0200,0350,0334,0343,0335,0304,",
    "01346:0202,0200,0350,0334,0332,0335,0335,0343,0333,0335,0304,0334,",
    "01347:0304,0313,0333,0200,0336,0332,0336,0330,0330,0347,0331,0331,0337,0333,0337,",
    "01350:0333,0200,0336,0330,0332,0350,0335,0330,0335,0335,0335,0335,0362,0203,0334,0334,0203,0364,0331,0334,0336,0336,0201,0330,0201,0331,0331,0331,0334,0334,0304,0337,0337,0333,0331,0337,",
    "01351:0333,0200,0336,0330,0332,0335,0350,0335,0330,0335,0335,0335,0335,0362,0203,0335,0335,0336,0336,0203,0364,0330,0201,0330,0201,0331,0331,0331,0331,0331,0335,0337,0337,0342,0336,0336,0334,0334,0304,0337,0337,0333,0331,0337,",
    "01352:0333,0200,0336,0330,0332,0335,0350,0352,0334,0334,0334,0342,0335,0335,0336,0336,0342,0330,0330,0342,0331,0331,0335,0335,0342,0330,0330,0342,0331,0331,0335,0335,0337,0337,0342,0335,0335,0335,0351,0353,0330,0334,0334,0333,0337",
    "01353:0333,0200,0336,0330,0332,0335,0350,0352,0334,0342,0335,0335,0342,0335,0335,0336,0336,0342,0330,0330,0342,0331,0331,0334,0334,0334,0334,0334,0334,0342,0330,0330,0342,0331,0331,0335,0335,0335,0351,0353,0337,0337,0333,0330,0334,0337",
    "01354:0333,0200,0330,0332,0336,0336,0333,0331,0335,0337,0362,0203,0335,0203,0364,0340,0335,0335,0350,0336,0336,0335,0342,0334,0334,0342,0337,0337,0310,0337,0342,0335,0304,0336,0313,0336,0333,0331,0337,0337,",
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
    "01377:0333,0200,0336,0336,0336,0330,0332,0337,0337,0321,0362,0203,0336,0203,0364,0334,0337,0335,0320,0331,0200,0336,0330,0332,0336,0336,0332,0337,0331,0332,0335,0336,0332,0336,0333,0330,0337,0337,0337,0362,0203,0334,0203,0334,0203,0334,0203,0354,0335,0304,0335,0336,0332,0337,0331,0335,0335,0336,0330,0337,0336,0336,0331,0331,0331,0331,0331,0333,0333,0333,0333,0331,0331,0362,0203,0334,0203,0203,0335,0203,0334,0350,0334,0310,0337,0203,0203,0334,0334,0203,0203,0334,0334,0334,0336,0203,0335,0335,0203,0203,0334,0334,0203,0363,0304,0330,0313,0335,0335,0332,0337,0337,0330,0336,0330,0336,0330,0337,0337,0337,0337,0333,0331,0334,0333,0330,0336,0336,0331,0336,0331,0336,0336,0333,0331,0337,0337,0337,0337,0337,0335,0336,0333,0336,0336,0336,0333,0337,0337,0337,0337,0331,"
]

