import sharp from 'sharp';

export const effectGreyScaleBlur = async ({
  filePath,
  output,
  fileExtension,
}) => {
  try {
    if (
      fileExtension === '.jpg' ||
      fileExtension === '.jpeg' ||
      fileExtension === '.avif' ||
      fileExtension === '.webp' ||
      fileExtension === '.png'
    ) {
      await sharp(filePath).greyscale().blur(2).toFile(output);
    }
  } catch (error) {
    console.log(`Ошибка во время выполнения resize file: ${error}`);
  }
};
