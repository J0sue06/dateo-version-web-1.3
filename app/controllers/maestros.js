const router = require('express').Router();
const { nuevoMaestro, todos } = require('../repository/maestros/maestros.repository')

router.post('/', async (req, res) => 
{       
   try 
   {
      const response = await nuevoMaestro(req.body);
      res.status(200).send({ status: 200, message: response });   
   } catch (error) 
   {
      res.send(error); 
   }   
});

router.get('/', async (req, res) => 
{          
   try 
   {
      const response = await todos(req);
      res.status(200).send(response);   
   } catch (error) 
   {
      res.status(500).send(error);  
   }   
});

module.exports = router;