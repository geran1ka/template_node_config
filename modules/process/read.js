import process from 'node:process';

export const read = cb => {
  process.stdin.on('data', chunk => {
    cb(chunk.toString('utf-8'));
  });
};
