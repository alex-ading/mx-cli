#! /usr/bin/env node
console.log('mx cli');

const commander = require('commander');
const inquirer = require('inquirer');
const package = require('../package.json');
const templates = require('../src/templates.js');


commander.version(`version ${package.version}`);

commander
  .command('create')
  .description('创建模版')
  .action(async () => {
    const { projectName } = await inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称：',
      choices: templates,
    });
    console.log("项目名称：", projectName);

    const { template } = await inquirer.prompt({
      type: 'list',
      name: 'template',
      message: '请选择项目模板：',
      choices: templates,
    });
    console.log("项目模版：", template);
  });

commander.parse(process.argv);