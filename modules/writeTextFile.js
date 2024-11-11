import { writeFile } from 'fs/promises';

export const writeTextFile = async (pathFile, data) => {
  try {
    await writeFile(pathFile, data);

    return true;
  } catch (error) {
    console.error(error);
  }
};
