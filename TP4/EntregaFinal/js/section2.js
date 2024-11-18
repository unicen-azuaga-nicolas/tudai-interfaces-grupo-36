// Selecciona todas las imágenes y los contenedores de texto
const images = document.querySelectorAll(".sticky-container img");
const textContainers = document.querySelectorAll(".container-p-h4");

// Detecta el scroll
window.addEventListener("scroll", () => {
  textContainers.forEach((container, index) => {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Verifica si el contenedor de texto está visible en la ventana
    if (rect.top >= 0 && rect.top < windowHeight / 1.8) {
      // Oculta todas las imágenes
      images.forEach((img) => {
        img.classList.add("img-hidden");
        img.classList.remove("img-visible");
      });

      // Muestra la imagen correspondiente
      const currentImage = images[index];
      if (currentImage) {
        currentImage.classList.remove("img-hidden");
        currentImage.classList.add("img-visible");
      }
    }
  });
});
