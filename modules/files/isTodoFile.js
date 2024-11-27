import { access, constants } from 'node:fs/promises';
import { write } from '../write.js';

export const isTodoFile = async path => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (error) {
    write('Файл не существует');
    return false;
  }
};
