document.addEventListener("DOMContentLoaded", () => {
  const loaderPercentageText = document.querySelector(".loader__percentage");
  const navbar = document.querySelector(".navbar");
  const mainContent = document.querySelector(".main-container");
  const fatFooter = document.querySelector(".fat-footer");

  if (loaderPercentageText) {
    const TIME_TO_LOAD = 5000;
    document.body.classList.add("no-scroll");
    navbar.classList.replace("navbar", "display-none");
    mainContent.classList.add("display-none");
    fatFooter.classList.replace("fat-footer", "display-none");

    function loadPercentage() {
      let time = 0;
      let interval = setInterval(() => {
        time += 100;
        if (time >= TIME_TO_LOAD) {
          clearInterval(interval);
          document.body.classList.remove("no-scroll");
          navbar.classList.replace("display-none", "navbar");
          mainContent.classList.remove("display-none");
          fatFooter.classList.replace("display-none", "fat-footer");
        }
        updatePercentage(time);
      }, 100);
    }

    function updatePercentage(time) {
      const percentage = Math.floor((time * 100) / TIME_TO_LOAD);
      loaderPercentageText.innerHTML = `Cargando... ${percentage}%`;
    }

    loadPercentage();
  } else {
    console.error("Elemento con la clase .loader__percentage no encontrado.");
  }
});
