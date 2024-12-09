import { getColorStr } from './util/colors.js';
import { write } from './util/write.js';

export const parseHTML = data => {
  const headersRegexp = /<h([1-6])>.*?<\/h([1-6])>/gi;
  const linksRegexp = /<a href="[^"]*" .*?>.*?<\/a>/gi;

  const headers = data.match(headersRegexp);
  const links = data.match(linksRegexp);

  if (headers) {
    headers.forEach((header, i) => {
      write(
        `${getColorStr(i + 1, 'white')}. ${getColorStr(header.replace(/<[^>]+>/gi, ''), 'green')}`,
      );
    });
  } else {
    write(getColorStr('Заголовки не найдены', 'red'));
  }

  if (links) {
    links.forEach((link, i) => {
      write(
        `${i + 1}. URL: ${getColorStr(link.match(/href="([^"]*)"/i)[1], 'blue')}. Контент: ${getColorStr(
          link.replace(/<[^>]+>/gi, ''),
          'green',
        )}`,
      );
    });
  } else {
    write(getColorStr('Ссылки не найдены', 'red'));
  }
};
