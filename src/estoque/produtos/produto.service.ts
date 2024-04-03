import produtosModel from './produtos.schema';

class ProdutoService{

    async create(produtoJson: JSON){
        return await produtosModel.create(produtoJson)
    }

    async delete(ID: any){
        return await produtosModel.findOneAndDelete({ID: ID})
    }

    async findCustomId(ID: Number){
        return await produtosModel.findOne({ID: ID})
    }

}

export default new ProdutoService()

