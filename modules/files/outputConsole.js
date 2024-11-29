import { getColorStr } from '../colors.js';
import { write } from '../write.js';

export const outputConsole = ({ id, status, task }) =>
  write(
    getColorStr(
      `${id}. [${status}] ${task}.`,
      status.trim().toLowerCase().includes('выполн') ||
        status.trim().toLowerCase().includes('завершен') ||
        status.trim().toLowerCase().includes('готов') ||
        status.trim().toLowerCase().includes('ready')
        ? 'green'
        : 'yellow',
    ),
  );
