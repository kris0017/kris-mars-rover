// const readlineSync = require('readline-sync');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const { readInput } = require('./functions/input.helpers');
const { processFile } = require('./functions/file.helpers');

const options = ['File', 'Input'];

const FILE = 'file';
const INPUT = 'input';

// (async function main() {
//   const index = readlineSync.keyInSelect(
//     options,
//     `Select the way to control the rover's moves`
//   );

//   switch (index) {
//     case -1:
//       console.debug('Closing app.');
//       break;
//     case 0:
//       console.debug('File');
//       break;
//     case 1:
//       console.debug('Input');
//       await readInput();
//       break;
//     default:
//       console.log(`Unknown operation. Closing app.`);
//   }
// })();

// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const answer = await rl.question(`"${FILE}" or "${INPUT}?`);
processFile();

// const createQuestion = (q) =>
//   new Promise((res, rej) => {
//     rl.question(q, (answer) => {
//       res(answer);
//     });
//   });

// (async function main() {
//   let answer;
//   while (answer != FILE && answer != INPUT) {
//     answer = await createQuestion(`Select method: "${FILE}" or "${INPUT}? `);
//   }
//   console.log(`You selected method ${answer}`);
//   if (answer === FILE) await readFile();
//   if (answer === INPUT) await readInput();
// })();

// TODO: Log the answer in a database
// console.log('Thank you for your valuable feedback:', answer);

// rl.close();

// rl.output.write('"File" or "Input"?');

// rl.output.write('Enter control commands (when you finish, enter "exit"): ');

// rl.input.addListener('data', (text) => {
//   if (text === 'exit') calculateResults(messages);
//   messages.push(text);

//   stdin.pause(); // stop reading
// });
