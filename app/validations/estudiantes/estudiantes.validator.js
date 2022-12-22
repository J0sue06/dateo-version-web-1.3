const { body } = require('express-validator');
const { Types } = require('../types-errors/types.erros');

const validationEstudiante = () => {
 return [
    body('nombre1')
    .isLength({ min: 3 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('nombre2')
    .isLength({ min: 3 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('apellido1')
    .isLength({ min: 3 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('apellido2')
    .isLength({ min: 3 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('genero')
    .isLength({ min: 3 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('fecha_nacimiento')
    .isLength({ min: 10 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('imagen')
    .notEmpty()
    .withMessage({type: Types.required }),
    body('RNE')
    .isLength({ min: 9 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('IdEscuela')
    .isLength({ min: 7 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('IdCurso')
    .isLength({ min: 9 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required }),
    body('anoEscolar')
    .isLength({ min: 9 })
    .withMessage({type: Types.minLength })
    .notEmpty()
    .withMessage({type: Types.required })
]};

module.exports = {
    validationEstudiante
}