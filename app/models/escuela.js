const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('escuela', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: type.STRING,       
        //idProvincia: type.UUID,
        //idMunicipio: type.UUID,
        //idDistritoMunicipal: type.UUID,       
        //idRegional: type.UUID
    }
    ,{ name: {
        singular: "escuela",
        plural: "escuela"
    } });
}