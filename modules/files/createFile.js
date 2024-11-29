import { open } from 'node:fs/promises';
import { write } from '../write.js';
import path from 'node:path';

export const createFile = async pathFile => {
  try {
    const nameFile = path.basename(pathFile);
    await open(pathFile, 'w');
    write(`Файл с именем ${nameFile} создан`);
  } catch (error) {
    write(`Произошла ошибка при создании файла: ${error}`);
  }
};
