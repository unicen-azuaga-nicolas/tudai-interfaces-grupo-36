window.addEventListener("scroll", () => {
  const logo = document.getElementById("logo");
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 50) {
    logo.classList.add("shrink");
  } else {
    logo.classList.remove("shrink");
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
