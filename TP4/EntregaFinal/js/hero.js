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

  // arbustos
  const arbusto1 = document.querySelector(".arbusto-1");
  const arbusto2 = document.querySelector(".arbusto-2");
  const arbusto3 = document.querySelector(".arbusto-3");
  const arbusto4 = document.querySelector(".arbusto-4");

  // rocas
  const roca1 = document.querySelector(".roca-1");
  const roca2 = document.querySelector(".roca-2");
  const roca3 = document.querySelector(".roca-3");
  const roca4 = document.querySelector(".roca-4");

  if (scrollPosition > limit) {
    // animación paralax de fondo
    heroBackground.style.transform = `translateY(${-scrollPosition * 0.1}px)`;

    //animacion de personajes en eje Y mediante el scoll de la pagina hasta un maximo de 600px
    pj1.style.transform = `translateY(${-scrollPosition * 0.3}px)`;
    sombra1.style.transform = `translateY(${-scrollPosition * 0.2}px)`;

    pj2.style.transform = `translateY(${-scrollPosition * 0.3}px)`;
    sombra2.style.transform = `translateY(${-scrollPosition * 0.2}px)`;

    pj3.style.transform = `translateY(${-scrollPosition * 0.3}px)`;
    sombra3.style.transform = `translateY(${-scrollPosition * 0.2}px)`;

    // árbol delantero
    tree1.style.transform = `translateY(${-scrollPosition * 0.5}px)`;
    arbusto1.style.transform = `translateY(${-scrollPosition * 0.5}px)`;
    arbusto2.style.transform = `translateY(${-scrollPosition * 0.5}px)`;
    roca2.style.transform = `translateY(${-scrollPosition * 0.5}px)`;

    // árbol medio
    tree3.style.transform = `translateY(${-scrollPosition * 0.3}px)`;
    roca1.style.transform = `translateY(${-scrollPosition * 0.3}px)`;
    roca3.style.transform = `translateY(${-scrollPosition * 0.3}px)`;
    roca4.style.transform = `translateY(${-scrollPosition * 0.3}px)`;

    // árbol trasero
    tree2.style.transform = `translateY(${-scrollPosition * 0.2}px)`;
    arbusto3.style.transform = `translateY(${-scrollPosition * 0.2}px)`;
    arbusto4.style.transform = `translateY(${-scrollPosition * 0.2}px)`;
  } else {
    heroBackground.style.transform = `translateY(${limit}px)`;
    pj1.style.transform = `translateY(${limit}px)`;
    pj2.style.transform = `translateY(${limit}px)`;
    pj3.style.transform = `translateY(${limit}px)`;
    tree1.style.transform = `translateY(${limit}px)`;
    tree2.style.transform = `translateY(${limit}px)`;
    tree3.style.transform = `translateY(${limit}px)`;
    arbusto1.style.transform = `translateY(${limit}px)`;
    arbusto2.style.transform = `translateY(${limit}px)`;
    arbusto3.style.transform = `translateY(${limit}px)`;
    arbusto4.style.transform = `translateY(${limit}px)`;
    roca1.style.transform = `translateY(${limit}px)`;
    roca2.style.transform = `translateY(${limit}px)`;
    roca3.style.transform = `translateY(${limit}px)`;
    roca4.style.transform = `translateY(${limit}px)`;
  }

  if (scrollPosition > 1250) {
    let tarjetas = cardsContainer.querySelectorAll("div .container-card-app");
    tarjetas.forEach((tarjeta) => tarjeta.classList.add("card-app-anim"));
  } else {
    let tarjetas = cardsContainer.querySelectorAll("div .container-card-app");
    tarjetas.forEach((tarjeta) => tarjeta.classList.remove("card-app-anim"));
  }
});
