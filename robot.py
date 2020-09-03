polarity1 = 0
polarity2 = 0
polarity3 = 0
upsidedown = 0

#python has capitalized booleans
#robotExists = False # this is used for debugging on non-pi machines wihtout robots
robotExists = True 


from time import sleep # Import the sleep function from the time module

if robotExists:
    import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
    GPIO.setwarnings(False) # Ignore warning for now
    GPIO.setmode(GPIO.BCM) # Use physical pin numbering

if not robotExists:
    print("no robot here")

if robotExists:
    print("there is a robot")

import json

enPin1 = 14
stepPin1 = 15
dirPin1 = 18

enPin2 = 25
stepPin2 = 8
dirPin2 = 7

enPin3 = 16
stepPin3 = 20
dirPin3 = 21

controlpin1 = 6
controlpin2 = 13
controlpin3 = 19
controlpin4 = 26

controlpin5 = 5
controlpin6 = 0
controlpin7 = 11
controlpin8 = 9

controlpin9 = 10
controlpin10 = 22
controlpin11 = 27
controlpin12 = 17


stopPin = 4

stepTime = 0.0006


if robotExists:
    GPIO.setup(dirPin1, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(stepPin1, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(enPin1, GPIO.OUT, initial=GPIO.HIGH) # 
    GPIO.setup(dirPin2, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(stepPin2, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(enPin2, GPIO.OUT, initial=GPIO.HIGH) # 
    GPIO.setup(dirPin3, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(stepPin3, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(enPin3, GPIO.OUT, initial=GPIO.HIGH) # 
    GPIO.setup(controlpin1, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin2, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin3, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin4, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin5, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin6, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin7, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin8, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin9, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin10, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin11, GPIO.OUT, initial=GPIO.LOW) # 
    GPIO.setup(controlpin12, GPIO.OUT, initial=GPIO.LOW) # 

    GPIO.setup(stopPin, GPIO.IN, pull_up_down=GPIO.PUD_UP) # 

def control1on():
    if robotExists:
        GPIO.output(controlpin1,GPIO.HIGH) 
    else:
        print("control 1 on")

def control1off():
    if robotExists:
        GPIO.output(controlpin1,GPIO.LOW) 
    else:
        print("control 1 off")

def control2on():
    if robotExists:
        GPIO.output(controlpin2,GPIO.HIGH) 
    else:
        print("control 2 on")

def control2off():
    if robotExists:
        GPIO.output(controlpin2,GPIO.LOW) 
    else:
        print("control 2 off")

def control3on():
    if robotExists:
        GPIO.output(controlpin3,GPIO.HIGH) 
    else:
        print("control 3 on")

def control3off():
    if robotExists:
        GPIO.output(controlpin3,GPIO.LOW) 
    else:
        print("control 3 off")

def control4on():
    if robotExists:
        GPIO.output(controlpin4,GPIO.HIGH) 
    else:
        print("control 4 on")

def control4off():
    if robotExists:
        GPIO.output(controlpin4,GPIO.LOW) 
    else:
        print("control 4 off")

def control5on():
    if robotExists:
        GPIO.output(controlpin5,GPIO.HIGH) 
    else:
        print("control 5 on")

def control5off():
    if robotExists:
        GPIO.output(controlpin5,GPIO.LOW) 
    else:
        print("control 5 off")

def control6on():
    if robotExists:
        GPIO.output(controlpin6,GPIO.HIGH) 
    else:
        print("control 6 on")

def control6off():
    if robotExists:
        GPIO.output(controlpin6,GPIO.LOW) 
    else:
        print("control 6 off")

def control7on():
    if robotExists:
        GPIO.output(controlpin7,GPIO.HIGH) 
    else:
        print("control 7 on")

def control7off():
    if robotExists:
        GPIO.output(controlpin7,GPIO.LOW) 
    else:
        print("control 7 off")

def control8on():
    if robotExists:
        GPIO.output(controlpin8,GPIO.HIGH) 
    else:
        print("control 8 on")

def control8off():
    if robotExists:
        GPIO.output(controlpin8,GPIO.LOW) 
    else:
        print("control 8 off")

def control9on():
    if robotExists:
        GPIO.output(controlpin9,GPIO.HIGH) 
    else:
        print("control 9 on")

def control9off():
    if robotExists:
        GPIO.output(controlpin9,GPIO.LOW) 
    else:
        print("control 9 off")

def control10on():
    if robotExists:
        GPIO.output(controlpin10,GPIO.HIGH) 
    else:
        print("control 10 on")

def control10off():
    if robotExists:
        GPIO.output(controlpin10,GPIO.LOW) 
    else:
        print("control 10 off")

def control11on():
    if robotExists:
        GPIO.output(controlpin11,GPIO.HIGH) 
    else:
        print("control 11 on")

def control11off():
    if robotExists:
        GPIO.output(controlpin11,GPIO.LOW) 
    else:
        print("control 11 off")

def control12on():
    if robotExists:
        GPIO.output(controlpin12,GPIO.HIGH) 
    else:
        print("control 12 on")

def control12off():
    if robotExists:
        GPIO.output(controlpin12,GPIO.LOW) 
    else:
        print("control 12 off")

def moveLeft(numSteps):
    if robotExists:
        if polarity1 == 0:
            GPIO.output(dirPin1,GPIO.HIGH)    
        else:
            GPIO.output(dirPin1,GPIO.LOW)    
        if polarity3 == 0:
            GPIO.output(dirPin3,GPIO.LOW) 
        else:
            GPIO.output(dirPin3,GPIO.HIGH) 

        GPIO.output(enPin1, GPIO.LOW) # enable  
        GPIO.output(enPin3, GPIO.LOW) # enable  
        GPIO.output(enPin2, GPIO.HIGH) # deenable  
        for x in range(abs(numSteps)):
            GPIO.output(stepPin1, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin1, GPIO.LOW) # Turn off
            sleep(stepTime) # 
            GPIO.output(stepPin3, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin3, GPIO.LOW) # Turn off
            sleep(stepTime) #       
        GPIO.output(enPin1, GPIO.HIGH) # de-enable  
        GPIO.output(enPin3, GPIO.HIGH) # de-enable  
    else:
        print("move left " + str(numSteps))
        
def moveRight(numSteps):
    if robotExists:
        if polarity1 == 0:
            GPIO.output(dirPin1,GPIO.LOW)    
        else:
            GPIO.output(dirPin1,GPIO.HIGH)    
        if polarity3 == 0:
            GPIO.output(dirPin3,GPIO.HIGH) 
        else:
            GPIO.output(dirPin3,GPIO.LOW) 

        
        GPIO.output(enPin1, GPIO.LOW) # enable  
        GPIO.output(enPin3, GPIO.LOW) # enable  
        GPIO.output(enPin2, GPIO.HIGH) # deenable  
        for x in range(abs(numSteps)):
            GPIO.output(stepPin1, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin1, GPIO.LOW) # Turn off
            sleep(stepTime) # 
            GPIO.output(stepPin3, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin3, GPIO.LOW) # Turn off
            sleep(stepTime) #       
        GPIO.output(enPin1, GPIO.HIGH) # de-enable  
        GPIO.output(enPin3, GPIO.HIGH) # de-enable  
    else:
        print("move right " + str(numSteps))

def moveUp(numSteps):
    if robotExists:
        if polarity1 == 0:
            GPIO.output(dirPin1,GPIO.LOW)    
        else:
            GPIO.output(dirPin1,GPIO.HIGH)    
        if polarity3 == 0:
            GPIO.output(dirPin3,GPIO.LOW) 
        else:
            GPIO.output(dirPin3,GPIO.HIGH) 
        
        GPIO.output(enPin2, GPIO.HIGH) # deenable  
        GPIO.output(enPin1, GPIO.LOW) # enable  
        GPIO.output(enPin3, GPIO.LOW) # enable  
        for x in range(abs(numSteps)):
            GPIO.output(stepPin1, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin1, GPIO.LOW) # Turn off
            sleep(stepTime) # 
            GPIO.output(stepPin3, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin3, GPIO.LOW) # Turn off
            sleep(stepTime) #       
        GPIO.output(enPin1, GPIO.HIGH) # de-enable  
        GPIO.output(enPin3, GPIO.HIGH) # de-enable  
    else:
        print("move up " + str(numSteps))

def moveDown(numSteps):
    if robotExists:
        if polarity1 == 0:
            GPIO.output(dirPin1,GPIO.HIGH)    
        else:
            GPIO.output(dirPin1,GPIO.LOW)    
        if polarity3 == 0:
            GPIO.output(dirPin3,GPIO.HIGH) 
        else:
            GPIO.output(dirPin3,GPIO.LOW) 

        GPIO.output(enPin2, GPIO.HIGH) # deenable  
        GPIO.output(enPin1, GPIO.LOW) # enable  
        GPIO.output(enPin3, GPIO.LOW) # enable  
        for x in range(abs(numSteps)):
            GPIO.output(stepPin1, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin1, GPIO.LOW) # Turn off
            sleep(stepTime) # 
            GPIO.output(stepPin3, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin3, GPIO.LOW) # Turn off
            sleep(stepTime) #       
        GPIO.output(enPin1, GPIO.HIGH) # de-enable  
        GPIO.output(enPin3, GPIO.HIGH) # de-enable  
    else:
        print("move down " + str(numSteps))

def moveIn(numSteps):
    if robotExists:
        if polarity2 == 0:
            GPIO.output(dirPin2,GPIO.LOW)
        else:
            GPIO.output(dirPin2,GPIO.HIGH)
        GPIO.output(enPin2, GPIO.LOW) # enable
        GPIO.output(enPin3, GPIO.HIGH) # deenable    
        GPIO.output(enPin1, GPIO.HIGH) # deenable  
        for x in range(abs(numSteps)):
            GPIO.output(stepPin2, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin2, GPIO.LOW) # Turn off
            sleep(stepTime) # 
        GPIO.output(enPin2, GPIO.HIGH) # de-enable  
    else:
        print("move in " + str(numSteps))

def moveOut(numSteps):
    if robotExists:
        if polarity2 == 0:
            GPIO.output(dirPin2,GPIO.HIGH)
        else:
            GPIO.output(dirPin2,GPIO.LOW)
        GPIO.output(enPin2, GPIO.LOW) # enable
        GPIO.output(enPin3, GPIO.HIGH) # deenable    
        GPIO.output(enPin1, GPIO.HIGH) # deenable  
        for x in range(abs(numSteps)):
            GPIO.output(stepPin2, GPIO.HIGH) # Turn on
            sleep(stepTime) #  
            GPIO.output(stepPin2, GPIO.LOW) # Turn off
            sleep(stepTime) # 
        GPIO.output(enPin2, GPIO.HIGH) # de-enable  
    else:
        print("move out " + str(numSteps))

if robotExists:
    robotfile = open("/var/www/html/data/robot.txt", "r")
else:
    robotfile = open("data/robot.txt", "r")

robotjson = json.loads(robotfile.read())
robotfile.close()

if robotExists:
    hypercubefile = open("/var/www/html/data/hypercube.txt", "r")
else:
    hypercubefile = open("data/hypercube.txt", "r")

hypercubestring = hypercubefile.read();

hypercuberaw = "[" + hypercubestring.split("[")[1].split("]")[0] + "]"
bytecode = json.loads(hypercuberaw)
hypercubefile.close()


polarity1 = robotjson["polarity1"]
polarity2 = robotjson["polarity2"]
polarity3 = robotjson["polarity3"]
upsidedown = robotjson["upsidedown"]

if upsidedown == 1:
    enPin1 = 16
    stepPin1 = 20
    dirPin1 = 21
    enPin3 = 14
    stepPin3 = 15
    dirPin3 = 18
    polarity2 = polarity2^1

unit = 100
numSteps = unit

mainglyph = robotjson["glyph"]
#keyboard = robotjson["keyboard"]

hypercube = []
for index in range(1024):
    hypercube.append("")

for row in bytecode:
    splitrow = row.split(":")
    if len(splitrow) > 0:
        address = int(splitrow[0],8)
        hypercube[address] = splitrow[1]

def action(address):
    global numSteps
    #address is an integer, an index in the Hypercube
    if address == 0o400:
        moveRight(numSteps)
    if address == 0o401:
        moveLeft(numSteps)
    if address == 0o402:
        moveOut(numSteps)
    if address == 0o403:
        moveIn(numSteps)
    if address == 0o0404:
        moveUp(numSteps)
    if address == 0o0405:
        moveDown(numSteps)
    if address == 0o0406:
        numSteps /= 2
    if address == 0o0407:
        numSteps *= 2
    if address == 0o0410:
        if robotExists:
            for x in range(abs(numSteps)):
                sleep(stepTime)   
                sleep(stepTime)  
        else:
            print("pause")
    if address == 0o0411:
        control1on()
    if address == 0o0412:
        control1off()
    if address == 0o0413:
        control2on()
    if address == 0o0414:
        control2off()
    if address == 0o0415:
        control3on()
    if address == 0o0416:
        control3off()
    if address == 0o0417:
        control4on()
    if address == 0o0420:
        control4off()
    if address == 0o0421:
        control5on()
    if address == 0o0422:
        control5off()
    if address == 0o0423:
        control6on()
    if address == 0o0424:
        control6off()
    if address == 0o0425:
        control7on()
    if address == 0o0426:
        control7off()
    if address == 0o0427:
        control8on()
    if address == 0o0430:
        control8off()
    if address == 0o0431:
        control9on()
    if address == 0o0432:
        control9off()
    if address == 0o0433:
        control10on()
    if address == 0o0434:
        control10off()
    if address == 0o0435:
        control11on()
    if address == 0o0436:
        control11off()
    if address == 0o0437:
        control12on()
    if address == 0o0440:
        control12off()
        
        
def sequence(glyph):
    #glyph is a string which is a comma delimited array of base 8 numbers in js notation
    glyphArray = glyph.split(",")
    for addressstring in glyphArray:
        #print(addressstring)
        if len(addressstring) > 0:
            address = int(addressstring,8)
            #print(address)
            if address >= 0o400 and address < 0o500:
              action(address)
            if address >= 0o500 and address < 0o600:
              sequence(hypercube[address])
            if address >= 0o1000 and address < 0o1777:
              sequence(hypercube[address])
            if address >= 0o200 and address < 0o277:
              sequence(hypercube[address])
            if robotExists:
                if not GPIO.input(stopPin):
                    break

sequence(mainglyph)
control1off()
control2off()
control3off()
control4off()
control5off()
control6off()
control7off()
control8off()
control9off()
control10off()
control11off()
control12off()

#sequence("0500,")


