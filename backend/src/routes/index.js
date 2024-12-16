const testRoute = require("../test/testRoutes.js");
const router = require("express").Router();
const dumbbellRoute = require("../dumbbell/dumbbellRoutes.js");
const userRoute = require("../user/userRoutes.js");
const serieRoute = require("../serie/serieRoutes.js");
const arduinoRoutes = require("../arduino/arduinoRoutes.js")

//const exampleRoutes = require('./exampleRoutes');

//const testController = require('../controllers/testController')

//router.use('/example', exampleRoutes);
router.use("/test", testRoute);
router.use("/serie", serieRoute);
router.use("/dumbbell", dumbbellRoute);
router.use("/user", userRoute);
router.use("/arduino", arduinoRoutes);


module.exports = router;
