const repository = require("../repositories/products.repository");
const s3Service = require("./s3.service");
const redis = require("../services/redis.service");

async function getProducts() {

    const cachedProducts = await redis.get("products");

    if (cachedProducts) {
        return {
            products: JSON.parse(cachedProducts),
            type: "cache"
        };
    }

    const products = await repository.findAll();

    if (!products) {
        throw new Error("Product not found");
    }

    await redisClient.set("products", JSON.stringify(products));

    return products;
}

async function createProduct(data, created_by, file) {

    let imageUrl = null;

    if (file) {

        const uploaded = await s3Service.uploadFile(file);

        imageUrl = uploaded.url;

    }

    await redisClient.del("products");

    return await repository.create({
        name: data.name,
        price: data.price,
        imageUrl,
        created_by: created_by
    });

}


async function updateProduct(id, data, file) {

    let imageUrl = null;

    if (file) {
        const uploaded = await s3Service.uploadFile(file);
        imageUrl = uploaded.url;
    }

    await redisClient.del("products");

    return await repository.update(id, {
        name: data.name,
        price: data.price,
        imageUrl,
    });
}

module.exports = {
    getProducts,
    createProduct
};