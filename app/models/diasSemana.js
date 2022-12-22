const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('diasDeLaSemana', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },    
        nombre: type.STRING
    },{ tableName: 'diasDeLaSemana' }
    );
}