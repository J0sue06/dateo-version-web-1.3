const { Sequelize, sequelize, diasDeLaSemana, horario } = require('../../db');
const Op = Sequelize.Op;

const todos = async (idCurso) => {
    try 
    {
        const response = await horario.findAll({
            where: { idCurso: idCurso },
            order: [
                ['desde', 'ASC']
            ]
        });
        return response;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

const nuevaHora = async (request) => {
    try 
    {
        const response = await horario.create(request);
        return response;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

module.exports = {
    todos,
    nuevaHora
} 