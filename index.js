import {
  appendFile,
  copyFile,
  mkdir,
  readdir,
  stat,
  writeFile,
} from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import { readText } from './modules/readText.js';
import { writeTextFile } from './modules/writeTextFile.js';

// !1. Чтение файла
// !1.1 Синхронное чтение файла
// const result = fs.readFileSync('./files/text.txt', 'utf-8');

// !1.2 Чтение и запись файла асинхронно
// fs.readFile('./files/text.txt', 'utf-8', (err, res) => {
//   if (err) throw err;
//   console.log('Файл был прочитан');

//   fs.writeFile('./files/newtext1.txt', res, err => {
//     if (err) throw err;
//     console.log('Файл был записан');
//   });
// });

// !1.3 Чтение фала асинхронно (промис)

// const read = async pathFile => {
//   try {
//     const res = await readFile(pathFile, 'utf-8');

//     return res;
//   } catch (error) {
//     console.error(error);
//   }
// };

const app = async () => {
  try {
    const res = await readText('./files/newtext.txt');
    console.log('res: ', res);

    await writeTextFile('./files/res.txt', res.toUpperCase());

    console.log('Done');
  } catch (error) {
    console.error(error);
  }
};

// app();

// !2. Запись файла
// !2.1 Синхронное чтение файла
// fs.writeFileSync('./files/newtext.txt', result);

// try {
//   const res = await readFile('./files/newtext.txt', 'utf-8');

//   writeFile('./files/readNew.txt', res);

//   console.log(await res);
// } catch (error) {
//   console.error(error);
// }

console.log('App start');

// !3. Переименование файла
// fs.rename('./files/newtext1.txt', './files/newtextNew.txt', err => {
//   if (err) throw err;
//   console.log('Файл переименован');
// });

// fs.rename('./files/newtext1.txt', './newtextNew.txt', err => {
//   if (err) throw err;
//   console.log('Файл перемещен');
// });

// !4. Чтение директории

// fs.readdir('./files', (err, files) => {
//   if (err) throw err;

//   console.log(files);
// });

readdir('./files');

// !5. Создание директории

// fs.mkdir('./files/new', { recursive: true }, err => {
//   if (err) throw err;

//   console.log('Папка была создана');
// });

// !6. Копирование файла
// fs.copyFile('./files/text.txt', './new/text.txt', err => {
//   if (err) throw err;
//   console.log('Файл скопирован');
// });

// const copyAllFiles = (src, dist) => {
//   fs.readdir('./files', (err, files) => {
//     console.log('files: ', files);
//     if (err) throw err;

//     files.forEach(file =>
//       fs.copyFile(`${src}/${file}`, `${dist}/${file}`, err => {
//         console.log(file.stat);
//         if (err) throw err;

//         console.log('файл скопирован');
//       }),
//     );
//   });
// };

// copyAllFiles('./files', './new');
// const checkFileStats = async path => {
//   try {
//     const stats = await stat(path);

//     const statPath = {
//       'Файл или папка': path,
//       'Размер файла в байтах': stats.size,
//       'Дата создания файла': stats.birthtime,
//       'Дата последнего изменения': stats.mtime,
//     };

//     if (stats.isFile()) {
//       statPath.type = 'Это файл';
//     } else if (stats.isDirectory()) {
//       statPath.type = 'Это каталог';
//     } else {
//       statPath.type = 'Это неизвестный тип';
//     }

//     console.log(statPath);
//   } catch (error) {
//     console.error(`Ошибка получения информации о файле ${error}`);
//   }
// };

const app2 = async () => {
  try {
    readdir('./files')
      .then(async files => {
        await mkdir('./new', { recursive: true });
        console.log('Папка созана');
        return files;
      })
      .then(files => {
        files.forEach(
          async file =>
            await copyFile(`./files/${file}`, `./new/${file}`).then(() => {
              console.log('Файл скопирован');
            }),
        );
      });
  } catch (error) {
    console.error(error);
  }
};

app2();
// checkFileStats('./files');
// checkFileStats('./files/newtext.txt');

// const appendToFile = async (filePath, data) => {
//   try {
//     await appendFile(filePath, data);
//     console.log('Данные успешно записаны');
//   } catch (error) {
//     console.error(`Ошибка при записи в файл ${error}`);
//   }
// };

// let i = 0;

// const idInt = setInterval(() => {
//   if (i > 10) {
//     clearInterval(idInt);
//   }
//   appendFile(
//     './files/newtext.txt',
//     `${new Date().toISOString()}: допиши техт ${i}\n`,
//   );
//   i++;
// }, 2000);

// appendFile(
//   './files/newtext.txt',
//   `${new Date().toISOString()}: допиши техт ${i}`,
// );
