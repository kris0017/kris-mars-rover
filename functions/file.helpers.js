const fs = require('fs');
const { getPlateauSize, calculatePosition } = require('./algorithm');
const { getSplitSeparator } = require('../utils');
const { PLATEAU, ROVER, LANDING, INSTRUCTIONS } = require('../utils/constants');

const parseContent = (allFileContent) => {
  const messages = {};
  let plateauSize = [0, 0];
  allFileContent.split(/\r?\n/).forEach((line) => {
    if (line.includes(PLATEAU)) {
      plateauSize = getPlateauSize(line);
    }

    if (line.includes(ROVER)) {
      if (line.includes(LANDING)) {
        const separator = getSplitSeparator(LANDING);
        const [key, value] = line.split(separator);
        if (!messages[key]) messages[key] = {};
        messages[key][LANDING.toLowerCase()] = value;
      }

      if (line.includes(INSTRUCTIONS)) {
        const separator = getSplitSeparator(INSTRUCTIONS);
        const [key, value] = line.split(separator);
        if (!messages[key]) messages[key] = {};
        messages[key][INSTRUCTIONS.toLowerCase()] = value;
      }
    }
  });

  return { plateauSize, messages };
};

const readFile = async (file) => {
  try {
    const allFileContent = await fs.readFileSync(file, 'utf-8');

    return allFileContent;
  } catch (e) {
    throw new Error(`Can't read file`);
  }
};

const processFile = async ({ file }) => {
  const fileContent = await readFile(file);
  const { plateauSize, messages } = parseContent(fileContent);

  Object.keys(messages).forEach((rover) => {
    const result = calculatePosition({
      plateauSize,
      roverInput: messages[rover],
      rover,
    });
    console.log(`${rover}:${result}`);
  });
};

module.exports = { processFile, readFile, parseContent };
