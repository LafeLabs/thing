#robotExists = True #python has capitalized booleans because it is dumb
robotExists = False #python has capitalized booleans because it is dumb

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

dirPin1 = 16
stepPin1 = 20
enPin1 = 21
dirPin2 = 8
stepPin2 = 7
enPin2 = 1
dirPin3 = 14
stepPin3 = 15
enPin3 = 18
stepTime = 0.001


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

def moveLeft(numSteps):
    if robotExists:
        GPIO.output(dirPin1,GPIO.LOW)
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
        GPIO.output(dirPin1,GPIO.HIGH)
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
        GPIO.output(dirPin1,GPIO.HIGH)
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
        GPIO.output(dirPin1,GPIO.LOW)
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
        print("move in " + str(numSteps))

def moveOut(numSteps):
    if robotExists:
        
        GPIO.output(dirPin2,GPIO.HIGH) # direction
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
    hypercubefile = open("/var/www/html/jscode/hypercube.js", "r")
else:
    hypercubefile = open("jscode/hypercube.js", "r")


hypercubestring = hypercubefile.read();
hypercuberaw = "[" + hypercubestring.split("[")[1].split("]")[0] + "]"
bytecode = json.loads(hypercuberaw)
hypercubefile.close()

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
#moveDown(20)
#moveIn(100)
#moveLeft(100)
#moveOut(100)
#moveRight(100)
#moveUp(20)

sequence(mainglyph)

#sequence("0500,")


