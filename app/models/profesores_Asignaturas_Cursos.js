const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('profesoresAsignturasCursos', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        // idProfesor: type.UUID,       
        // idEscuela: type.UUID,       
        // idAsignatura: type.UUID,       
        // idCurso: type.UUID,       
        // idAsignuraCurso: type.UUID
    }
    ,{ name: {
        singular: "profesoresAsignturasCursos",
        plural: "profesoresAsignturasCursos"
    } });
}