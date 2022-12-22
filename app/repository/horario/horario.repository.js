const { sequelize, asignaturasCursos, diasDeLaSemana, profesoresAsignaturasCursos, asignaturas, horario, profesores } = require('../../db');

const agregarAsignatura = async (request) => {
    try 
    {
        const response1 = await asignaturasCursos.create(request);
        response1.dataValues.IdAsignaturaCurso = response1.dataValues.id;
        response1.dataValues.IdProfesor = request.IdProfesor;
        console.log(response1.dataValues)
        const response2 = profesoresAsignaturasCursos.create(response1.dataValues);
        //.log(request);
        return response2;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

const todos = async (idCurso) => {
    try 
    {
        const response = await diasDeLaSemana.findAll({
            order: [
                ['orden', 'ASC']
            ],
           include: 
                {
                model: asignaturasCursos,
                where: { idCurso: idCurso },
                required: false,
                include: [
                   { model: asignaturas},
                   { model: horario },
                   { 
                     model: profesoresAsignaturasCursos, 
                     attributes: ['id'],     
                     include: { model: profesores, attributes: ['nombre', 'apellido'] }
                   }
                ]}
        });
        return response;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

module.exports = {
    agregarAsignatura,
    todos
} 