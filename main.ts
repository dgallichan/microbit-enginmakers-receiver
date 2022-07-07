radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
    serial.writeValue("triggerCounter", triggerCounter)
    led.toggle(2, 2)
    if (name == "acc") {
        accelerationStrength = value
        if (accelerationStrength > triggerLevel && control.millis() - timeOfLastTrigger_ms > deadTime_ms) {
            triggerCounter += 1
            timeOfLastTrigger_ms = control.millis()
        }
    }
})
let triggerCounter = 0
let timeOfLastTrigger_ms = 0
let accelerationStrength = 0
let triggerLevel = 0
let deadTime_ms = 0
radio.setGroup(1)
deadTime_ms = 500
triggerLevel = 1500
accelerationStrength = 0
timeOfLastTrigger_ms = -1000
triggerCounter = 0
basic.showLeds(`
    . . . . .
    # . . . .
    # . . . .
    # . . . .
    # # # # .
    `)
