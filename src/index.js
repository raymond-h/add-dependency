import depsObject from 'deps-object';
import sortedObject from 'sorted-object';
import objectAssign from 'object-assign';

export function addDependencies(pkgDeps, deps) {
    return depsObject(deps)
        .then(depsObj => {
            return sortedObject(
                objectAssign({}, pkgDeps, depsObj)
            );
        });
}
