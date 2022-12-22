const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('estudiantes', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: type.STRING,       
        apellido: type.STRING,
        genero: type.STRING,
        fecha_nacimiento: type.DATE,
        fecha_registro: type.DATE,
        imagen: type.STRING,
        RNE: type.STRING,
        //idEscuela: type.UUID,
    }
    ,{ name: {
        singular: "estudiantes",
        plural: "estudiantes"
    } });
}