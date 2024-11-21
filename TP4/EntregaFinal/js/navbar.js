const logo = document.getElementById("logo");
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const logo = document.querySelector(".logo");
  const maxScroll = 600; // Máximo desplazamiento en Y para la transformación completa
  const scrollY = window.scrollY;

  if (scrollY <= maxScroll) {
    const scale = 1 - (scrollY / maxScroll) * 0.7; // Reducir el tamaño hasta el 30%
    const translateY = -scrollY * (230 / maxScroll); // Subir hasta 230px
    logo.style.transform = `translateY(${translateY}px) scale(${scale})`;
  } else {
    logo.style.transform = "translateY(-230px) scale(0.3)";
  }

  if (window.scrollY > 959) {
    navbar.classList.add("solid");
  } else {
    navbar.classList.remove("solid");
  }
});

const menuButton = document.getElementById("menu-toggle");
let isOpenMenu = false;
menuButton.addEventListener("click", () => {
  isOpenMenu = !isOpenMenu;

  const bars = document.getElementsByClassName("bar");

  if (isOpenMenu) {
    bars.item(0).classList.add("bar-rotate-left");
    bars.item(1).classList.add("bar-display-none");
    bars.item(2).classList.add("bar-rotate-rigth");
  } else {
    bars.item(0).classList.remove("bar-rotate-left");
    bars.item(1).classList.remove("bar-display-none");
    bars.item(2).classList.remove("bar-rotate-rigth");
  }
});
