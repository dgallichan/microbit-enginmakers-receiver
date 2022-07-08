function triggerDetector () {
    // This compares the acceleration strength against our chosen 'triggerLevel'
    // This compares the time since the last trigger against our chosen 'deadTime_ms'
    if (accelerationStrength > triggerLevel && control.millis() - timeOfLastTrigger_ms > deadTime_ms) {
        triggerCounter += 1
        timeOfLastTrigger_ms = control.millis()
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    }
}
radio.onReceivedValue(function (name, value) {
    // The 'serial write' blocks send data from the microbit to the computer so we can see it on the screen
    serial.writeValue(name, value)
    serial.writeValue("triggerCounter", triggerCounter)
    // Here we store the received value of acceleration in a variable on our receiver
    accelerationStrength = value
    triggerDetector()
    // This just flashes one of the LEDs to let us know that data is being received
    led.toggle(2, 2)
})
let triggerCounter = 0
let timeOfLastTrigger_ms = 0
let accelerationStrength = 0
let deadTime_ms = 0
let triggerLevel = 0
// Here you can set the 'triggerLevel' and 'deadTime_ms' variables
triggerLevel = 1500
deadTime_ms = 0
radio.setGroup(0)
// You don't need to change these variables - here we are just giving them values to start off
accelerationStrength = 0
timeOfLastTrigger_ms = -1000
triggerCounter = 0
// It's useful to know what code we have on which microbit - here we've put 'R' for 'receiver' 
basic.showLeds(`
    # # # # .
    # . . # .
    # # # # .
    # . # . .
    # . . # .
    `)
