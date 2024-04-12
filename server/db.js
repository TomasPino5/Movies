const { MongoClient } = require('mongodb')
require('dotenv').config();

let connectionDb
module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.43bl2vl.mongodb.net/moviestore?retryWrites=true&w=majority&appName=Cluster0`)
        .then((client) => {
            connectionDb = client.db()
            return cb()
        })
        .catch((err) => {
            console.log(err);
            return cb(err)
        })
    },
    getDb: () => connectionDb
}