document.addEventListener("DOMContentLoaded", () => {
  const loaderPercentageText = document.querySelector(".loader__percentage");

  if (loaderPercentageText) {
    const TIME_TO_LOAD = 5000;

    function loadPercentage() {
      let time = 0;
      let interval = setInterval(() => {
        time += 100;
        if (time >= TIME_TO_LOAD) {
          clearInterval(interval);
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