const express = require('express')
const connectToMongoDb = require('./config/mongodb')
const addNetflixVideoController = require("./controllers/netflixControllers/addNetflixVideoController")
const multipartyMiddleware = require('./middlewares/videoFileUploadMiddleware')
const multiparty = require('connect-multiparty');


// Use connect-multiparty middleware
// const multipartyMiddleware = multiparty({
//     uploadDir: './public',
// });

const app = express()
app.use(express.json())
// add middleware to parse form data instead of JSON
app.use(express.urlencoded({ extended: true }));
// use a static folder
app.use(express.static('public'));


const port = 3000

connectToMongoDb()

app.get('/', (req, res) => {
    res.send('Hello World! from node js backend server')
})

app.post('/about', (req, res) => {
    res.send('thank you')
})

app.post('/add-videos', multipartyMiddleware, addNetflixVideoController)




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})