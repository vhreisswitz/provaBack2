const app = require("./app");
const { sequelize } = require("./models");

const port = process.env.PORT || 3333;

async function startServer() {
  try {
    await sequelize.authenticate();

    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`);
    });
  } catch (error) {
    console.error("Nao foi possivel conectar ao banco de dados.");
    process.exit(1);
  }
}

startServer();
