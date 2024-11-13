const textToBuffer = (str, encoding) => {
  try {
    const enc = encoding.toString().toLowerCase();
    return enc === 'utf-8' || enc === 'utf8'
      ? Buffer.from(str, encoding)
      : Buffer.from(str, 'utf8').toString(encoding);
  } catch (error) {
    return `ВО время выполнения кодирования текста произошла ошибка: ${error}`;
  }
};

const bufferToText = (buffer, encoding) => {
  try {
    if (buffer.includes('TypeError')) {
      throw new Error('TypeError');
    }
    const enc = encoding.toString().toLowerCase();
    return enc === 'utf-8' || enc === 'utf8'
      ? buffer.toString('utf-8')
      : Buffer.from(buffer, encoding).toString('utf-8');
  } catch (error) {
    return `ВО время выполнения декодирования текста произошла ошибка: ${error}`;
  }
};

const text = 'Привет мир!';
// const textOne = 'Hello world';
// const text = 'Привет мир!';

const customConsole = (str, code, type = 'decode') => {
  if (code.includes('TypeError')) {
    console.log('Ошибка во время выполнения скрипта');
    return;
  }
  type === 'decode'
    ? console.log(`${code} ---декодирован--> ${str}`)
    : console.log(`${str} ---закодирован--> ${code}`);
};
console.log('-'.repeat(100));
const base64Buffer = textToBuffer(text, 'base64');
customConsole(text, base64Buffer, 'code');

const decodeTextBase64 = bufferToText(base64Buffer, 'base64');
customConsole(decodeTextBase64, base64Buffer);
console.log('-'.repeat(100));

const utf864Buffer = textToBuffer(text, 'uTf-8');
console.log('utf864Buffer: ', utf864Buffer);

const decodeTextUtf8 = bufferToText(utf864Buffer, 'utf8');
console.log('decodeTextUtf8: ', decodeTextUtf8);
console.log('-'.repeat(100));

const utf16le64Buffer = textToBuffer(text, 'utf-16le');
customConsole(text, utf16le64Buffer, 'code');

const decodeTextUtf16le = bufferToText(utf16le64Buffer, 'utf-16le');
customConsole(decodeTextUtf16le, utf16le64Buffer);
console.log('-'.repeat(100));
