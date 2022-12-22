const router = require('express').Router();
const { sequelize, escuela, provincia } = require('../db');

router.post('/', async (req, res) => 
{       
   //console.log(req.body)
   try 
   {
      const response = await escuela.create(req.body);
      res.status(200).send(response);   
   } catch (error) 
   {
      res.send(error); 
   }   
});

router.get('/', async (req, res) => 
{          
   try 
   {
      const response = await escuela.findAll({
         attributes: ['nombre'],      
         include: [
            {
               model: provincia,              
               require: true,
               attributes: ['nombre']         
            }
         ]
      });
      res.status(200).send(response);   
   } catch (error) 
   {
      console.log(error)
      res.status(500).send(error);  
   }   
});

module.exports = router;