const express = require('express')
const connectToMongoDb = require('./config/mongodb')
const NetflixVideo = require('./models/netflix/NetflixVideo')
const addNetflixVideoController = require("./controllers/netflixControllers/addNetflixVideoController")

const app = express()
app.use(express.json())

const port = 3000

connectToMongoDb()

app.get('/', (req, res) => {
    res.send('Hello World! from node js backend server')
})

app.post('/about', (req, res) => {
    res.send('thank you')
})

app.post('/add-videos', addNetflixVideoController)




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})