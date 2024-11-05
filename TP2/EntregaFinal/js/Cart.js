class Cart {
  constructor() {
    this.products = new Map();
  }

  addProduct(id, product) {
    if (this.products.has(id)) {
      console.log(`El producto con ID ${id} ya está en el carrito.`);
      return;
    }
    this.products.set(id, product);
    console.log(`Producto con ID ${id} agregado al carrito.`);
  }

  removeProduct(id) {
    this.products.delete(id);
    console.log(`Producto con ID ${id} eliminado del carrito.`);
  }

  getTotalProducts() {
    return this.products.size;
  }

  listProducts() {
    return Array.from(this.products.values());
  }

  getTotal() {
    return Array.from(this.products.values()).reduce(
      (total, product) => total + product.price,
      0
    );
  }
}
