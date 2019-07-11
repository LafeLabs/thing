<a href = "index.html">back to main</a>

<table id = "newtable">
    <tr>
        <td>new page name:</td>
        <td><input/></td>
    </tr>
    <tr>
        <td>new map factory name:</td>
        <td><input/></td>
    </tr>
    <tr>
        <td>new symbol factory name:</td>
        <td><input/></td>
    </tr>
    <tr>
        <td>new technical paper name:</td>
        <td><input/></td>
    </tr>
</table>

<ul id = "mainlist">
<?php

// list directories as links


$files = scandir(getcwd());

foreach($files as $value){
    if($value{0} != "." && is_dir($value) && $value != "php" && $value != "jscode" && $value != "data" && $value != "html" && $value != "symbols" && $value != "fonts" && $value != "icons" && $value != "iconsymbols" && $value != "uploadimages"){
                
        echo "\n<li><a href = \"".$value."/\">".$value."/</a><img class = \"button\" style = \"width:30px\" src = \"iconsymbols/deletebutton.svg\"></li>\n";
        
    }
}   


?>
</ul>
<script>
inputs = document.getElementById("newtable").getElementsByTagName("input");    

inputs[0].onchange = function() {
    var newa = document.createElement("A");
    newa.innerHTML = "mkdir.php?dir=" + this.value;
    newa.href = "mkdir.php?dir=" + this.value;
    this.parentNode.appendChild(newa);
}
    
inputs[1].onchange = function() {
    var newa = document.createElement("A");
    newa.innerHTML = "mkmap.php?dir=" + this.value;
    newa.href = "mkmap.php?dir=" + this.value;
    this.parentNode.appendChild(newa);
}

inputs[2].onchange = function() {
    var newa = document.createElement("A");
    newa.innerHTML = "mksymbol.php?dir=" + this.value;
    newa.href = "mksymbol.php?dir=" + this.value;
    this.parentNode.appendChild(newa);
}


inputs[3].onchange = function() {
    var newa = document.createElement("A");
    newa.innerHTML = "mkpaper.php?dir=" + this.value;
    newa.href = "mkpaper.php?dir=" + this.value;
    this.parentNode.appendChild(newa);
}
    
    deletebuttons = document.getElementById("mainlist").getElementsByTagName("IMG");

for(var index = 0;index < deletebuttons.length;index++){
    deletebuttons[index].onclick = function() {
        thisdir = this.parentNode.getElementsByTagName("A")[0].innerHTML;
        var httpc = new XMLHttpRequest();
        var url = "deletebranch.php";         
        httpc.open("POST", url, true);
        httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        httpc.send("filename=" + thisdir);//send text to deletefile.php
        this.parentNode.parentNode.removeChild(this.parentNode);

    }
}

</script>
<style>
    body{
        font-size:2em;
    }
    table{
        font-family:courier;
    }
    .button{
        cursor:pointer;
    }
    .button:hover{
        background-color:green;
    }
    .button:active{
        background-color:yellow;
    }

</style>