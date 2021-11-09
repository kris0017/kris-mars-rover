const fs = require('fs');
const {
  processFile,
  readFile,
  parseContent,
} = require('../functions/file.helpers');

const FILE_URL = 'input.txt';

const testInputText = `Plateau:5 5
Rover1 Landing:1 2 N
Rover1 Instructions:LMLMLMLMM`;

describe('readFile', () => {
  test('should return string from the file', async () => {
    const expectedContent = await fs.readFileSync(FILE_URL, 'utf-8');

    const fileContent = await readFile(FILE_URL, 'utf-8');

    expect(fileContent).toBe(expectedContent);
  });

  test('should return error', async () => {
    await expect(readFile('no-such-file')).rejects.toThrow(`Can't read file`);
  });
});

test('parseContent: should return object with plateauSize and messages', () => {
  const result = parseContent(testInputText);

  expect(result).toEqual(
    expect.objectContaining({
      plateauSize: [5, 5],
      messages: {
        Rover1: {
          landing: '1 2 N',
          instructions: 'LMLMLMLMM',
        },
      },
    })
  );
});

describe('processFile', () => {
  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    console.error.mockRestore();
  });

  test('should return result', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await processFile({ file: FILE_URL });

    expect(consoleSpy).toHaveBeenCalledWith('Rover1:1 3 N');
    expect(consoleSpy).toHaveBeenCalledWith('Rover2:5 1 E');
  });
});
