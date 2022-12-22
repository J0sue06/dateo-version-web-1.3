const router = require('express').Router();
const { todos, nuevaAsignatura } = require('../repository/asignaturas/asignaturas.repository');

router.get('/', async (req, res) => 
{          
   try 
   {
      const response = await todos();
      res.status(200).send({ status: 200, message: response });   
   } catch (error) 
   {
      console.log(error)
      res.status(500).send(error.message);  
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
       const response = await nuevaAsignatura(req.body);
       res.status(200).send({ status: 200, message: response });  
   } catch (error) 
   {
      res.send(error); 
   }   
});


module.exports = router;