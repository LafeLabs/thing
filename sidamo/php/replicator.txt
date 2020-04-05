<?php

//this is the version for the github repo, to be run on localhost, and it copies from the local ip address of the raspberry pi inside the wifi network to the local directory, which then gets pushed to github and can be copied from there to the pi using the global url of the github repo...

// local ip address of raspberry pi inside the wifi is 10.0.0.27.


copy("http://10.0.0.27/fultonmddotnet/sidamo/README.md","README.md");

?>
<a href = "index.html">CLICK TO GO TO PAGE</a>
<style>
a{
    font-size:3em;
}
</style>
