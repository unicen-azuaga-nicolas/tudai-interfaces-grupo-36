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
  }

  removeProduct(id) {
    this.products.delete(id);
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
