document.getElementById("menuToggle").addEventListener("click", function() {
  document.getElementById("menu").classList.toggle("active");
});

// Cerrar el menú al hacer clic fuera de él
document.addEventListener("click", function(event) {
  const menu = document.getElementById("menu");
  const toggleButton = document.getElementById("menuToggle");

  // Verificar si el clic fue fuera del menú y del botón de abrir
  if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
      // Solo cierra si el menú está activo
      if (menu.classList.contains("active")) {
          menu.classList.remove("active");
      }
  }
});
