import { getColorStr } from '../colors.js';
import { writeTodoFile } from '../files/writeTodoFile.js';
import { write } from '../write.js';

export const addTodo = async ({ list, data: { task }, path }) => {
  console.log('path: ', path);
  try {
    const id = list.length ? list.length + 1 : 1;
    list.push({
      id,
      task,
      status: 'В работе',
    });
    const ready = await writeTodoFile(path, list);
    ready
      ? write(getColorStr(`Задача добавлена с идентификатором ${id}`, 'bgBlue'))
      : write(getColorStr('Что-то пошло нет так...', 'red'));
  } catch (error) {
    write(getColorStr(`Ошибка при добавлении новой задачи: ${error}`, 'red'));
  }
};
