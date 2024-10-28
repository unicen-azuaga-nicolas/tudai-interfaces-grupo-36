/**
 * Agrega un producto al carrito.
 * @param {String} id - El ID del producto.
 * @param {Object} product - El objeto del producto.
 * @param {Cart} cart - La instancia del carrito.
 */
const addToCart = (id, product, cart) => {
  if (!id || !product || !cart) {
    return;
  }
  if (!cart.products.has(id)) {
    cart.addProduct(id, product);
  }
};

/**
 * Agrega listeners a los botones "Agregar al carrito".
 * @param {Array} products - La lista de productos.
 * @param {Cart} cart - La instancia del carrito.
 */
const addEventListenersToButtons = (products, cart) => {
  const buttons = document.querySelectorAll(".add-to-cart-button");
  console.log("Products:", products);
  console.log("Buttons:", buttons);

  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Button clicked:", event.target);
      const productId = event.target.getAttribute("data-id");
      console.log("Product ID:", productId);
      const product = products.find((p) => p.id === productId);
      console.log("Cart:", cart);
      addToCart(productId, product, cart);
      renderCarrousels(cart); // Re-render carousels to update the "En el carrito" label
    });
  });
};

/**
 * Genera el HTML para un carrusel.
 * @param {String} title - El título del carrusel.
 * @param {Array} products - La lista de productos.
 * @param {Cart} cart - La instancia del carrito.
 * @returns {String} - El HTML del carrusel.
 */
const generateCarrouselHTML = (title, products, cart) => {
  return `
    <div class="carrousel-container">
    <div class="carrousel-header">
      <h2 class="h2">${title}</h2>
      <button class="btn btn--primary">
      Ver Más <i class="fas fa-chevron-right"></i>
      </button>
    </div>
      <div class="carrousel alignfull">
        ${products
          .map(
            (product) => `
          <div class="carrousel-item">
            <div class="game-card">
              <img src="${
                product.image
              }" alt="Game Background" class="game-image">
              <div class="card-overlay">
                <div class="card-top">
                  <h3 class="game-title">${product.name}</h3>
                  ${
                    product.price > 0 && !cart.products.has(product.id)
                      ? '<span class="pro-tag">Pro</span>'
                      : ""
                  }
                </div>
                ${
                  product.price > 0
                    ? `
                <div class="card-bottom">
                  <button class="add-to-cart-button" data-id="${product.id}">
                    <i data-id="${product.id}" class="fas fa-shopping-cart"></i>
                  </button>
                  <button class="buy-button">Comprar</button>
                  <span class="price">$${product.price}</span>
                </div>`
                    : `
                <div class="play-icon">
                  <a href="${product.href || "#"}">
                    <i class="fas fa-search"></i>
                  </a>
                </div>`
                }
                ${
                  cart.products.has(product.id)
                    ? `
                <div class="cart-message">
                  <span></span>
                  <span>En el carrito</span>
                  <a class="cart-message__close">
                    <i class="fas fa-times"></i>
                  </a>
                </div>`
                    : ""
                }
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};

/**
 * Actualiza el contador del carrito en la interfaz de usuario.
 * @param {Cart} cart - La instancia del carrito.
 */
function updateCartCounter(cart) {
  const cartCounter = document.querySelector(".cart__counter");
  cartCounter.innerText = cart.getTotalProducts();
  cartCounter.classList.toggle("hide", cart.getTotalProducts() === 0);
}

/**
 * Limpia los carruseles existentes en los contenedores.
 */
function clearCarrousels() {
  const userGamesContainer = document.querySelector(".user-games");
  const categoriesContainer = document.querySelector(".categories");
  userGamesContainer.innerHTML = "";
  categoriesContainer.innerHTML = "";
}

/**
 * Renderiza un carrusel en el contenedor especificado.
 * @param {HTMLElement} container - El contenedor donde se renderizará el carrusel.
 * @param {Array} products - La lista de productos.
 * @param {String} title - El título del carrusel.
 * @param {Cart} cart - La instancia del carrito.
 */
function renderCarrousel(container, products, title, cart) {
  const carrouselHTML = generateCarrouselHTML(title, products, cart);
  container.insertAdjacentHTML("beforeend", carrouselHTML);
  addEventListenersToButtons(products, cart);
}

/**
 * Agrega listeners para eliminar productos del carrito.
 * @param {Cart} cart - La instancia del carrito.
 */
function addRemoveFromCartListeners(cart) {
  const cartRemoveButtons = document.querySelectorAll(".cart-message__close");
  cartRemoveButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const cartMessage = event.target.closest(".cart-message");
      const productId = cartMessage.previousElementSibling
        .querySelector(".add-to-cart-button")
        .getAttribute("data-id");

      console.log("Removing product with ID:", productId);

      cart.removeProduct(productId);
      renderCarrousels(cart);
    });
  });
}

/**
 * Renderiza los carruseles y actualiza el contador del carrito.
 * @param {Cart} cart - La instancia del carrito.
 */
function renderCarrousels(cart) {
  updateCartCounter(cart);
  clearCarrousels();

  const userGamesContainer = document.querySelector(".user-games");
  const categoriesContainer = document.querySelector(".categories");

  console.log("Cart items", cart.getTotalProducts());

  // Render user games carousels
  userGames.forEach((products, title) => {
    renderCarrousel(userGamesContainer, products, title, cart);
  });

  // Render categories carousels
  categories.forEach((products, title) => {
    renderCarrousel(categoriesContainer, products, title, cart);
  });

  // Agregar listeners para eliminar productos del carrito
  addRemoveFromCartListeners(cart);

  // Agrega animaciones a carruseles
  // carrousel();
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();
  renderCarrousels(cart);
});
