<?php
//mkmap.php?dir=[dirname]

$dirname = $_GET["dir"];//get dir

mkdir($dirname);

copy("https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt",$dirname."/replicator.php");

echo "<a href = \"".$dirname."/replicator.php?type=map\">".$dirname."/replicator.php?type=map</a>";

?>
<style>
    a{
        font-size:3em;
    }
</style>