import { write } from '../write.js';
import { getColorStr } from '../colors.js';
import { writeTodoFile } from '../files/writeTodoFile.js';

export const homeDir = async options => {
  options.homedir = true;
  const ready = await writeTodoFile(options.fileOptionsPath, options);

  ready && write(getColorStr('Настройки изменены', 'bgBlue'));
};
