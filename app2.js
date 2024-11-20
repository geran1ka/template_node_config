import readline from 'readline/promises';
import { clear } from './modules/process/clear.js';
import { write } from './modules/process/write.js';
import { pos } from './modules/process/pos.js';
import { border, borderCustom, box } from './modules/process/box.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
});

const progressBar = () => {
  clear();
  box(borderCustom, 1, 0, 26, 7);
  pos(2, 3);
  write(`Вопросов: 12 из 18`);
  box(border, 3, 3, 22, 4);
};

progressBar();

rl.close();
