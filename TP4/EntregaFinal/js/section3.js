"use strict";

const personaje = document.getElementById("per-animate");
const section = document.getElementById("section3");
const video = document.getElementById("video-animate");
const viedoYoutube = document.getElementById("youtube-video");
const btnPlay = document.querySelector(".play");

btnPlay.addEventListener("click", function () {
  // Cambiar el src del iframe para permitir la reproducción automática
  const viedoSrc = viedoYoutube.src;
  viedoYoutube.src = viedoSrc.replace("autoplay=0", "autoplay=1");

  // Ocultar el icono de "play" después de hacer clic
  btnPlay.style.display = "none";
});

window.addEventListener("scroll", function () {
  // Obtén las coordenadas de la sección
  let seccionRect = section.getBoundingClientRect();

  // Verifica si la sección está visible en el viewport
  if (seccionRect.top <= window.innerHeight && seccionRect.bottom >= 0) {
    console.log("Dentro de la sección"); // Mensaje para confirmar
    // Movimiento del personaje si está en la sección
    let scrollRelativo = window.scrollY - section.offsetTop; // Scroll relativo a la sección

    let movimientoMaximo = section.offsetHeight - personaje.offsetHeight; // Espacio máximo disponible para moverse

    // Calcula la nueva posición 'top' del personaje
    let nuevoTop = 50 + scrollRelativo * 0.5;

    // Restringe el valor de 'top' para que no salga de la sección
    if (nuevoTop < 0) nuevoTop = 0; // Límite superior
    if (nuevoTop > movimientoMaximo) nuevoTop = movimientoMaximo; // Límite inferior

    // Aplica el valor ajustado
    personaje.style.top = nuevoTop + "px";
  } else {
    console.log("Fuera de la sección"); // Mensaje para confirmar
  }
});
