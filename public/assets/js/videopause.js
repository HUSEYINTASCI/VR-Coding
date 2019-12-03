AFRAME.registerComponent('vid', {
  
    init: function () {
      
      let videosource = document.querySelector('#videoclip');

      let videoplay = () => {
      videosource.pause(); 
             
      }
      
      this.el.addEventListener('click', videoplay);

    }});
  
  
  