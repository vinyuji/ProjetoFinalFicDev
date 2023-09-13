const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index'); 


class ReservaModel extends Model {
  static init(database){
    super.init({
      IdReserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
        Sala: DataTypes.TEXT,
        FuncaoSala: DataTypes.TEXT,
        NumeroSala: DataTypes.TEXT,
        DataReserva: DataTypes.DATE,
        Capacidade: DataTypes.INTEGER,
        PessoaReservista: DataTypes.TEXT,
        Status: DataTypes.TEXT,
        Cpf: DataTypes.TEXT,
        IdSala: DataTypes.INTEGER,
      },{
        timestamps: true,
        sequelize: database,
        tableName: 'Reserva',
        modelName: 'reserva',
      })
    }
    static associate(models){
      this.belongsTo(models.user, { foreignKey: 'Cpf'});
      this.belongsTo(models.sala, { foreignKey: 'IdSala'});
    }
}



module.exports = { ReservaModel };
