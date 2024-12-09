import { getColorStr } from './util/colors.js';
import { write } from './util/write.js';
import { JSDOM } from 'jsdom';

export const parseHTML = data => {
  const dom = new JSDOM(data);
  const document = dom.window.document;

  write(getColorStr('Заголовки:', 'magenta'));
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading, index) => {
    write(
      getColorStr(
        `${index + 1}. ${heading.tagName}: ${heading.textContent.trim()}`,
        'green',
      ),
    );
  });

  write(getColorStr('Ссылки:', 'magenta'));
  const links = Array.from(document.querySelectorAll('a'));

  links.forEach((link, index) => {
    const href = link.getAttribute('href') || 'Нет ссылки';
    const text = link.textContent.trim() || 'Нет текста';
    write(getColorStr(`${index + 1}. URL: ${href}, Текст: "${text}"`, 'blue'));
  });
};
