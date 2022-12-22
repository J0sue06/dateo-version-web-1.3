const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('usuarios', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        cedula: type.STRING,       
        email: type.STRING,
        telefono: type.STRING,
        contrasena: type.STRING,
        fechaCreacion: type.DATE,
        idUsuarioCreador: type.UUID,
        ultimoAcceso: type.DATE,
        activo: type.BOOLEAN,
        // idRol: type.UUID,
        // idProfesor: type.UUID,
        // idEscuela: type.UUID,
        // idRegional: type.UUID,
    }
    ,{ name: {
        singular: "usuarios",
        plural: "usuarios"
    } });
}