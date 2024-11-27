#!/usr/bin/env/ node

import { getColorStr } from './modules/colors.js';
import { createFile } from './modules/files/createFile.js';
import { isTodoFile } from './modules/files/isTodoFile.js';
import { addTodo } from './modules/service/addTodo.js';
import { deleteTodo } from './modules/service/deleteTodo.js';
import { getList } from './modules/service/getList.js';
import { getTodo } from './modules/service/getTodo.js';
import { updateTodo } from './modules/service/updateTodo.js';
import { write } from './modules/write.js';
import { argsParse } from './util/argsParse.js';
import { getTodoList } from './util/getTodoList.js';

const app = async () => {
  try {
    const args = argsParse(process.argv, [
      'add',
      'list',
      'get',
      'update',
      'status',
      'delete',
    ]);

    if (args.h || args.help) {
      write(
        getColorStr(
          `
        -h или --help           | вывести список команд
        add <task>              | добавить новую задачу
        list                    | вывести список всех задач
        get <id>                | вывести информацию о задаче с указанным идентификатором
        update <id> <newTask>   | обновить задачу с указанным идентификатором
        status <id> <newStatus> | обновить статус задачи с указанным идентификатором
        delete <id>             | удалить задачу с указанным идентификатором
        `,
          'blue',
        ),
      );
      return;
    }

    const todoPath = './todo.json';
    const check = await isTodoFile(todoPath);

    if (!check) {
      createFile(todoPath);
    }

    const todolist = await getTodoList(todoPath);

    if (args.add) {
      addTodo({ list: todolist, data: args.add, path: todoPath });
      return;
    }

    if (args.list) {
      getList(todolist);
      return;
    }

    if (args.get) {
      getTodo({ list: todolist, data: args.get });
      return;
    }

    if (args.update) {
      updateTodo({ list: todolist, data: args.update, path: todoPath });
      return;
    }

    if (args.status) {
      updateTodo({ list: todolist, data: args.status, path: todoPath });
      return;
    }

    if (args.delete) {
      deleteTodo({ list: todolist, data: args.delete, path: todoPath });
      return;
    }

    write(
      getColorStr(
        'Введенной команды не существует, воспользуйтесь командой -h или  --help',
        'red',
      ),
    );
    return;
  } catch (error) {
    write(getColorStr(`Ошибка при выполненение программы: ${error}`, 'red'));
  }
};

app();
