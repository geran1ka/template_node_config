import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { readdir } from 'node:fs/promises';
import { getColorStr } from '../colors.js';
import { write } from '../write.js';

const rl = createInterface({
  input: stdin,
  output: stdout,
});

export const getUserAnswerOptions = async () => {
  try {
    const dirname = await rl.question(
      getColorStr(
        'Введите наименование директории где находятся файлы: ',
        'green',
      ),
    );
    if (await readdir(dirname)) {
      console.log('2');
    }

    const textFind = await rl.question(
      getColorStr('Введите текст который хотите заменить: ', 'green'),
    );

    const textReplace = await rl.question(
      getColorStr('Введите текст который хотите вставить: ', 'green'),
    );
    return { dirname, textFind, textReplace };
  } catch {
    write(getColorStr('Указанная дирекория не существует', 'bgRed'));
    await getUserAnswerOptions();
  }
};

export const setOptions = async () => {
  const i =
    ((
      await rl.question('Включить поиск без учета регистра? (да/нет) [нет]:  ')
    ).toLowerCase() || 'нет') === 'да';
  write(
    getColorStr(
      `Поиск без учета регистра - ${i ? 'включен' : 'отключен'}`,
      'green',
    ),
  );
  return { i };
};
