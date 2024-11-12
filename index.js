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

`Node.js предоставляет различные методы для работы с файловой системой,
доступной через встроенный модуль fs. Этот модуль позволяет читать, записывать,
 удалять и изменять файлы и каталоги, а также выполнять асинхронные операции с файлами.

Основные методы fsдля работы с файлами и каталогами
fs.readFile — чтение качества файла
fs.writeFile — запись данных в файл
fs.appendFile — добавление данных в конец файла
fs.rename — переименование файла или директории
fs.unlink — удаление файла
fs.readdir — чтение оценки директории
fs.mkdir — новое создание директории
fs.rmdir — удаление директории
fs.stat — получение информации о файле или директории
fs.copyFile — копирование файла
Каждый метод можно использовать в асинхронной (колбэк) или синхронной версии.
Рассмотрим их по порядку с примерами.
`;
// !1. fs.readFile — чтение размера файла. Используется для чтения данных из файла.

const fs = require('fs');

// Асинхронное чтение файла
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Синхронное чтение файла
try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
`// !2. fs.writeFile — запись данных в файл.
Записывает данные в файл, перезаписывая его критерий, если файл уже существует.`;

// Асинхронная запись в файл
fs.writeFile('example.txt', 'Hello, World!', err => {
  if (err) throw err;
  console.log('Файл записан');
});

// Синхронная запись в файл
try {
  fs.writeFileSync('example.txt', 'Hello, World!');
  console.log('Файл записан');
} catch (err) {
  console.error(err);
}
`// !3. fs.appendFile — добавление данных в конец файла.
Добавляет данные в конец существующего файла.`;

// Асинхронное добавление данных в файл
fs.appendFile('example.txt', '\nДобавленный текст', err => {
  if (err) throw err;
  console.log('Данные добавлены в файл');
});

// Синхронное добавление данных
try {
  fs.appendFileSync('example.txt', '\nДобавленный текст');
  console.log('Данные добавлены в файл');
} catch (err) {
  console.error(err);
}
`// !4. fs.rename — переименование файла или директории.
Используется для переименования файла или директории.`;

// Асинхронное переименование
fs.rename('oldName.txt', 'newName.txt', err => {
  if (err) throw err;
  console.log('Файл переименован');
});

// Синхронное переименование
try {
  fs.renameSync('oldName.txt', 'newName.txt');
  console.log('Файл переименован');
} catch (err) {
  console.error(err);
}
`// !5. fs.unlink — удаление файла.
Удаляет указанный файл.`;
// Асинхронное удаление файла
fs.unlink('example.txt', err => {
  if (err) throw err;
  console.log('Файл удален');
});

// Синхронное удаление файла
try {
  fs.unlinkSync('example.txt');
  console.log('Файл удален');
} catch (err) {
  console.error(err);
}
`// !6. fs.readdir — чтение оценки директории.
Возвращает список файлов и поддиректорий в указанной директории.`;
// Асинхронное чтение директории
fs.readdir('myDirectory', (err, files) => {
  if (err) throw err;
  console.log(files);
});

// Синхронное чтение директории
try {
  const files = fs.readdirSync('myDirectory');
  console.log(files);
} catch (err) {
  console.error(err);
}
`// !7. fs.mkdir — создание новой директории.
Создает новую директорию.`;
// Асинхронное создание директории
fs.mkdir('newDirectory', { recursive: true }, err => {
  if (err) throw err;
  console.log('Директория создана');
});

// Синхронное создание директории
try {
  fs.mkdirSync('newDirectory', { recursive: true });
  console.log('Директория создана');
} catch (err) {
  console.error(err);
}
`// !8. fs.rmdir — удаление директории.
Удаляет пустую директорию.`;
// Асинхронное удаление директории
fs.rmdir('newDirectory', err => {
  if (err) throw err;
  console.log('Директория удалена');
});

// Синхронное удаление директории
try {
  fs.rmdirSync('newDirectory');
  console.log('Директория удалена');
} catch (err) {
  console.error(err);
}
`// !9. fs.stat — получение информации о файле или директории.
Чтобы получить информацию, такую ​​​​как размер, время создания и
модификации, является объектом файла или каталога.`;
// Асинхронное получение информации о файле
fs.stat('example.txt', (err, stats) => {
  if (err) throw err;
  console.log(stats);
});

// Синхронное получение информации о файле
try {
  const stats = fs.statSync('example.txt');
  console.log(stats);
} catch (err) {
  console.error(err);
}
`// !10. fs.copyFile — копирование файла.
Копирует требования одного файла в другой.`;
// Асинхронное копирование файла
fs.copyFile('source.txt', 'destination.txt', err => {
  if (err) throw err;
  console.log('Файл скопирован');
});

// Синхронное копирование файла
try {
  fs.copyFileSync('source.txt', 'destination.txt');
  console.log('Файл скопирован');
} catch (err) {
  console.error(err);
}
`
Основные методы
fs.access — проверка доступа к файлу или директории.
fs.open — открытие файла.
fs.close — закрытие файла.
fs.fstat — получение информации о файле по его описанию.
fs.read — чтение данных из открытого файла.
fs.write — запись данных в открытый файл.
fs.truncate — обрезать файл до заданного размера.
fs.chmod — изменение прав доступа к файлу.
fs.chown — изменение владельца и группы файла.
fs.symlink — создание символьной ссылки.
fs.link — создание жесткой ссылки.
fs.lstat — получение информации о символических ссылках.
fs.realpath — получение абсолютного пути к файлу.
Описание каждого метода с примерами``// !11. fs.access — проверка доступа к файлу или директории.
Посмотрите проверку, есть ли доступ к файлу или директории.
Можно указать, что именно нужно проверить: существование файла,
права на чтение или запись.`;
const fs = require('fs');

fs.access('example.txt', fs.constants.R_OK | fs.constants.W_OK, err => {
  console.log(err ? 'Нет доступа' : 'Доступ есть');
});
`// !12. fs.open и fs.close — открытие и закрытие файла.
Откройте файл и получите дескриптор для текущей операции.
Закрытие файла освобождает дескриптор.`;
// Открытие файла
fs.open('example.txt', 'r', (err, fd) => {
  if (err) throw err;

  // Закрытие файла
  fs.close(fd, err => {
    if (err) throw err;
  });
});
`// !13. fs.fstat — получение информации о файле по его описанию.
Покажите информацию о файле, используя дескриптор, полученный при fs.open.`;
fs.open('example.txt', 'r', (err, fd) => {
  if (err) throw err;

  fs.fstat(fd, (err, stats) => {
    if (err) throw err;
    console.log(stats);
    fs.close(fd, err => {
      if (err) throw err;
    });
  });
});
`// !14. fs.truncate — обрезка файла до заданного размера.
Обрезает файл до указанного количества байт.`;
fs.truncate('example.txt', 10, err => {
  if (err) throw err;
  console.log('Файл обрезан до 10 байт');
});
`// !15. fs.chmod — изменение прав доступа к файлу
Изменяет права доступа к файлу.`;
fs.chmod('example.txt', 0o644, err => {
  if (err) throw err;
  console.log('Права доступа изменены');
});
`// !16. fs.chown — изменение владельца и группы файла
Изменяет владельца и группу файлов.`;
fs.chown('example.txt', 1000, 1000, err => {
  if (err) throw err;
  console.log('Владелец и группа изменены');
});
`// !17. fs.symlink — создание символической ссылки
Создает символическую ссылку в файле или каталоге.`;
fs.symlink('original.txt', 'link.txt', err => {
  if (err) throw err;
  console.log('Символическая ссылка создана');
});
`// !18. fs.link — жесткое создание ссылок
Создает жесткую ссылку, указывающую на существующий файл.`;
fs.link('original.txt', 'hardlink.txt', err => {
  if (err) throw err;
  console.log('Жесткая ссылка создана');
});
`// !19. fs.lstat — получение информации о символических ссылках
Получите информацию о символической ссылке (а не о файле, на который она указывает).`;
fs.lstat('link.txt', (err, stats) => {
  if (err) throw err;
  console.log('Символическая ссылка:', stats.isSymbolicLink());
});
`// !20. fs.realpath — получение абсолютного пути к файлу
Возвращает полный путь к файлу или директориям.`;
fs.realpath('example.txt', (err, resolvedPath) => {
  if (err) throw err;
  console.log('Абсолютный путь:', resolvedPath);
});
