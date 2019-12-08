<html>
 <head>
 <meta name="viewport" content="width=device-width" />
 <title>Geometron Printer</title>
 </head>
    <body>
        <a href = "editor.php">editor.php</a>
        <a href = "index.html">index.html</a>
         <form method="get" action="directdrive.php">
            <input type="submit" value="PRINT" name="PRINT">
         </form>
    <?php
    
        $currentjsonraw = file_get_contents("data/currentjson.txt");
        $currentjson = json_decode($currentjsonraw);
        $symbols3draw = file_get_contents("data/symbols3d.js");
        $symbols3d = json_decode("[".explode("]",explode("[",$symbols3draw)[1])[0]."]");      

        $hypercube = [];
        for ($index = 0; $index <= 01777; $index++) {
            array_push($hypercube,"0177,");
            echo $index.",";
        }
        for($currentjson->shapes as $value){
            echo $value."<br/>";
            $localaddress = intval(explode(":",$value)[0]),8);
            $hypercube[$localaddress] = explode(":",$value)[1]);
        }

        $unit = 0.2;
        $side = $unit;
        $scaleFactor  = 2;
        
        $triangleLeftPin = "2";
        $triangleRightPin = "3";
        
        $squareLeftPin = "14";
        $squareRightPin = "15";
        
        $pentagonLeftPin = "17";
        $pentagonRightPin = "18";
        
        //$setmode = shell_exec("gpio -g mode ".$triangleLeftPin." out");
        //$setmode = shell_exec("gpio -g mode ".$triangleRightPin." out");
        //$setmode = shell_exec("gpio -g mode ".squareLeftPin." out");
        //$setmode = shell_exec("gpio -g mode ".$squareRightPin." out");
        //$setmode = shell_exec("gpio -g mode ".$pentagonLeftPin." out");
        //$setmode = shell_exec("gpio -g mode ".$pentagonRightPin." out");
        //$gpio_on = shell_exec("gpio -g write ".$triangleLeftPin." 1");
        //$gpio_on = shell_exec("gpio -g write ".$triangleRightPin." 1");
        //$gpio_on = shell_exec("gpio -g write ".squareLeftPin." 1");
        //$gpio_on = shell_exec("gpio -g write ".$squareRightPin." 1");
        //$gpio_on = shell_exec("gpio -g write ".$pentagonLeftPin." 1");
        //$gpio_on = shell_exec("gpio -g write ".$pentagonRightPin." 1");
        
        printGlyph($currentjson->glyph);
        
        
        
        function printAction($localAction){
//            echo $localAction."<br>";
            
            if($localAction == 0341){
                echo "circle<br>";
            }
            if($localAction == 0400){
                echo "unit<br>";
                $side = $unit;
            }
            if($localAction == 0410){
                echo "2x<br>";
                $scaleFactor = 2;
            }
            if($localAction == 0411){
                echo "1.1x<br>";
                $scaleFactor = 1.1;
            }
            if($localAction == 0412){
                echo "1.01x<br>";
                $scaleFactor = 1.01;
            }
            if($localAction == 0430){
                echo "triangleLeft<br>";
                //$gpio_on = shell_exec("gpio -g write ".$triangleLeftPin." 0");
                //usleep(1000000*$side);
                //$gpio_on = shell_exec("gpio -g write ".$triangleLeftPin." 1");
            }
            if($localAction == 0431){
                echo "triangleRight<br>";
                //$gpio_on = shell_exec("gpio -g write ".$triangleRightPin." 0");
                //usleep(1000000*$side);
                //$gpio_on = shell_exec("gpio -g write ".$triangleRightPin." 1");
            }
            if($localAction == 0432){
                echo "squareLeft<br>";
                //$gpio_on = shell_exec("gpio -g write ".$squareLeftPin." 0");
                //usleep(1000000*$side);
                //$gpio_on = shell_exec("gpio -g write ".$squareLeftPin." 1");
            }
            if($localAction == 0433){
                echo "squareRight<br>";
                //$gpio_on = shell_exec("gpio -g write ".$squareRightPin." 0");
                //usleep(1000000*$side);
                //$gpio_on = shell_exec("gpio -g write ".$squareRightPin." 1");
            }
            if($localAction == 0434){
                echo "pentagonLeft<br>";
                //$gpio_on = shell_exec("gpio -g write ".$pentagonLeftPin." 0");
                //usleep(1000000*$side);
                //$gpio_on = shell_exec("gpio -g write ".$pentagonLeftPin." 1");
            }
            if($localAction == 0435){
                echo "pentagonRight<br>";
                //$gpio_on = shell_exec("gpio -g write ".$triangleRightPin." 0");
                //usleep(1000000*$side);
                //$gpio_on = shell_exec("gpio -g write ".$triangleRightPin." 1");
            }
            if($localAction == 0436){
                echo "shrinkTime<br>";
                $side = $side/$scaleFactor;
            }
            if($localAction == 0437){
                echo "growTime<br>";
                $side = $side*$scaleFactor
            }
            if($localAction == 0477){
                echo "pause<br>";
                //usleep(1000000*$side);
            }
            
            if($localAction >= 0500 && $localAction <= 0677){
                printGlyph($hypercube[$localAction]);
            }
            if($localAction >= 040 && $localAction <= 0277){
                printGlyph($hypercube[$localAction]);
            }
            if($localAction >= 01000 && $localAction <= 01777){
                printGlyph($hypercube[$localAction]);
            }

        }
        
        function printGlyph($localGlyph){
            $glyphStringArray = explode(",",$localGlyph);
            $glyphArray = [];
            foreach($glyphStringArray as $value){
                if(strlen($value) > 0){
                    array_push($glyphArray,intval($value, 8));
                }
            }
            foreach($glyphArray as $value){
                printAction($value);
            }
        }
        
        //create function printAction() and printGlyph
        //printAction does printGlyph for anything other than 
        //04xx, and 04xx is manipulations of global variables and
        //putting out control pulses for one direction of one thing 
        //at a time or zero clock wait, zoom in zoom out
        //05xx are built from that, use the whole hypercube to program
        //printAction calls printGlyph for geometron glyphs
        //printGlyph explodes with coma delimieter and goes thru the
        //array calling printAction repeatedly
        

    ?>
    <p>
        <a href = "index.html">index.html</a>
    </p>
    <p>
        <a href = "editor.php">editor.php</a>
    </p>
   </body>
</html>