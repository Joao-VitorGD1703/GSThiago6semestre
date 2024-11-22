import VeiculoEletrico from '../models/VeiculoEletrico.js';

export default class VeiculoEletricoService {
  static async listarVeiculos() {
    return await VeiculoEletrico.find();
  }

  static async criarVeiculo(dados) {
    try {
      const novoVeiculo = new VeiculoEletrico(dados);
      console.log('Criando novo veículo:', novoVeiculo);
      return await novoVeiculo.save();
    } catch (error) {
      console.error('Erro ao salvar o veículo no banco de dados:', error);
      throw error;
    }
  }

  static async atualizarVeiculo(id, dados) {
    return await VeiculoEletrico.findByIdAndUpdate(id, dados, {
      new: true
    });
  }

  static async deletarVeiculo(id) {
    return await VeiculoEletrico.findByIdAndDelete(id);
  }
}


