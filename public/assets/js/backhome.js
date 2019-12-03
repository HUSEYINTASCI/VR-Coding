 AFRAME.registerComponent('backhome', {
 
    
   init: function () {
     
      let homeworldelements = document.querySelectorAll(".homeworld");
      let sky = document.querySelector("#sky");
      let videosphere = document.querySelector("#videosphereentity");

      
      let gobackhome = () => {
      sky.setAttribute("src", "#skyc");
      videosphere.setAttribute("radius", ".7");
      homeworldelements.forEach((homeworldelement) => {
      homeworldelement.setAttribute("visible", true)})
    }

      this.el.addEventListener('click', gobackhome);
        
   }});
  

