import { getColorStr } from '../colors.js';
import { writeTodoFile } from '../files/writeTodoFile.js';
import { write } from '../write.js';

export const updateTodo = async ({
  list,
  data: { id, newTask = '', newStatus = '' },
  path,
}) => {
  try {
    if (!(list.length > 0)) {
      write(getColorStr('Ваш список задач пока пуст.', 'blue'));
      return;
    }

    list.map(item => {
      if (item.id === +id) {
        if (newTask) {
          item.task = newTask;
        }

        if (newStatus) {
          item.status =
            newStatus.trim().charAt(0).toUpperCase() +
            newStatus.trim().slice(1).toLowerCase();
        }
      }
      return item;
    });
    const ready = await writeTodoFile(path, list);

    if (ready && newTask) {
      write(getColorStr(`Задача с идентификатором ${id} обновлена`, 'bgBlue'));
    }

    if (ready && newStatus) {
      write(
        getColorStr(`Статус задачи с идентификатором ${id} обновлен`, 'bgBlue'),
      );
    }
  } catch (error) {
    write(
      getColorStr(
        `Произошла ошибка во время обновления задачи: ${error}`,
        'red',
      ),
    );
  }
};
