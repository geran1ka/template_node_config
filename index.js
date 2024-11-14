import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { exists } from 'fs-extra';
import { effectGreyScale } from './modules/effectGreyScale.js';
import { effectBlur } from './modules/effectBlur.js';
import { effectGreyScaleBlur } from './modules/effectGreyScaleBlur.js';
import { effectResize } from './modules/effectResize.js';
import { pathFile } from './modules/pathFile.js';
import { isDirectoryInput } from './modules/isDerectoryInput.js';

const app = async (inputPath, outputPath, option = { resize: true }) => {
  try {
    const isChek = await isDirectoryInput(inputPath);

    if (isChek && !(await exists(path.dirname(inputPath)))) {
      throw new Error(`Директории ${inputPath} не существует`);
    }

    if (!(await exists(outputPath))) {
      mkdir(outputPath, { recursive: true });
    }

    if (isChek) {
      const files = await readdir(inputPath);
      for await (const file of files) {
        const { filePath, output, fileExtension } = pathFile(
          inputPath,
          outputPath,
          file,
        );
        if (option.resize) {
          effectResize({ filePath, output, fileExtension });
        }

        if (option.blur) {
          option.greyscale
            ? effectGreyScaleBlur({ filePath, output, fileExtension })
            : effectBlur({ filePath, output, fileExtension });
        }

        if (option.greyscale && !option.blur) {
          effectGreyScale({ filePath, output, fileExtension });
        }
      }
    } else {
      const { fileName, output, fileExtension } = pathFile(
        path.basename(inputPath),
        outputPath,
      );
      if (option.resize) {
        effectResize({ filePath: fileName, output, fileExtension });
      }

      if (option.blur) {
        option.greyscale
          ? effectGreyScaleBlur({ filePath: fileName, output, fileExtension })
          : effectBlur({ filePath: fileName, output, fileExtension });
      }

      if (option.greyscale && !option.blur) {
        effectGreyScale({ filePath: fileName, output, fileExtension });
      }
    }

    console.log('Скрипт успешно завершен');
    return true;
  } catch (error) {
    console.log(`Ошибка во время выполнения скрипта: ${error}`);
  }
};

app('./file', './outputfiles/test', { greyscale: true, blur: true });

app('./vulkan.jpg', './outputFilesEffectBlurGrayScale', {
  greyscale: true,
  blur: true,
});
app('./files', './outputFilesEffectResize');
app('./files', './outputFilesEffectBlur', { blur: true });
app('./files', './outputFilesEffectGreyScale', { greyscale: true });
app('./files/test', './otput');
