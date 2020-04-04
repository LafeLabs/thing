

function Map(w,h,div) {

    this.w = w;//width of div element map will be drawn in
    this.h = h;//height of div element
    this.div = div; //div element in document
    this.div.style.width = this.w + "px"; //set width of div
    this.div.style.height = this.h + "px";//set height of div
    this.array = [];
    this.linkArray = [];
    this.linkindex = 0;
    this.editmode = false;
    //MapLink(x,y,w,angle,text,href,src)
    var newLink  = new MapLink(0.1,0.1,0.2,0,"text","","");
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
            newa.style.transform  = "rotate(" + (this.array[index].angle).toString() + "deg)";
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
                newa.href = this.array[index].href;
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
            var newLink  = new MapLink(this.array[this.linkindex].x + this.array[linkindex].w*0.05,this.array[this.linkindex].y + this.array[this.linkindex].w*0.05,this.array[this.linkindex].w,this.array[this.linkindex].angle,this.array[this.linkindex].text,this.array[this.linkindex].href,this.array[this.linkindex].src);
        }
        else{
            var newLink  = new MapLink(0.1,0.1,0.1,0,"text","","");
            this.linkindex = 0;
        }
        //  var newLink = new MapLink(0,0,0.1,1,0,"","","","text");
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


function MapLink(x,y,w,angle,text,href,src) {
 
    this.x = x;
    this.y = y;
    this.w = w;
    this.angle = angle;
    this.text = text;
    this.href = href;
    this.src = src;

}


