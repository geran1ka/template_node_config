import { stat } from 'node:fs/promises';

export const isDirectoryInput = async directory => {
  const stats = await stat(directory);
  return stats.isDirectory();
};
