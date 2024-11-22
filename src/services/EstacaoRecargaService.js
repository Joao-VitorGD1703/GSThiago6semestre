import EstacaoRecarga from '../models/estacaoRecarga.js';

class EstacaoRecargaService {
  static async listarEstacoes() {
    return await EstacaoRecarga.find();
  }

  static async criarEstacao(dados) {
    try {
      const novaEstacao = new EstacaoRecarga(dados);
      return await novaEstacao.save();
    } catch (error) {
      console.error('Erro ao salvar a estação no banco de dados:', error);
      throw error;
    }
  }

  static async atualizarEstacao(id, dados) {
    return await EstacaoRecarga.findByIdAndUpdate(id, dados, { new: true });
  }

  static async deletarEstacao(id) {
    return await EstacaoRecarga.findByIdAndDelete(id);
  }
}

export default EstacaoRecargaService;

