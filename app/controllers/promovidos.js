
const router = require('express').Router();
const { promover } = require('../repository/promovidos/promovidos.repository');


router.post('/', async (req, res) => 
{       
//    console.log(req.body)
   try 
   {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //    return res.status(400).send({ errors: errors.array().map( (v) => v?.msg) });
      // }
       const response = await promover(req.body);
       res.status(200).send({ status: 200, message: response });  
   } catch (error) 
   {
      res.send(error); 
   }   
});


module.exports = router;