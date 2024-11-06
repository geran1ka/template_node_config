import { EventEmitter } from 'node:events';

class Timer extends EventEmitter {
  constructor() {
    super();
    this.idSetInterval = null;
  }

  start() {
    let tick = 1;
    this.idSetInterval = setInterval(() => {
      this.emit('tick', tick);
      tick++;

      if (tick > 10) clearInterval(this.idSetInterval);
    }, 1000);
  }

  remove() {
    clearInterval(this.idSetInterval);
  }

  consoleOutput() {
    this.addListener('tick', tick => {
      console.log(`Tick - ${tick}`);
    });
  }
}

const timer = new Timer();

timer.consoleOutput();

timer.start();

setTimeout(() => {
  timer.remove();
}, 8000);
