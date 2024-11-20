import { write } from './write.js';

export const clear = () => write('\x1bc');
