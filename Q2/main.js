import inquirer from 'inquirer';

/*==========================================================================*/
const cabecalho = async function () {
    await inquirer.prompt([
        {
            type: 'number',
            name: 'opcao',
            message: '\n1-INSERIR\n2-BUSCAR\n3-REMOVER\n\nESCOLHA: '
        }
    ]).then((answers) => {
        opcao = answers.opcao;
        opcao = parseInt(opcao);
    })
}

const inserir = async function () {
    await inquirer.prompt([
        {
            type: 'string',
            name: 'nome',
            message: '\nNOME: '
        },
        {
            type: 'string',
            name: 'telefone',
            message: '\nTELEFONE: '
        }
    ]).then((answers) => {
        nome = answers.nome;
        telefone = answers.telefone;
    });
}

const buscar = async function () {
    await inquirer.prompt([
        {
            type: 'string',
            name: 'nome',
            message: '\nNOME: '
        }/*,
        {
            type: 'string',
            name: 'telefone',
            message: '\nTELEFONE: '
        }*/
    ]).then((answers) => {
        nome = answers.nome;
        /*telefone = answers.telefone;*/
    });
}

const remover = async function () {
    await inquirer.prompt([
        {
            type: 'string',
            name: 'nome',
            message: '\nNOME: '
        },
        {
            type: 'string',
            name: 'telefone',
            message: '\nTELEFONE: '
        }
    ]).then((answers) => {
        nome = answers.nome;
        telefone = answers.telefone;
    });
}
/*==========================================================================*/

class ListaEncadeada {
    constructor() {
        this.head = null;
    }

    inserir(contato) {
        const novoNo = { contato, next: null };
        if (!this.head) {
            this.head = novoNo;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = novoNo;
    }

    remover(contato) {
        if (!this.head) return null;
        let current = this.head;
        let prev = null;
        while (current) {
            if (current.contato.telefone === contato.telefone) {
                if (!prev) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                return current.contato;
            }
            prev = current;
            current = current.next;
        }
        return null;
    }
}

class Contato {
    vetor = new Array(50);
    listaEncadeada = new ListaEncadeada();

    inserirVetor(nome, telefone) {
        this.vetor.push({ nome, telefone });
    }

    removerVetor(nome, telefone) {
        let index = this.vetor.indexOf({ nome, telefone });
        this.vetor.splice(index, 1);
    }

    buscarVetor(nome) {
        this.vetor.forEach(item => {
            if (item.nome == nome) {
                console.log(`\tNome: ${item.nome} - Telefone: ${item.telefone} ;`)
            }
        });
    }

    inserirLista(nome, telefone) {
        this.listaEncadeada.inserir({ nome, telefone });
    }

    removerLista(nome, telefone) {
        this.listaEncadeada.remover({ nome, telefone });
    }

}

let contato = new Contato();
let nome, telefone, opcao;

do {
    await cabecalho();
    switch (opcao) {
        case 1:
            await inserir();
            contato.inserirLista(nome, telefone);
            contato.inserirVetor(nome, telefone);
            break;
        case 2:
            await buscar();
            console.log('\nVetor:')
            contato.buscarVetor(nome);
            break;
        case 3:
            await remover();
            contato.removerLista(nome, telefone);
            contato.removerVetor(nome, telefone);
            break;
        default:
            break;
    }

} while (opcao > 0);