const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('horario', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },    
        desde: type.STRING,
        hasta: type.STRING,
    },{ tableName: 'horario' }
    );
}