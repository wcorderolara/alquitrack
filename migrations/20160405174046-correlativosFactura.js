'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'correlativosFactura',
      'resolucion',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    queryInterface.addColumn(
      'correlativosFactura',
      'cantidadConsumidas',
      {
        type: Sequelize.BIGINT(11),
        allowNull: true,
        defaultValue: 0
      }
    );

    queryInterface.addColumn(
      'correlativosFactura',
      'cantidadAprobadas',
      {
        type: Sequelize.BIGINT(11),
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
