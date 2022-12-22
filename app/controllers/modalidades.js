const router = require('express').Router();
const { todos } = require('../repository/modalidades/modalidades');

router.get('/', async (req, res) => 
{          
   try 
   {
      const response = await todos();
      res.status(200).send(response);   
   } catch (error) 
   {
      console.log(error)
      res.status(500).send(error);  
   }   
});

module.exports = router;