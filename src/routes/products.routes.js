const express = require("express");
const upload = require("../middlewares/upload.middleware");
const validate = require("../middlewares/validate.middleware");
const authenticate =
require("../middlewares/auth.middleware");

const {
    createProductSchema
} = require("../validations/products.validation");

const router = express.Router();

const {
    getProducts,
    createProduct
} = require("../controllers/products.controller");

router.get("/", getProducts);
router.post(
    "/",
    authenticate,
    upload.single("image"),
    validate(createProductSchema),
    createProduct
);

module.exports = router;