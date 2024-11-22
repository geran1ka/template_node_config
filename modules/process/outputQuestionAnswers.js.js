import { getColorStr } from './colors.js';
import { write } from './write.js';

export const outputQuestionAnswers = ({
  numberQuestion,
  question,
  options,
  correctIndex = NaN,
  answerUser = NaN,
}) => {
  write(getColorStr(`Вопрос №${numberQuestion + 1}. ${question}\x1b`, 'blue'));
  write(getColorStr('Варианты ответов', 'whiteBright'));
  options.forEach((item, index) => {
    if (!isNaN(correctIndex) && correctIndex === index) {
      write(getColorStr(`${index + 1}. ${item}`, 'green'));
    } else if (!isNaN(answerUser) && answerUser === index) {
      write(getColorStr(`${index + 1}. ${item}`, 'red'));
    } else {
      write(getColorStr(`${index + 1}. ${item}`, 'whiteBright'));
    }
  });
};
