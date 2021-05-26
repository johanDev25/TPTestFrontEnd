const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerJuegos, getGames, addFavorite, eliminarFavoritos } = require('../controllers/gamesController');

const router = Router();


router.get('/TwichAPI',
obtenerJuegos
);

router.use( validarJWT );

router.get('/', getGames );

router.post(
    '/',
    [
        check('name','El titulo es obligatorio').not().isEmpty(),
        check('linkImage','El titulo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    addFavorite 
);

router.delete('/:id', eliminarFavoritos );


module.exports = router;