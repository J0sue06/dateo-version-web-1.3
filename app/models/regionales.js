const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('regionales', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: type.STRING,       
        region: type.STRING
    }
    ,{ name: {
        singular: "regionales",
        plural: "regionales"
    } });
}