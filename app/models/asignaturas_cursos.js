const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('asignaturasCursos', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        // idAsignatura: type.UUID,       
        // idCurso: type.UUID,
        // idEscuela: type.UUID,
    }
    ,{ name: {
        singular: "asignaturasCursos",
        plural: "asignaturasCursos"
    } });
}