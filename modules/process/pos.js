import { write } from './write.js';

export const pos = (row, col) => write(`\x1b[${row};${col}H`);
