const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('cursos', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        numero: type.STRING,       
        //idModalidad: type.UUID,
        //idEscuela: type.UUID
    }
    ,{ name: {
        singular: "cursos",
        plural: "cursos"
    }  });
}