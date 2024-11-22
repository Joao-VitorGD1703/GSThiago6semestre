import request from 'supertest';
import app from '../src/app'; // Certifique-se de que o caminho está correto

describe('VeiculoEletrico API', () => {
  it('deve listar todos os veículos elétricos', async () => {
    const res = await request(app).get('/api/veiculos-eletricos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('deve criar um novo veículo elétrico', async () => {
    const novoVeiculo = {
      id: 'veic002',
      tipo: 'carro',
      modelo: 'Modelo S',
      bateriaCapacidade: 85,
      bateriaNivel: 90,
      autonomia: 350,
      consumoEnergia: 0.22,
      estacaoRecargaId: 'st001',
      dataUltimaRecarga: '2024-11-22T08:00:00Z',
      distanciaPercorrida: 15000
    };
    const res = await request(app).post('/api/veiculos-eletricos').send(novoVeiculo);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id', 'veic002');
  });

  it('deve atualizar um veículo elétrico existente', async () => {
    const veiculoAtualizado = {
      tipo: 'carro',
      modelo: 'Modelo S',
      bateriaCapacidade: 85,
      bateriaNivel: 85,
      autonomia: 360,
      consumoEnergia: 0.21,
      estacaoRecargaId: 'st001',
      dataUltimaRecarga: '2024-11-22T08:30:00Z',
      distanciaPercorrida: 15500
    };
    const res = await request(app).put('/api/veiculos-eletricos/veic002').send(veiculoAtualizado);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('autonomia', 360);
  });

  it('deve deletar um veículo elétrico existente', async () => {
    const res = await request(app).delete('/api/veiculos-eletricos/veic002');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Veículo elétrico deletado com sucesso');
  });
});
