// const { Produto } = require("../models");
const Produto = require("../services/produtos.service");

function idInvalido(id) {
  return Number.isNaN(Number(id)) || Number(id) <= 0;
}

class ProdutoController {
  async store(req, res) {
    try {
      // pega nome, preco e quantidade enviados pelo body
      const { nome, preco, quantidade } = req.body;

      // valida se os campos foram preenchidos
      if (!nome || preco === undefined || quantidade === undefined) {
        return res.status(400).json({
          erro: "Informe nome, preco e quantidade.",
        });
      }

      // cria produto no banco
      const produto = await Produto.create({ nome, preco, quantidade });

      // retorna produto criado
      return res.status(201).json(produto);
    } catch (error) {
      // retorna erro interno do servidor
      return res.status(500).json({ erro: "Erro ao cadastrar produto." });
    }
  }

  async index(req, res) {
    try {
      const produtos = await Produto.findAll({
        order: [["id", "ASC"]],
      });

      return res.json(produtos);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao listar produtos." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (idInvalido(id)) {
        return res.status(400).json({ erro: "ID invalido." });
      }

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ erro: "Produto nao encontrado." });
      }

      return res.json(produto);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao buscar produto." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, preco, quantidade } = req.body;

      if (idInvalido(id)) {
        return res.status(400).json({ erro: "ID invalido." });
      }

      if (!nome || preco === undefined || quantidade === undefined) {
        return res.status(400).json({
          erro: "Informe nome, preco e quantidade.",
        });
      }

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ erro: "Produto nao encontrado." });
      }

      await produto.update({ nome, preco, quantidade });

      return res.json(produto);
    } catch (error) {
      return res.status(400).json({ erro: "Erro ao atualizar produto." });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (idInvalido(id)) {
        return res.status(400).json({ erro: "ID invalido." });
      }

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ erro: "Produto nao encontrado." });
      }

      await produto.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ erro: "Erro ao remover produto." });
    }
  }
}

module.exports = new ProdutoController();
