import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export function readData(fileName) {
  const filePath = path.join(dataDir, `${fileName}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function writeData(fileName, data) {
  const filePath = path.join(dataDir, `${fileName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
}

export function generateId(dataArray) {
  if (dataArray.length === 0) return 1;
  const maxId = Math.max(...dataArray.map(item => item.id));
  return maxId + 1;
}
