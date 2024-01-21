const inquirer = require('inquirer');
const templates = require('./templates.js');

const getProjectName = async () => {
  const { projectName } = await inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称：'
  });
  return projectName;
};

const getTemplateAddress = async () => {
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: '请选择项目模板：',
    choices: templates
  });
  return template;
};

const getIsRemoveDir = async () => {
  const { isRemoveDir } = await inquirer.prompt({
    type: 'confirm',
    name: 'isRemoveDir',
    message: '改文件夹已存在，是否覆盖？'
  });
  return isRemoveDir;
};

const showAllTemplates = () => {
  templates.forEach((item, index) => {
    console.log(`模板${index + 1}：${item.name}`);
  });
  process.exit();
};

module.exports = {
  getProjectName,
  getTemplateAddress,
  getIsRemoveDir,
  showAllTemplates
};
