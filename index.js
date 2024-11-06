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

chat.sendMessage('Roma', 'Как у Вас дела?');

setTimeout(() => {
  chat.sendMessage(
    'Roma',
    'Я тут пытаюсь сделать задачу №2, еще на курсе по JS мне неочень зашла тема с ООП.',
  );
}, 3000);

setTimeout(() => {
  chat.sendMessage('Roma', 'Чувствую я встрял (((!');
}, 6000);

setTimeout(() => {
  chat.sendMessage(
    'Roma',
    'Нужно ли было в данную программу встраивать обработчик события error?',
  );
}, 9000);
