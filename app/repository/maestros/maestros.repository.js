const { Sequelize, sequelize, profesores, cursos, profesoresAsignaturasCursos, asignaturasCursos, horario, diasDeLaSemana } = require('../../db');
const Op = Sequelize.Op;
const { getPagination } = require('../../services/pagination.service');

const nuevoMaestro = async (maestro) => {
    try 
    {
        maestro.fechaRegistro = new Date();
        maestro.activo = true;
        const response = await profesores.create(maestro);
        return response;    
    } catch (error) 
    {
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

        const response = await profesores.findAndCountAll({
            limit, offset,
            order: [
                ['fechaRegistro', 'DESC']
            ]
        });
        return getPagingData(response, page, limit);
    } catch (error) 
    {
        console.log(error)
        throw new Error(error);
    }
};

const todosSinPaginar = async (req) => {
    try 
    {
        const ocupados = await getMaestrosPorDia_Hora(req);
        ocupados.map((r) => {
            return r.dataValues
        });
        const todos = await todosMaestros();
        todos.map((r) => {
            return r.dataValues
        });
        const response = await compararArrays(ocupados, todos);
        const result = removeDuplicates(response);
        return result;
    } catch (error) 
    {
        console.log(error)
        throw new Error(error);
    }
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: profesores } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { maestros: profesores, totalItems, totalPages, currentPage };
};

const getMaestrosPorDia_Hora = async (req) => {
    try 
    {
        //console.log(req)
        const { _dia, _desde, _hasta } = req.query;
        const response = await profesores.findAll({
            //distinct: true,
            order: [
                ['fechaRegistro', 'DESC']
            ],
            attributes: ['id', 'nombre', 'apellido' ],
            include: {
                model: profesoresAsignaturasCursos,
                required: true,
                attributes: ['id'],
                include: {
                    model: asignaturasCursos,
                    required: true,
                    attributes: ['id'],
                    include: [
                        {
                            model: horario,
                            attributes: ['id'],
                            where: {
                                desde:{
                                    [Op.gte]: _desde
                                }, 
                                hasta: {
                                    [Op.lte]: _hasta
                                }
                            }
                        },
                        {
                            model: diasDeLaSemana,
                            attributes: ['id'],
                            where: {
                                id: _dia
                            }
                        },
                        {
                            model: cursos,
                            attributes: ['numero']
                        }
                    ]
                }
             }
        });
        return response;
    } catch (error) 
    {
        console.log(error)
        throw new Error(error);
    }
}

const todosMaestros = async () => {
    const response = await profesores.findAll({
        order: [
            ['fechaRegistro', 'DESC']
        ],
        attributes: ['id', 'nombre', 'apellido' ]
    });
    return response;
}

const compararArrays = async ( array1, array2 ) => {
  let result = [];
  // Itera sobre cada objeto en el primer array
  for (var i = 0; i < array1.length; i++) 
  {
    // Obtiene el objeto actual del primer array
    var obj1 = array1[i];

    // Itera sobre cada objeto en el segundo array
    for (var j = 0; j < array2.length; j++) 
    {
      // Obtiene el objeto actual del segundo array
      var obj2 = array2[j];

      // Compara los objetos y si son iguales, agrégalos al array de objetos iguales
      if (obj1.id === obj2.id) {
        const model = {
            id: obj1?.dataValues?.id,
            nombre: obj1?.dataValues?.nombre,
            apellido: obj1?.dataValues?.apellido,
            ocupado: true,
            curso_asignado: obj1?.dataValues?.profesoresAsignturasCursos[0]?.asignaturasCursos?.cursos?.numero
        }
        result.push(model);
        //console.log(obj1?.dataValues)
        //break;
      }
      else {
        const model = {
            id: obj2?.id,
            nombre: obj2?.nombre,
            apellido: obj2?.apellido,
            ocupado: false,
            curso_asignado: null
        }
        result.push(model);
      }
    }
  }
  return result;
}

const removeDuplicates = (_arr) => {
  const arr = _arr.sort((a, b) => b.ocupado - a.ocupado);
    return arr.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.id === value.id
    ))
  )
}

module.exports = {
    nuevoMaestro,
    todos,
    todosSinPaginar
} 