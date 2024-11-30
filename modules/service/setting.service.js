import { readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const filePath = path.join(os.homedir(), 'setting.genpass.json');

export const saveSetting = async options => {
  await writeFile(filePath, JSON.stringify(options), 'utf8');
};

export const getSetting = async options => {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    await saveSetting(options);
  }
};
