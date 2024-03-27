const {Router} = require("express");
const router = Router();
const verCtrl = require ("../controller/ver.controller");

router.get("/", verCtrl.getVercel);

module.exports = router;