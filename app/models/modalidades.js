const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('modalidades', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: type.STRING
    }
    ,{ name: {
        singular: "modalidades",
        plural: "modalidades"
    } });
}