const productsService = require("../services/products.service");

async function getProducts(req, res) {

     const products = await productsService.getProducts();
     res.status(200).json(products);
}

async function createProduct(req, res) {

    const product = await productsService.createProduct(
            req.body,
            req.user.id,
            req.file
        );

    res.status(201).json(product);

}

module.exports = {
    getProducts,
    createProduct
};