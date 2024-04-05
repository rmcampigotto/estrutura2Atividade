const readline = require('readline');
const fs = require('fs');
const json = require('./produtos.json')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const produtos = new Map(); // Tabela hash para produtos
const pilhaHistorico = []; // Pilha para histórico de operações

// Função para adicionar um novo produto
function adicionarProduto(nome, preco, quantidade) {
    const chave = hash(nome);
    const produto = { nome, preco, quantidade };

    // Se a chave não existir, cria uma nova lista
    if (!produtos.has(chave)) {
        produtos.set(chave, []);
    }

    // Adiciona o produto à lista na chave
    produtos.get(chave).push(produto);
    pilhaHistorico.push(`[ADICAO] ${nome} - ${quantidade}`);

    fs.writeFile('produtos.json', JSON.stringify(produto), (err) => {
        if (err) throw err;
    });
}

// Função para remover um produto
function removerProduto(nome, quantidade) {
    const chave = hash(nome);

    // Se a chave não existir ou a quantidade for maior que a disponível, retorna erro
    if (!buscarProduto(nome, 1) || parseInt(json.quantidade) < quantidade) {
        console.log(`Erro: Produto ${nome} não encontrado ou quantidade insuficiente.`);
        return;
    }

    json.quantidade -= quantidade;

    // Atualiza o arquivo JSON com os dados modificados
    const produtosJSON = Array.from(produtos.values()).flat();
    fs.writeFile('produtos.json', JSON.stringify(produtosJSON), (err) => {
        if (err) throw err;
        console.log('\nProduto removido do arquivo JSON e da memória.');
    });

    pilhaHistorico.push(`[REMOCAO] ${nome} - ${quantidade}`);
}

// Função para buscar um produto
function buscarProduto(nome, opcao) {
    const chave = hash(nome);
    switch (opcao) {
        case 0:
            try {
                if (json.nome.includes(nome)) {
                    console.log('\n\tProduto:');
                    console.log(`\tNome: ${json.nome}`);
                    console.log(`\tPreço: R$${json.preco}`);
                    console.log(`\tQuantidade: ${json.quantidade}`);
                    console.log('\n');
                }
            } catch (error) {
                console.log("JSON vazio")
            }

            break;
        case 1:
            if (json.nome.includes(nome)) {
                return true
            } else {
                return false
            }
        default:
            break;
    }

}

// Função para exibir o histórico de operações
function exibirHistorico() {
    console.log('\tHistórico de operações:');
    for (const operacao of pilhaHistorico) {
        console.log(`\t${operacao}`);
    }
}

// Função hash
function hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 37) + str.charCodeAt(i);
    }
    return hash % produtos.size;
}

// Interface de linha de comando
function iniciarInterface() {
    rl.question('\nComando (adicionar, remover, buscar, historico, sair): ', (comando) => {
        switch (comando) {
            case 'adicionar':
                rl.question('\nNome do produto: ', (nome) => {
                    rl.question('Preço: ', (preco) => {
                        rl.question('Quantidade: ', (quantidade) => {
                            adicionarProduto(nome, preco, quantidade);
                            console.log('\nProduto adicionado com sucesso!\n');
                            iniciarInterface();
                        });
                    });
                });
                break;
            case 'remover':
                rl.question('\nNome do produto: ', (nome) => {
                    rl.question('Quantidade a remover: ', (quantidade) => {
                        removerProduto(nome, quantidade);
                        iniciarInterface();
                    });
                });
                break;
            case 'buscar':
                rl.question('\nNome do produto: ', (nome) => {
                    buscarProduto(nome, 0);
                    iniciarInterface();
                });
                break;
            case 'historico':
                exibirHistorico();
                iniciarInterface();
                break;
            case 'sair':
                comando = '';
                console.log('\nSaindo do sistema...');
                rl.close();
                break;
            default:
                console.log('\n\tComando inválido. Tente novamente.');
                iniciarInterface();
        }
    });
}

// Inicia a interface de linha de comando
iniciarInterface();
