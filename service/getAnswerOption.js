import readline from 'node:readline/promises';

export const getAnswerOption = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const length = +(await rl.question('Введите желаемую длину пароля: ')) || 8;
  const uppercase =
    (
      await rl.question('Добавить заглавные буквы (да/нет): ')
    ).toLocaleLowerCase() === 'да';
  const number =
    (await rl.question('Добавить цифры (да/нет): ')).toLocaleLowerCase() ===
    'да';
  const special =
    (
      await rl.question('Добавить спецсимволы (да/нет): ')
    ).toLocaleLowerCase() === 'да';
  rl.close();

  return { length, uppercase, number, special };
};
