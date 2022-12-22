const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('estudianteCurso', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        // idEstudiante: type.UUID,       
        // idCurso: type.UUID,
        // idEscuela: type.UUID,
        anoEscolar: type.STRING,
        numeroEstudiante: type.INTEGER,
        activo: {
            type: type.BOOLEAN,
            defaultValue: 0
        },
        promovido: {
            type: type.BOOLEAN,
            allowNull: true
        },
    }
    ,{ name: {
        singular: "estudianteCurso",
        plural: "estudianteCurso"
    } });
}