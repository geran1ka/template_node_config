import sharp from 'sharp';

export const effectBlur = async ({ filePath, output, fileExtension }) => {
  try {
    if (
      fileExtension === '.jpg' ||
      fileExtension === '.jpeg' ||
      fileExtension === '.avif' ||
      fileExtension === '.webp' ||
      fileExtension === '.png'
    ) {
      await sharp(filePath).blur(5).toFile(output);
    }
  } catch (error) {
    console.log(`Ошибка во время выполнения resize file: ${error}`);
  }
};
