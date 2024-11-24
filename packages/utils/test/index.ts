import PackageInstall from '../src/packageInstall.js';
import path from 'path';

async function main() {
  const pkg = new PackageInstall({
    targetPath: path.join(path.resolve(), '../test-dir'),
    name: 'axios'
  });

  if (await pkg.isExist()) {
    await pkg.update();
  } else {
    await pkg.install();
  }
}

main();

// @ts-ignore
// import npminstall from 'npminstall';
// import { NPM_REGISTRY_ADDRESS } from './const.js';
// import path from 'path';

// npminstall({
//   root: path.resolve(path.resolve(), 'test'),
//   registry: NPM_REGISTRY_ADDRESS,
//   pkgs: [
//     {
//       name: 'axios',
//     }
//   ]
// });