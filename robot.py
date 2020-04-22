import json

robotfile = open("data/robot.txt", "r")
robotjson = json.loads(robotfile.read())
robotfile.close()

robotfile = open("data/currentjson.txt", "r")
robotjson = json.loads(robotfile.read())
robotfile.close()


hypercubefile = open("jscode/hypercube.js", "r")
hypercubestring = hypercubefile.read();
hypercuberaw = "[" + hypercubestring.split("[")[1].split("]")[0] + "]"
bytecode = json.loads(hypercuberaw)
hypercubefile.close()

unit = 100
numSteps = unit

mainglyph = robotjson["robotglyph"]
#keyboard = robotjson["keyboard"]

hypercube = []
for index in range(1024):
    hypercube.append("")

for row in bytecode:
    splitrow = row.split(":")
    if len(splitrow) > 0:
        address = int(splitrow[0],8)
        hypercube[address] = splitrow[1]

def moveLeft(x):
    print("move left " + str(x))
    #do the thing on the gpio here
def moveRight(x):
    print("move right " + str(x))
def moveIn(x):
    print("move in " + str(x))
def moveOut(x):
    print("move out " + str(x))
def moveUp(x):
    print("move up " + str(x))
def moveDown(x):
    print("move down " + str(x))


def action(address):
    global numSteps
    #address is an integer, an index in the Hypercube
    if address == 0o400:
        moveLeft(numSteps)
    if address == 0o401:
        moveRight(numSteps)
    if address == 0o402:
        moveIn(numSteps)
    if address == 0o403:
        moveOut(numSteps)
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

sequence(mainglyph)
#sequence("0500,0407,0407,0500,0407,0407,0500,")