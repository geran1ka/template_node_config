import { readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { write } from '../write.js';
import { getColorStr } from '../colors.js';
import { createReadStream, createWriteStream } from 'node:fs';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

export const replaceText = async ({
  dirName,
  textFind,
  textReplace,
  settingsCli,
}) => {
  try {
    const files = (await readdir(dirName)).filter(
      file => path.extname(file) === '.txt',
    );

    console.log(files);

    if (!files.length) {
      write(
        getColorStr(
          `В указанной директории ${dirName} нет текстовых файлов`,
          'blue',
        ),
      );
      process.exit();
    }

    const pattern = new RegExp(textFind, `g${settingsCli.i ? 'i' : ''}`);

    for (const file of files) {
      const pathFile = path.join(dirName, file);
      const pathFileTemp = pathFile + '.tmp';

      const rStream = createReadStream(pathFile, { encoding: 'utf-8' });
      const wStream = createWriteStream(pathFileTemp);
      const tStream = new Transform({
        transform(chunk, encoding, callback) {
          const tChunk = chunk.toString().replaceAll(pattern, textReplace);
          callback(null, tChunk);
        },
      });

      await pipeline(rStream, tStream, wStream);
      await rename(pathFileTemp, pathFile);

      write(getColorStr(`Обработан файл ${file}`));
    }

    return true;
  } catch (error) {
    write(
      getColorStr(`Во время замены текста произошла ошибка: ${error}`, 'bgRed'),
    );
  }
};
