document.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const heroContainer = document.querySelector(".hero-content-containter");
  const limit = 0; // Establece el límite de desplazamiento para activar la animación
  //personajes
  const pj1 = heroContainer.querySelector(".pj1");
  const pj2 = heroContainer.querySelector(".pj2");
  const pj3 = heroContainer.querySelector(".pj3");
  // arboles
  const tree1 = heroContainer.querySelector(".arbol-1");
  const tree2 = heroContainer.querySelector(".arbol-2");
  const tree3 = heroContainer.querySelector(".arbol-3");

  if (scrollPosition > limit) {
    //animacion de personajes
    pj1.classList.add("pj1-anim");
    pj2.classList.add("pj2-anim");
    pj3.classList.add("pj3-anim");

    // animación paralax de arboles eje X
    tree1.classList.add("arbol-1-anim");
    tree2.classList.add("arbol-2-anim");
    tree3.classList.add("arbol-3-anim");
  } else {
    //animacion de personajes
    pj1.classList.remove("pj1-anim");
    pj2.classList.remove("pj2-anim");
    pj3.classList.remove("pj3-anim");

    // animación paralax de arboles eje X
    tree1.classList.remove("arbol-1-anim");
    tree2.classList.remove("arbol-2-anim");
    tree3.classList.remove("arbol-3-anim");
  }
});
