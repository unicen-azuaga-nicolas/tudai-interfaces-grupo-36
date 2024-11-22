'use strict'

const percent = document.getElementById("percent");
var count = 4;
var loading = setInterval(animate, 50);

function animate(){
    if(count === 100){
        percent.classList.add("text-blink");
        clearInterval(loading);
    }
    else{
        count = count + 1;
        percent.textContent = count + '%';
    }
}



window.addEventListener("DOMContentLoaded", ()  => {
    showLoader();
})
window.addEventListener("load", ()  => {
    
    setTimeout(() => {//retrasa el tiempo de ejecucion
        hideLoader();
    }, 3000);
})
const loader = document.getElementById("loaderpage");
    
const showLoader = () => {
   
    loader.classList.add("show_loader");
}
const hideLoader = () => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    setTimeout(() => {
        loader.classList.remove("show_loader"); // Quita display:flex después de la transición
    },  3000); // Coincide con el tiempo de transición
}