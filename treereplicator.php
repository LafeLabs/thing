<pre>
<?php


/*
tree.txt is an array of  JSON objects 

[
    {
        "name":"scrolls/bookofgeometron.md",
    "url":"https://raw.githubusercontent.com/LafeLabs/thing/master/scrolls/bookofgeometron.md"
    },
    {
        "name":"scrolls/civilizations.md",
        "url":"https://raw.githubusercontent.com/LafeLabs/thing/master/scrolls/civilizations.md"
    }
]

*/

$treeurl = "https://raw.githubusercontent.com/LafeLabs/thing/master/data/tree.txt";

if(isset($_GET["tree"])){
    $treeurl = $_GET["tree"];
}


$treeraw = file_get_contents($treeurl);
$tree = json_decode($treeraw);

foreach($tree as $value){

    copy($value->url,$value->name);

}

    echo json_encode($tree,JSON_PRETTY_PRINT);
    
?>
</pre>
<a href = "index.html">CLICK TO GO TO HOME</a>
<style>
a{
    font-size:3em;
}
</style>
