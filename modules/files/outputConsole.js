import { getColorStr } from '../colors.js';
import { write } from '../write.js';

export const outputConsole = ({ id, status, task }) =>
  write(
    getColorStr(
      `${id}. [${status}] ${task}.`,
      status.toLowerCase() === 'выполнена' ||
        status.toLowerCase() === 'завершена' ?
        'green' :
        'yellow',
    ),
  );
