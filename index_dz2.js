import { EventEmitter } from 'node:events';

class EE extends EventEmitter {
  sendMessage(username, message) {
    this.emit('message', { username, message });
  }

  reciveMessage() {
    this.addListener('message', ({ username, message }) => {
      console.log(`${username}: ${message}`);
    });
  }
}

const chat = new EE();

chat.reciveMessage();

chat.sendMessage('Roma', 'Добрый вечер, Александр!');

chat.sendMessage(
  'Roma',
  'Я тут пытаюсь сделать задачу №2, еще на курсе по JS мне неочень зашла тема с ООП.',
);

chat.sendMessage('Roma', 'Чувствую я встрял (((!');

chat.sendMessage(
  'Roma',
  'Нужно ли было в данную программу а=встраивать обработчик события error?',
);
