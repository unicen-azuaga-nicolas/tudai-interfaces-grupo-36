/**
 *
 * @param {String} id
 * @param {Object} product
 * @param {Cart} cart
 */
const addToCart = (id, product, cart) => {
  if (id === undefined || product === undefined || cart === undefined) {
    console.log("addToCart - id:", id);
    console.log("addToCart - product:", product);
    console.log("addToCart - cart:", cart);
    console.error("addToCart: Missing parameters");
    return;
  }
  if (!cart.products.has(id)) {
    cart.addProduct(id, product);
    console.log("Cart:", Array.from(cart.products.values()));
    renderCarrousels(cart); // Re-render carousels to update the "En el carrito" label
  }
};

/**
 *
 * @param {Array} products
 * @param {Cart} cart
 * @param {Cart} cart
 */
const addEventListenersToButtons = (products, carrouselId, cart) => {
  const buttons = document.querySelectorAll(
    `.buy-button[data-carrousel-id="${carrouselId}"]`
  );
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = event.target.getAttribute("data-id");
      const product = products.find((p) => p.id === productId);
      console.log("Cart:", cart);
      addToCart(productId, product, cart);
    });
  });
};

/**
 *
 * @param {*} title
 * @param {*} products
 * @param {*} carrouselId
 * @param {Cart} cart
 * @returns
 */
const generateCarrouselHTML = (title, products, carrouselId, cart) => {
  return `
        <div class="carrousel-container" data-carrousel-id="${carrouselId}">
            <h2>${title}</h2>
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
                              product.price > 0
                                ? '<span class="pro-tag">Pro</span>'
                                : ""
                            }
                                </div>
                                ${
                                  product.price > 0
                                    ? `
                                <div class="card-bottom">
                                    <button class="buy-button" 
                                            id="buy-button-${carrouselId}-${product.id}"
                                            data-id="${product.id}"
                                            data-carrousel-id="${carrouselId}">
                                      Comprar
                                    </button>
                                    <span class="price">$${product.price}</span>
                                </div>`
                                    : `
                                <div class="play-icon">     
                                <a href=${product?.href || '#'}>
                                  <i class="fas fa-search"></i>
                                </a>                     
                                </div>`
                                }
                                ${
                                  cart.products.has(product.id)
                                    ? '<div class="cart-message">En el carrito</div>'
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
 *
 * @param {Cart} cart
 */
function renderCarrousels(cart) {
  const userGamesContainer = document.querySelector(".user-games");
  const categoriesContainer = document.querySelector(".categories");

  const cartItems = cart.getTotalProducts();

  console.log("Cart items", cartItems);

  // Clear existing carousels
  userGamesContainer.innerHTML = "";
  categoriesContainer.innerHTML = "";

  // Render user games carousels
  userGames.forEach((products, title, index) => {
    const carrouselHTML = generateCarrouselHTML(
      title,
      products,
      `userGames-${index}`,
      cart
    );
    userGamesContainer.insertAdjacentHTML("beforeend", carrouselHTML);
    addEventListenersToButtons(products, `userGames-${index}`, cart);
  });

  // Render categories carousels
  categories.forEach((products, title, index) => {
    const carrouselHTML = generateCarrouselHTML(
      title,
      products,
      `categories-${index}`,
      cart
    );
    categoriesContainer.insertAdjacentHTML("beforeend", carrouselHTML);
    addEventListenersToButtons(products, `categories-${index}`, cart);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();
  renderCarrousels(cart);
});
