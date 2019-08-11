<?php

$makesymbol = false;

$dnaurl = "https://raw.githubusercontent.com/LafeLabs/thing/master/data/dna.txt";
$baseurl = explode("data/",$dnaurl)[0];
$dnaraw = file_get_contents($dnaurl);
$dna = json_decode($dnaraw);

mkdir("iconsymbols");
mkdir("data");
mkdir("php");
mkdir("jscode");
mkdir("uploadimages");
mkdir("symbols");

if($makesymbol){
    mkdir("symbol");
    copy($baseurl."https://raw.githubusercontent.com/LafeLabs/geometron5/master/php/replicator.txt","symbol/replicator.php");    
}
    
    


$oldmapexists = false;
if(file_exists("data/currentMap.txt")){
    $currentMap = file_get_contents("data/currentMap.txt");
    $oldmapexists = true;
}

$oldscrollexists = false;
if(file_exists("README.md")){
    $README = file_get_contents("README.md");
    $oldscrollexists = true;
}

$oldindexexists = false;
if(file_exists("index.html")){
    $indexhtml = file_get_contents("index.html");
    $oldindexexists = true;
}

foreach($dna->html as $value){
    copy($baseurl.$value,$value);
}

foreach($dna->javascript as $value){
    copy($baseurl."jscode/".$value,"jscode/".$value);
}

foreach($dna->symbols as $value){
    copy($baseurl."symbols/".$value,"symbols/".$value);
}


foreach($dna->iconsymbols as $value){
    copy($baseurl."iconsymbols/".$value,"iconsymbols/".$value);
}



foreach($dna->data as $value){
    
    copy($baseurl."data/".$value,"data/".$value);
    
}

foreach($dna->php as $value){
    copy($baseurl."php/".$value,"php/".$value);
    copy($baseurl."php/".$value,explode(".",$value)[0].".php");
}


if($oldscrollexists){
    file_put_contents("README.md",$README);
}

if($oldmapexists){
    file_put_contents("data/currentMap.txt",$currentMap);
}

if($oldindexexists){
    file_put_contents("index.html",$indexhtml);
}


if(isset($_GET["type"])){ //replicator.php?type=map, otherwise, scroll
    $type = $_GET["type"];
    $files = scandir(getcwd()."/".$filename);
    if($type == "map"){
        copy("map.html","index.html");    
    }
}


?>
<a href = "index.html">CLICK TO GO TO PAGE</a>
<style>
a{
    font-size:3em;
}
</style>
