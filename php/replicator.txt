<?php

$makesymbol = true;

$dnaurl = "https://raw.githubusercontent.com/LafeLabs/thing/master/data/dna.txt";
$baseurl = explode("data/",$dnaurl)[0];
$dnaraw = file_get_contents($dnaurl);
$dna = json_decode($dnaraw);

mkdir("iconsymbols");
mkdir("data");
mkdir("php");
mkdir("jscode");
mkdir("uploadimages");

if($makesymbol){
    mkdir("symbol");
    copy("https://raw.githubusercontent.com/LafeLabs/thing/master/symbol/php/replicator.txt","symbol/replicator.php");    
}
    
    

$upoldmapexists = false;
if(file_exists("../data/currentMap.txt")){
    $upcurrentMap = file_get_contents("../data/currentMap.txt");
    $upoldmapexists = true;
}

$oldmapexists = false;
if(file_exists("data/currentMap.txt")){
    $currentMap = file_get_contents("data/currentMap.txt");
    $oldmapexists = true;
}

$oldtextfeedexists = false;
if(file_exists("data/textfeed.txt")){
    $textfeed = file_get_contents("data/textfeed.txt");
    $oldtextfeedexists = true;
}

$upoldtextfeedexists = false;
if(file_exists("../data/textfeed.txt")){
    $uptextfeed = file_get_contents("../data/textfeed.txt");
    $upoldtextfeedexists = true;
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

if($upoldmapexists){
    file_put_contents("data/currentMap.txt",$upcurrentMap);
}

if($oldmapexists){
    file_put_contents("data/currentMap.txt",$currentMap);
}

if($oldtextfeedexists){
    file_put_contents("data/textfeed.txt",$textfeed);
}

if($upoldtextfeedexists){
    file_put_contents("data/textfeed.txt",$uptextfeed);
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
