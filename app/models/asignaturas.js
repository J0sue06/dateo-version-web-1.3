const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('asignaturas', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        codigo: type.STRING,       
        nombre: type.STRING,
        //idEscuela: type.UUID
    }
    ,{ name: {
        singular: "asignaturas",
        plural: "asignaturas"
    } });
}