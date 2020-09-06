// singleton model
const Player = {
    player: null,

    initPlayer: function(){
        this.player = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: '#f2f2f2',
        });
    },

    loadMusic: function(songUrl){
        if(!this.player) this.initPlayer();

        this.player.load(songUrl);
    },

    playMusic: function(){
        this.player.play();
    },

    pauseMusic: function(){
        this.player.pause();
    },

    setVolume: function(volume){
        this.player.setVolume(volume);
    },


}

export default Player;