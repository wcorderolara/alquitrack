
module.exports = function(sequelize, DataTypes){
	var monedaPais = sequelize.define('monedaPais', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				monedaPais.belongsTo(models.Pais, { foreignKey: {field:'paisId', allowNull:false } } );
			}
		},
		freezeTableName: true,
		tableName: 'monedaPais'
	});

	return monedaPais;
}