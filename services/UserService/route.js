const router = require("express").Router();
const controller = require("./controller/controller");

router.post("/user/register", controller.registerUser);
router.post("/user/login", controller.loginUser);
router.put("/user/update", controller.updateUser);
router.delete("/user/delete", controller.deleteUser);
router.get("/user/me", controller.getUser);

module.exports = router;
