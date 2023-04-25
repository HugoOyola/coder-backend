import fs from 'fs'

class CartManager {
    constructor(carts = []) {
        this.carts = carts;
        this.path = "./src/cartManager/carts.json";
        this.last_id = 1;
    }

    // Inicializa el archivo JSON con los datos iniciales
    initialize = async () => {
        const cartsJson = JSON.stringify(this.carts)
        await fs.promises.writeFile(this.path, cartsJson)
    };

    // Crea un nuevo carrito con los datos proporcionados
    createCart = async (newCart) => {
        try {
            // Valida si los datos del carrito están completos
            if (!newCart.products) {
                throw new Error('Incomplete cart data')
            }

            // Asigna un nuevo id al carrito
            newCart.id = this.last_id
            // Actualiza la referencia al último id utilizado
            this.last_id = this.last_id + 1
            this.carts.push(newCart)

            // Guarda los datos en el archivo JSON
            const dataJson = JSON.stringify(this.carts)
            const data = await fs.promises.writeFile(this.path, dataJson)

            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    // Obtiene el carrito correspondiente al id proporcionado
    getProductByCartId = async (cid) => {
        try {
            const myCart = this.carts.find(c => c.id === cid);
            if (!myCart) return console.log("Error, cart id not found");
            return myCart
        } catch (err) {
            console.log(err)
        }
    }

    // Agrega un producto al carrito correspondiente al id proporcionado
    addProductToCart = async (cid, pid, quantity = 1) => {
        const item_index = this.carts.findIndex(c => c.id === cid)

        if (item_index < 0) {
            console.info(`No cart with the id: ${cid}`)
            return null
        }

        const selectedCart = this.carts[item_index];
        const productIndex = selectedCart.products.findIndex(p => p.pid === pid)

        if (productIndex >= 0) {
            this.carts[item_index].products[productIndex].quantity += quantity
        } else {
            const cartProduct = { quantity, pid }
            selectedCart.products.push(cartProduct);
        }

        // Guarda la actualización en el archivo JSON
        const cartJson = JSON.stringify(this.carts)
        await fs.promises.writeFile(this.path, cartJson);

        return this.carts[item_index]
    }
}

export default CartManager;
