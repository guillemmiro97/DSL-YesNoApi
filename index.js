const express = require('express')
const app = express()
const port = 3000
const functions = require("./yesno")

app.get('/', (req, res) => {
    res.redirect('/api')
})

app.get('/api', functions.generateAnswer)

app.listen(port, () => {
    console.log(`Yes No Api running in  http://localhost:${port}`)
})