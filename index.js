const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.get('/', (req, res) =>{
    res.send('hello')
})

app.use(bodyParser.json())
app.use('/img/', express.static('images'))
app.use(cors())

app.post('/uploadimages', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./images";
    form.keepExtensions = true;
    let files = []
    form.on('file', function(field, file) {
        files.push(file.path.split('\\').pop())
    })
    form.parse(req, (err, fields, files) => {
        
    })
    form.on('end', () => {
        console.log(files)
        res.json({names: files})
    })
})

app.get('/getdata', (req, res) => {
    let data1 = fs.readFileSync('./data/equipments.json')
    let data2 = fs.readFileSync('./data/home.json')
    res.json({
        equipments: JSON.parse(data1.toString()),
        home: JSON.parse(data2.toString())
    })
    res.end()
})

app.post('/savedata', (req, res) => {
    console.log(req.body)
    fs.writeFileSync('./data/equipments.json', JSON.stringify(req.body.equipments))
    fs.writeFileSync('./data/home.json', JSON.stringify(req.body.home))
    res.status(200)
    res.end()
})

app.listen(8000, () => {
    console.log('servre started')
})