const { Produto } = require("../models");

class ServiceError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function idInvalido(id) {
  return Number.isNaN(Number(id)) || Number(id) <= 0;
}

function validarPayload({ nome, preco, quantidade }) {
  if (!nome || preco === undefined || quantidade === undefined) {
    throw new ServiceError("Informe nome, preco e quantidade.", 400);
  }
}

class ProdutosService {
  async criar(dados) {
    validarPayload(dados);
    return Produto.create(dados);
  }

  async listar() {
    return Produto.findAll({ order: [["id", "ASC"]] });
  }

  async buscarPorId(id) {
    if (idInvalido(id)) {
      throw new ServiceError("ID invalido.", 400);
    }

    const produto = await Produto.findByPk(id);

    if (!produto) {
      throw new ServiceError("Produto nao encontrado.", 404);
    }

    return produto;
  }

  async atualizar(id, dados) {
    validarPayload(dados);
    const produto = await this.buscarPorId(id);
    await produto.update(dados);
    return produto;
  }

  async remover(id) {
    const produto = await this.buscarPorId(id);
    await produto.destroy();
  }
}

module.exports = {
  ProdutosService: new ProdutosService(),
  ServiceError,
};
