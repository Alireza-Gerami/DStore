const router = require("express").Router();
const controller = require("./controller/controller");

router.post("/user/products/create", controller.createProduct);
router.put("/user/products/update/:pid", controller.updateProduct);
router.delete("/user/products/delete/:pid", controller.deleteProduct);
router.get("/user/products/:pid", controller.getProduct);
router.get("/user/products", controller.getProducts);

module.exports = router;
