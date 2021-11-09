const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const { processFile } = require('./functions/file.helpers');

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

inquirer
  .prompt([
    {
      type: 'file-tree-selection',
      name: 'file',
    },
  ])
  .then((answers) => {
    processFile(answers);
  });
