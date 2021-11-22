const os = require('os');
const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');

const configFilePath = path.join(os.homedir(), `.${pkg.name}rc`);

const getAll = () => {
  try {
    return JSON.parse(fs.readFileSync(configFilePath, { encoding: 'utf8' }));
  } catch (e) {
    return [];
  }
};

const save = config => {
  const targetIndex = getAll().findIndex(item => item.path === config.path);
  if (targetIndex === -1) {
    configs.push(config);
  } else {
    configs[targetIndex] = config;
  }
  fs.writeFileSync(configFilePath, JSON.stringify(configs));
};

module.exports = { getAll, save };