import { loadSongsList, putPlayerButtons } from './ui.js'
import Player from './player.js';
import { initListeners } from './listeners.js';


document.addEventListener('DOMContentLoaded', async () => {
    // UI
    await loadSongsList();
    putPlayerButtons();
    window.player = Player

    // default song
    Player.loadMusic('/song/tu-carcel.mp3');

    // play, pause, volume and change song
    initListeners();
})
