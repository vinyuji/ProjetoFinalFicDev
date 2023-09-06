const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index');

class Sala extends Model {}

Sala.init({
  NomeSala: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Funcao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  TipoSala: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  NumeroSala: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  Capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Sala',
  timestamps: false,
});

// Associação com a tabela Reserva
Sala.belongsTo(sequelize.models.Reserva, { foreignKey: 'fk_Reserva_IdReserva', as: 'Reserva' });

module.exports = Sala;
