import readline from 'node:readline/promises';
import { readText } from './modules/readText.js';
import { write } from './modules/process/write.js';
import { declOfNum } from './modules/process/declOfNum.js';
import { getColorStr } from './modules/process/colors.js';

const app = async pathQuestion => {
  try {
    const gameCreationObj = {
      userName: '',
      questions: [],
      currentQuestion: {},
      correctAnswers: [],
      incorrectAnswers: [],
    };

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    gameCreationObj.userName = await rl.question(
      getColorStr('Введите свое имя: ', 'blue'),
    );
    write(
      getColorStr(
        `Добро пожаловать в интеллектуально-развлекательную битву, ${gameCreationObj.userName}`,
        'whiteBright',
      ),
    );
    write(getColorStr('Для начала игры введите команду start', 'whiteBright'));
    write(getColorStr('или команду help: \n', 'whiteBright'));

    const writeText = ({
      numberQuestion,
      question,
      options,
      correctIndex = NaN,
      answerUser = NaN,
    }) => {
      write(
        getColorStr(`mВопрос №${numberQuestion + 1}. ${question}\x1b`, 'blue'),
      );
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

    const getAnswerUser = async ({ options }) => {
      let answer = await rl.question(getColorStr('Введите ответ: ', 'blue'));

      if (answer === 'stop') {
        return 'stop';
      }

      if (isNaN(answer) || +answer < 1 || +answer > options.length) {
        write(
          getColorStr(
            'Вы ввели не существующий ответ, поробуйте еще раз\n',
            'bgRed',
          ),
        );
        answer = await getAnswerUser({ options });
      } else {
        return answer;
      }
    };

    const commands = {
      help() {
        write(
          getColorStr(
            `
          comand "start" - запустит КВИЗ';
          comand "result" - вывод текущего результата;
          comand "getAnswerCorrect" - вывод вопросов на которые были даны правильные ответы;
          comand "getAnswerIncorrect" -  вывод вопросов на которые были даны неправильные ответы;
          command "exit" - выход из приложения.
          `,
            'whiteBright',
          ),
        );
      },
      result() {
        try {
          write(
            getColorStr(
              `Вы ответили правильно на ${declOfNum(Math.round((gameCreationObj.correctAnswers.length / gameCreationObj.questions.length) * 100), ['процент', 'процента', 'процентов'])} из 100%`,
              'green',
            ),
          );
        } catch (error) {
          throw new Error(
            getColorStr(
              `Ошибка при запросе результата: ${error}`,
              'bgRedBright',
            ),
          );
        }
      },
      async start() {
        try {
          gameCreationObj.questions = JSON.parse(await readText(pathQuestion));

          if (gameCreationObj.questions.length > 0) {
            for (let i = 0; i < gameCreationObj.questions.length; i++) {
              gameCreationObj.currentQuestion = gameCreationObj.questions[i];
              const { question, options, correctIndex } =
                gameCreationObj.questions[i];
              writeText({ numberQuestion: i, question, options });

              const answer = await getAnswerUser({ options });
              if (Number(answer) - 1 === correctIndex) {
                write(getColorStr('Правильный ответ\n', 'green'));
                gameCreationObj.correctAnswers.push({
                  numberQuestion: i - 1,
                  question,
                  options,
                  correctIndex,
                });
              } else {
                write(getColorStr('Неправильный ответ\n', 'red'));
                gameCreationObj.incorrectAnswers.push({
                  numberQuestion: i - 1,
                  options,
                  question,
                  correctIndex,
                  answerUser: Number(answer) - 1,
                });
              }
            }
            write(getColorStr('----------КВИЗ завершен!----------', 'blue'));
            write(
              getColorStr(
                `Вы ответили верно на ${declOfNum(gameCreationObj.correctAnswers.length, ['вопрос', 'вопроса', 'вопросов'])}.`,
                'blue',
              ),
            );
            write(
              getColorStr(
                'Что бы посмотреть, где были допущены ошибки, набирите команду "getAnswerIncorrect";',
                'blue',
              ),
            );
            write(
              getColorStr(
                'Что бы посмотреть на какие вопроосы Вы ответили верно, набирите команду "getAnswerСorrect";',
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
      },
      getAnswerCorrect() {
        try {
          if (gameCreationObj.correctAnswers.length > 0) {
            write(
              getColorStr('Вопросы на которые был дан верный ответ', 'blue'),
            );
            gameCreationObj.correctAnswers.forEach(item => writeText(item));
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
      },

      getAnswerIncorrect() {
        try {
          if (gameCreationObj.incorrectAnswers.length > 0) {
            write(
              getColorStr('Вопросы на которые был дан неверный ответ', 'blue'),
            );
            gameCreationObj.incorrectAnswers.forEach(item => writeText(item));
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
      },
      exit() {
        gameCreationObj.userName = '';
        gameCreationObj.questions = [];
        gameCreationObj.correctAnswers = [];
        gameCreationObj.incorrectAnswers = [];
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
