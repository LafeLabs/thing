<?php

$dnaurl = "https://raw.githubusercontent.com/LafeLabs/thing/master/actiongeometry/data/dna.txt";

if(isset($_GET["dna"])){
    $dnaurl = $_GET["dna"];
}


$baseurl = explode("data/",$dnaurl)[0];
$dnaraw = file_get_contents($dnaurl);
$dna = json_decode($dnaraw);


copy("https://raw.githubusercontent.com/LafeLabs/thing/master/actiongeometry/php/replicator.txt","replicator.php");


foreach($dna->data as $value){
    
    copy($baseurl."data/".$value,"data/".$value);
    
}

foreach($dna->php as $value){
 
    copy($baseurl."php/".$value,"php/".$value);
    copy($baseurl."php/".$value,explode(".",$value)[0].".php");

}

foreach($dna->maps as $value){
    copy($baseurl."maps/".$value,"maps/".$value);
}

foreach($dna->scrolls as $value){
    copy($baseurl."scrolls/".$value,"scrolls/".$value);
}


?>
<a href = "index.html">CLICK TO GO TO PAGE</a>
<style>
a{
    font-size:3em;
}
</style>
