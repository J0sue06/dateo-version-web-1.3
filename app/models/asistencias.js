const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('asistencias', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fechaHoraRegistro: type.DATE,       
        fechaHoraUltimaActividad: type.DATE,
        fechaHoraConclusion: type.DATE,
        // idProfesor: type.UUID,
        // idEscuela: type.UUID,
        // idAsignatura: type.UUID,
        // idCurso: type.UUID,
        // idAsignaturaCurso: type.UUID,
        selfie: type.STRING,
    }
    ,{ name: {
        singular: "asistencias",
        plural: "asistencias"
    } });
}