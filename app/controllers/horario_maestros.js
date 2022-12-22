const router = require('express').Router();
const { todosSinPaginar } = require('../repository/maestros/maestros.repository');

router.get('/', async (req, res) => 
{          
   try 
   {
      const response = await todosSinPaginar(req);
      res.status(200).send(response);   
   } catch (error) 
   {
      res.status(500).send(error);  
   }   
});

module.exports = router;