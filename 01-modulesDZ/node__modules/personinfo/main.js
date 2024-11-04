const {randomId} = require('./randomId');
const {getAge} = require('./getAge');
const {getStringFirstLetterCapitalized} = require('./getStringFirstLetterCapitalized');

exports.getPersonInfo = objPerson => {
  const newObjPerson = {};

  newObjPerson.id = randomId();

  if (typeof objPerson.name === 'string') {

    const arrFullName = objPerson.name.split(' ');

    if (arrFullName[0]) {
      newObjPerson.firstName = getStringFirstLetterCapitalized(arrFullName[0]);
    }

    if (arrFullName[1]) {
      newObjPerson.LastName = getStringFirstLetterCapitalized(arrFullName[1]);
    }
  }


  if (!isNaN(new Date(objPerson.dateBirth))) {
    newObjPerson.dateBirth = objPerson.dateBirth;
    newObjPerson.age = getAge(objPerson.dateBirth);
  }


  if (typeof objPerson.purpose === 'string') {
    newObjPerson.purpose = getStringFirstLetterCapitalized(objPerson.purpose);
  }


  return newObjPerson;
};


