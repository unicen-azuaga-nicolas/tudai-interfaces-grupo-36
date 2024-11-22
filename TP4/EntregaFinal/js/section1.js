"use strict";

const section1Container = document.querySelector(".container-degrade");
const pj5 = document.querySelector(".img-per-5");
const pj4 = document.querySelector(".img-per-4");
const titleAndParagraph = document.querySelector(".title-and-p");

const slides = document.querySelector(".slides");

// mover hacia arriba mediante el scroll

window.addEventListener("scroll", () => {
  const scrollValue = window.scrollY;
  section1Container.style.transform = `translateY(${-scrollValue * 0.3}px)`;
  titleAndParagraph.style.transform = `translateY(${-scrollValue * 0.2}px)`;
  pj5.style.transform = `translateX(787px) translateY(${-scrollValue * 0.8}px)`;
  slides.style.transform = `translateX(236px) translateY(${
    -1210 - scrollValue * 0.2
  }px) `;

  pj4.style.transform = `translateX(0px) translateY(${
    -1010 - scrollValue * 0.25
  }px)`;
});
