const router = require('express').Router();
const { todos, nuevoCurso, buscarCurso } = require('../repository/cursos/cursos.repository');

router.get('/', async (req, res) => 
{          
   try 
   {
      const response = await todos(req);
      res.status(200).send(response);   
   } catch (error) 
   {
      console.log(error)
      res.status(500).send(error);  
   }   
});

router.post('/', async (req, res) => 
{       
   //console.log(req.body)
   try 
   {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //    return res.status(400).send({ errors: errors.array().map( (v) => v?.msg) });
      // }
       const response = await nuevoCurso(req.body);
       res.status(200).send({ status: 200, message: response });  
   } catch (error) 
   {
      res.send(error); 
   }   
});

router.get('/buscar/:id', async (req, res) => 
{          
   try 
   {
      const response = await buscarCurso(req.params.id);
      res.status(200).send({ status: 200, message: response });   
   } catch (error) 
   {
      //console.log(error)
      res.status(500).send(error);  
   }   
});

module.exports = router;