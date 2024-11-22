import request from 'supertest';
import app from '../src/app'; // Certifique-se de que o caminho está correto

describe('EstacaoRecarga API', () => {
  it('deve listar todas as estações de recarga', async () => {
    const res = await request(app).get('/api/estacoes-recarga');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('deve criar uma nova estação de recarga', async () => {
    const novaEstacao = {
      id: 'st003',
      localizacao: 'Praça da Sé, São Paulo, SP',
      totalCarregadores: 12,
      carregadoresDisponiveis: 8,
      potenciaTotal: 120,
      custoPorKWh: 0.48,
      emOperacao: true,
      dataUltimaManutencao: '2024-10-15T10:00:00Z'
    };
    const res = await request(app).post('/api/estacoes-recarga').send(novaEstacao);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id', 'st003');
  });

  it('deve atualizar uma estação de recarga existente', async () => {
    const estacaoAtualizada = {
      localizacao: 'Avenida Paulista, São Paulo, SP',
      totalCarregadores: 14,
      carregadoresDisponiveis: 10,
      potenciaTotal: 140,
      custoPorKWh: 0.50,
      emOperacao: true,
      dataUltimaManutencao: '2024-11-01T12:00:00Z'
    };
    const res = await request(app).put('/api/estacoes-recarga/st003').send(estacaoAtualizada);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('totalCarregadores', 14);
  });

  it('deve deletar uma estação de recarga existente', async () => {
    const res = await request(app).delete('/api/estacoes-recarga/st003');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Estação de recarga deletada com sucesso');
  });
});
