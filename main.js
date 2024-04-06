import inquirer from 'inquirer';

class HashTable {
    constructor(size) {
        this.table = new Array(size);
        this.size = size;
    }

    // Basic hash function (improve for better distribution)
    _hash(key) {
        let hash = 0;
        if (typeof key == 'string') {
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i) * i;
            }
        }

        return hash % this.size;
    }

    // Set key-value pair
    set(key, value) {
        const index = this._hash(key);
        if (!this.table[index]) {
            this.table[index] = new LinkedList(); // Create a linked list for collisions
        }
        this.table[index].append({ key, value });
    }

    // Get value by key
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

    // Remove key-value pair (optional)
    remove(key) {
        const index = this._hash(key);
        if (!this.table[index]) return null;
        const removed = this.table[index].remove({ key });
        return removed ? removed.value : null;
    }
}

// Simple linked list class for separate chaining
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

const myHash = new HashTable(3);
let key, value;

// INPUT DE VALORES
await inquirer.prompt([
    {
        type: 'string | number',
        name: 'key',
        message: 'KEY: '
    },
    {
        type: 'any',
        name: 'value',
        message: 'VALUE: '
    }
]).then((answers) => {
    key = answers.key;
    value = answers.value;
});


myHash.set(key, value)
console.log(myHash.get(key));
