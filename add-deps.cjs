const fs = require('fs');
const path = require('path');
const apps = ['aqurion-ai','aqurion-dev','aqurion-marketing','aqurion-sales','aqurion-sa','aqurion-financial','aqurion-directory','aqurion-stores','aqurion-ps','aqurion-hospitality','aqurion-home','aqurion-atm','aqurion-services','web'];
apps.forEach(app => {
  const fp = path.join('e:/travas/apps', app, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (!pkg.dependencies) pkg.dependencies = {};
  pkg.dependencies['framer-motion'] = '^12.0.0';
  fs.writeFileSync(fp, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(`Added framer-motion to ${app}`);
});
console.log('Done!');
