#!/usr/bin/env node

import fs from 'fs';

import objectAssign from 'object-assign';

import { addDependencies } from './index';

const deps = process.argv.slice(2);
const depKind = 'dependencies';

const pkgJson = JSON.parse(fs.readFileSync('./package.json'), { encoding: 'utf-8' });

addDependencies(pkgJson[depKind], deps)
.then(deps => {
    const newPkgJson = objectAssign(pkgJson, { [depKind]: deps });

    fs.writeFileSync('./package.json', JSON.stringify(newPkgJson, null, '  '));
})
.catch(err => console.error(err.stack));
