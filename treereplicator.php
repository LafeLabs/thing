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


//need to se this up with the proper inputs: 
//location of treebranches.txt
//name of thingd

//treereplicator.php?treebranches=[url of thing]&thingname=[thingname]
if(isset($_GET["treebranches"])){ 
    $treebranches = $_GET["treebranches"];
    $baseurl = explode("data/",$treebranches)[0];
}
else{  
    $treebranches = "data/treebranches.txt";    
    $baseurl = "";
}

$thingnameset = false;
if(isset($_GET["thingname"])){
    $thingname = $_GET["thingname"];
    $thingnameset = true;
}


$branchesraw = file_get_contents($treebranches);
$branches = json_decode($branchesraw);
$symbolsraw = file_get_contents($baseurl."data/symbols.txt");
$symbols = json_decode($branchesraw);

if($thingnameset){
    //first create branch with correct name of "thing"
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
        copy($baseurl.$value."/index.html",$thingname."/".$value."/index.html");
        copy("https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt",$thingname."/".$value."/replicator.php");
    }

    foreach($symbols as $value){
        copy($baseurl.$value."/symbols/".$value,"symbols/".$value);
    }



    echo("<a href = \"".$thingname."/\">CLICK TO GO TO THING REPLICATOR</a>");
}
else{
    
    mkdir("data");
    mkdir("symbols");
    copy($baseurl."README.md","README.md");
    copy($baseurl."index.html","index.html");
    copy($baseurl."data/currentMap.txt","data/currentMap.txt");
    copy("https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt","replicator.php");

    foreach($branches as $value){
        mkdir($value);
        mkdir($value."/data");
        copy($baseurl.$value."/README.md",$value."/README.md");
        copy($baseurl.$value."/data/currentMap.txt",$value."/data/currentMap.txt");
        copy($baseurl.$value."/index.html",$value."/index.html");
        copy("https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt",$value."/replicator.php");
    }

    foreach($symbols as $value){
        copy($baseurl.$value."/symbols/".$value,"symbols/".$value);
    }

    echo("<p><a href = \"index.html/\">index.html</a></p>");
    echo("<p><a href = \"replicator.php/\">replicator.php</a></p>");

    
}



?>
<style>
a{
    font-size:3em;
}
</style>
