const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('tipo_inasistencias', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: type.STRING
    }
    ,{ name: {
        singular: "tipo_inasistencias",
        plural: "tipo_inasistencias"
    } });
}