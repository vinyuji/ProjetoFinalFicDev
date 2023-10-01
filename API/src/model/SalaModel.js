const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index'); 


class SalaModel extends Model {
  static init(database){
    super.init({
      IdSala: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
        NomeSala: DataTypes.TEXT,
        Funcao: DataTypes.TEXT,
        NumeroSala: DataTypes.TEXT,
        Capacidade: DataTypes.INTEGER,
        Criador: DataTypes.TEXT,
      },{
        timestamps: true,
        sequelize: database,
        tableName: 'Sala',
        modelName: 'sala',
      })
    }
    static associate(models){
      this.hasMany(models.reserva, { foreignKey: 'IdReserva' });
    }
}



module.exports = { SalaModel };

