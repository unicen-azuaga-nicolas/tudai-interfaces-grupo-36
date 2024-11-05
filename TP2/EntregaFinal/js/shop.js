document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();

    // Seleccionar todos los botones de "Agregar al carrito" en el carrusel
    const addToCartButtons = document.querySelectorAll('.buy-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Obtener la información del producto desde el botón o el elemento padre
          

            // Crear un objeto de producto
            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            // Agregar el producto al carrito
            cart.addProduct(product);

            // Actualizar la interfaz de usuario si es necesario
            console.log(cart.listProducts());
            console.log('Total:', cart.getTotal());
            console.log('Total Products:', cart.getTotalProducts());
        });
    });
});