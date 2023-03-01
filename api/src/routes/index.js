const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter = require("./Videogame")
const genreRouter     = require('./Genre')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(videogameRouter, genreRouter);


module.exports = router;
