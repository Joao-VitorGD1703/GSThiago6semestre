import express from 'express';
import EstacaoRecargaController from '../controllers/EstacaoRecargaController.js';

const router = express.Router();

router.get('/estacoes-recarga', EstacaoRecargaController.listarEstacoes);
router.post('/estacoes-recarga', EstacaoRecargaController.criarEstacao);
router.put('/estacoes-recarga/:id', EstacaoRecargaController.atualizarEstacao);
router.delete('/estacoes-recarga/:id', EstacaoRecargaController.deletarEstacao);

export default router;
