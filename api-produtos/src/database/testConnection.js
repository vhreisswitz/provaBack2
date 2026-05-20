const { sequelize } = require("../models");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexao com o banco realizada com sucesso.");
    process.exit(0);
  } catch (error) {
    console.error("Nao foi possivel conectar ao banco de dados.");
    process.exit(1);
  }
}

testConnection();
