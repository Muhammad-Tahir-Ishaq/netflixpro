const mongoose = require('mongoose')

// hard constants
const MONGO_DB_URI = "mongodb://127.0.0.1:27017/NetflixUltraProMax"

const connectToMongoDb = () => {
    mongoose
        .connect(MONGO_DB_URI)
        .then(()=> {
            console.log(`mongo db connected with this string: ${MONGO_DB_URI}`)
        })
        .catch(()=> {
            console.log(`error in mongo db connection`)
        })
}

module.exports = connectToMongoDb
