import process from 'node:process';
import { read } from './modules/process/read.js';
import { pos } from './modules/process/pos.js';
import { write } from './modules/process/write.js';
import { clear } from './modules/process/clear.js';

const box = (row, col, height, width) => {
  const border = ['╔', '═', '╗', '╚', '║', '╝'];
  const w = width - 2;
  const h = height - 2;
  pos(row, col);
  write(border[0] + border[1].repeat(w) + border[2]);
  for (let i = 1; i < h; i++) {
    pos(row + i, col);
    write(border[4] + ' '.repeat(w) + border[4]);
  }

  pos(row + h, col);
  write(border[3] + border[1].repeat(w) + border[5]);
};

clear();

write('Имя: ');

read(str => {
  write(`\nПривет, ${str.trim()}!\n`);
  process.exit();
});
