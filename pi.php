<?php
$foo =  shell_exec("hostname -I");
$bar = explode(" ",$foo)[0];
echo "http://";
echo $bar;
?>
<p>
<a href = "index.html">MAIN PAGE</a>
</p>
<style>
    body{
        font-family:courier;
        background-color:black;
        color:#00ff00;
        font-size:90px;
        text-align:center;
    }
    a{
        background-color:#b0b0b0;
        color:#0000ff;
        border:solid;
        border-color:#0000ff;
        cursor:pointer;
        padding:0.5em;
        font-family:Arial, Helvetica, sans-serif;
        border-radius:50px;
        border-width:4px;
    }
</style>