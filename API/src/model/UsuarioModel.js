const { database } = require('../database/index');

const { DataTypes } = require('sequelize');

const PessoaModel = database.define('api',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nome:{
        type: DataTypes.TEXT,
        allownull: false,
    },
    cep:{
        type: DataTypes.CHAR(8),
        allownull: false,
    },
},
{
    tableName: "api",
    timestamps: false,
});




module.exports = {PessoaModel};