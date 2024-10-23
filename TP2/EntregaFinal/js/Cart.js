class Cart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }

  getTotal() {
    return this.products.reduce((total, product) => total + product.price, 0);
  }

  listProducts() {
    return this.products;
  }

  getTotalProducts() {
    return this.products.length;
  }
}
