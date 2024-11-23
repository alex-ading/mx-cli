import fs from 'fs-extra';
// @ts-ignore
import npminstall from 'npminstall';
import { getPackageLatestVersion, NPM_REGISTRY_ADDRESS } from './packageInfoUtils.js';
import path from 'path';

export interface PackageInstallOptions {
  name: string;
  targetPath: string;
}

class PackageInstall {
  /**
   * 包名
   */
  name: string;
  /**
   * 存储文件夹
   */
  targetPath: string;
  /**
   * 实际存储位置，targetPath/node_modules
   */
  storePath: string;
  /**
   * 当前版本号
   */
  version: string = '';
  /**
   * 最近版本号
   */
  latestVersion: string = '';

  constructor(options: PackageInstallOptions) {
    this.name = options.name;
    this.targetPath = options.targetPath;
    this.storePath = path.resolve(options.targetPath, 'node_modules');
  }

  async prepare() {
    if (!fs.existsSync(this.targetPath)) {
      fs.mkdirpSync(this.targetPath);
    }
    const version = await getPackageLatestVersion(this.name);
    this.version = version;
  }

  get npmFilePath() {
    // npminstall 的下载位置
    const filePath = path.resolve(this.storePath, `.store/${this.name.replace('/', '+')}@${this.version}/node_modules/${this.name}`)
    return filePath;
  }

  /**
   * 判断包是否存在
   * @returns 
   */
  async isExist() {
    await this.prepare();
    return fs.existsSync(this.npmFilePath);
  }

  async getPackageJSON() {
    if (await this.isExist()) {
      return fs.readJsonSync(path.resolve(this.npmFilePath, 'package.json'))
    }
    return null;
  }

  async getLatestVersion() {
    if (!this.latestVersion) {
      this.latestVersion = await getPackageLatestVersion(this.name);
    }
    return this.latestVersion;
  }

  async install() {
    await this.prepare();
    return npminstall({
      pkgs: [
        {
          name: this.name,
          version: this.version,
        }
      ],
      registry: NPM_REGISTRY_ADDRESS,
      root: this.targetPath
    });
  }

  async update() {
    const latestVersion = await this.getLatestVersion();
    return npminstall({
      root: this.targetPath,
      registry: NPM_REGISTRY_ADDRESS,
      pkgs: [
        {
          name: this.name,
          version: latestVersion,
        }
      ]
    });
  }
}

export default PackageInstall;
