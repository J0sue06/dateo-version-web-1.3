const { sequelize, cursos, modalidades } = require('../../db');
const { getPagination } = require('../../services/pagination.service');

const nuevoCurso = async (_curso) => {
    try 
    {
        _curso.IdEscuela = '21848c0f-84c0-4198-b868-1616f695a3ef';
        //console.log(_curso);
        const response = await cursos.create(_curso);
        //console.log(response)
        return response;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

const todos = async (req) => {
    try 
    {
        const { page, size } = req.query;
        // PAGINATION
        const { limit, offset } = getPagination(page, size);
    
        const response = await cursos.findAndCountAll({
            limit, offset, distinct: true,
            where: { IdEscuela: '21848c0f-84c0-4198-b868-1616f695a3ef' },
            attributes: ['id', 'numero'],
            include: {
                model:  modalidades,
                attributes: ['nombre'],
            }
        });
        return getPagingData(response, page, limit);
    } catch (error) 
    {
        throw new Error(error);
    }
};

const todos_estudiantes = async () => {
    try 
    {
        const response = await cursos.findAll({
            where: { IdEscuela: '21848c0f-84c0-4198-b868-1616f695a3ef' },
            attributes: ['id', 'numero'],
            include: {
                model:  modalidades,
                attributes: ['nombre'],
            }
        });
        return response;
    } catch (error) 
    {
        throw new Error(error);
    }
};

const buscarCurso = async (idCurso) => {
    try 
    {
        const response = await cursos.findOne({ attributes: ['numero'], where: { id: idCurso } });
        return response;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: cursos } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { cursos, totalItems, totalPages, currentPage };
};

module.exports = {
    todos,
    nuevoCurso,
    buscarCurso,
    todos_estudiantes
} 