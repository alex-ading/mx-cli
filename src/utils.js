const ora = require('ora');
const path = require('path');
const fs = require('fs-extra');
const handlebars = require('handlebars');
const clone = require('git-clone/promise');

const updateTemplateParams = (name) => {
  const filePath = `${name}/package.json`;
  const fileContent = fs.readFileSync(filePath,'utf-8');
  const res = handlebars.compile(fileContent)({ name });
  fs.writeFileSync(filePath, res);
};

const downloadTemplate = async (gitAddress, projectName) => {
  const distDir = path.join(process.cwd(), projectName); // 当前输入命令行处的路径 + 目标文件夹
  const loading = ora('正在下载模版...');
  try {
    loading.start();
    await clone(gitAddress, distDir);
    updateTemplateParams(projectName);
    loading.succeed('模板创建成功');
    console.log(`\ncd ${projectName}`);
    console.log('npm i');
    console.log('npm start');
  } catch (e) {
    loading.fail('模板创建失败' + e.message);
  }
};

module.exports = {
  downloadTemplate
};
