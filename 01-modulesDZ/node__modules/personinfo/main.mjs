import {randomId} from './randomId.mjs';
import {getStringFirstLetterCapitalized} from './getStringFirstLetterCapitalized.mjs';
import {getAge} from './getAge.mjs';

export const getPersonInfo = objPerson => {
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
