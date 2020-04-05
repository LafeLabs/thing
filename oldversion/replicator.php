<?php

$dnaurl = "https://raw.githubusercontent.com/LafeLabs/thing/master/data/dna.txt";

if(isset($_GET["dna"])){
    $dnaurl = $_GET["dna"];
}

$makesymbol = true;
if($makesymbol){
    mkdir("symbol");
    copy("https://raw.githubusercontent.com/LafeLabs/thing/master/symbol/php/replicator.txt","symbol/replicator.php");    
}

$baseurl = explode("data/",$dnaurl)[0];
$dnaraw = file_get_contents($dnaurl);
$dna = json_decode($dnaraw);

mkdir("iconsymbols");
mkdir("data");
mkdir("php");
mkdir("jscode");
mkdir("uploadimages");
mkdir("symbolfeed");

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


?>
<a href = "index.html">CLICK TO GO TO PAGE</a>
<style>
a{
    font-size:3em;
}
</style>
