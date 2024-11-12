// ? Stream

// !Writable - запись данных (fs, http, NET, zelipe)

// import { createReadStream, createWriteStream } from 'node:fs';

// const wStream = createWriteStream('./write.txt');
// const rStream = createReadStream('./files/text.txt');

// wStream.on('pipe', () => {
//   console.log('PIPE - подключение к readble стриму');
// });

// wStream.on('unpipe', () => {
//   console.log('UNPPE - отключение от readble стрима');
// });

// wStream.on('finish', () => {
//   console.log('FINISH - запись завершилась');
// });

// wStream.on('drain', () => {
//   console.log('DRAIN - освободился буфер у writable');
// });

// wStream.on('error', (err) => {
//   console.log('ERRor - ' + err);
// });

// wStream.on('close', () => {
//   console.log('CLOSE - стрим закрыт');
// });

// wStream.write('Записываем данные\n');  // записать один chunk

// const buffer = Buffer.from('Буфер\n');

// wStream.write(buffer, 'utf-8', () => {
//   console.log('Данные записываются');
// });

// wStream.cork(); // закупорить данные
// wStream.uncork(); //расскупорить данные
// wStream.end('Закрываем стрим');
// wStream.destroy('Наша ошибка'); //грубое закрытие файла
// wStream.setDefaultEncoding('utf-8');

// console.log('writableCorked', wStream.writableCorked); // если просиходит cork данных

// console.log('errored', wStream.errored); // количество ошибок
// console.log('writableLength', wStream.writableLength); // длинна
// console.log('writableHighWaterMark', wStream.writableHighWaterMark); // количество памяти до переполнения Buffer

// !Readable - чтение (fs, http, net, zelipe(распаковка))
// Два режима pausedMod и flawingMod

// rStream.pipe(wStream);

// rStream.on('data', chunk => {
//   console.log('----------data-------');
//   console.log(chunk);
//   wStream.write(chunk);
  // rStream.destroy('Конец')

  // rStream.pause();

  // console.log('Пауза');

  // setTimeout(() => {
  //   console.log('Снимаю с паузы');
  //   rStream.resume();
  // }, 500);
// });

import { createReadStream, createWriteStream } from "node:fs";
// rStream.on('readable', () => {
//   console.log('----------readable-------');
//   const buffer = rStream.read();
//   console.log('buffer: ', buffer);
//   if (buffer) {
//     wStream.write(buffer);
//   }
// });

// rStream.on('end', () => {
//   console.log('---------------end---------------');
//   wStream.close();
// });

// rStream.on('pause', () => {
//   console.log('---------------pause---------------');
// });

// rStream.on('resume', () => {
//   console.log('---------------resume---------------');
// });

// rStream.on('error', (err) => {
//   console.log('-------------');
//   console.log(err);
//   console.log('-------------');
// });

// rStream.on('close', () => {
//   console.log('---------------close---------------');
// });

// !Duplex запись и чтение

// !Transform между записью и чтением, выполнение каких либо данных
// const readStream = async path => {
//   const stream = createReadStream(path);
//   for await (const chunk of stream) {
//     console.log('chunk: ', chunk);
//   }
// };

//readStream('./files/text.txt');

import { pipeline } from "node:stream/promises";

const copy = async(from, to) => {
  try {
    await pipeline(
      createReadStream(from),
      // любые стримы могут тут быть, например упаковка или распаковка
      createWriteStream(to),
    )
    console.log('ready');
  } catch (error) {
    console.log(`Ошибка - ${error}`);
  }

}

copy('./files/NS.pdf', './files/text.pdf')
