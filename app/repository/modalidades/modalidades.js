const { sequelize, modalidades } = require('../../db');

const todos = async () => {
    try 
    {
        const response = await modalidades.findAll();
        return response;    
    } catch (error) 
    {
        throw new Error(error);
    }
};

module.exports = {
    todos
} 