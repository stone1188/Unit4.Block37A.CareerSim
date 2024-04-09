const router = require("express").Router();


router.use("/user", require("./user"))
router.use("/item", require("./items"))
router.use("/review", require("./reviews"))
router.use("/comment", require("./comments"))

module.exports = router;