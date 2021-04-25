<!-- 
this program generates the file data/dna.txt
dna.txt is a json formatted file which points to all the files in this system, which is then used by replciator.php to copy the whole thing.  The file names are local, so that the replicator can work when pointed at any address where this system lives, which could be any new instance, so that the system can replicate without any reference to some centralized repository such as one on github. 
-->
<a href = "editor.php">editor.php</a>
<p></p>
<a href = "index.html">index.html</a>

<br/>
<pre>
<?php

    $phpfiles = scandir(getcwd()."/php");
    $datafiles = scandir(getcwd()."/data");

    $mapfiles = scandir(getcwd()."/maps");
    $scrollfiles = scandir(getcwd()."/scrolls");

    $htmlfiles = [];

    $dna = json_decode("{}");
    $dna->html = $htmlfiles;

    array_push($dna->html,"README.md");
    array_push($dna->html,"index.html");
    

    $dna->javascript = [];

    $dna->iconsymbols = [];

    foreach($iconfiles as $value){
        if($value{0} != "."){
            array_push($dna->iconsymbols,$value);
        }
    }

    $dna->data = [];
    foreach($datafiles as $value){
        if($value{0} != "."){
            
            if(substr($value,-4) == ".txt"){
                array_push($dna->data,$value);
            }

        }
    }

    $dna->php = [];
    foreach($phpfiles as $value){
        if($value{0} != "."){
            array_push($dna->php,$value);
        }
    }

    $dna->maps = [];
    foreach($mapfiles as $value){
        if($value{0} != "."){
            array_push($dna->maps,$value);
        }
    }

    $dna->scrolls = [];
    foreach($scrollfiles as $value){
        if($value{0} != "."){
            array_push($dna->scrolls,$value);
        }
    }

    echo json_encode($dna,JSON_PRETTY_PRINT);

    $file = fopen("data/dna.txt","w");// create new file with this name
    fwrite($file,json_encode($dna,JSON_PRETTY_PRINT)); //write data to file
    fclose($file);  //close file

?>
</pre>

