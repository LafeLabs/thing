<?php
//mkdir.php?dir=[dirname]

$dirname = $_GET["dir"];//get dir
mkdir($dirname);

if(isset($_GET["replicator"])){
    $replicator = $_GET["replicator"];
    copy($replicator,$dirname."/replicator.php");
}
else{
    copy("https://raw.githubusercontent.com/LafeLabs/thing/master/php/replicator.txt",$dirname."/replicator.php");    
}



echo "<a href = \"".$dirname."/replicator.php\">".$dirname."/replicator.php</a>";

?>
<style>
    a{
        font-size:3em;
    }
</style>