import readline from 'node:readline/promises';
import process from 'node:process';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: '> ',
// });

// console.log('Hello, your name: ');
// rl.prompt(); // вывод для приглашения ввода

// rl.on('line', answer => {
//   console.log(`Hello, ${answer}`);
// rl.close(); //закрыть readline
// });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

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
