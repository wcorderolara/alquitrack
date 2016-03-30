module.exports = function (sequelize, DataTypes){
	var Pais = sequelize.define('Pais', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		flag: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Pais.hasOne(models.monedaPais);
				Pais.hasOne(models.Empleado);
				Pais.hasOne(models.Cliente);
				Pais.hasOne(models.Tractor);
				Pais.hasOne(models.Factura);
				Pais.hasMany(models.Sede);
				Pais.hasMany(models.precioEquipo);
			}
		},

		freezeTableName: true,
		tableName: 'pais'
	});

	return Pais;

}