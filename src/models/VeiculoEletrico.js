import mongoose from 'mongoose';

const VeiculoEletricoSchema = new mongoose.Schema({
    id: { type: String, required: true },               
    tipo: { type: String, required: true },             
    modelo: { type: String, required: true },           
    bateriaCapacidade: { type: Number, required: true }, 
    bateriaNivel: { type: Number, required: true },     
    autonomia: { type: Number, required: true },        
    consumoEnergia: { type: Number, required: true },   
    estacaoRecargaId: { type: String, required: true }, 
    dataUltimaRecarga: { type: Date, required: true }, 
    distanciaPercorrida: { type: Number, required: true }, 
});

const VeiculoEletrico = mongoose.model('VeiculoEletrico', VeiculoEletricoSchema);

export default VeiculoEletrico;
