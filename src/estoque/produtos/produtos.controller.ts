import { Request, Response } from 'express';
import produtoService from './produto.service';


class ProdutoController{

    async create(req: Request, res: Response){
        try {
            const createProduto = await produtoService.create(req.body)
            return res.status(200).json(createProduto)
        } catch (error) {
            return res.status(404).json(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const deleteProduto = await produtoService.delete(Number.parseInt(req.params.ID))
            return res.status(200).json(deleteProduto)
        } catch (error) {
            return res.status(404).json(error)
        }
    }

    async findCustomId(req: Request, res: Response){
        try {
            const findProduto = await produtoService.findCustomId(Number.parseInt(req.params.ID))
            return res.status(200).json(findProduto)
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}

export default new ProdutoController()