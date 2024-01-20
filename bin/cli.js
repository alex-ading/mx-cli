#! /usr/bin/env node

const fs = require('fs-extra');
const commander = require('commander');
const package = require('../package.json');
const templates = require('../src/templates.js');
const { getProjectName, getTemplateAddress, getIsRemoveDir } = require('../src/actions.js');
const { downloadTemplate } = require('../src/utils.js');


commander.on('--help', () => {});
commander.version(`version ${package.version}`);

commander
  .command('create [projectName]')
  .description('创建模版')
  .option('-t, --template <template>', '模版名称')
  .action(async (projectName, options) => {
    if (!projectName) projectName = await getProjectName();
    let templateOption = templates.find(template => template.name === options.template);
    let templateAddress = '';
    if (!templateOption) {
      templateAddress = await getTemplateAddress();
    } else {
      templateAddress = templateOption.value;
    }
    if (fs.existsSync(projectName)) {
      const isRemoveDir = await getIsRemoveDir();
      if (isRemoveDir) {
        fs.removeSync(projectName);
      } else {
        process.exit(1);
      }
    }
    downloadTemplate(templateAddress, projectName);
  });

commander.parse(process.argv);