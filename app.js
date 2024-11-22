import express from 'express';
import connectDB from './src/connections/database.js';  
import rotasVeiculo from './src/routes/rotasVeiculo.js';  
import EstacaoRecargaService from './src/routes/rotasEstacaoRecarga.js';  



const app = express();
const PORT = 3001;

connectDB();
console.log(connectDB());


app.use(express.json());
app.use('/api', rotasVeiculo);
app.use('/api', EstacaoRecargaService);

app.listen(PORT, () => {
  console.log(`Servidor Express em execução na porta ${PORT}`);
});

export default app;