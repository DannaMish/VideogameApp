const { Router } = require("express");
const controller = require('../controllers/Genre')

const router = Router();

router.get('/genres', controller.getGenres)

module.exports = router;