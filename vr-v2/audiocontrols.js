AFRAME.registerComponent('songplayer', {
  
      init: function () {
        
        let audiosource = document.querySelector('.world');

        let musicplay = () => {
        audiosource.components.sound.playSound()
        }
        
        this.el.addEventListener('click', musicplay);

      }});
    
    AFRAME.registerComponent('songstopper', {
      init: function () {
      
        let audiosource = document.querySelector('.world');

        let musicstop = () => {
        audiosource.components.sound.stopSound()
        }
        
        this.el.addEventListener('click', musicstop);
        
      }});

    AFRAME.registerComponent('songpauser', {
      init: function () {
      
        let audiosource = document.querySelector('.world');

        let musicpause = () => {
        audiosource.components.sound.pauseSound()
        }
        
        this.el.addEventListener('click', musicpause);
        
      }});
    
    