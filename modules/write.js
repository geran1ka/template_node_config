import process from 'node:process';

export const write = str => process.stdout.write(`${str}\n`);

export const writeCustom = str => process.stdout.write(`${str}`);
