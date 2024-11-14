import path from 'path';

export const pathFile = (inputPath, outputPath, file = '') => {
  const pathObj = {};
  if (file) {
    const filePath = path.join(inputPath, file);
    pathObj.filePath = filePath;
  }
  const fileName = path.basename(file ? file : inputPath);
  const fileExtension = path.extname(file ? file : inputPath);
  const output = path.join(outputPath, fileName);

  pathObj.fileName = fileName;
  pathObj.fileExtension = fileExtension;
  pathObj.output = output;

  return pathObj;
};
