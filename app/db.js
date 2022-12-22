const Sequelize = require('sequelize');
const { Op } = require("sequelize");

// SE IMPORTAN TODOS LOS MODELOS
const escuelaModel                       = require('./models/escuela');
const provinciaModel                       = require('./models/provincia');
const municipioModel                       = require('./models/municipio');
const distritoMunicipalModel                       = require('./models/distritoMunicipal');
const asignaturasCursosModel                       = require('./models/asignaturas_cursos');
const asignaturasModel                       = require('./models/asignaturas');
const asistenciasModel                       = require('./models/asistencias');
const asistenciasDetallesModel                       = require('./models/asistenciasDetalles');
const cursosModel                       = require('./models/cursos');
const estudianteModel                       = require('./models/estudiante');
const estudiantesCursoModel                       = require('./models/estudiantes_curso');
const modalidadesModel                       = require('./models/modalidades');
const profesoresAsignaturasCursosModel                       = require('./models/profesores_Asignaturas_Cursos');
const profesoresEscuelaModel                       = require('./models/profesores_escuela');
const profesoresModel                       = require('./models/profesores');
const regionalesModel                       = require('./models/regionales');
const tiposInasistenciasModel                       = require('./models/tiposInasistencias');
const usuariosModel                       = require('./models/usuarios');
const diasSemanaModel                       = require('./models/diasSemana');
const horasModel                       = require('./models/horario');

let sequelize = null;
// SE CONFIGURA LA BASE DE DATOS
try 
{
    //process.env.HOST
    sequelize = new Sequelize('cid_db', 'DATEO', 'Paselista@2022', {
        dialect: 'mssql',  
        // Servidor => MICM-SVR-QA    
        host: 'cidsql.database.windows.net',
        // dialectOptions: { 
        //     options: {
        //         instanceName: 'DEVELOPMENTS'
        //     }
        // },
        define: {
           timestamps: false
       }
    });
    
} catch (e) 
{
    console.log(e)
    console.log("Error al conectar base de datos...");    
}

// SE INICIALIZAN LOS MODELOS
const escuela                     = escuelaModel(sequelize, Sequelize);
const provincia                     = provinciaModel(sequelize, Sequelize);
const municipio                     = municipioModel(sequelize, Sequelize);
const distritoMunicipal                     = distritoMunicipalModel(sequelize, Sequelize);
const asignaturasCursos                     = asignaturasCursosModel(sequelize, Sequelize);
const asignaturas                     = asignaturasModel(sequelize, Sequelize);
const asistencias                     = asistenciasModel(sequelize, Sequelize);
const asistenciasDetalles                     = asistenciasDetallesModel(sequelize, Sequelize);
const cursos                     = cursosModel(sequelize, Sequelize);
const estudiante                     = estudianteModel(sequelize, Sequelize);
const estudiantesCurso                     = estudiantesCursoModel(sequelize, Sequelize);
const modalidades                     = modalidadesModel(sequelize, Sequelize);
const profesoresAsignaturasCursos                     = profesoresAsignaturasCursosModel(sequelize, Sequelize);
const profesoresEscuela                     = profesoresEscuelaModel(sequelize, Sequelize);
const profesores                     = profesoresModel(sequelize, Sequelize);
const regionales                     = regionalesModel(sequelize, Sequelize);
const tiposInasistencias                     = tiposInasistenciasModel(sequelize, Sequelize);
const usuarios                     = usuariosModel(sequelize, Sequelize);
const diasDeLaSemana                     = diasSemanaModel(sequelize, Sequelize);
const horario                     = horasModel(sequelize, Sequelize);


// -- ESCUELA -> PROVINCIA
escuela.belongsTo(provincia, { foreignKey: 'idProvincia' });
provincia.hasMany(escuela, { foreignKey: 'idProvincia' });

// -- ESCUELA -> MUNICIPIO
escuela.belongsTo(municipio, { foreignKey: 'IdMunicipio' });
municipio.hasMany(escuela, { foreignKey: 'IdMunicipio' });

// -- ESCUELA -> DISTRITO_MUNICIPAL
escuela.belongsTo(distritoMunicipal, { foreignKey: 'IdDistritoMunicipal' });
distritoMunicipal.hasMany(escuela, { foreignKey: 'IdDistritoMunicipal' });

// -- ESCUELA -> REGIONALES
escuela.belongsTo(regionales, { foreignKey: 'IdRegional' });
regionales.hasMany(escuela, { foreignKey: 'IdRegional' });

// -- ASIGNATURAS -> ESCUELA
asignaturas.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(asignaturas, { foreignKey: 'IdEscuela' });

// -- CURSOS -> MODALIDADES
cursos.belongsTo(modalidades, { foreignKey: 'IdModalidad' });
modalidades.hasMany(cursos, { foreignKey: 'IdModalidad' });

// -- CURSOS -> ESCUELA
cursos.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(cursos, { foreignKey: 'IdEscuela' });

// -- ASIGNATURAS_CURSOS -> ASIGNATURAS
asignaturasCursos.belongsTo(asignaturas, { foreignKey: 'IdAsignatura' });
asignaturas.hasMany(asignaturasCursos, { foreignKey: 'IdAsignatura' });

// -- ASIGNATURAS_CURSOS -> CURSOS
asignaturasCursos.belongsTo(cursos, { foreignKey: 'IdCurso' });
cursos.hasMany(asignaturasCursos, { foreignKey: 'IdCurso' });

// -- ASIGNATURAS_CURSOS -> ESCUELA
asignaturasCursos.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(asignaturasCursos, { foreignKey: 'IdEscuela' });

// -- ASIGNATURAS_CURSOS -> DIAS DE LA SEMANA
asignaturasCursos.belongsTo(diasDeLaSemana, { foreignKey: 'IdDia' });
diasDeLaSemana.hasMany(asignaturasCursos, { foreignKey: 'IdDia' });

// -- ASIGNATURAS_CURSOS -> DIAS DE LA SEMANA
asignaturasCursos.belongsTo(diasDeLaSemana, { foreignKey: 'IdDia' });
diasDeLaSemana.hasMany(asignaturasCursos, { foreignKey: 'IdDia' });

// -- ASIGNATURAS_CURSOS -> HORAS
asignaturasCursos.belongsTo(horario, { foreignKey: 'idhora' });
horario.hasMany(asignaturasCursos, { foreignKey: 'idhora' });

// -- ESTUDIANTE -> ESCUELA
estudiante.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(estudiante, { foreignKey: 'IdEscuela' });

// -- ESTUDIANTES_CURSO -> ESTUDIANTE
estudiantesCurso.belongsTo(estudiante, { foreignKey: 'IdEstudiante' });
estudiante.hasMany(estudiantesCurso, { foreignKey: 'IdEstudiante' });

// -- ESTUDIANTES_CURSO -> CURSOS
estudiantesCurso.belongsTo(cursos, { foreignKey: 'IdCurso' });
cursos.hasMany(estudiantesCurso, { foreignKey: 'IdCurso' });

// -- ESTUDIANTES_CURSO -> ESCUELA
estudiantesCurso.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(estudiantesCurso, { foreignKey: 'IdEscuela' });

// -- PROFESORES_ESCUELA -> ESCUELA
profesoresEscuela.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(profesoresEscuela, { foreignKey: 'IdEscuela' });

// -- PROFESORES_ESCUELA -> PROFESORES
profesoresEscuela.belongsTo(profesores, { foreignKey: 'IdProfesor' });
profesores.hasMany(profesoresEscuela, { foreignKey: 'IdProfesor' });

// -- PROFESORES_ASIGNATURA_CURSOS -> PROFESORES
profesoresAsignaturasCursos.belongsTo(profesores, { foreignKey: 'IdProfesor' });
profesores.hasMany(profesoresAsignaturasCursos, { foreignKey: 'IdProfesor' });

// -- PROFESORES_ASIGNATURA_CURSOS -> ESCUELA
profesoresAsignaturasCursos.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(profesoresAsignaturasCursos, { foreignKey: 'IdEscuela' });

// -- PROFESORES_ASIGNATURA_CURSOS -> ASIGNATURA
profesoresAsignaturasCursos.belongsTo(asignaturas, { foreignKey: 'IdAsignatura' });
asignaturas.hasMany(profesoresAsignaturasCursos, { foreignKey: 'IdAsignatura' });

// -- PROFESORES_ASIGNATURA_CURSOS -> CURSOS
profesoresAsignaturasCursos.belongsTo(cursos, { foreignKey: 'IdCurso' });
cursos.hasMany(profesoresAsignaturasCursos, { foreignKey: 'IdCurso' });

// -- PROFESORES_ASIGNATURA_CURSOS -> ASIGNATURA_CURSOS
profesoresAsignaturasCursos.belongsTo(asignaturasCursos, { foreignKey: 'IdAsignaturaCurso' });
asignaturasCursos.hasMany(profesoresAsignaturasCursos, { foreignKey: 'IdAsignaturaCurso' });

// -- ASISTENCIAS -> PROFESORES
asistencias.belongsTo(profesores, { foreignKey: 'IdProfesor' });
profesores.hasMany(asistencias, { foreignKey: 'IdProfesor' });

// -- ASISTENCIAS -> ESCUELA
asistencias.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(asistencias, { foreignKey: 'IdEscuela' });

// -- ASISTENCIAS -> ASIGNATURAS
asistencias.belongsTo(asignaturas, { foreignKey: 'IdAsignatura' });
asignaturas.hasMany(asistencias, { foreignKey: 'IdAsignatura' });

// -- ASISTENCIAS -> CURSO
asistencias.belongsTo(cursos, { foreignKey: 'IdCurso' });
cursos.hasMany(asistencias, { foreignKey: 'IdCurso' });

// -- ASISTENCIAS -> ASIGNATURA_CURSO
asistencias.belongsTo(asignaturasCursos, { foreignKey: 'IdAsignaturaCurso' });
asignaturasCursos.hasMany(asistencias, { foreignKey: 'IdAsignaturaCurso' });

// -- ASISTENCIAS_DETALLES -> ASISTENCIAS
asistenciasDetalles.belongsTo(asistencias, { foreignKey: 'IdAsistencia' });
asistencias.hasMany(asistenciasDetalles, { foreignKey: 'IdAsistencia' });

// -- ASISTENCIAS_DETALLES -> ESTUDIANTES
asistenciasDetalles.belongsTo(estudiante, { foreignKey: 'IdEstudiante' });
estudiante.hasMany(asistenciasDetalles, { foreignKey: 'IdEstudiante' });

// -- ASISTENCIAS_DETALLES -> TIPO_INASISTENCIA
asistenciasDetalles.belongsTo(tiposInasistencias, { foreignKey: 'IdTipoInasistencia' });
tiposInasistencias.hasMany(asistenciasDetalles, { foreignKey: 'IdTipoInasistencia' });

// -- USUARIOS -> PROFESORES
usuarios.belongsTo(profesores, { foreignKey: 'IdProfesor' });
profesores.hasMany(asistenciasDetalles, { foreignKey: 'IdProfesor' });

// -- USUARIOS -> ESCUELA
usuarios.belongsTo(escuela, { foreignKey: 'IdEscuela' });
escuela.hasMany(asistenciasDetalles, { foreignKey: 'IdEscuela' });

// -- USUARIOS -> REGIONALES
usuarios.belongsTo(regionales, { foreignKey: 'IdRegional' });
regionales.hasMany(asistenciasDetalles, { foreignKey: 'IdRegional' });

// -- MUNICIPIO -> PROVINCIA
municipio.belongsTo(provincia, { foreignKey: 'provinceCode' });
provincia.hasMany(municipio, { foreignKey: 'provinceCode' });

// -- HORA -> CURSO
horario.belongsTo(cursos, { foreignKey: 'idCurso' });
cursos.hasMany(horario, { foreignKey: 'idCurso' });

// -- HORA -> ESCUELA
horario.belongsTo(escuela, { foreignKey: 'idEscuela' });
escuela.hasMany(horario, { foreignKey: 'idEscuela' });

// SE AUTENTICA CON EL SERVIDOR DE SQL
sequelize.authenticate()
.then( () => {
    console.log('Base de datos autenticada');
});

// SE EXPORTAN LOS MODELOS
module.exports = 
{   
    Op,
    Sequelize,
    sequelize,
    escuela,  
    provincia,         
    municipio,                    
    distritoMunicipal,                    
    asignaturasCursos,                     
    asignaturas,                    
    asistencias,                     
    asistenciasDetalles,                   
    cursos,                     
    estudiante,                     
    estudiantesCurso,                     
    modalidades,                     
    profesoresAsignaturasCursos,                     
    profesoresEscuela,                    
    profesores,                     
    regionales,                     
    tiposInasistencias,                     
    usuarios,
    diasDeLaSemana,
    horario  
}

                     
