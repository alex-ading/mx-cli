import { getTemplate, getProjectName, getIsRemoveDir } from "./src/actions.js";
import { PackageInstall } from '@mx-cli/utils';
import path from 'path';
import ora from 'ora';
import fs from 'fs-extra';

async function create() {
  const projectName = await getProjectName();
  const template = await getTemplate();

  // 下载模版
  const pkg = new PackageInstall({
    name: template,
    targetPath: path.join(process.cwd(), '.mx-cli-template')
  });

  const spinner = ora('下载模版中...').start();
  if (!await pkg.isExist()) {
    await pkg.install();
  } else {
    await pkg.update();
  }

  // 把模版复制到目标路径
  // const templatePath = path.join(pkg.npmFilePath, 'template'); // TODO 这里先用本地模版模拟
  const templatePath = path.join(process.cwd(), '../node-template', 'template');
  const targetPath = path.join(process.cwd(), projectName);

  // 是都清空目标文件夹
  if (fs.existsSync(targetPath)) {
    const isRemove = await getIsRemoveDir();
    if (isRemove) {
      fs.emptyDirSync(targetPath);
    } else {
      process.exit(0);
    }
  }

  fs.copySync(templatePath, targetPath);
  spinner.stop();
  console.log('下载完成');
}

create();

export default create;



