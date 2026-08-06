const { z } = require("zod");

const createProductSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(255),

    price: z
        .coerce
        .number()
        .positive("Price must be greater than 0")
});

module.exports = {
    createProductSchema
};