<?php


$dnaurl = "https://raw.githubusercontent.com/LafeLabs/thing/master/symbol/data/dna.txt";
$baseurl = explode("data/",$dnaurl)[0];
$dnaraw = file_get_contents($dnaurl);
$dna = json_decode($dnaraw);

mkdir("jscode");
mkdir("iconsymbols");
mkdir("data");
mkdir("php");
mkdir("symbolfeed");
mkdir("uploadimages");


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
<a href = "index.html">CLICK TO GO TO MAP OF SYMBOL FACTORY</a>
<style>
a{
    font-size:3em;
}
</style>
