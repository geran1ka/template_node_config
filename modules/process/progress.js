import { border, borderCustom, box } from './box.js';
import { clear } from './clear.js';
import { getColorStr } from './colors.js';
import { pos } from './pos.js';
import { write, writeCustom } from './write.js';

export const progress = async ({ current, allQuestion, store }) => {
  clear();
  const width = allQuestion < 18 ? 18 : allQuestion;
  box(borderCustom, 1, 0, width + 6, 7);
  pos(2, 4);
  writeCustom(
    `Вопросов: ${current < allQuestion ? current : allQuestion} из ${allQuestion}`,
  );
  box(border, 3, 3, width + 2, 4);
  const answerArrayIncorrect = store.incorrectAnswers.map(
    item => item.numberQuestion,
  );
  let i = 0;
  for (i; i < current; i++) {
    if (answerArrayIncorrect.includes(i)) {
      pos(4, 4 + i);
      writeCustom(borderCustom[7]);
    } else {
      pos(4, 4 + i);
      writeCustom(borderCustom[6]);
    }
  }

  if (store.isInvalidValue) {
    pos(7, 0);
    write(
      getColorStr(
        'Вы ввели не допустимое значение, пожалуйста повторите',
        'red',
      ),
    );
  }
  pos(8, 0);
};
