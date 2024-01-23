require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const error = require('./middlewares/error')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/',(req,res)=> res.status(200).json({msg: 'OK Server up'}))

app.use(notFound)
app.use(error)

let port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log('Server on port :', port)
})
