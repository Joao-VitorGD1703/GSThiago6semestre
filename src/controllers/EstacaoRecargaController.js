import EstacaoRecargaService from '../services/EstacaoRecargaService.js';
import redisClient from '../connections/redis.js';

class EstacaoRecargaController {
  static async listarEstacoes(req, res) {
    try {
      const cacheKey = 'estacoes-recarga';
      const cacheData = await redisClient.get(cacheKey);

      if (cacheData) {
        console.log('Dados retornados do cache');
        return res.json(JSON.parse(cacheData));
      }

      const estacoes = await EstacaoRecargaService.listarEstacoes();
      await redisClient.setex(cacheKey, 3600, JSON.stringify(estacoes)); 
      console.log('Dados armazenados no cache');
      res.json(estacoes);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar estações de recarga' });
    }
  }

  static async criarEstacao(req, res) {
    try {
      const estacaoData = req.body;
      const novaEstacao = await EstacaoRecargaService.criarEstacao(estacaoData);

      await redisClient.del('estacoes-recarga');
      console.log('Cache limpo após criação');
      res.status(201).json(novaEstacao);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar a estação de recarga' });
    }
  }

  static async atualizarEstacao(req, res) {
    try {
      const { id } = req.params;
      const estacaoData = req.body;
      const estacaoAtualizada = await EstacaoRecargaService.atualizarEstacao(id, estacaoData);

      if (!estacaoAtualizada) {
        return res.status(404).json({ error: 'Estação de recarga não encontrada' });
      }

      await redisClient.del('estacoes-recarga');
      console.log('Cache limpo após atualização');
      res.json(estacaoAtualizada);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar a estação de recarga' });
    }
  }

  static async deletarEstacao(req, res) {
    try {
      const { id } = req.params;
      const estacaoDeletada = await EstacaoRecargaService.deletarEstacao(id);

      if (!estacaoDeletada) {
        return res.status(404).json({ error: 'Estação de recarga não encontrada' });
      }

      await redisClient.del('estacoes-recarga');
      console.log('Cache limpo após deleção');
      res.json({ message: 'Estação de recarga deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar a estação de recarga' });
    }
  }
}

export default EstacaoRecargaController;
