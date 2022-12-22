const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('distritoMunicipal', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: type.STRING,       
        code: type.INTEGER,
        indentifier: type.INTEGER,
        municipalityCode: type.INTEGER,
        provinceCode: type.INTEGER,
        regionCode: type.INTEGER
    }
    ,{  name: {
        singular: "distritoMunicipal",
        plural: "distritoMunicipal"
    }});
}