#! /usr/bin/env node

const fs = require('fs-extra');
const commander = require('commander');
const package = require('../package.json');
const { getProjectName, getTemplate, getIsRemoveDir } = require('../src/actions.js');
const { downloadTemplate} = require('../src/download.js');

commander
  .command('create')
  .description('创建模版')
  .action(async () => {
    const projectName = await getProjectName();
    const template = await getTemplate();
    if (fs.existsSync(projectName)) {
      const isRemoveDir = await getIsRemoveDir();
      if (isRemoveDir) {
        fs.removeSync(projectName);
      } else {
        process.exit(1);
      }
    }
    downloadTemplate(template, projectName);
  });

commander.version(`version ${package.version}`);
commander.parse(process.argv);