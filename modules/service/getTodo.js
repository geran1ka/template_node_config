import { getColorStr } from '../colors.js';
import { outputConsole } from '../files/outputConsole.js';
import { write } from '../write.js';

export const getTodo = ({ list, data }) => {
  if (!(list.length > 0)) {
    write(getColorStr('Ваш список задач пока пуст.', 'blue'))
    return;
  }
  const { id, status, task } = list.find(item => item.id === +data.id);
  outputConsole({ id, status, task });
};
