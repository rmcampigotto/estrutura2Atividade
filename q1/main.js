import inquirer from 'inquirer';

class HashTable {
    constructor(size) {
        this.table = new Array(size);
        this.pilha = new Array(50);
        this.size = size;
    }

    // Função para gerar o index hash
    _hash(key) {
        let hash = key * 0.618
        hash = hash - parseInt(hash)
        console.log(`\n HASH: ${parseInt(hash * this.size)}\n`)
        return parseInt(hash * this.size);
    }

    set(key, value) {
        let today = new Date();
        let hr = String(today.getHours()).padStart(2, '0');
        let MM = String(today.getMinutes()).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = `${dd}/${mm}/${yyyy} ${hr}:${MM}`;

        const index = this._hash(key);
        if (!this.table[index]) {
            this.table[index] = new LinkedList(); // Lista para colisões
        }
        this.table[index].append({ key, value });
        this.pilha.push({ "operação": "INSERIR", "date": today });
    }

    get(key) {
        const index = this._hash(key);
        if (!this.table[index]) return null;
        let current = this.table[index].head;
        while (current) {
            if (current.data.key === key) {
                return current.data.value;
            }
            current = current.next;
        }
        return null;
    }

    remove(key) {
        let today = new Date();
        let hr = String(today.getHours()).padStart(2, '0');
        let MM = String(today.getMinutes()).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = `${dd}/${mm}/${yyyy} ${hr}:${MM}`;

        const index = this._hash(key);
        if (!this.table[index]) return null;
        const removed = this.table[index].remove({ key });
        return removed ? removed.value & this.pilha.push({ "operação": "REMOVER", "date": today }) : null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = { data, next: null };
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    remove(data) {
        if (!this.head) return null;
        let current = this.head;
        let prev = null;
        while (current) {
            if (current.data.key === data.key) {
                if (!prev) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                return current.data;
            }
            prev = current;
            current = current.next;
        }
        return null;
    }
}

const myHash = new HashTable(21);
let key, value, opcao;

/*==========================================================================*/
const cabecalho = async function () {
    await inquirer.prompt([
        {
            type: 'number',
            name: 'opcao',
            message: '\n1-INSERIR\n2-BUSCAR\n3-REMOVER\n4-PILHA LOG\n0-SAIR\n\nESCOLHA: '
        }
    ]).then((answers) => {
        opcao = answers.opcao
        opcao = parseInt(opcao)
    })
}

const inserir = async function () {
    await inquirer.prompt([
        {
            type: 'number',
            name: 'key',
            message: '\nKEY: '
        },
        {
            type: 'any',
            name: 'value',
            message: '\nVALUE: '
        }
    ]).then((answers) => {
        key = answers.key
        value = answers.value
    })
}

const buscar = async function () {
    await inquirer.prompt([
        {
            type: 'number',
            name: 'key',
            message: '\nKEY: '
        }
    ]).then((answers) => {
        key = answers.key
    })
}

const remover = async function () {
    await inquirer.prompt([
        {
            type: 'number',
            name: 'key',
            message: '\nKEY: '
        }
    ]).then((answers) => {
        key = answers.key
    })
}
/*==========================================================================*/


do {
    await cabecalho()
    switch (opcao) {
        case 1:
            await inserir()
            myHash.set(key, value)
            break
        case 2:
            await buscar()
            console.log(`\n\t Valor do index [${key}]: ${myHash.get(key)}`)
            break
        case 3:
            await remover()
            myHash.remove(key)
            break
        case 4:
            console.log()
            myHash.pilha.forEach(item => {
                console.log(`\tOPERAÇÃO: ${item.operação} - DATA: ${item.date}`)
            })
            console.log()
            break
        default:
            if (opcao != 0)
                console.log("Opção Inválida!")
            break
    }

} while (opcao > 0)
