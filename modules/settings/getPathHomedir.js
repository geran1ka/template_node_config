import { homedir } from 'node:os';
import path from 'node:path';

export const getPathHomedir = filePath =>
  path.join(homedir(), path.basename(filePath));
