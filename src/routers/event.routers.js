const {Router} = require("express");
const router = Router();
const eventCtrl = require ("../controller/event.controller");

router.post("/evento", eventCtrl.postAddEvent);
router.get("/home", eventCtrl.getEvent);
router.get("/explore", eventCtrl.getOne);
router.get("/explore2", eventCtrl.getOne2);
router.get("/sport", eventCtrl.getDeporte);
router.get("/sportus", eventCtrl.getDeportUs);
router.post("/btn", eventCtrl.postBoton);
router.delete("/delete", eventCtrl.deleteevent);






module.exports = router;