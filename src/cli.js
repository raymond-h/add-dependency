#!/usr/bin/env node

import fs from 'fs';

import objectAssign from 'object-assign';
import minimist from 'minimist';

import { addDependencies } from './index';

const argv = minimist(process.argv.slice(2), {
    boolean: ['dev', 'optional'],
    alias: {
        dev: 'D',
        optional: 'O'
    }
});

let depKind = 'dependencies';
if(argv.dev) { depKind = 'devDependencies'; }
else if(argv.optional) { depKind = 'optionalDependencies'; }

const pkgJson = JSON.parse(fs.readFileSync('./package.json'), { encoding: 'utf-8' });

addDependencies(pkgJson[depKind], argv._)
.then(deps => {
    const newPkgJson = objectAssign(pkgJson, { [depKind]: deps });

    fs.writeFileSync('./package.json', JSON.stringify(newPkgJson, null, '  '));
})
.catch(err => console.error(err.stack));
