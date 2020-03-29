<?php
//replcace the following url with your local data/dna.txt file's global url:

$dnaurl = "https://raw.githubusercontent.com/LafeLabs/symbolmagic/master/srm/data/dna.txt";

$baseurl = explode("data/",$dnaurl)[0];
$dnaraw = file_get_contents($dnaurl);
$dna = json_decode($dnaraw);

mkdir("data");
mkdir("php");


$srsreplicator = file_get_contents("https://raw.githubusercontent.com/LafeLabs/srs/master/php/replicator.txt");

$srwpreplicator = file_get_contents("https://raw.githubusercontent.com/LafeLabs/srwp/master/php/replicator.txt");

$agreplicator = file_get_contents("https://raw.githubusercontent.com/LafeLabs/actiongeometry/master/symbol-simplified/php/replicator.txt");

$thingreplicator = file_get_contents("https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt");

$spiralreplicator = file_get_contents("https://raw.githubusercontent.com/LafeLabs/symbolmagic/master/srm/spiral/php/replicator.txt");

mkdir("srs");
mkdir("srwp");
mkdir("ag");
mkdir("geometronthing");
mkdir("spiral");

file_put_contents("srs/replicator.php",$srsreplicator);
file_put_contents("srwp/replicator.php",$srwpreplicator);
file_put_contents("ag/replicator.php",$agreplicator);
file_put_contents("geometronthing/replicator.php",$thingreplicator);
file_put_contents("spiral/replicator.php",$spiralreplicator);


foreach($dna->html as $value){
    copy($baseurl.$value,$value);
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
