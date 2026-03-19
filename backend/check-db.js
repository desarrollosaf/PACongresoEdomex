const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('congreso_bd', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

async function check() {
  try {
    const [results] = await sequelize.query(`
      SELECT id, legislatura_id, diputado_id, fecha_fin 
      FROM integrantes_legislatura
      LIMIT 10;
    `);
    console.table(results);
    
    const [counts] = await sequelize.query(`
      SELECT 
        SUM(CASE WHEN fecha_fin IS NULL THEN 1 ELSE 0 END) as null_fecha_fin,
        SUM(CASE WHEN fecha_fin IS NOT NULL THEN 1 ELSE 0 END) as has_fecha_fin
      FROM integrantes_legislatura;
    `);
    console.log('Stats:', counts[0]);
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

check();
