
module.exports = function(sequelize, DataTypes){

	var correlativosFactura = sequelize.define('correlativosFactura',{
		serie: {
			type: DataTypes.STRING,
			allowNull: false
		},
		cantidadDisponibles: {
			type: DataTypes.BIGINT(11),
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true,
		tableName: 'correlativosFactura'
	});

	return correlativosFactura;
}