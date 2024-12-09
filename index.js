import { parseHTML } from './modules/parseHTML.js';
import { fetchData } from './modules/fetchData.js';
import { write } from './modules/util/write.js';
import { getColorStr } from './modules/util/colors.js';

const app = async urlStr => {
  try {
    const data = await fetchData(urlStr);
    console.log('data: ', data);
    await parseHTML(data);

    write(getColorStr('Скрипт успешно завершен', 'bgGreen'));
  } catch (error) {
    write(getColorStr(`Ошибка при выполнении скрипта: ${error}`, 'bgRed'));
  }
};

app('https://jsonplaceholder.typicode.com/guide/');
