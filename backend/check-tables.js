const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('congreso_bd', 'root', '', { host: 'localhost', dialect: 'mysql', logging: false });
async function check() {
  const [tables] = await sequelize.query("SHOW TABLES LIKE '%integrante%';");
  console.log(tables);
  
  // also check if "integrante_legislatura" has data
  try {
      const [res] = await sequelize.query("SELECT COUNT(*) as count FROM integrante_legislatura;");
      console.log('integrante_legislatura count:', res[0].count);
  } catch(e) { console.log('integrante_legislatura doesnt exist'); }
  
  await sequelize.close();
}
check();
