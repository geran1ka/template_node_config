import { getColorStr } from '../colors.js';
import { writeTodoFile } from '../files/writeTodoFile.js';
import { write } from '../write.js';

export const deleteTodo = async ({ list, data, path }) => {
  try {
    if (!(list.length > 0)) {
      write(getColorStr('Ваш список задач пока пуст.', 'blue'))
      return;
    }
    const arr = list
      .filter(item => item.id !== +data.id)
      .map((item, index) => {
        item.id = item.id === index + 1 ? item.id : index + 1;
        return item;
      });
    const ready = await writeTodoFile(path, arr);
    ready ?
      write(
        getColorStr(`Задача с идентификатором ${data.id} удалена`, 'bgBlue'),
      ) :
      write(getColorStr('Что-то пошло нет так...', 'red'));
  } catch (error) {
    write(getColorStr(`Ошибка при удалении задачи: ${error}`, 'red'));
  }
};
