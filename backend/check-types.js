const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('congreso', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

async function check() {
  try {
    const [results] = await sequelize.query(`SHOW CREATE TABLE legislaturas;`);
    console.log(results[0]['Create Table']);
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

check();
