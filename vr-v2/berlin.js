
    AFRAME.registerComponent('berlinpic', {
    
        init: function () {
     
           let homeworldelements = document.querySelectorAll(".homeworld");
           let sky = document.querySelector("#sky");
     
           let brloader = () => {
           sky.setAttribute("src", "#berlin");
           homeworldelements.forEach((homeworldelement) => {
           homeworldelement.setAttribute("visible", false)})
           }
     
           this.el.addEventListener('click', brloader);
             
        }});
       