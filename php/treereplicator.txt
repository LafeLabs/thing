<?php

//seed can be a url where someone makes a "thing" live


if(isset($_GET["seed"])){ 
    $seed = $_GET["seed"];
}

$branchurl = "https://raw.githubusercontent.com/LafeLabs/thing/master/data/treebranches.txt";
$baseurl = explode("data/",$branchurl)[0];
$branchesraw = file_get_contents($branchurl);
$branches = json_decode($branchesraw);

//first create branch with correct name of "thing"
//copy index.html, README.md, and currentMap of thing

//for each directory, 
//create directory
//copy data about whether it's a scroll or map
//copy README.md
//copy data/currentMap.txt
//copy replicator.php
//actually run replicator.php, so that it's all done and user doesn't have to

//copy symbols and images which are also saved in a json somewhere, so that whole thing is copied
//if symbol/data has any value, copy that




?>
<a href = "index.html">CLICK TO GO TO PAGE</a>
<style>
a{
    font-size:3em;
}
</style>
