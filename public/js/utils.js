// very simple ajax
class Ajax{

    async get(url){
        try {
            
            const response = await fetch(url);
            const json = await response.json();

            return json;

        } catch ({message}) {
            console.error(message);
            return;
        }
    }

    async sendSong(url, songName, songFile){
        try {
            const data = new FormData();
            data.append('name', songName);
            data.append('song', songFile);

            const response = await fetch(url, {
                method: 'POST',
                body: data
            }); 
 
            const json = await response.json();
            return json;

        } catch ({message}) {
            console.error(message);
            return;
        }
    }
}


// $like jquery
function $(elementStr, manyElements = false){
    let _$;
    if(manyElements) _$ = document.querySelectorAll.bind(document);
    else _$ = document.querySelector.bind(document);

    const elmt = _$(elementStr);

    return manyElements ? [...elmt] : elmt;
}

function justName(songName) {
    return songName.replace( '.' + songName.split('.').pop(), '');
}


export default new Ajax();

export { $, justName } 
