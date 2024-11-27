import { writeFile } from 'node:fs/promises';

export const writeTodoFile = async (pathFile, data) => {
  try {
    await writeFile(pathFile, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(error);
  }
};
