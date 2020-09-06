import ajax, { $, justName } from './utils.js';

async function loadSongsList(){
    const songsList = await ajax.get('/songs');
    const ul = $('#songs-list');
    ul.innerHTML = '';

    for(let song of songsList){
        ul.innerHTML +=
        `
            <li class="song-li" data-fullname="${song.name}">${ justName(song.name)}</li>
        `
    }
}


function putPlayerButtons(){
    const buttonsContainer = $('#player-buttons');
    buttonsContainer.innerHTML += `
        <div class="buttons-player-container">
            <div class="button" id="button-play">
                play
            </div>
            <div class="button" id="button-pause">
                pause
            </div>
            <div class="range">
                <input type="range" id="range" min="0" max="100" />
            </div>
        </div>
    `
}

export {
    loadSongsList,
    putPlayerButtons
}