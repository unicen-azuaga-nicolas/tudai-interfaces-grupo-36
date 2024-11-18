window.addEventListener("scroll", () => {
  const logo = document.getElementById("logo");
  const navbar = document.getElementById("navbar");
  console.log(window.scrollY);
  if (window.scrollY > 100) {
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
