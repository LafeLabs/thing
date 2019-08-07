<?php

//seed can be a url where someone makes a "thing" live

//seed can be from github but easier to go from live example
//[www.myrandomdomain.org]/[somesubpagename]/[thisthingname] can be put in as a seed:
//treereplicator.php?seedpage=[the whole above url]

//treereplicator.php?seed=http://lafelabs.org/page/things/goldenmeme/
//will find [that url]/data/symbols.txt and 
// [that url]/data/treebranches.txt, run for loops on these, run replicators in each subdir from main thing replicator
//need to add ability to move files into symbols/ directory from symbolfactory in remote servers with a click, then also delete if needed

//self replicating trees of things

if(isset($_GET["seed"])){ 
    $seed = $_GET["seed"];
    $branchurl = $seed."/data/treebranches.txt";
}
else{
    $seed = "https://raw.githubusercontent.com/LafeLabs/thing/master";
    $branchurl = "https://raw.githubusercontent.com/LafeLabs/thing/master/data/treebranches.txt";    
}

$baseurl = explode("data/",$branchurl)[0];
$branchesraw = file_get_contents($branchurl);
$branches = json_decode($branchesraw);
$symbolsraw = file_get_contents($baseurl."data/symbols.txt");
$symbols = json_decode($branchesraw);

//first create branch with correct name of "thing"
$thingname = "newthing";
mkdir($thingname);
mkdir($thingname."/data");
mkdir($thingname."/symbols");
copy($baseurl."README.md",$thingname."/README.md");
copy($baseurl."index.html",$thingname."/index.html");
copy($baseurl."data/currentMap.txt",$thingname."/data/currentMap.txt");
copy("https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt",$thingname."/replicator.php");

foreach($branches as $value){
    mkdir($thingname."/".$value);
    mkdir($thingname."/".$value."/data");
    copy($baseurl.$value."/README.md",$thingname."/".$value."/README.md");
    copy($baseurl.$value."/data/currentMap.txt",$thingname."/".$value."/data/currentMap.txt");
    copy($baseurl.$value."/index.html",$thingname."/".$value."/index.htlm");
    copy("https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt",$thingname."/".$value."/replicator.php");
}

foreach($symbols as $value){
    copy($baseurl.$value."/symbols/".$value,"symbols/".$value);
}



echo("<a href = \"".$thingname."/\">CLICK TO GO TO THING REPLICATOR</a>");


?>
<style>
a{
    font-size:3em;
}
</style>
