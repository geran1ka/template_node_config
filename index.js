const getIsCyrillic = text => /[\u0400-\u04FF]/.test(text);

const textToBuffer = (text, encoding) => {
  try {
    const isCyrillic = getIsCyrillic(text);

    if (encoding === 'base64' || encoding === 'base64url') {
      throw Error(`Кодировка ${encoding} не допустима для текста`);
    }

    if (
      (isCyrillic && encoding === 'ascii') ||
      (isCyrillic && encoding === 'latin1') ||
      (isCyrillic && encoding === 'bynary') ||
      (isCyrillic && encoding === 'hex')
    ) {
      throw Error(`Кодировка ${encoding} не совместима с кириллицей`);
    }

    return Buffer.from(text, encoding);
  } catch (error) {
    return `Ошибка во время кодирования файла - ${error}`;
  } finally {
    console.log('Скрипт кодирования завершен');
  }
};

const bufferToText = (buffer, encoding) => {
  try {
    if (Buffer.isBuffer(buffer)) {
      return buffer.toString(encoding);
    }
  } catch (error) {
    return `Ошибка во время декодирования файла - ${error}`;
  } finally {
    console.log('Скрипт Декодирование завершен');
  }
};

const text = 'Привет мир!';
const utf8Buffer = textToBuffer(text, 'utf-8');
console.log('utf8Buffer: ', utf8Buffer || 'Ошибка кодирования');

const decodeTextUtf8 = bufferToText(utf8Buffer, 'utf-8');
console.log('decodeTextUtf8: ', decodeTextUtf8 || 'Ошибка декодирования');
console.log('-'.repeat(100));

const text2 = 'Привет мир!';
const asciiBuffer = textToBuffer(text2, 'ascii');
console.log('asciiBuffer: ', asciiBuffer || 'Ошибка кодирования');

const decodeTextAscii = bufferToText(asciiBuffer, 'ascii');
console.log('decodeTextAscii: ', decodeTextAscii || 'Ошибка декодирования');

console.log('-'.repeat(100));

const text3 = 'Hello world!';

const asciiBufferLatin = textToBuffer(text3, 'ascii');
console.log('asciiBufferLatin: ', asciiBufferLatin);

const decodeTextAsciiLarin = bufferToText(asciiBufferLatin, 'ascii');
console.log(
  'decodeTextAsciiLarin: ',
  decodeTextAsciiLarin || 'Ошибка декодирования',
);

console.log('-'.repeat(100));

const text4 = 'Hello world!';

const binaryBuffer = textToBuffer(text4, 'binary');
console.log('binaryBuffer: ', binaryBuffer);

const decodeTextBinary = bufferToText(binaryBuffer, 'binary');
console.log('decodeTextBinary: ', decodeTextBinary);
