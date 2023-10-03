class Cart {
    constructor() {
        this.cartItems = [];
    }

    addProduct(product, quantity) {
        const checkAvailable = this.cartItems.find(item => item.Product.id === product.id);
        if (checkAvailable) {
            checkAvailable.quantity += quantity;
        } else {
            const newProduct = new CartItem(product, quantity);
            this.cartItems.push(newProduct);
        }
    }

    removeProduct(productId) {
        this.cartItems = this.cartItems.filter(item => item.Product.id !== productId);
    }

    getTotalPrice() {
        return this.cartItems.reduce((total, item) => total + (item.Product.price * item.quantity), 0);
    }

    getCartItems() {
        return this.cartItems;
    }
}