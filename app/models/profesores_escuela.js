const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('profesores_escuela', {
        id: {
            type: type.UUID,    
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        // idProfesor: type.UUID,       
        // idEscuela: type.UUID,       
        comentario: type.STRING
    }
    ,{ name: {
        singular: "profesores_escuela",
        plural: "profesores_escuela"
    } });
}