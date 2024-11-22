import mongoose from 'mongoose';

const EstacaoRecargaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  localizacao: { type: String, required: true },
  totalCarregadores: { type: Number, required: true },
  carregadoresDisponiveis: { type: Number, required: true },
  potenciaTotal: { type: Number, required: true },
  custoPorKWh: { type: Number, required: true },
  emOperacao: { type: Boolean, required: true },
  dataUltimaManutencao: { type: Date, required: true },
});

const EstacaoRecarga = mongoose.model('EstacaoRecarga', EstacaoRecargaSchema);

export default EstacaoRecarga;
