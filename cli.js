import fs from 'fs';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph } from 'docx';

//
// Функция для чтения текста из файла Word
const readWordFile = async filePath => {
  const data = await fs.promises.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer: data });
  return result.value; // Извлеченный текст
};

// Функция для записи нового Word файла с измененным текстом
const writeWordFile = async (filePath, text) => {
  try {
    // Разделение текста на абзацы и создание Paragraph для каждого
    const paragraphs = text.split('\n').map(line => new Paragraph(line));

    // Создание документа с указанием метаданных
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    // Генерация буфера
    const buffer = await Packer.toBuffer(doc);

    // Запись файла
    await fs.promises.writeFile(filePath, buffer);
    console.log(`Файл успешно сохранен по пути: ${filePath}`);
  } catch (error) {
    console.error('Ошибка при записи Word файла:', error);
  }
};

// Функция для поиска и замены текста
const replaceTextInWord = async (
  inputPath,
  searchText,
  replaceText,
  outputPath,
) => {
  try {
    // Чтение текста из файла
    const text = await readWordFile(inputPath);

    // Замена текста
    const updatedText = text.split(searchText).join(replaceText);

    // Запись нового файла Word
    await writeWordFile(outputPath, updatedText);
  } catch (error) {
    console.error('Ошибка при обработке файла:', error);
  }
};

// Параметры
const inputFilePath = './modules/test.docx';
const outputFilePath = './modules/example_replaced.docx';
const searchText = 'искомый текст';
const replaceText = 'замененный текст';

replaceTextInWord(inputFilePath, searchText, replaceText, outputFilePath);
