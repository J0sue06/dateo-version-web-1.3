const { Sequelize, sequelize, estudiantesCurso } = require('../../db');
const { nuevoEstudianteCursoArray } = require('../estudiantes/estudiantes.repository');

const promover = async (data) => {
    const { idCurso, estudiantes } = data;
    try 
    {
        const model = await cambiarAEstadoPromovido(idCurso, estudiantes);
        const response = await nuevoEstudianteCursoArray(model);
        return response;
    } 
    catch (error) 
    {
        throw new Error(error);
    }
}

const cambiarAEstadoPromovido = async (idCurso, estudiantes) => 
{
    try 
    {
        let model = [];
        for (const _estudiante of estudiantes) 
        {
            await estudiantesCurso.update(
                {
                    promovido: 1
                },
                {
                    where: { IdEstudiante: _estudiante?.id },
                }
            );
            _estudiante.IdEstudiante = _estudiante?.id;
            _estudiante.IdCurso = idCurso;
            _estudiante.anoEscolar = '2025/2026';
            model.push(_estudiante);
        }
        return model;
    } 
    catch (error) 
    {
        throw new Error(error);
    }
}

module.exports = {
    promover,
    cambiarAEstadoPromovido
} 