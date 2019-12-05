 AFRAME.registerComponent('backhome', {
 
    
   init: function () {
     
      let homeworldelements = document.querySelectorAll(".homeworld");
      let sky = document.querySelector("#sky");
      let videosphere = document.querySelector("#videosphereentity");
       let videosource = document.querySelector("#spherevidclip");
      
      let gobackhome = () => {
      sky.setAttribute("src", "#skyc");
      videosphere.setAttribute("radius", ".7");
        videosource.pause();
      homeworldelements.forEach((homeworldelement) => {
      homeworldelement.setAttribute("visible", true)})
    }

      this.el.addEventListener('click', gobackhome);
        
   }});
  

