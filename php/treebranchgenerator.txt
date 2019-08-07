<!-- 
this program generates the file data/treebranches.txt
treedna.txt is a json formatted file which points to all the files in this system, which is then used by replciator.php to copy the whole thing.  The file names are local, so that the replicator can work when pointed at any address where this system lives, which could be any new instance, so that the system can replicate without any reference to some centralized repository such as one on github. 
-->
<a href = "editor.php">editor.php</a>
<br/>
<pre>
<?php

    $treedna = json_decode("{}");

    $dirs = scandir(getcwd());
    
    $symbolslist = scandir(getcwd()."/symbols");
    
    $branches = [];
    foreach($dirs as $value){
        if($value{0} != "." && is_dir($value) && $value != "symbols" && $value != "symbol" && $value != "php" && $value != "jscode" && $value != "data" && $value != "iconsymbols" && $value != "uploadimages"){
            array_push($branches,$value);
        }
    }
    
    $treedna->branches = $branches;
    
    $symbols = [];
    foreach($symbolslist as $value){
        if(substr($value,-4) == ".svg"){
            array_push($symbols,$value);
        }
    }
    $treedna->symbols = $symbols;

//    echo json_encode($branches,JSON_PRETTY_PRINT);
  //  echo json_encode($symbols,JSON_PRETTY_PRINT);
    echo json_encode($treedna,JSON_PRETTY_PRINT);

    $file = fopen("data/treebranches.txt","w");// create new file with this name
    fwrite($file,json_encode($branches,JSON_PRETTY_PRINT)); //write data to file
    fclose($file);  //close file
    $file = fopen("data/symbols.txt","w");// create new file with this name
    fwrite($file,json_encode($symbols,JSON_PRETTY_PRINT)); //write data to file
    fclose($file);  //close file

?>
</pre>

