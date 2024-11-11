import { readFile } from 'fs/promises';

export const readText = async pathFile => {
  try {
    const res = await readFile(pathFile, 'utf-8');

    return res;
  } catch (error) {
    console.error(error);
  }
};
