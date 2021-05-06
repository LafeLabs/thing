<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">

    <!--

        EVERYTHING IS PHYSICAL 
        EVERYTHING IS FRACTAL
        EVERYTHING IS RECURSIVE
        NO MONEY 
        MO MINING 
        NO PROPERTY
        LOOK AT THE INSECTS
        LOOK AT THE FUNGI
        LANGUAGE IS HOW THE MIND PARSES REALITY

    -->
    <link href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAP//AP///wANAP8A5Dz6ABueRwAAt/8A6BonABo86AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREREREREREREAAAEREREREQCIgREREd3dwAAB3d3d3d3d3d3d3d3d3d3d3d3d3VVVVVVVQAFVVAAVVVQIiBRAiIBEQIAIBECAAERAgAgFgIABmYCIiBmAiIGZgIiIGYCIgZmYCIAaIAAMzMzAAiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" rel="icon" type="image/x-icon" />

    <!--Stop Google:-->
    <META NAME="robots" CONTENT="noindex,nofollow">

    <script src="jscode/mapfactory.js"></script>
    <script src = "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.js"></script>

<!--       un comment to use math

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
        <script>
            MathJax.Hub.Config({
                tex2jax: {
                inlineMath: [['$','$'], ['\\(','\\)']],
                processEscapes: true,
                processClass: "mathjax",
                ignoreClass: "no-mathjax"
                }
            });//			MathJax.Hub.Typeset();//tell Mathjax to update the math
        </script>
    -->

    
</head>
<body>    
<div id = "scrollscroll"></div>
<div id = "mainmap"></div>
<div id = "modebutton" class = "button">LIGHT<br>DARK</div>
<div id = "hidebutton" class = "button"><span id  = "hideshow">SHOW</span><br>MENU</div>
<div id = "margin">
    <div id = "marginbutton">⇳⇳⇳⇳⇳⇳⇳⇳⇳⇳⇳</div>
    <div id  = "scrollsbox">
        <input id = "scrollinput"/>
        <a href = "scrolleditor.html">
            <img style = "width:50px;display:block;margin:auto;padding-top:1em" src = "iconsymbols/scroll.svg"/>
        </a>
    </div>
    <div id  = "mapsbox">
        <input id = "mapinput"/>
        <a href = "mapeditor.html">
            <img style = "width:50px;display:block;margin:auto;padding-top:1em" src = "iconsymbols/map.svg"/>
        </a>        
    </div>
</div>

<div class = "data" id = "mapdiv"><?php
    
if(isset($_GET["map"])){
    echo $_GET["map"];
}

?></div>
<div class = "data" id = "scrolldiv"><?php
    
if(isset($_GET["scroll"])){
    echo $_GET["scroll"];
}

?></div>
<script>

mode = "dark";
//mode = "light";


if(innerWidth > innerHeight){
    menuhide = false;
    mainmap = new Map(innerHeight,innerHeight,document.getElementById("mainmap"));

    document.getElementById("margin").style.left = (innerHeight).toString() + "px";
    document.getElementById("scrollscroll").style.width = (innerHeight- 25).toString() + "px";
    document.getElementById("scrollscroll").style.height = innerHeight.toString() + "px";    

}
else{
    menuhide = true;
    document.getElementById("scrollscroll").style.width = innerWidth.toString() + "px";
    mainmap = new Map(innerWidth,innerWidth,document.getElementById("mainmap"));    
    document.getElementById("scrollscroll").style.height = (innerHeight - 100).toString() + "px";        
    document.getElementById("margin").style.display = "none";
    document.getElementById("margin").style.height = (innerHeight - innerWidth - 150).toString() + "px";
    document.getElementById("margin").style.bottom = "0px";
    
}


document.getElementById("hidebutton").onclick = function(){
    menuhide = !menuhide;
    if(menuhide){
        document.getElementById("hideshow").innerHTML = "SHOW";
        document.getElementById("margin").style.display = "none";
        if(innerHeight > innerWidth){
            document.getElementById("scrollscroll").style.height = (innerHeight - 100).toString() + "px";        
        }
    }
    else{
        document.getElementById("hideshow").innerHTML = "HIDE";
        document.getElementById("margin").style.display = "block";
        if(innerHeight > innerWidth){
            document.getElementById("scrollscroll").style.height = (innerWidth + 150).toString() + "px";        
        }
    }
}


//mainmap.math = true;

scroll = "";
rawhtml = "";
var converter = new showdown.Converter();
// for more on options see here:
// https://github.com/showdownjs/showdown/wiki/Showdown-Options
converter.setOption('literalMidWordUnderscores', 'true');
converter.setOption('tables', 'true')
    
mapname = "data/currentMap.txt";
//loadmap(mapname);
loadscroll("README.md");

if(document.getElementById("scrolldiv").innerHTML.length > 0){
    loadscroll(document.getElementById("scrolldiv").innerHTML);
}

if(document.getElementById("mapdiv").innerHTML.length > 0){
    loadmap(document.getElementById("mapdiv").innerHTML);
}

///below this line identical to index.html


function loadmap(mapname){
    document.getElementById("scrollscroll").style.display = "none";
    document.getElementById("mainmap").style.display = "block";
        
    var httpc = new XMLHttpRequest();
    httpc.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            mainmap.array = JSON.parse(this.responseText);
            
            N = mainmap.array.length;

            for(var index = 0;index < mainmap.array.length;index++){
                
            }
            
            mainmap.draw();
            //			MathJax.Hub.Typeset();//tell Mathjax to update the math
            for(var index = 0;index < mainmap.linkArray.length;index++){
                if(mainmap.array[index].maplinkmode == true){
                    
                    
                    mainmap.linkArray[index].onclick = function(){
                        var localmap = this.getElementsByClassName("maplink")[0].innerHTML;
                        if(localmap.includes("scrolls/")){
                            var localscroll = "scrolls/" + localmap.split("scrolls/")[1];
                            loadscroll(localscroll);
                        }
                        if(localmap.includes("scroll(")){
                            var localscroll = localmap.split("scroll(")[1].split(")")[0];
                            loadscroll(localscroll);
                        }
                        if(!localmap.includes("scroll(") && !localmap.includes("scrolls/")){
                            loadmap(this.getElementsByClassName("maplink")[0].innerHTML);                                
                        }

                    }
                }
            }

        }
    };
    httpc.open("GET", "fileloader.php?filename=" + mapname, true);
    httpc.send();
}


function loadscroll(scrollname){
    document.getElementById("scrollscroll").innerHTML = "";
    document.getElementById("scrollscroll").style.display = "block";
    document.getElementById("mainmap").style.display = "none";
    var httpc666 = new XMLHttpRequest();
    httpc666.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            scroll = this.responseText;
            rawhtml = converter.makeHtml(scroll);
            document.getElementById("scrollscroll").innerHTML = rawhtml;
            convertscrollinks();
            //			MathJax.Hub.Typeset();//tell Mathjax to update the math
    //			MathJax.Hub.Typeset();//tell Mathjax to update the math
        }
    };
    httpc666.open("GET", "fileloader.php?filename=" + scrollname, true);
    httpc666.send();
    //MathJax.Hub.Typeset();//tell Mathjax to update the math
}


function convertscrollinks(){
    links = document.getElementById("scrollscroll").getElementsByTagName("A");
    for(var index = 0;index < links.length;index++){
        if(links[index].href.includes("scrolls/") && !links[index].href.includes(".php")){
            //console.log(links[index].href);
            var newspan = document.createElement("SPAN");
            newspan.innerHTML = links[index].innerHTML;
            var dataspan = document.createElement("SPAN");
            dataspan.className = "data";
            dataspan.innerHTML  = "scrolls/" + links[index].href.split("scrolls/")[1];
            newspan.appendChild(dataspan);
            newspan.className = "scrolllink";
            links[index].parentNode.insertBefore(newspan,links[index]);
            links[index].style.display = "none";
            
            newspan.onclick = function(){
                var localscroll = this.getElementsByClassName("data")[0].innerHTML;
                loadscroll(localscroll);
            }
        }
        if(links[index].href.includes("scroll(") && !links[index].href.includes(".php")){
            //link format scroll(any url)
            //console.log(links[index].href);
            var newspan = document.createElement("SPAN");
            newspan.innerHTML = links[index].innerHTML;
            var dataspan = document.createElement("SPAN");
            dataspan.className = "data";
            dataspan.innerHTML  = links[index].href.split("scroll(")[1].split(")")[0];
            newspan.appendChild(dataspan);
            newspan.className = "scrolllink";
            links[index].parentNode.insertBefore(newspan,links[index]);
            links[index].style.display = "none";
            
            newspan.onclick = function(){
                var localscroll = this.getElementsByClassName("data")[0].innerHTML;
                loadscroll(localscroll);
            }
        }
        if(links[index].href.includes("map(") && !links[index].href.includes(".php")){
            //console.log(links[index].href);
            //link format map(url)
            var newspan = document.createElement("SPAN");
            newspan.innerHTML = links[index].innerHTML;
            var dataspan = document.createElement("SPAN");
            dataspan.className = "data";
            dataspan.innerHTML  = links[index].href.split("map(")[1].split(")")[0];            
            newspan.appendChild(dataspan);
            newspan.className = "scrolllink";
            links[index].parentNode.insertBefore(newspan,links[index]);
            links[index].style.display = "none";
            
            newspan.onclick = function(){
                var localscroll = this.getElementsByClassName("data")[0].innerHTML;
                loadmap(localscroll);
            }
        }        
        if(links[index].href.includes("maps/") && !links[index].href.includes(".php")){
            //console.log(links[index].href);
            var newspan = document.createElement("SPAN");
            newspan.innerHTML = links[index].innerHTML;
            var dataspan = document.createElement("SPAN");
            dataspan.className = "data";
            dataspan.innerHTML  = "maps/" + links[index].href.split("maps/")[1];
            newspan.appendChild(dataspan);
            newspan.className = "scrolllink";
            links[index].parentNode.insertBefore(newspan,links[index]);
            links[index].style.display = "none";
            
            newspan.onclick = function(){
                var localscroll = this.getElementsByClassName("data")[0].innerHTML;
                loadmap(localscroll);
            }
        }        
    }
}

document.getElementById("modebutton").onclick = function(){
    modeswitch();
}

modeswitch();
function modeswitch(){
    if(mode == "dark"){
        mode = "light";
        document.body.style.backgroundColor = "white";
        mainmap.linkColor = "blue";
        mainmap.textColor = "black";
        document.getElementById("scrollscroll").style.backgroundColor = "white";
        document.getElementById("scrollscroll").style.color = "black";
        document.getElementById("mapinput").style.color = "black";
        document.getElementById("mapinput").style.backgroundColor = "white";
        document.getElementById("scrollinput").style.color = "black";
        document.getElementById("scrollinput").style.backgroundColor = "white";        
    }
    else{
        mode = "dark";
        document.body.style.backgroundColor = "black";
        mainmap.textColor = "#00ff00";
        mainmap.linkColor = "#ff2cb4";
        document.getElementById("scrollscroll").style.backgroundColor = "black";
        document.getElementById("scrollscroll").style.color = "#00ff00";    
        document.getElementById("mapinput").style.color = "#ff2cb4";
        document.getElementById("mapinput").style.backgroundColor = "black";
        document.getElementById("scrollinput").style.color = "#ff2cb4";
        document.getElementById("scrollinput").style.backgroundColor = "black";              
    }
}

maps = [];
var httpc8 = new XMLHttpRequest();
httpc8.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        maps = JSON.parse(this.responseText);
        for(var index = 0;index < maps.length;index++) {
            var newmapbutton = document.createElement("P");
            newmapbutton.className = "boxlink";
            newmapbutton.innerHTML = "maps/" + maps[index];
            document.getElementById("mapsbox").appendChild(newmapbutton);
            newmapbutton.onclick = function(){
                currentFile = this.innerHTML;
                loadmap(currentFile);
            }
        }
    };
}

httpc8.open("GET", "dir.php?filename=maps", true);
httpc8.send();


scrolls = [];
var httpc9 = new XMLHttpRequest();
httpc9.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        scrolls = JSON.parse(this.responseText);
        for(var index = 0;index < scrolls.length;index++) {
            var newscrollbutton = document.createElement("P");
            newscrollbutton.className = "boxlink";
            newscrollbutton.innerHTML = "scrolls/" + scrolls[index];
            document.getElementById("scrollsbox").appendChild(newscrollbutton);
            newscrollbutton.onclick = function(){
                currentFile = this.innerHTML;
                loadscroll(currentFile);
            }
        }
    };
}

httpc9.open("GET", "dir.php?filename=scrolls", true);
httpc9.send();

document.getElementById("scrollinput").value = "";
document.getElementById("mapinput").value = "";

document.getElementById("scrollinput").onchange = function(){
    loadscroll(this.value);
    this.value = "";
}
document.getElementById("mapinput").onchange = function(){
    loadmap(this.value);
    this.value = "";
}

</script>
<style>
body{
    overflow:hidden;
    background-color:black
}
input{
    display:block;
    margin:auto;
    width:90%;
    font-family:courier;
    font-size:1.2em;
    background-color:white;
    color:black;
    border-color:#ff2cb4;
    border-width:8px;
}
.boxlink{
    padding-left:1em;
    cursor:pointer;
}
.boxlink:hover{
    background-color:#808080;
}

.scrolllink{
    color:#ff2cb4;
    cursor:pointer;
}
.scrolllink:hover{
    background-color:#ff2cb490;
}
#mainmap{
    position:absolute;
    left:0px;
    top:0px;
    overflow:hidden;
}
#mainmap a{
    font-family:Helvetica;
    color:#ff2cb4;
}
#scrollscroll{
    padding-left:1em;
    padding-right:1em;
    left:0px;
    top:0px;
    position:absolute;
    overflow:scroll;
    background-color:black;
    color:#00ff00;
    font-size:2em;
    display:none;
    z-index:-3;
}
#scrollscroll a{
    color:#ff2cb4;
}
#scrollscroll img{
    max-width:50%;
    display:block;
    margin:auto;
    background-color:#808080;
}
.data{
    display:none;
}
h1,h2,h3,h4{
    text-align:center;
}
#modebutton{
    position:absolute;
    background-color:white;
    color:black;
    cursor:pointer;
    border:solid;
    border-radius:5px;
    text-align:center;
}
#hidebutton{
    position:absolute;
    background-color:white;
    color:black;
    cursor:pointer;
    border:solid;
    border-radius:5px;
    text-align:center;
}
.button:hover{
    background-color:green;
}
.button:active{
    background-color:yellow;
}
#margin{
    position:absolute;
    right:0px;
    bottom:0px;
    z-index:-1;
    overflow:hidden;
    background:#404040;
    font-size:1.2em;
}
#scrollsbox{
    position:absolute;
    left:0px;
    top:0px;
    bottom:0px;
    right:50%;
    background-color:#e0e0ff;
    overflow:scroll;
}
#mapsbox{
    position:absolute;
    left:50%;
    top:0px;
    bottom:0px;
    right:0px;
    background-color:#ffd0d0;
    overflow:scroll;
}

@media only screen and (orientation: landscape) {
    #margin{
        top:0px;
    }
    #modebutton{
        right:5px;
        top:5px;
    }
    #hidebutton{
        display:none;
    }
}

@media only screen and (orientation: portrait) {
    #modebutton{
        right:0px;
        bottom:0px;
    }
    #margin{
        bottom:0px;
        left:0px;
    }
    #margin img{
        width:50px;
    }
    #hidebutton{
        left:0px;
        bottom:0px;
    }
    .button{
        font-size:2em;
    }
}
</style>
</body>
</html>