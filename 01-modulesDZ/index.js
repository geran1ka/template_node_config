const { getPersonInfo } = require('personinfo');

const obj = {
  name: 'иВаН иВаНоВ',
  dateBirth: '10.11.1987',
  purpose: 'кАрьЕрНый рОсТ',
};

console.log(getPersonInfo(obj));
