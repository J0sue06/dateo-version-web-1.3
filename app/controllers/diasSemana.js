const router = require('express').Router();
const { todos, nuevaHora } = require('../repository/diasSemana/diasSemana.repository');

router.get('/:id', async (req, res) => 
{          
   try 
   {
      const response = await todos(req.params.id);
      res.status(200).send({ status: 200, message: response });   
   } catch (error) 
   {
      //console.log(error)
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
      req.body.idEscuela = '21848c0f-84c0-4198-b868-1616f695a3ef';
      const response = await nuevaHora(req.body);
      res.status(200).send({ status: 200, message: response });  
   } catch (error) 
   {
      res.send(error); 
   }   
});

module.exports = router;