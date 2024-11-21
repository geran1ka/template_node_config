import { writeCustom } from './write.js';

export const pos = (row, col) => writeCustom(`\x1b[${row};${col}H`);
