const { sequelize, asignaturas } = require('../../db');

const nuevaAsignatura = async (_asignatura) => {
    try 
    {
        _asignatura.IdEscuela = '21848c0f-84c0-4198-b868-1616f695a3ef';
        //console.log(_asignatura);
        const response = await asignaturas.create(_asignatura);
        return response;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

const todos = async () => {
    try 
    {
        const response = await asignaturas.findAll({ where: { IdEscuela: '21848c0f-84c0-4198-b868-1616f695a3ef' } });
        return response;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

module.exports = {
    todos,
    nuevaAsignatura
} 