import { write } from './write.js';
import { pos } from './pos.js';
import { getColorStr } from './colors.js';

export const borderCustom = [
  getColorStr('╔', 'blue'), //0
  getColorStr('═', 'blue'), //1
  getColorStr('╗', 'blue'), //2
  getColorStr('╚', 'blue'), //3
  getColorStr('║', 'blue'), //4
  getColorStr('╝', 'blue'), //5
  getColorStr('█', 'green'), //6
  getColorStr('█', 'red'), //7
  getColorStr(' ', 'blue'), //8
];
export const border = [
  getColorStr('┌', 'blueBright'), //0
  getColorStr('─', 'blueBright'), //1
  getColorStr('┐', 'blueBright'), //2
  getColorStr('└', 'blueBright'), //3
  getColorStr('│', 'blueBright'), //4
  getColorStr('┘', 'blueBright'), //5
  getColorStr('█', 'green'), //6
  getColorStr('█', 'red'), //7
  getColorStr(' ', 'blueBright'), //8
];

export const box = (arr, row, col, width, heigth) => {
  const w = width - 2;
  const h = heigth - 2;

  pos(row, col);
  write(arr[0] + arr[1].repeat(w) + arr[2]);

  for (let i = 1; i < h; i++) {
    pos(row + i, col);
    write(arr[4] + arr[8].repeat(w) + arr[4]);
  }

  pos(row + h, col);
  write(arr[3] + arr[1].repeat(w) + arr[5]);
};
