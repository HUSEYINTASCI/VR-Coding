AFRAME.registerComponent('videoplayer', {
  
      init: function () {
        
        let videosource = document.querySelector('#videoclip');

        let videoplay = () => {
        videosource.play(); 
               
        }
        
        this.el.addEventListener('click', videoplay);

      }});
    
    
    
 