const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index'); 

class Reserva extends Model {}

Reserva.init({
  Sala: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  FuncaoSala: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  NumeroSala: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  DataReserva: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PessoaReservista: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Reserva',
  timestamps: false,
});

// Associações
Reserva.hasMany(sequelize.models.User, { foreignKey: 'fk_Reserva_IdReserva', as: 'Usuarios' });
Reserva.hasMany(sequelize.models.Sala, { foreignKey: 'fk_Reserva_IdReserva', as: 'Salas' });

module.exports = Reserva;
