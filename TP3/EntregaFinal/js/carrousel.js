function carrousel() {
  const sliders = document.querySelectorAll(".carrousel");
  console.log("Elementos seleccionados:", sliders);
  // Iterar sobre cada carrusel
  sliders.forEach((slider) => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let velX = 0;
    let momentumID;

    // Slider dragging
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      cancelMomentumTracking();
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
      beginMomentumTracking();
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX; // scroll-fast
      var prevScrollLeft = slider.scrollLeft;
      slider.scrollLeft = scrollLeft - walk;
      velX = slider.scrollLeft - prevScrollLeft;
    });

    // Momentum
    slider.addEventListener("wheel", (e) => {
      cancelMomentumTracking();
    });

    function beginMomentumTracking() {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }

    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID);
    }

    function momentumLoop() {
      slider.scrollLeft += velX * 2;
      velX *= 0.95;
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }

    // Scroll
    const scrollContainer = slider.querySelector(".carrousel-item");

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        window.requestAnimationFrame(() => {
          scrollContainer.scrollTo({
            top: 0,
            left: scrollContainer.scrollLeft + evt.deltaY * 2,
            behavior: "smooth",
          });
        });
      });
    }
    // Agregar funcionalidad de scroll con la flecha derecha

    const rightArrow = slider.nextElementSibling;
    const leftArrow = slider.previousElementSibling;

    if (rightArrow) {
      rightArrow.addEventListener("click", () => {
        console.log("Flecha derecha clickeada");
        slider.scrollBy({ left:600, behavior: "smooth" });
        updateArrowVisibility();
      });
    }
    if (leftArrow) { // Asegúrate de que la flecha izquierda existe
      leftArrow.addEventListener("click", () => {
        console.log("Flecha izquierda clickeada");
        slider.scrollBy({ left: -600, behavior: "smooth" }); // Desplazarse a la izquierda
        updateArrowVisibility();
    });
    }
    // Función para actualizar la visibilidad de las flechas
    function updateArrowVisibility() {
      const isAtStart = slider.scrollLeft === 0;
      const isAtEnd = slider.scrollWidth - slider.scrollLeft <= slider.clientWidth;

      // Ocultar flecha izquierda si estamos al inicio
      if (leftArrow) {
        leftArrow.style.display = isAtStart ? 'none' : 'flex'; // O 'block', según tu diseño
      }
      
      // Ocultar flecha derecha si estamos al final
      if (rightArrow) {
        rightArrow.style.display = isAtEnd ? 'none' : 'flex'; // O 'block', según tu diseño
      }
    }

    // Llamar a la función para configurar la visibilidad de las flechas al cargar
    updateArrowVisibility();
  });
  

}

document.addEventListener("DOMContentLoaded", () => {
  carrousel();
});
