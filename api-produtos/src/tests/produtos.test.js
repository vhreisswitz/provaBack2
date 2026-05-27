const produtoController = require('../controllers/ProdutoController');
const { ProdutosService, ServiceError } = require('../services/produtosService');

jest.mock('../services/produtosService', () => ({
  ProdutosService: {
    criar: jest.fn(),
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    atualizar: jest.fn(),
    remover: jest.fn(),
  },
  ServiceError: class ServiceError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  },
}));

describe('ProdutoController', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  it('index: retorna lista de produtos', async () => {
    const mockProdutos = [{ id: 1, nome: 'Teclado', preco: 150, quantidade: 10 }];
    ProdutosService.listar.mockResolvedValue(mockProdutos);

    await produtoController.index(req, res);

    expect(res.json).toHaveBeenCalledWith(mockProdutos);
  });

  it('index: retorna 500 quando ocorre erro inesperado', async () => {
    ProdutosService.listar.mockRejectedValue(new Error('Erro no banco'));

    await produtoController.index(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao listar produtos.' });
  });

  it('store: cria produto com sucesso', async () => {
    req.body = { nome: 'Mouse', preco: 50, quantidade: 5 };
    const mockProdutoCriado = { id: 2, ...req.body };
    ProdutosService.criar.mockResolvedValue(mockProdutoCriado);

    await produtoController.store(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProdutoCriado);
  });

  it('store: retorna status do ServiceError', async () => {
    req.body = { nome: '', preco: 50, quantidade: 5 };
    ProdutosService.criar.mockRejectedValue(new ServiceError('Informe nome, preco e quantidade.', 400));

    await produtoController.store(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Informe nome, preco e quantidade.' });
  });
});
