const { Router } = require("express");
const controller = require ("../controllers/videogame")

const router = new Router()

router.get("/videogames/", controller.getVideogames);
router.get("/videogames/:idVideogame", controller.getVideogameById);
router.post("/videogames", controller.createVideogame );

///// PLAYING AROUND
router.get('/testing', controller.test);

module.exports = router;