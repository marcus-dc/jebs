const path = require('path');

const runEslint = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const runPrettier = 'prettier --write';

module.exports = {
  '*.{cjs,mjs,js,jsx,ts,tsx}': [runPrettier, runEslint],
};
