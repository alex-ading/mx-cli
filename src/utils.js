// const downloadGitRepo = require('download-git-repo');
const ora = require('ora');
const path = require('path');
const clone = require('git-clone/promise');

const downloadTemplate = async (gitAddress, targetDir) => {
  const distDir = path.join(process.cwd(), targetDir); // 当前输入命令行处的路径 + 目标文件夹
  const loading = ora('正在下载模版...');
  loading.start();
  try {
    await clone(gitAddress, distDir);
    loading.succeed('创建模版成功!');
    console.log(`\ncd ${targetDir}`);
    console.log('npm i');
    console.log('npm start');
  } catch (e) {
    loading.fail('创建模版失败：' + e.message);
    console.log(111);
  }
};

module.exports = {
  downloadTemplate
};
