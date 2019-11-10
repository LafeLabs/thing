<a href = "editor.php">editor.php</a>
<br/>
<pre>
<?php

    $files = scandir(getcwd());
    $jsfiles = scandir(getcwd()."/jscode");
    $iconfiles = scandir(getcwd()."/iconsymbols");
    $phpfiles = scandir(getcwd()."/php");
    $datafiles = scandir(getcwd()."/data");

    $htmlfiles = [];
    foreach($files as $value){
        if(substr($value,-5) == ".html" || substr($value,-3) == ".md"){
            array_push($htmlfiles,$value);
        }
    }

    $dna = json_decode("{}");
    $dna->html = $htmlfiles;

    $dna->javascript = [];
    foreach($jsfiles as $value){
        if($value{0} != "."){
            array_push($dna->javascript,$value);
        }
    }
    
    $dna->iconsymbols = [];
    foreach($iconfiles as $value){
        if($value{0} != "."){
            array_push($dna->iconsymbols,$value);
        }
    }

    $dna->data = [];
    foreach($datafiles as $value){
        if($value{0} != "."){
            array_push($dna->data,$value);
        }
    }

    
    $dna->php = [];
    foreach($phpfiles as $value){
        if($value{0} != "."){
            array_push($dna->php,$value);
        }
    }

    $finalstring = "dna = ".json_encode($dna).";";

    echo json_encode($dna,JSON_PRETTY_PRINT);

    $file = fopen("data/dna.txt","w");// create new file with this name
    fwrite($file,json_encode($dna)); //write data to file
    fclose($file);  //close file

?>
</pre>