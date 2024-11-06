import { remove } from 'fs-extra';
import { EventEmitter } from 'node:events';

class EE extends EventEmitter {}

const ee = new EE();

//
ee.addListener('foo', x => {
  console.log('Tick', x);
});

ee.on('foo3', x => {
  console.log('on', x);
});

// вызов события единожды
ee.once('foo1', x => {
  console.log('once', x);
});

ee.on('error', error => {
  console.log(error);
});

ee.emit('error', new Error(`Ошибка`));

// ee.error();

ee.emit('foo', 'Рома');

ee.emit('foo1', { name: 'Рома' });

ee.emit('foo3', ['Рома']);

console.log('------------------------');

ee.emit('foo', 'Рома');

ee.emit('foo1', { name: 'Рома' });

ee.emit('foo3', ['Рома']);
