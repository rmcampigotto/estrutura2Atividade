import { Router } from 'express';
import produtoController from '../estrutura2Atividade/src/estoque/produtos/produtos.controller'

const routes = Router();

routes.get('/produtosFindOne/:ID', produtoController.findCustomId)
routes.post('/produtosPost', produtoController.create)
routes.delete('/produtosDelete/:ID', produtoController.delete)

export default routes