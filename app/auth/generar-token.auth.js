const jwt = require('jwt-simple');
const moment = require('moment');

const Token = async (_idUsuario, _userType) => {
    const payload = {
        idUsuario: _idUsuario,
        userType: _userType,
        createdAt: moment().unix(),
        expiredAt: moment().add(7, 'd').unix()
    };
    //console.log(payload)
    return jwt.encode( payload, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ' );
}

module.exports = {
    Token
}