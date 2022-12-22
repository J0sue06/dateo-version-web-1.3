const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('asistencias_detalles', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        // idAsistencia: type.UUID,       
        // idEstudiante: type.UUID,
        asistio: type.BOOLEAN,
        fechaHoraRegistro: type.DATE,
        //idTipoInasistencia: type.UUID
    }
    ,{ name: {
        singular: "asistencias_detalles",
        plural: "asistencias_detalles"
    } });
}