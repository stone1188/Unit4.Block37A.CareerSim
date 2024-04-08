const router = require("express").Router();


router.use("/user", require("./user"))
router.use("/item", require("./items"))
router.use("/review", require("./reviews"))

module.exports = router;