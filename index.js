import { createFile } from 'fs-extra';
import { access, constants, readFile, writeFile } from 'node:fs/promises';

const pathF = './tod.json';

const data = [];
try {
  await access(pathF, constants.F_OK);
  console.log('файл есть');
  data.push(...JSON.parse(await readFile(pathF, 'utf-8')));
} catch (error) {
  console.log('нет');
  createFile(pathF);
}

const createMessage = async (message) => {
  const obj = {
    id: Math.random().toString().substring(2),
    todo: message,
    status: false
  }

  data.push(obj);
  await writeFile(pathF, JSON.stringify(data))
}

createMessage('Собрать ПК')
createMessage('Собрать ПК1')
createMessage('Собрать ПК2')
console.log('data: ', data);


