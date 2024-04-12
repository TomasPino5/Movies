const express = require('express')
const cors = require('cors')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

const app = express()
app.use(express.json())
app.use(cors())

let db
connectToDb(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('app listening on port 3000')
    })
    db = getDb()
})

//routes
app.get('/movies', (req, res) => {
    const pages = req.query.page || 1
    const booksPerPage = 16
    let movies = []
    db.collection('movies').find().sort({ title: 1 }).skip((pages - 1) * booksPerPage).limit(booksPerPage).forEach(movie => movies.push(movie))
    .then(() => {
        res.status(200).json(movies)
    })
    .catch(() => {
        res.status(500).json({error: 'No se pudieron recuperar los documentos'})
    })
})

app.get('/movies/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('movies').findOne({_id: new ObjectId(req.params.id)})
        .then((document) => {
            res.status(200).json(document)
        })
        .catch(() => {
            res.status(500).json({error: 'No se encontró un documento con ese id'})
        })
    } else {
        res.status(500).json({error: 'Id invalido'})
    }
})

app.get('/search', (req, res) => {
    db.collection('movies').find({title: req.query.name}).toArray()
    .then((document) => {
        res.status(200).json(document)
    })
    .catch(() => {
        res.status(500).json({error: 'No se encontró el documento'})
    })
})

app.get('/count', (req, res) => {
    db.collection('movies').countDocuments()
    .then((number) => {
        res.status(200).json(number)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

app.post('/movies', (req, res) => {
    db.collection('movies').insertOne(req.body)
    .then(() => {
        res.status(200).json({response: 'Pelicula agregada correctamente'})
    })
    .catch(() => {
        res.status(500).json({error: 'Hubo un error al agregar la pelicula'})
    })
})

app.patch('/movies/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('movies').updateOne({_id: new ObjectId(req.params.id)}, {$set: req.body})
        .then(() => {
            res.status(200).json({result: 'El documento se actualizó correctamente'})
        })
        .catch(() => {
            res.status(400).json({error: 'No se pudo actualizar el documento'})
        })
    } else {
        res.status(500).json({error: 'Id invalido'})
    }
})