import readline from 'node:readline/promises';
import { readText } from './modules/readText.js';
import { write } from './modules/process/write.js';
import { declOfNum } from './modules/process/declOfNum.js';
import { getColorStr } from './modules/process/colors.js';
import { progress } from './modules/process/progress.js';
import { outputQuestionAnswers } from './modules/process/outputQuestionAnswers.js.js';

const app = async pathQuestion => {
  try {
    const store = {
      userName: '',
      current: 0,
      questions: [],
      currentQuestion: {},
      correctAnswers: [],
      incorrectAnswers: [],
      isInvalidValue: false,
    };

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    store.userName = await rl.question(
      getColorStr('Введите свое имя: ', 'blue'),
    );

    write(
      getColorStr(
        `Добро пожаловать в интеллектуально-развлекательную битву, ${store.userName}!`,
        'whiteBright',
      ),
    );
    write(getColorStr('Для начала игры введите команду start', 'whiteBright'));
    write(getColorStr('или команду help: \n', 'whiteBright'));

    const getAnswerUser = async () =>
      await rl.question(getColorStr('Введите ответ: ', 'blue'));

    const start = async () => {
      try {
        store.questions = JSON.parse(await readText(pathQuestion));

        if (store.questions.length > 0) {
          for (let i = store.current; i < store.questions.length; i++) {
            progress({
              current: store.current,
              allQuestion: store.questions.length,
              store,
            });

            store.currentQuestion = store.questions[i];

            const { question, options, correctIndex } = store.questions[i];
            outputQuestionAnswers({ numberQuestion: i, question, options });

            const answer = await getAnswerUser({ options });
            if (isNaN(answer) || +answer < 1 || +answer > options.length) {
              store.isInvalidValue = true;
              return start();
            } else if (Number(answer) - 1 === correctIndex) {
              store.isInvalidValue = false;
              write(getColorStr('Правильный ответ\n', 'green'));
              store.correctAnswers.push({
                numberQuestion: i,
                question,
                options,
                correctIndex,
              });
            } else {
              write(getColorStr('Неправильный ответ\n', 'red'));
              store.isInvalidValue = false;

              store.incorrectAnswers.push({
                numberQuestion: i,
                options,
                question,
                correctIndex,
                answerUser: Number(answer) - 1,
              });
            }

            store.current++;
          }

          progress({
            current: store.current,
            allQuestion: store.questions.length,
            store,
          });

          write(getColorStr('----------КВИЗ завершен!----------', 'blue'));
          write(
            getColorStr(
              `Вы ответили верно на ${declOfNum(store.correctAnswers.length, ['вопрос', 'вопроса', 'вопросов'])} из ${store.questions.length}.`,
              'blue',
            ),
          );
          write(
            getColorStr(
              'Что бы посмотреть, где были допущены ошибки, набирите команду "answerErr";',
              'blue',
            ),
          );
          write(
            getColorStr(
              'Что бы посмотреть на какие вопроосы Вы ответили верно, набирите команду "answer";',
              'blue',
            ),
          );
          write(
            getColorStr(
              'Для завершения приложения наберите команду "exit"!',
              'blue',
            ),
          );
        } else {
          throw new Error(
            getColorStr(
              'Что-то пошло не так...Вопросы в базе данных отсутствуют',
              'bgRedBright',
            ),
          );
        }
      } catch (error) {
        throw new Error(
          getColorStr(`Ошибка при старте КВИЗА: ${error}`, 'bgRedBright'),
        );
      }
    };

    const getAnswerCorrect = () => {
      try {
        if (store.correctAnswers.length > 0) {
          write(getColorStr('Вопросы на которые был дан верный ответ', 'blue'));
          store.correctAnswers.forEach(item => outputQuestionAnswers(item));
        } else {
          write(getColorStr('Вы ответили на все вопросы не верно', 'red'));
        }
      } catch (error) {
        throw new Error(
          getColorStr(
            `Ошибка при запросе вопросов на которые даны правильные ответы: ${error}`,
            'bgRedBright',
          ),
        );
      }
    };

    const getAnswerInCorrect = () => {
      try {
        if (store.incorrectAnswers.length > 0) {
          write(
            getColorStr('Вопросы на которые был дан неверный ответ', 'blue'),
          );
          store.incorrectAnswers.forEach(item => outputQuestionAnswers(item));
        } else {
          write(getColorStr('Вы ответили на все вопросы верно!', 'green'));
        }
      } catch (error) {
        throw new Error(
          getColorStr(
            `Ошибка при запросе вопросов на которые даны неправильные ответы: ${error}`,
            'bgRedBright',
          ),
        );
      }
    };

    const commands = {
      help() {
        write(
          getColorStr(
            `
          comand "start" - запустит КВИЗ';
          comand "result" - вывод текущего результата;
          comand "answer" - вывод вопросов на которые были даны правильные ответы;
          comand "answerErr" -  вывод вопросов на которые были даны неправильные ответы;
          command "exit" - выход из приложения.
          `,
            'whiteBright',
          ),
        );
      },
      result() {
        const res = declOfNum(
          Math.round(
            (store.correctAnswers.length / store.questions.length) * 100,
          ),
          ['процент', 'процента', 'процентов'],
        );
        write(getColorStr(`Вы ответили правильно на ${res} из 100%`, 'green'));
      },
      start() {
        start();
      },
      answer() {
        getAnswerCorrect();
      },
      answerErr() {
        getAnswerInCorrect();
      },
      exit() {
        store.userName = '';
        store.questions = [];
        store.correctAnswers = [];
        store.incorrectAnswers = [];
        store.current = 0;
        rl.close();
      },
    };

    rl.on('line', line => {
      const command = commands[line];
      if (command) {
        command();
      } else {
        write(getColorStr('No command!!!!', 'bgRed'));
        rl.prompt();
      }
    });

    rl.on('close', () => {
      write(getColorStr(getColorStr('See you\n', 'italic'), 'greenBright'));
      process.exit();
    });
  } catch (error) {
    console.error(
      getColorStr(`Ошибка выполнения скрипта: ${error}`, 'bgRedBright'),
    );
  }
};

app('./question.json');
