"use strict";

document.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const heroBackground = document.querySelector(".hero-background");
  const cardsContainer = document.querySelector(".cards-app");
  const limit = 0; // Establece el límite de desplazamiento para activar la animación
  //personajes
  const pj1 = document.querySelector(".pj1");
  const sombra1 = document.querySelector(".sombra-1");
  const pj2 = document.querySelector(".pj2");
  const sombra2 = document.querySelector(".sombra-2");
  const pj3 = document.querySelector(".pj3");
  const sombra3 = document.querySelector(".sombra-3");
  // arboles
  const tree1 = document.querySelector(".arbol-1");
  const tree2 = document.querySelector(".arbol-2");
  const tree3 = document.querySelector(".arbol-3");

  if (scrollPosition > limit) {
    // animación paralax de fondo
    heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;

    //animacion de personajes en eje Y mediante el scoll de la pagina hasta un maximo de 600px
    pj1.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    sombra1.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    pj2.style.transform = `translateY(${-scrollPosition * 0.1}px)`;
    sombra2.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    pj3.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    sombra3.style.transform = `translateY(${scrollPosition * 0.2}px)`;

    // animación paralax de arboles eje X
    tree1.style.transform = `translateX(${-scrollPosition * 0.5}px)`;
    tree2.style.transform = `translateX(${scrollPosition * 0.3}px)`;
    tree3.style.transform = `translateX(${scrollPosition * 0.1}px)`;
  } else {
    heroBackground.style.transform = `translateY(${limit}px)`;
    pj1.style.transform = `translateY(${limit}px)`;
    pj2.style.transform = `translateY(${limit}px)`;
    pj3.style.transform = `translateY(${limit}px)`;
    tree1.style.transform = `translateX(${limit}px)`;
    tree2.style.transform = `translateX(${limit}px)`;
    tree3.style.transform = `translateX(${limit}px)`;
  }

  if (scrollPosition > 1250) {
    let tarjetas = cardsContainer.querySelectorAll("div .container-card-app");
    tarjetas.forEach((tarjeta) => tarjeta.classList.add("card-app-anim"));
  } else {
    let tarjetas = cardsContainer.querySelectorAll("div .container-card-app");
    tarjetas.forEach((tarjeta) => tarjeta.classList.remove("card-app-anim"));
  }
});
