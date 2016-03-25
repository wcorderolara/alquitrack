
module.exports = function (sequelize, DataTypes){

	var Sede = sequelize.define('Sede',{
		descripcion:{
			type: DataTypes.STRING,
			allowNull: false
		},
		status:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Sede.hasMany(models.Empleado);
				Sede.hasMany(models.Cliente);
				Sede.hasMany(models.Factura);
				Sede.hasMany(models.Tractor);
				Sede.hasMany(models.bitacoraTractor);
				Sede.hasMany(models.Reserva);
				Sede.belongsTo(models.Pais,{foreignKey: {allowNull: false}});
			}	
		},
		freezeTableName: true,
		tableName: 'sede'
	});

	return Sede;
}