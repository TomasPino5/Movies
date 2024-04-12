const { MongoClient } = require('mongodb')
require('dotenv').config();

let connectionDb
module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(`mongodb+srv://tomaspino48:velestig5@cluster0.43bl2vl.mongodb.net/moviestore?retryWrites=true&w=majority&appName=Cluster0`)
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