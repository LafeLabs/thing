<?php
//seed.php?replicatorurl=[replicator url]&pagename=[page name]

$replicatorurl = $_GET["replicatorurl"];//get replicatorurl
$pagename = $_GET["pagename"];//get replicatorurl

mkdir($pagename);

$replicator = file_get_contents($replicatorurl);

copy($replicator,$pagename."/replicator.php");


if(isset($_GET["replicator"])){
}
else{
}

echo "<a href = \"".$pagename."/replicator.php\">".$pagename."/replicator.php</a>";

?>
<style>
    a{
        font-size:3em;
    }
</style>