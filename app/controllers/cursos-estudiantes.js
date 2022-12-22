const router = require('express').Router();
const { todos_estudiantes } = require('../repository/cursos/cursos.repository');

router.get('/', async (req, res) => 
{          
   try 
   {
      const response = await todos_estudiantes();
      res.status(200).send(response);   
   } catch (error) 
   {
      console.log(error)
      res.status(500).send(error);  
   }   
});



module.exports = router;