<?php

$branchname = $_POST["filename"];//get url

$files = scandir(getcwd()."/".$branchname);
$phpfiles = scandir(getcwd()."/".$branchname."/php");
$datafiles = scandir(getcwd()."/".$branchname."/data");
$uploadfiles = scandir(getcwd()."/".$branchname."/uploadimages");
$iconsymbols = scandir(getcwd()."/".$branchname."/iconsymbols");

foreach($phpfiles as $value){
    unlink($branchname."/php/".$value);
}
rmdir($branchname."/php");

foreach($datafiles as $value){
    unlink($branchname."/data/".$value);
}
rmdir($branchname."/data");

foreach($uploadfiles as $value){
    unlink($branchname."/uploadimages/".$value);
}
rmdir($branchname."/uploadimages");

foreach($iconsymbols as $value){
    unlink($branchname."/iconsymbols/".$value);
}
rmdir($branchname."/iconsymbols");


foreach($files as $value){
    unlink($branchname."/".$value);
}

rmdir($branchname);


?>