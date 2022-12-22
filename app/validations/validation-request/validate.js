const { validationResult } = require('express-validator');

const Validar_Resquest = validacionesModel => {
    return async (req, res, next) => {
      //console.log(req.body.imagen)
      req.body.IdEscuela = '21848c0f-84c0-4198-b868-1616f695a3ef';
      await Promise.all(validacionesModel.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      res.status(400).send({ errorsValidation: errors.array().map( (v) => { return { msg: v?.msg, key: v?.param } } ) });
    };
  };

  module.exports = {
    Validar_Resquest
  }