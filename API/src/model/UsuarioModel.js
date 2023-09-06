const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index');

class User extends Model {}

User.init({
  Cpf: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false,
  },
  Nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Cep: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  Senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  FormacaoAcademica: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  TempoDeCurso: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  Especializacao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: false,
});

// Associação com a tabela Reserva
User.belongsTo(sequelize.models.Reserva, { foreignKey: 'fk_Reserva_IdReserva', as: 'Reserva' });

module.exports = User;
