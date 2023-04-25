import fs from 'fs'
export default class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./src/ProductManager/products.json";
        this.last_id = 1;
    }

    // Init file
    initialize = async () => {
        const productsJson = JSON.stringify(this.products)
        await fs.promises.writeFile(this.path, productsJson)
    };

    addProduct = async (newProduct) => {
        try {
            // validates if the product is complete
            if (!newProduct.title ||
                !newProduct.description ||
                !newProduct.price ||
                !newProduct.category ||
                !newProduct.thumbnail ||
                !newProduct.code ||
                !newProduct.stock
            ) {
                throw new Error('Incomplete product data')
            }


            // validates if a product with the same code already exists
            const exists = this.products.find(p => p.code === newProduct.code)

            if (exists) {
                console.error(`product already exists: ${exists.id}-${exists.title}`)
                return null
            }

            // asignes manager product id to the new product
            newProduct.id = this.last_id
            // updates the last id reference
            this.last_id = this.last_id + 1
            this.products.push(newProduct)

            const dataJson = JSON.stringify(this.products)
            await fs.promises.writeFile(this.path, dataJson)

            return newProduct
        } catch (error) {
            console.log(error)
        }
    }


    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }
        return this.products;
    }


    getProductById = async (_pid) => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const selectedProduct = JSON.parse(data)
        const product = selectedProduct.find(p => p.id === _pid)
        if (product) {
            return product
        } else {
            console.error(`Product ${_pid} Not found \n`)
            return null
        }
    }

    updateProduct = async (_id, atribute, value) => {
        try {
        const item_index = this.products.findIndex(p => p.id === _id)

        if (item_index < 0) {
            console.info(`no product with the next id: ${_id}`)
            return null
        }

        const selectedItem = this.products[item_index];
        selectedItem[atribute] = value;
        this.products[item_index] = selectedItem;

        const cartJson = JSON.stringify(this.products)
        await fs.promises.writeFile(this.path, cartJson);

        return this.products[item_index]
        } catch(e) {
            console.error(e);
            throw e
        }
    }

    deleteProduct = async (_id) => {
        try {
        const res = this.products.filter(p => p.id !== _id);

        const cartJson = JSON.stringify(res)
        await fs.promises.writeFile(this.path, cartJson);

        this.products = res
        return true;
        } catch (e) {
            console.log("error", e)
            return null
        }
    }
}

export class Product {
    constructor(title, description, price, category, thumbnail, code, stock = 10, status = false) {
        // validates if the product is complete
        if (!title ||
            !description ||
            !price ||
            !category ||
            !thumbnail ||
            !code ||
            !stock
        ) {
            throw new Error('Incomplete product data')
        }

        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
    }
}