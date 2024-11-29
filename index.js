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
import { getOptions } from './modules/settings/getOptions.js';
import { homeDir } from './modules/service/homeDir.js';
import { homedir } from 'node:os';
import { resetDir } from './modules/service/resetDir.js';

const app = async () => {
  try {
    const args = argsParse(process.argv, [
      'add',
      'list',
      'get',
      'update',
      'status',
      'delete',
      'homeDir',
      'resetDir',
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
        homeDir                 | сохранять файл todo.json в директории ${homedir()}
        resetDir                | сбросить настройки по сохранеию файла todo.json к стандартным
        `,
          'blue',
        ),
      );
      process.exit();
    }

    const options = await getOptions();
    const { filePathTask } = options;

    if (args.homeDir) {
      await homeDir(options);
      process.exit();
    }

    if (args.resetDir) {
      await resetDir(options);
      process.exit();
    }

    const check = await isTodoFile(filePathTask);

    if (!check) {
      createFile(filePathTask);
    }

    const todolist = await getTodoList(filePathTask);

    if (args.add) {
      await addTodo({ list: todolist, data: args.add, path: filePathTask });
      process.exit();
    }

    if (args.list) {
      getList(todolist);
      process.exit();
    }

    if (args.get) {
      getTodo({ list: todolist, data: args.get });
      process.exit();
    }

    if (args.update) {
      await updateTodo({
        list: todolist,
        data: args.update,
        path: filePathTask,
      });
      process.exit();
    }

    if (args.status) {
      await updateTodo({
        list: todolist,
        data: args.status,
        path: filePathTask,
      });
      process.exit();
    }

    if (args.delete) {
      await deleteTodo({
        list: todolist,
        data: args.delete,
        path: filePathTask,
      });
      process.exit();
    }

    write(
      getColorStr(
        'Введенной команды не существует, воспользуйтесь командой -h или  --help',
        'red',
      ),
    );
    process.exit();
  } catch (error) {
    write(getColorStr(`Ошибка при выполненение программы: ${error}`, 'red'));
    process.exit();
  }
};

app();
