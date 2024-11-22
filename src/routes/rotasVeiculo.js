import express from 'express';
import VeiculoEletricoController from '../controllers/VeiculoEletricoController.js';

const router = express.Router();


router.get('/veiculos-eletricos', VeiculoEletricoController.listarVeiculos);
router.post('/veiculos-eletricos', VeiculoEletricoController.criarVeiculo);
router.put('/veiculos-eletricos/:id', VeiculoEletricoController.atualizarVeiculo);
router.delete('/veiculos-eletricos/:id', VeiculoEletricoController.deletarVeiculo); 

export default router;
