const repository = require("../repositories/products.repository");
const s3Service = require("./s3.service");

async function getProducts() {

    const products = await repository.findAll();

    if (!products) {
        throw new Error("Product not found");
    }

    return products;
}

async function createProduct(data, created_by, file) {

    let imageUrl = null;

    if (file) {

        const uploaded = await s3Service.uploadFile(file);

        imageUrl = uploaded.url;

    }

    return await repository.create({
        name: data.name,
        price: data.price,
        imageUrl,
        created_by: created_by
    });

}

module.exports = {
    getProducts,
    createProduct
};