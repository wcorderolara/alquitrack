'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'reservaDetalle',
      'tipoAlquilerId',
      {
        type: Sequelize.INTEGER,
        references: 'tipoAlquiler',
        referencesKey: 'id'
      }
    );

    queryInterface.addColumn(
      'reservaDetalle',
      'fechaSale',
      {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    );

    queryInterface.addColumn(
      'reservaDetalle',
      'fechaRegresa',
      {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    );

    queryInterface.addColumn(
      'reservaDetalle',
      'subTotal',
      {
        type: Sequelize.DECIMAL(15,2),
        allowNull: true
      }
    );

    queryInterface.addColumn(
      'reservaDetalle',
      'cantidadHoras',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );

    queryInterface.addColumn(
      'Tractor',
      'horometro',
      {
        type: Sequelize.BIGINT(11),
        allowNull: true
      }
    );

    queryInterface.addColumn(
      'Tractor',
      'capacidadPeso',
      {
        type: Sequelize.BIGINT(11),
        allowNull: true
      }
    );

    queryInterface.addColumn(
      'tipoAlquiler',
      'horasMinimas',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
