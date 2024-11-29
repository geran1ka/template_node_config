import { readFile, writeFile } from 'node:fs/promises';
import { getPathHomedir } from './getPathHomedir.js';

export const getOptions = async () => {
  const options = {
    homedir: false,
    filePathTask: './modules/save/todo.json',
    fileOptionsPath: './modules/save/todo-options.json',
  };
  try {
    const res = JSON.parse(
      (await readFile(options.fileOptionsPath, 'utf-8')) ||
        JSON.stringify(options),
    );
    options.homedir = await res.homedir;

    if (options.homedir) {
      options.filePathTask = getPathHomedir(options.filePathTask);
    }
    return options;
  } catch {
    await writeFile(options.fileOptionsPath, JSON.stringify(options));
    return options;
  }
};
