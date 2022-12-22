const router = require('express').Router();
const { todos, nuevoEstudiante, porCurso, buscarEstudiante, nuevoEstudianteCursoArray } = require('../repository/estudiantes/estudiantes.repository');
//VALIDACIONES
const { Validar_Resquest } = require('../validations/validation-request/validate');
const { validationEstudiante } = require('../validations/estudiantes/estudiantes.validator');

router.post('/', Validar_Resquest(validationEstudiante()), async (req, res) => 
{       
   try 
   {
      const response = await nuevoEstudiante(req.body);
      res.status(200).send({ status: 200, message: response });  
   } catch (error) 
   {
      console.log(error)
      res.status(500).send({ message: error }); 
   }   
});

router.get('/', async (req, res) => 
{          
   try 
   {
      const response = await todos(req);
      //console.log(response)
      res.status(200).send(response);   
   } catch (error) 
   {
      console.log(error)
      res.status(500).send(error);  
   }   
});

router.get('/:id', async (req, res) => 
{          
   try 
   {
      const response = await porCurso(req.params.id, req);
      res.status(200).send(response);   
   } catch (error) 
   {
      console.log(error)
      res.status(500).send(error);  
   }   
});

router.get('/buscar/:id', async (req, res) => 
{          
   try 
   {
      const response = await buscarEstudiante(req.params.id);
      res.status(200).send({ status: 200, message: response });   
   } catch (error) 
   {
      //console.log(error)
      res.status(500).send(error);  
   }   
});

router.post('/estudiante-curso', async (req, res) => 
{       
   //console.log(req.body)
   try 
   {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //    return res.status(400).send({ errors: errors.array().map( (v) => v?.msg) });
      // }
       const response = await nuevoEstudianteCursoArray(req.body);

       if (response?.status == 400) {
         res.status(403).send({ message: response?.message });  
       } else {
          res.status(200).send({ status: 200, message: response });  
       }
   } catch (error) 
   {
      res.send({ message: error });  
   }   
});

module.exports = router;