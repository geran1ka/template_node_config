import EventEmitter from 'events';
import { appendFile, readFile, stat, truncate } from 'fs/promises';

class Logger extends EventEmitter {
  constructor(fileName, maxSize) {
    super();
    this.fileName = fileName;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writinng = false;
  }

  log(message) {
    this.logQueue.unshift(message);
    if (!this.writinng) {
      this.writinng = true;
      this.writeLog();
    }
  }

  async rotateLog() {
    try {
      const backupFile = `${this.fileName}.bak`;
      const result = (await readFile(this.fileName)) + '='.repeat(100) + '\n';
      await appendFile(backupFile, result);
      await truncate(this.fileName, 0);
    } catch (err) {
      this.emit('error', err);
      return;
    }
  }

  async getFileSize() {
    try {
      const stats = await stat(this.fileName);
      return await stats.size;
    } catch (err) {
      return 0;
    }
  }

  async checkFileSize() {
    if ((await this.getFileSize()) > this.maxSize) {
      this.rotateLog();
    }
  }

  async writeLog() {
    try {
      console.log(this.logQueue);
      if (this.logQueue.length === 0) {
        this.writinng = false;
        return;
      }
      const message = this.logQueue.pop() + '\n';
      appendFile(this.fileName, message);
      this.emit('messageLogged', message);
      this.checkFileSize();
      if (this.logQueue.length > 0) {
        this.writeLog();
      } else {
        this.writinng = false;
      }
    } catch (err) {
      this.writinng = false;
      console.log(`Произошла ошибка 1: - ${err}`);
      return;
    }
  }
}

const logger = new Logger('log.txt', 1024);

logger.on('messageLogged', message => {
  console.log(`Записано сообщение: ${message}`);
});

let i = 1;
const timerId = setInterval(async () => {
  if (i > 50) {
    clearInterval(timerId);
  } else {
    logger.log(
      `${new Date(Date.now()).toISOString()}: сообщение №${i} - размер файла составляет ${await logger.getFileSize()} байт`,
    );
    i++;
  }
}, 1000);
