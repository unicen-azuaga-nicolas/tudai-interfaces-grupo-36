document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".bullets a");
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  let currentIndex = 0;
  const autoPlayInterval = 5000;
  let autoPlayTimer;

  function goToSlide(index) {
    const targetElement = slides[index];
    slider.scrollTo({
      left: targetElement.offsetLeft,
      behavior: "smooth",
    });

    navLinks.forEach((nav) => nav.classList.remove("active"));
    navLinks[index].classList.add("active");
  }

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
  };

  navLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      currentIndex = index;
      goToSlide(index);
    });
  });

  // Actualizar la clase activa en los bullets al hacer scroll
  const updateActiveSlide = () => {
    const scrollLeft = slider.scrollLeft;
    slides.forEach((slide, index) => {
      const isSlideInView =
        slide.offsetLeft <= scrollLeft + slide.clientWidth / 2 &&
        slide.offsetLeft + slide.clientWidth / 2 > scrollLeft;

      if (isSlideInView) {
        navLinks.forEach((nav) => nav.classList.remove("active"));
        navLinks[index].classList.add("active");
        currentIndex = index;
      }
    });
  };

  slider.addEventListener("scroll", updateActiveSlide);

  // Función de auto play
  function autoPlay() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  // Iniciar auto play
  function startAutoPlay() {
    autoPlayTimer = setInterval(autoPlay, autoPlayInterval);
  }

  // Detener auto play
  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  // Iniciar auto play al cargar la página
  //   startAutoPlay();

  // Detener auto play al hacer hover en el slider
  //   slider.addEventListener("mouseenter", stopAutoPlay);

  //   // Reanudar auto play al quitar el hover del slider
  //   slider.addEventListener("mouseleave", startAutoPlay);

  // Variables para manejar el swipe
  let startX = 0;
  let endX = 0;

  // Manejar el inicio del toque
  slider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  // Manejar el movimiento del toque
  slider.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX;
  });

  // Manejar el final del toque
  slider.addEventListener("touchend", () => {
    const isSwipeLeft = startX > endX + 50;
    const isSwipeRight = startX < endX - 50;

    if (isSwipeLeft) {
      // Swipe hacia la izquierda
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    } else if (isSwipeRight) {
      // Swipe hacia la derecha
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(currentIndex);
    }
  });

  // Botones de siguiente y anterior
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
});
