const { Sequelize, sequelize, estudiante, escuela, estudiantesCurso, cursos, asistenciasDetalles } = require('../../db');
const Op = Sequelize.Op;
const { BlobServiceImg } = require('../../services/blobStorage-azure');
const { getPagination } = require('../../services/pagination.service');

const nuevoEstudiante = async (_estudiante) => {
    try 
    {
        _estudiante.nombre = `${_estudiante.nombre1} ${_estudiante.nombre2}`;
        _estudiante.apellido = `${_estudiante.apellido1} ${_estudiante.apellido2}`;
        _estudiante.fecha_registro = new Date();
        _estudiante.IdEscuela = '21848c0f-84c0-4198-b868-1616f695a3ef';
        _estudiante.imagen = '21848c0f-84c0-4198-b868-1616f695a3ef';
        _estudiante.activo = 1;
        // SE SUBE LA IMAGEN AL BLOB
        //const response = await BlobServiceImg(_estudiante.imagen);
        const response = await estudiante.create(_estudiante);
        const numeroEstudiante = await ultimoNumeroEstudiante();  

        _estudiante.IdEstudiante = response.dataValues.id;
        _estudiante.numeroEstudiante = numeroEstudiante;
        await nuevoEstudianteCurso(_estudiante);
    
        return response;  
    } 
    catch (error) 
    {
        //console.log(error)
        throw new Error(error);
    }
};

const todos = async (req) => {
    try 
    {
        // PARAMS 
        const { page, size } = req.query;
        // PAGINATION
        const { limit, offset } = getPagination(page, size);
       
        const response = await estudiante.findAndCountAll({
            distinct: true, limit, offset,
            order: [
                ['fecha_registro', 'DESC']
            ],
            include: 
            [
                { 
                    model: escuela,
                    attributes: ['id', 'nombre'],
                    required: true
                },
                {
                    model: estudiantesCurso,
                    attributes: ['id'],
                    include: { 
                        model: cursos,
                        attributes: ['numero']      
                    },
                    required: true,
                    where: { activo: 1, promovido: null }
                }, 
                {
                    model: asistenciasDetalles,
                    attributes: ['asistio'],
                    required: false 
                }
            ]
        });
        return getPagingData(response, page, limit);
    } catch (error) 
    {
        throw new Error(error);
    }
};

const porCurso = async (idCurso,req) => {
    try 
    {
        // PARAMS 
        const { page, size } = req.query;
        // PAGINATION
        const { limit, offset } = getPagination(page, size);
        
        const response = await estudiante.findAndCountAll({
            distinct: true, limit, offset,
            order: [
                ['fecha_registro', 'DESC']
            ],
            include: 
            [
                { 
                    model: escuela,
                    attributes: ['id', 'nombre']      
                },
                {
                    model: estudiantesCurso,
                    attributes: ['id', 'anoEscolar'],
                    include: { 
                        model: cursos,
                        attributes: ['numero']      
                    },
                    where: { IdCurso: idCurso, activo: 1, promovido: null }
                }, 
                {
                    model: asistenciasDetalles,
                    attributes: ['asistio'] 
                }
            ]
        });
        return getPagingData(response, page, limit);
    } catch (error) 
    {
        throw new Error(error);
    }
};

const nuevoEstudianteCurso = async (estudiante) => {
    //console.log(estudiante)
    await estudiantesCurso.create(estudiante);
}

const nuevoEstudianteCursoArray = async (estudiante) => {
    try 
    {
        for (let i = 0; i < estudiante.length; i++) 
        {
            const _estudiante = estudiante[i];
            // SE VALIDA EL ESTUDIANTE
            if(!await verificarEstudianteCurso(_estudiante)) return { status: 400, message: `Estudiante ${_estudiante?.nombre} ya existe en este curso`};
            
            _estudiante.IdEscuela = '21848c0f-84c0-4198-b868-1616f695a3ef';
            _estudiante.activo = 1;
            const numero = await ultimoNumeroEstudiante();
            _estudiante.numeroEstudiante = numero;
            await cambiarAEstadoPromovido(_estudiante);
            await estudiantesCurso.create(_estudiante);
        }
        return true;    
    } 
    catch (error) 
    {
        // console.log(error)
        throw new Error(error);
    }
}

const ultimoNumeroEstudiante = async () => {
    const numero = await estudiantesCurso.findOne({
        attributes: ['numeroEstudiante'],
        order: [ [ 'numeroEstudiante', 'DESC' ] ],   
    });
    const { numeroEstudiante } = numero?.dataValues;
    const _numero = numeroEstudiante ? (parseInt(numeroEstudiante) + 1) : 1;
    return _numero;
}

const buscarEstudiante = async (filtro) => {
    try {
        const response = await estudiante.findAll({
            attributes: ['id', 'nombre', 'apellido', 'fecha_nacimiento'],    
            order: [
                ['nombre', 'ASC']
            ],
            include: 
            [
                {
                    model: estudiantesCurso,
                    attributes: ['id'],
                    include: { 
                        model: cursos,
                        attributes: ['numero'],
                        order: [
                            ['numero', 'DESC']
                        ] 
                    },
                    where: { activo: 1, promovido: null }    
                }
            ],
            where: { 
                [Op.or]: [
                    {
                        nombre: { [Op.like]: `%${filtro}%` }
                    }, 
                    {
                        apellido: { [Op.like]: `%${filtro}%` }
                    }, 
                    {
                        RNE: { [Op.like]: `%${filtro}%` }
                    }
                ]
            }
        });
        return response;
    } catch (error) {
        // console.log(error)
        throw new Error(error);
    }
   
}

const verificarEstudianteCurso = async (_estudiante) => {
    const response = await estudiantesCurso.findOne({
        where: { 
            [Op.and]: [
                {
                    IdEstudiante: _estudiante.IdEstudiante 
                }, 
                {
                    IdCurso: _estudiante.IdCurso 
                }, 
                {
                    activo: 1
                }
            ]
        }
    })
    return response?.dataValues == null;
}

const cambiarAEstadoPromovido = async (_estudiante) => 
{
    try 
    {
        await estudiantesCurso.update(
            {
                promovido: 1
            },
            {
                where: { IdEstudiante: _estudiante?.IdEstudiante },
            }
        );
    } 
    catch (error) 
    {
        throw new Error(error);
    }
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: estudiantes } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { estudiantes, totalItems, totalPages, currentPage };
};

module.exports = {
    nuevoEstudiante,
    buscarEstudiante,
    todos,
    porCurso,
    nuevoEstudianteCursoArray,
    ultimoNumeroEstudiante,
    verificarEstudianteCurso
} 