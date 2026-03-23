'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const filePath = path.join(__dirname, 'data', 'legislacion.json');

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const legislaciones = JSON.parse(rawData);

    const data = legislaciones.map(item => ({
      nombre: item.nombre,
      path: item.url_archivo,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('legislacions', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('legislacions', null, {});
  }
};
