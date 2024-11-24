import { getTemplate, getProjectName, getRemoveDir, getUsePlugin } from "./src/actions.js";
import { PackageInstall } from '@mx-cli/utils';
import path from 'path';
import ora from 'ora';
import fs from 'fs-extra';
import ejs from 'ejs'

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
  spinner.stop();
  
  // 处理插件
  const params: Record<string, any> = { projectName };
  const deleteFiles: string[] = ['pluginConfig.json'];
  const pluginFile = path.join(path.join(process.cwd(), '../node-template', 'template'), 'pluginConfig.json');
  if (fs.existsSync(pluginFile)) {
    const config = fs.readJSONSync(pluginFile);
    for (let key in config) {
      const res = await getUsePlugin(key);
      params[key] = res;
      if (!res) {
        deleteFiles.push(...config[key].files)
      }
    }
  }

  // 把模版复制到目标路径
  // const templatePath = path.join(pkg.npmFilePath, 'template'); // TODO 这里先用本地模版模拟
  const templatePath = path.join(process.cwd(), '../node-template', 'template');
  const targetPath = path.join(process.cwd(), projectName);

  // 是否清空目标文件夹
  if (fs.existsSync(targetPath)) {
    const isRemove = await getRemoveDir();
    if (isRemove) {
      fs.emptyDirSync(targetPath);
    } else {
      process.exit(0);
    }
  }

  fs.copySync(templatePath, targetPath);

  // 更改模版变量
  const filePath = path.join(targetPath, 'package.json');
  const renderResult = await ejs.renderFile(filePath, params)
  fs.writeFileSync(filePath, renderResult);

  // 删除不要的插件配置文件
  deleteFiles.forEach(item => {
    fs.removeSync(path.join(targetPath, item));
  })

  console.log('下载完成');
}

create();

export default create;



