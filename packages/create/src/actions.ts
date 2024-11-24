
import inquirer from 'inquirer';

export const getTemplate = async () => {
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: '请选择项目模板：',
    choices: [
      {
        name: 'react 项目',
        value: 'eslint-config-hr'
      },
      {
        name: 'vue 项目',
        value: 'eslint-config-hr'
      }
    ],
  });
  return template;
};

export const getProjectName = async () => {
  let projectName = '';
  while (!projectName) {
    const res = await inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称：'
    });
    projectName = res.projectName
  }
  return projectName
}

export const getRemoveDir = async () => {
  const { removeDir } = await inquirer.prompt({
    type: 'confirm',
    name: 'removeDir',
    message: '文件夹已存在，是否覆盖？'
  });
  return removeDir;
};

export const getUsePlugin = async (plugin: string) => {
  const res = await inquirer.prompt({
    type: 'confirm',
    name: plugin,
    message: '是否启用' + plugin + '?'
  });
  return res[plugin];
}





