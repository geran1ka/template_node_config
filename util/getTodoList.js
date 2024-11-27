import { readFile } from 'node:fs/promises';
import { write } from '../modules/write.js';

export const getTodoList = async pathFile => {
  try {
    return JSON.parse((await readFile(pathFile, 'utf-8')) || '[]');
  } catch (error) {
    write(`Ошибка при чтении TodoList: ${error}`);
    return [];
  }
};
