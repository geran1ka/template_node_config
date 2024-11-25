#!/usr/bin/env/ node

import { generatePassword } from './service/generatePassword.service.js';
import { getAnswerOption } from './service/getAnswerOption.js';
import { argsParse } from './util/argsParse.js';

const app = async () => {
  const args = argsParse(process.argv);
  const option = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (args.a || args.ask) {
    // TODO c помощью readline опросить пользователя
    const { length, uppercase, number, special } = await getAnswerOption();

    if (length) option.length = length;

    if (uppercase) option.uppercase = uppercase;

    if (number) option.number = number;

    if (special) option.special = special;
    console.log('option: ', option);

    generatePassword(option);

    return;
  }

  if (args.h || args.help) {
    console.log(`
      -h --help       | список команд (игнор других команд)
      -l --length     | длина пароля
      -u --uppercase  | включить заглавные буквы
      -n --number     | включить числа
      -s --special    | включить спецсимволы
      -a --hask       | провести опрос (игнор других команд)
      `);
    return;
  }

  if (args.l || args.length) {
    console.log(`Длина: ${args.l || args.length}`);
    option.length = args.l || args.length;
  }

  if (args.u || args.uppercase) {
    console.log('Строчные буквы');
    option.uppercase = args.u || args.uppercase;
  }

  if (args.n || args.number) {
    console.log('Цифры');
    option.number = args.n || args.number;
  }

  if (args.ы || args.special) {
    console.log('Спецсимволы');
    option.number = args.ы || args.special;
  }

  console.log('option: ', option);
  generatePassword(option);
};

app();
