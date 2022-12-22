const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {   
   
    if ( !req.headers['authorization'] )
    {
        return res.status(401).json({ error: 'Necesitas un token en las cabaceras.', code: 'QUF49' });
    }

    const userToken = req.headers['authorization'];  
    let payload = {};
   
    try 
    {
        payload = jwt.decode( userToken, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ' );
    } 
    catch (error) 
    {        
        return res.status(401).json({ error: 'Token es incorrecto', code: 'XYT22' });
    }  

    if (payload.expiredAt < moment().unix()) 
    {
        return res.status(401).json({ error: 'Token expirado', code: 'DLQ81' });
    }

    // SE GUARDA EL ID DEL USUARIO AUTENTICADO
    req.body.idUsuario = payload.idUsuario;
    req.body.userType = payload.userType;
    next();
}

module.exports = {
    checkToken
}