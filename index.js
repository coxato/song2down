const { join } = require('path');
const express = require('express');
const routes = require('./src/routes/songsRoutes');

const app = express();
const PORT = process.env.PORT || 5000; 

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use( express.static( join(__dirname, 'public')));
app.use( express.static( join(__dirname, 'songs')));

// routes
app.use(routes);

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));