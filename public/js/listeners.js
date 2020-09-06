import Player from './player.js';
import { $, justName } from './utils.js';

function loadSong({ target }){
    const songName = target.getAttribute('data-fullname');

    $('#actual-song-title').textContent = justName(songName);
    $('#download').setAttribute('href', `/song/${songName}`);
    Player.loadMusic(`/song/${songName}`);
}

// song list
function addListListeners(){
    const lis = $('.song-li', true);
    lis.forEach( li => {
        li.addEventListener('click', loadSong)
    });
}

// player buttons like play, pause and volume
function addPlayersButtonsListeners(){
    const playBtn = $("#button-play"),
    pauseBtn = $("#button-pause"),
    rangeVol = $("#range");

    playBtn.addEventListener('click', () => Player.playMusic());
    pauseBtn.addEventListener('click', () => Player.pauseMusic());
    rangeVol.addEventListener('input', (ev) => {
        Player.setVolume(Number(ev.target.value)/100);
    })
}




function initListeners(){
    addListListeners();
    addPlayersButtonsListeners();
}

export { initListeners }