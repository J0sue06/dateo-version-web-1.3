const router = require('express').Router();
const { agregarAsignatura, todos } = require('../repository/horario/horario.repository')

router.post('/', async (req, res) => 
{       
   try 
   {
      const response = await agregarAsignatura(req.body);
      res.status(200).send({ status: 200, message: response });   
   } catch (error) 
   {
      res.send(error); 
   }   
});

router.get('/:id', async (req, res) => 
{          
   try 
   {
      const response = await todos(req.params.id);
      res.status(200).send({ status: 200, message: response }); 
   } catch (error) 
   {
      res.status(500).send(error);  
   }   
});

module.exports = router;