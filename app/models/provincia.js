const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('provincia', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: type.STRING,       
        code: type.INTEGER,
        indentifier: type.INTEGER,
        regionCode: type.INTEGER
    },
    { name: {
        singular: "provincia",
        plural: "provincia"
    }
    });
}