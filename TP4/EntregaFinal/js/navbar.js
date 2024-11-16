window.addEventListener("scroll", () => {
  const logo = document.getElementById("logo");
  if (window.scrollY > 50) {
    logo.classList.add("shrink");
  } else {
    logo.classList.remove("shrink");
  }
});
