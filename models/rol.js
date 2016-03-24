
module.exports = function(sequelize, DataTypes){
	var Rol = sequelize.define('Rol', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethos: {
			associate: function(models){
				Rol.belongsToMany(models.Modulo, {through: models.moduloRol, foreignKey:'rolId'});
				Rol.hasOne(models.Usuario);	
			}
		},
		freezeTableName: true,
		tableName: 'rol'
	});

	return Rol;
}