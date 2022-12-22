const bcrypt = require("bcryptjs");

const rondasDeSal = 10;

const Encryptar = async ( clave ) => {
    return await bcrypt.hash(clave, rondasDeSal);
}

const Desencryptar = async ( clave, hashToken ) => {
    return await bcrypt.compare(clave, hashToken);
}

module.exports = {
    Encryptar,
    Desencryptar
}