import { getColorStr } from './modules/colors.js';
import { argsParse } from './modules/util/argsParse.js';
import { write } from './modules/write.js';
import { getSetting, saveSetting } from './modules/service/setting.service.js';
import { getUserAnswerOptions, setOptions } from './modules/service/options.js';
import { replaceText } from './modules/service/replaceText.js';

const app = async () => {
  try {
    const args = argsParse(process.argv, ['set']);

    if (args.h || args.help) {
      write(
        getColorStr(
          `
        -h или --help           | вывести список команд
        -i                      | поиск не зависит от регистра
        set                     | сохраняет настройки поиска -i
        `,
          'blue',
        ),
      );
      return;
    }

    const settingsCli = {
      i: false,
    };

    if (!args.set) {
      const setting = await getSetting(settingsCli);
      Object.assign(settingsCli, setting);
    }

    if (args.i) {
      settingsCli.i = args.i;
    }

    if (args.set) {
      const setting = await setOptions();
      Object.assign(settingsCli, setting);
      await saveSetting(settingsCli);
      process.exit();
    }
    const optionsCLI = {
      dirName: '',
      textFind: '',
      textReplace: '',
    };

    write(
      getColorStr(
        'Добро пожаловать в приложение по поиску и замене слов в текстовых файлах\n',
        'blue',
      ),
    );

    const { dirName, textFind, textReplace } =
      await getUserAnswerOptions(optionsCLI);

    console.log('dirName: ', dirName);

    const res = await replaceText({
      dirName,
      textFind,
      textReplace,
      settingsCli,
    });
    if (res) {
      write(
        getColorStr(
          `Замена ${textFind} на ${textReplace} в директории ${dirName} - прошла успешно!`,
          'green',
        ),
      );
    }
    process.exit();
  } catch (error) {
    write(
      getColorStr(
        `Во время выполнения скрипта произошла ошибка: ${error}`,
        'bgRed',
      ),
    );
    process.exit();
  }
};

app();
