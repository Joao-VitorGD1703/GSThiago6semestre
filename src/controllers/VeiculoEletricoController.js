import VeiculoEletricoService from '../services/VeiculoEletricoService.js';
import redisClient from '../connections/redis.js';

class VeiculoEletricoController {
  static async listarVeiculos(req, res) {
    try {
      const cacheKey = 'veiculos-eletricos';
      const cacheData = await redisClient.get(cacheKey);

      if (cacheData) {
        console.log('Dados retornados do cache');
        return res.json(JSON.parse(cacheData));
      }

      const veiculos = await VeiculoEletricoService.listarVeiculos();
      await redisClient.setex(cacheKey, 3600, JSON.stringify(veiculos)); 
      console.log('Dados armazenados no cache');
      res.json(veiculos);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar veículos elétricos' });
    }
  }

  static async criarVeiculo(req, res) {
    try {
      const veiculoData = req.body;
      const novoVeiculo = await VeiculoEletricoService.criarVeiculo(veiculoData);

      await redisClient.del('veiculos-eletricos');
      console.log('Cache limpo após criação');
      res.status(201).json(novoVeiculo);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar o veículo elétrico' });
    }
  }

  static async atualizarVeiculo(req, res) {
    try {
      const { id } = req.params;
      const veiculoData = req.body;
      const veiculoAtualizado = await VeiculoEletricoService.atualizarVeiculo(id, veiculoData);

      if (!veiculoAtualizado) {
        return res.status(404).json({ error: 'Veículo elétrico não encontrado' });
      }

      await redisClient.del('veiculos-eletricos');
      console.log('Cache limpo após atualização');
      res.json(veiculoAtualizado);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar o veículo elétrico' });
    }
  }

  static async deletarVeiculo(req, res) {
    try {
      const { id } = req.params;
      const veiculoDeletado = await VeiculoEletricoService.deletarVeiculo(id);

      if (!veiculoDeletado) {
        return res.status(404).json({ error: 'Veículo elétrico não encontrado' });
      }

      await redisClient.del('veiculos-eletricos');
      console.log('Cache limpo após deleção');
      res.json({ message: 'Veículo elétrico deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar o veículo elétrico' });
    }
  }
}

export default VeiculoEletricoController;
