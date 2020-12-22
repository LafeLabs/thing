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
    
</head>
<body>    
<div id = "scrollscroll"></div>
<div id = "mainmap"></div>
<input id = "mapinput"/>

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

if(innerWidth > innerHeight){
    mainmap = new Map(innerHeight,innerHeight,document.getElementById("mainmap"));

    document.getElementById("scrollscroll").style.width = innerHeight.toString() + "px";
    document.getElementById("scrollscroll").style.height = innerHeight.toString() + "px";    
    document.getElementById("mapinput").select();
    document.getElementById("mapinput").style.width = (innerWidth - innerHeight - 20).toString() + "px";
    
}
else{
    document.getElementById("scrollscroll").style.width = innerWidth.toString() + "px";
    document.getElementById("scrollscroll").style.height = (innerHeight - 100).toString() + "px";        
    mainmap = new Map(innerWidth,innerWidth,document.getElementById("mainmap"));    

    document.getElementById("mapinput").style.width = (innerWidth - 20).toString() + "px";
    
}


scroll = "";
rawhtml = "";
var converter = new showdown.Converter();
// for more on options see here:
// https://github.com/showdownjs/showdown/wiki/Showdown-Options
converter.setOption('literalMidWordUnderscores', 'true');
converter.setOption('tables', 'true')
    
mapname = "data/currentMap.txt";

if(document.getElementById("scrolldiv").innerHTML.length > 0){
    loadscroll(document.getElementById("scrolldiv").innerHTML);
}
if(document.getElementById("mapdiv").innerHTML.length > 0){
    loadmap(document.getElementById("mapdiv").innerHTML);
}
if(document.getElementById("scrolldiv").innerHTML.length == 0 && document.getElementById("mapdiv").innerHTML.length == 0){
    loadmap(mapname);    
}

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
            for(var index = 0;index < mainmap.linkArray.length;index++){
                if(mainmap.array[index].maplinkmode == true){
                    
                    
                    mainmap.linkArray[index].onclick = function(){
                        var localmap = this.getElementsByClassName("maplink")[0].innerHTML;
                        if(localmap.includes("scrolls/")){
                            var localscroll = "scrolls/" + localmap.split("scrolls/")[1];
                            loadscroll(localscroll);
                        }
                        else{
                            loadmap(this.getElementsByClassName("maplink")[0].innerHTML);                              
                        }

                    }
                }
            }
            document.getElementById("textio").value = this.responseText;
            document.getElementById("mapinput").value = "";

        }
    };
    httpc.open("GET", "fileloader.php?filename=" + mapname, true);
    httpc.send();
}

document.getElementById("mapinput").value = "";
document.getElementById("mapinput").onchange = function(){
  var mapname = this.value;
  if(mapname.includes("/") == false){
      mapname = "maps/" + mapname;
  }
  if(mapname.includes("scrolls/")){
      loadscroll(mapname);
  }
  else{
      loadmap(mapname);   
  }
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
            document.getElementById("mapinput").value = "";
    
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
</script>
<style>
body{
    overflow:hidden;
    background-color:black;
}
input{
    width:50%;
    font-family:courier;
    font-size:1.5em;
    background-color:black;
    color:#ff2cb4;
    border-color:#ff2cb4;
    border-width:8px;
}
#mapinput{
    position:absolute;
    z-index:3;
    bottom:50px;
    right:0px;
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
}
.data{
    display:none;
}
h1,h2,h3,h4,h5{
    text-align:center;
}
</style>
</body>
</html>