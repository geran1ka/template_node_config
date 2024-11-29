import { write } from '../write.js';
import { getColorStr } from '../colors.js';
import { writeTodoFile } from '../files/writeTodoFile.js';

export const resetDir = async options => {
  options.homedir = false;
  const ready = await writeTodoFile(options.fileOptionsPath, options);

  ready && write(getColorStr('Настройки сброшены', 'bgBlue'));
};
