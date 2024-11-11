import { access, copyFile, mkdir, readdir, stat } from 'node:fs/promises';

const isCheckDirectory = async dist => {
  try {
    await access(dist);
    console.log('Директория доступна');
    return true;
  } catch (err) {
    console.log('Директория не доступна');
    return false;
  }
};

const copyApp = async (sourceDir, targetDir, cb) => {
  try {
    if (!(await isCheckDirectory(targetDir))) {
      mkdir(`${targetDir}`, { recursive: true });
      console.log(`Создана директория - ${targetDir}`);
    }

    const files = await readdir(sourceDir);
    files.forEach(async file => {
      try {
        const stats = await stat(`${sourceDir}/${file}`);

        if (stats.isDirectory()) {
          copyApp(`${sourceDir}/${file}`, `${targetDir}/${file}`, cb);
        } else if (stats.isFile()) {
          copyFile(`${sourceDir}/${file}`, `${targetDir}/${file}`);
          console.log(
            `Файл ${file} скопирован из директории: ${sourceDir} - в директорию ${targetDir}`,
          );
          cb(null);
        } else {
          console.log(`Неизвестный формат - ${file}`);
          cb(null);
        }
      } catch (error) {
        console.error(`Произошла ошибка 2: ${error}`);
        return cb(error);
      }
    });
  } catch (error) {
    console.error(`Произошла ошибка 1: ${error}`);
    return cb(error);
  }
};

copyApp('./files', './newfiles', err => {
  if (err) {
    console.log(`Произошла ошибка во время работы программы: - ${err}`);
  } else {
    console.log('Копирование прошло успешно');
  }
});

const copyApp2 = async (sourceDir, targetDir, cb) => {
  try {
    mkdir(`${targetDir}`, { recursive: true });

    const files = await readdir(sourceDir);
    files.forEach(async file => {
      try {
        const stats = await stat(`${sourceDir}/${file}`);

        if (stats.isDirectory()) {
          copyApp2(`${sourceDir}/${file}`, `${targetDir}/${file}`, cb);
        } else if (stats.isFile()) {
          copyFile(`${sourceDir}/${file}`, `${targetDir}/${file}`);
          console.log(
            `Файл ${file} скопирован из директории: ${sourceDir} - в директорию ${targetDir}`,
          );
          cb(null);
        } else {
          console.log(`Неизвестный формат - ${file}`);
          cb(null);
        }
      } catch (error) {
        return cb(error);
      }
    });
  } catch (error) {
    return cb(error);
  }
};

// copyApp2('./files', './newfiles2', err => {
//   if (err) {
//     console.log(`Произошла ошибка во время работы программы: - ${err}`);
//   } else {
//     console.log('Копирование прошло успешно');
//   }
// });
