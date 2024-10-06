const express = require('express')
const v1Routes = require('./route')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

let corsOptions = {
    origin : ['http://localhost:5500', 'https://task-silk-three.vercel.app'],
 }
 
app.use(cors(corsOptions))
 


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/v1", v1Routes)

module.exports = app