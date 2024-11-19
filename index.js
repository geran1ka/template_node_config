import readline from 'node:readline/promises';
import process from 'node:process';
import { readFile } from 'node:fs/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const data = JSON.parse(await readFile('./question.json'))[0];
console.log('data: ', data);

console.log('Write command');
console.log('or help: ');

rl.prompt();

const commands = {
  help() {
    console.log('help', 'time', 'date', 'exit');
    rl.prompt();
  },
  time() {
    const currentTime = new Date();
    console.log(currentTime.toLocaleTimeString());
  },
  date() {
    const currentTime = new Date();
    console.log(currentTime.toLocaleDateString());
  },
  exit() {
    rl.close();
  },
};

rl.on('line', line => {
  const command = commands[line];
  if (command) {
    command();
  } else {
    console.log('No command!!!');
  }
  rl.prompt();
});

rl.on('close', () => {
  console.log('See you');
  process.exit();
});
