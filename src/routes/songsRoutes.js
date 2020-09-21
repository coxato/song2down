const router = require('express').Router();
const mediaserver = require('mediaserver');
const fs = require('fs');
const { join } = require('path');
const upload = require('../config/multerConfig');


router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '/../../index.html'));
})

// songs
router.get('/songs', async (req, res) => {
    const jsonFile = await fs.promises.readFile(join(__dirname, '/../../miniDB.json'), 'utf-8');
    res.json(JSON.parse(jsonFile));
})

// get one song
router.get('/song/:name', async (req, res) => {
    const { name } = req.params;
    console.log("songname:", name);
    mediaserver.pipe(req, res, join(__dirname, '/../../songs', name))
})

// upload song 
router.post('/song', upload.single('file'), async (req, res) => {
    const name = req.file.originalname;
    // get mini db
    const miniDB = await fs.promises.readFile(join(__dirname, '/../../miniDB.json'), 'utf-8');
    const songs = JSON.parse(miniDB);
    songs.push({ name });
    // save in db
    await fs.promises.writeFile(join(__dirname, '/../../miniDB.json'), JSON.stringify(songs));
 
    res.redirect('/');
})

module.exports = router;