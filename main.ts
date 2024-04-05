class HashTable {
    table = new Array(3);
    private qtyItems = 0;

    private hashKey(key: string | number, size: number) {
        if (typeof key == 'number') {
            return key % size;
        }

        let hashIndex = 2

        for (let i = 0; i < key.length; i++) {
            hashIndex = (13 * hashIndex * key.charCodeAt(i)) % size
        }

        return hashIndex;
    }

    private resize() {
        const newHashTable = new Array(this.table.length * 2);

        this.table.forEach(item => {
            if (item) {
                item.forEach(([key, value]: [key: string | number, value: any]) => {
                    const index = this.hashKey(key, newHashTable.length);

                    if (![null, undefined].includes(newHashTable[index])) {
                        newHashTable.push([key, value]);
                        return;
                    }

                    newHashTable[index] = [[key, value]];
                })
            }
        })

        this.table = newHashTable;
    }

    getItem(key: string | number) {
        const index = this.hashKey(key, this.table.length);

        if (index != null) {
            const item = this.table[index].find((x: any) => x[0] == key);

            return item ? item[1] : "\nItem náo existe!\n";
        }
    }

    setItem(key: string | number, value: any): void {
        this.qtyItems++;
        const loadFactor = this.qtyItems / this.table.length

        if (loadFactor > 0.8) {
            this.resize()
        }

        const index = this.hashKey(key, this.table.length);

        if (index != null) {
            if (![null, undefined].includes(this.table[index])) {
                this.table[index].push([key, value]);
                return;
            }

            this.table[index] = [[key, value]];
        }
    }

}

function main() {

}


main()