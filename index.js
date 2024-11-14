import { createReadStream, createWriteStream } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const readDiretoryStream = async (pathDir, resultFile) => {
  try {
    const wStream = createWriteStream(resultFile);

    const allReadFileDirectory = await readdir(pathDir);
    for (const file of allReadFileDirectory) {
      if (path.extname(file) === '.txt') {
        console.log(`${file} с раширением ${path.extname(file)}`);
        const rStream = createReadStream(`${pathDir}/${file}`);
        wStream.write(`[${file}]\n`);

        for await (const chunk of rStream) {
          wStream.write(`${chunk}\n`);
        }
      }
    }
  } catch (error) {
    console.log(`Ошика: ${error}`);
  }
};

readDiretoryStream('./files', './result.txt');
