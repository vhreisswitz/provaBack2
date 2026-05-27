const { ProdutosService, ServiceError } = require("../services/produtos.service");

class ProdutoController {
  async store(req, res) {
    try {
      const produto = await ProdutosService.criar(req.body);
      return res.status(201).json(produto);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro ao cadastrar produto." });
    }
  }

  async index(req, res) {
    try {
      const produtos = await ProdutosService.listar();
      return res.json(produtos);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao listar produtos." });
    }
  }

  async show(req, res) {
    try {
      const produto = await ProdutosService.buscarPorId(req.params.id);
      return res.json(produto);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro ao buscar produto." });
    }
  }

  async update(req, res) {
    try {
      const produto = await ProdutosService.atualizar(req.params.id, req.body);
      return res.json(produto);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro ao atualizar produto." });
    }
  }

  async delete(req, res) {
    try {
      await ProdutosService.remover(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro ao remover produto." });
    }
  }
}

module.exports = new ProdutoController();
