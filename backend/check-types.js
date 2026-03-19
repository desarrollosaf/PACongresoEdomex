const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('congreso', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

async function check() {
  try {
    const [results] = await sequelize.query(`SHOW COLUMNS FROM diputados;`);
    console.table(results.map(r => r.Field));
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

check();
