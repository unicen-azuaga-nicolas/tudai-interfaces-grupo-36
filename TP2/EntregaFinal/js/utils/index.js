const addEventListenersToButtons = () => {
  const buttons = document.querySelectorAll(".buy-button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.id.split("-").pop();
      console.log(`Product ${productId} added to cart`);
      // Add your logic to handle the button click here
    });
  });
};

// Función para generar el HTML de un carrusel
const generateCarrouselHTML = (title, products) => {
  return `
          <div class="carrousel-container">
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
                                      <h3 class="game-title">${
                                        product.name
                                      }</h3>
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
                                      <button class="buy-button" id="buy-button-${
                                        product.id
                                      }">Comprar</button>
                                      <span class="price">$${
                                        product.price
                                      }</span>
                                  </div>
                                  ${
                                    product.inCart
                                      ? '<span class="cart-message">En el carrito</span>'
                                      : ""
                                  }
                                  `
                                      : `
                                  <div class="play-icon">
                                      &#9658;
                                  </div>`
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

const renderCarrousel = ({ container, dataSource }) => {
  // Clear existing carousels
  container.innerHTML = "";

  // Render user games carousels
  dataSource.forEach((products, title) => {
    const carrouselHTML = generateCarrouselHTML(title, products);
    container.insertAdjacentHTML("beforeend", carrouselHTML);
  });

  // Add event listeners to buttons
  addEventListenersToButtons();
};
