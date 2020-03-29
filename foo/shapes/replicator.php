<?php
//replcace the following url with your local data/dna.txt file's global url:

$dnaurl = "https://raw.githubusercontent.com/LafeLabs/symbolmagic/master/shapes/data/dna.txt";

$baseurl = explode("data/",$dnaurl)[0];
$dnaraw = file_get_contents($dnaurl);
$dna = json_decode($dnaraw);

mkdir("data");
mkdir("php");
mkdir("iconsymbols");


foreach($dna->html as $value){
    copy($baseurl.$value,$value);
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
