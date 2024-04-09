import fs from 'fs'

const filePath = './q3/palavras_chaves.txt'
let rows = new Array()

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');

    lines.forEach((line) => {
        rows.push(line)
    });
});