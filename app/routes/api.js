const router = require('express').Router();
const { checkToken } = require('../Middleware/middlewares');

// SE IMPORTAN LOS CONTROLADORES DE RUTAS
const escuelaController = require('../controllers/escuela');
const maestrosController = require('../controllers/maestros');
const estudiantesController = require('../controllers/estudiantes');
const cursosController = require('../controllers/cursos');
const modalidadesController = require('../controllers/modalidades');
const promovidosController = require('../controllers/promovidos');
const asignaturasController = require('../controllers/asignaturas');
const diasSemanaController = require('../controllers/diasSemana');
const horarioController = require('../controllers/horario');
const cursos_estudiantesController = require('../controllers/cursos-estudiantes');
const horario_maestrosController = require('../controllers/horario_maestros');

// SE REDIRECCIONAN LAS RUTAS DONDE CORRESPONDAN
router.use('/escuela', escuelaController);
router.use('/maestros', maestrosController);
router.use('/estudiantes', estudiantesController);
router.use('/cursos', cursosController);
router.use('/modalidades', modalidadesController);
router.use('/promover', promovidosController);
router.use('/asignaturas', asignaturasController);
router.use('/diasSemana', diasSemanaController);
router.use('/horario', horarioController);
router.use('/cursos_estudiantes', cursos_estudiantesController);
router.use('/horario_maestros', horario_maestrosController);

module.exports = router;