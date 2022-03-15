let maybeCounter = 0

function generateAnswer(req, res) {
    let value
    let link
    let force = false

    value = getForced(req)

    //If the request has parameters...
    if (value !== undefined) {
        force = true
    } else {
        value = getYesNo()
    }

    link = getLink(value)

    res.json({
        answer: value,
        forced: force,
        image: link
    })
}

//Function to return the value of force
function getForced(req) {
    let param = req.query.force
    console.log("Param value is " + param + "...")
    return param
}

//Function to return the yes/no/maybe string
function getYesNo() {
    maybeCounter++
    console.log("Maybe counter value " + maybeCounter + "...")

    //Check if we have arrived to 10000 requests
    if (maybeCounter === 10000) {
        return "maybe"
    } else {
        //Generate random number to get yes or no response
        const randomNumber = Math.floor(Math.random()*2);

        if (randomNumber === 1) {
            return "yes"
        } else {
            return "no"
        }
    }
}

//Function to return the link of the gifs
function getLink(value) {
    //Reading the links into an array of strings
    const fs = require("fs")
    let text = fs.readFileSync("./files/yesLinks.txt") + ''
    const yesLinks = text.split("\n")

    text = fs.readFileSync("./files/noLinks.txt") + ''
    const noLinks = text.split("\n")

    //Get a random number from the list links
    const randomNumber = Math.floor(Math.random()*yesLinks.length);

    if (value === "yes") {
        console.log("The link is " + yesLinks[randomNumber])
        return yesLinks[randomNumber].replace('\r', "")
    } else if (value === "maybe") {
        console.log("Returning maybe link...")
        return "https://c.tenor.com/M5IXHzf8COwAAAAd/maybe.gif"
    } else {
        console.log("The link is " + noLinks[randomNumber])
        return noLinks[randomNumber].replace('\r', "")
    }
}

module.exports = {generateAnswer}