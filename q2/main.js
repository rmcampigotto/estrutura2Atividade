import inquirer from 'inquirer';

/*==========================================================================*/
const cabecalho = async function () {
    await inquirer.prompt([
        {
            type: 'number',
            name: 'opcao',
            message: '\n1-INSERIR (VETOR)\n2-BUSCAR (ARVORE)\n3-REMOVER (VETOR|LISTA)\n4-ORDENAR (LISTA)\n0-SAIR\n\nESCOLHA: '
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
        }
    ]).then((answers) => {
        nome = answers.nome
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

class Contato {
    vetor = new Array(21)
    listaEncadeada = new ListaEncadeada()
    arvore = new Arvore()

    inserirVetor(contato) {
        this.vetor.push(contato)
    }

    removerVetor(contato) {
        let index = this.vetor.indexOf(contato)
        this.vetor.splice(index, 1)
    }
}

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

    ordenarPorNome(lista) {
        let current = lista.head;
        while (current) {
            let menor = current;
            let next = current.next;
            while (next) {
                if (next.contato.nome < menor.contato.nome) {
                    menor = next;
                }
                next = next.next;
            }
            if (menor !== current) {
                let temp = menor.contato;
                menor.contato = current.contato;
                current.contato = temp;
            }
            current = current.next;
        }
    }
}

class No {
    constructor(contato) {
        this.contato = contato
        this.left = null
        this.right = null
    }
}

class Arvore {
    constructor() {
        this.raiz = null
    }

    inserir(contato) {
        const novoNo = new No(contato)

        if (this.raiz === null) {
            this.raiz = novoNo
        } else {
            this.inserirNo(this.raiz, novoNo)
        }
    }

    inserirNo(no, novoNo) {
        if (novoNo.contato.nome < no.contato.nome) {
            if (no.left === null) {
                no.left = novoNo
            } else {
                this.inserirNo(no.left, novoNo)
            }
        } else {
            if (no.right === null) {
                no.right = novoNo
            } else {
                this.inserirNo(no.right, novoNo)
            }
        }
    }

    buscar(nome) {
        return this.buscarNo(this.raiz, nome)
    }

    buscarNo(no, nome) {
        if (no === null) {
            return false
        } else if (nome < no.contato.nome) {
            return this.buscarNo(no.left, nome)
        } else if (nome > no.contato.nome) {
            return this.buscarNo(no.right, nome)
        } else {
            return `\tNome: ${no.contato.nome} - Telefone: ${no.contato.telefone} ;`
        }
    }
}

let contato = new Contato()
let nome, telefone, opcao

do {
    await cabecalho()
    switch (opcao) {
        case 1:
            await inserir()
            contato.inserirVetor({ nome, telefone })
            break
        case 2:
            contato.vetor.forEach((item) => {
                contato.arvore.inserir(item)
            })
            await buscar()
            console.log("\nArvore:")
            console.log(contato.arvore.buscar(nome))
            break
        case 3:
            await remover()
            contato.listaEncadeada.remover(nome, telefone)
            contato.removerVetor({ nome, telefone })
            break
        case 4:
            contato.vetor.forEach((item) => {
                contato.listaEncadeada.inserir(item)
            })
            contato.listaEncadeada.ordenarPorNome(contato.listaEncadeada)
            console.log("\nLista Ordenada!")
            break
        default:
            if (opcao != 0)
                console.log("Opção Inválida!")
            break
    }
} while (opcao > 0)