import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { write } from '../write.js';
import { getColorStr } from '../colors.js';

export const replaceText = async ({
  dirname,
  textFind,
  textReplace,
  settingsCli,
}) => {
  try {
    const files = (await readdir(dirname)).filter(
      file => path.extname(file) === '.txt',
    );

    console.log(files);

    if (!files.length) {
      write(
        getColorStr(
          `В указанной директории ${dirname} нет текстовых файлов`,
          'blue',
        ),
      );
      process.exit();
    }

    const pattern = new RegExp(textFind, `g${settingsCli.i ? 'i' : ''}`);

    for (const file of files) {
      const pathFile = path.join(dirname, file);
      const text = await readFile(pathFile, 'utf-8');
      const newText = text.replaceAll(pattern, textReplace);
      await writeFile(pathFile, newText, 'utf-8');

      write(getColorStr(`Обработан файл ${file}`));
    }

    return true;
  } catch (error) {
    write(
      getColorStr(`Во время замены текста произошла ошибка: ${error}`, 'bgRed'),
    );
  }
};
