const { join } = require('path');
const express = require('express');
const mediaserver = require('mediaserver');
const fsPromises = require('fs').promises;
const multer = require("multer");
const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use( express.static( join(__dirname, 'public')));
app.use( express.static( join(__dirname, 'songs')));

// multer
const options = multer.diskStorage({
    destination: join(__dirname, 'songs'),

    filename: function(req, file, cb) {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage: options });

// routes
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
})

// songs
app.get('/songs', async (req, res) => {
    const jsonFile = await fsPromises.readFile(join(__dirname, 'miniDB.json'), 'utf-8');
    // console.log(jsonFile);
    res.json(JSON.parse(jsonFile));
})

app.get('/song/:name', async (req, res) => {
    const { name } = req.params;
    // const songFile = await fsPromises.readFile(join(__dirname, 'songs', name+'.mp3'));
    console.log("el name", name);
    mediaserver.pipe(req, res, join(__dirname, 'songs', name))
})

// upload song 
app.post('/song', upload.single('file'), async (req, res) => {
    const name = req.file.originalname;
    console.log("######### filename", name);
    // get mini db
    const miniDB = await fsPromises.readFile(join(__dirname, 'miniDB.json'), 'utf-8');
    const songs = JSON.parse(miniDB);
    songs.push({
        name 
    });
    // save in db
    await fsPromises.writeFile(join(__dirname, 'miniDB.json'), JSON.stringify(songs));
 
    res.redirect('/');

})





app.listen(3000, () => console.log('server started at localhost:3000'));