const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('profesores', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: type.STRING,       
        apellido: type.STRING,       
        genero: type.STRING,       
        cedula: type.STRING,       
        telefono: type.STRING,       
        email: type.STRING,       
        fechaRegistro: type.DATE,       
        imagen: type.STRING,       
        activo: type.BOOLEAN,
    }
    ,{ name: {
        singular: "profesores",
        plural: "profesores"
    }  });
}