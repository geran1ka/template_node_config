import { getColorStr } from '../colors.js';
import { outputConsole } from '../files/outputConsole.js';
import { write } from '../write.js';

export const getList = arr => {
  if (arr.length) {
    write(getColorStr('Список задач:', 'blue'))
    arr.forEach(({ id, status, task }) => {
      outputConsole({ id, status, task });
    });
  } else {
    write(getColorStr('Ваш список задач пока пуст.', 'blue'))
  }

};
