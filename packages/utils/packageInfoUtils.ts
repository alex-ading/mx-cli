import axios from 'axios';
import urlJoin from 'url-join';
import { NPM_REGISTRY_ADDRESS } from './const.js'

async function getPackageNpmInfo(packageName: string) {
  const url = urlJoin(NPM_REGISTRY_ADDRESS, packageName);
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

async function getPackageLatestVersion(packageName: string) {
  const data = await getPackageNpmInfo(packageName);
  return data['dist-tags'].latest;
}

async function getPackageVersions(packageName: string) {
  const data = await getPackageNpmInfo(packageName);
  return Object.keys(data.versions);
}

export {
  NPM_REGISTRY_ADDRESS,
  getPackageNpmInfo,
  getPackageLatestVersion,
  getPackageVersions
}
