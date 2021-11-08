const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const calculateResults = (messages) => {
  console.log('calculateResults');
  console.log(messages);
};

const readInput = async () => {
  // console.log('Input commands line by line. When you finish, type "exit".');
  // rl.setPrompt('command> ');
  // rl.prompt();

  const messages = [];

  // rl.on('line', (line) => {
  //   if (line === 'exit') {
  //     calculateResults();
  //   }
  //   messages.push(line);
  //   rl.prompt();
  // });
  rl.output.write('Enter control commands (when you finish, enter "exit"): ');

  rl.input.addListener('data', (text) => {
    if (text === 'exit') calculateResults(messages);
    messages.push(text);

    rl.input.pause(); // stop reading
  });
};

module.exports = {
  readInput,
};

// Plateau:5 5
// Rover1 Landing:1 2 N
// Rover1 Instructions:LMLMLMLMM
// Rover2 Landing:3 3 E
// Rover2 Instructions:MMRMMRMRRM
