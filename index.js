import readline from 'readline/promises';
import { clear } from './modules/process/clear.js';
import { write, writeCustom } from './modules/process/write.js';
import { pos } from './modules/process/pos.js';
import { border, borderCustom, box } from './modules/process/box.js';
import { getColorStr } from './modules/process/colors.js';
import { declOfNum } from './modules/process/declOfNum.js';
import { readText } from './modules/readText.js';
import { forEach } from 'async';

const app = async pathQuestion => {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '-->',
    });
    const store = {
      current: 0,
      correct: 0,
      questions: [],
      incorrectAnswer: [],
      qestion: {},
      isInvalidValue: false,
    };

    store.questions = JSON.parse(await readText(pathQuestion));

    const outputAnswerOptions = options => {
      if (Array.isArray(options) && options.length > 0) {
        options.forEach((item, index) => {
          write(getColorStr(`№${index + 1}. ${item}.`));
        });
      }
    };

    store.incorrectAnswer.push(
      {
        id: 1,
        question: 'Что такое прототип (prototype) в JavaScript?',
        options: [
          'Объект, который используется для наследования свойств и методов',
          'Метод массива, используемый для выполнения заданной функции для каждого элемента массива',
          'Способ определения переменной, доступной только внутри функции',
        ],
        correctIndex: 0,
      },
      {
        id: 3,
        question: 'Что такое прототип (prototype) в JavaScript?',
        options: [
          'Объект, который используется для наследования свойств и методов',
          'Метод массива, используемый для выполнения заданной функции для каждого элемента массива',
          'Способ определения переменной, доступной только внутри функции',
        ],
        correctIndex: 0,
      },
    );

    const getAnswer = async ({ limit }) => {
      let answer = await rl.question(getColorStr('Ваш ответ: '), 'blue');

      if (isNaN(answer) || +answer < 1 || +answer > limit) {
        pos(8, 0);
        write(
          getColorStr(
            'Вы ввели не допустимое значение, пожалуйста повторите',
            'red',
          ),
        );
        return (answer = await getAnswer({ limit }));
      } else {
        return answer;
      }
    };

    const options = [
      'Объект, который используется для наследования свойств и методов',
      'Метод массива, используемый для выполнения заданной функции для каждого элемента массива',
      'Способ определения переменной, доступной только внутри функции',
    ];

    console.log(store.incorrectAnswer.find(item => item.id === 2));
    const progressBar = async ({ current, allQuestion, limit }) => {
      clear();
      box(borderCustom, 1, 0, 26, 7);
      pos(2, 4);
      write(`Вопросов: ${current} из ${allQuestion}`);
      box(border, 3, 3, 22, 4);

      if (store.incorrectAnswer.length > 0) {
        for (let i = 1; i < current; i++) {
          pos(4, 3 + i);
          if (store.incorrectAnswer.find(item => item.id === i)) {
            write(borderCustom[7]);
          } else {
            write(borderCustom[6]);
          }
        }
      }

      if (store.isInvalidValue) {
        pos(8, 0);
        write(
          getColorStr(
            'Вы ввели не допустимое значение, пожалуйста повторите',
            'red',
          ),
        );
      }

      pos(9, 0);
      outputAnswerOptions(options);
      pos(9 + options.length, 0);
      const answer = await rl.question(getColorStr('Ваш ответ: '), 'blue');

      if (isNaN(answer) || +answer < 1 || +answer > limit) {
        store.isInvalidValue = true;
        progressBar({ current, allQuestion, limit });
      } else {
        store.isInvalidValue = false;
      }
    };

    progressBar({ current: 4, allQuestion: 18, limit: 4 });
  } catch (error) {
    write(`Ошибка: ${error}`);
  }
};

app('./question.json');
