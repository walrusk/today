import pick from 'lodash/pick';

export function rethrow(error) {
    throw error;
}

export function keyPush(obj, key, val) {
    if (obj[key] === undefined) {
        obj[key] = [];
    }
    obj[key].push(val);
    return obj;
}

export function keySet(obj, key, val) {
    obj[key] = val;
    return obj;
}

export function callArray(fnOrArray, ...args) {
    if (typeof fnOrArray === 'function') {
        return fnOrArray.apply(null, args);
    } else if (fnOrArray instanceof Array) {
        return fnOrArray.map(fn => fn.apply(null, args));
    }
}

export function callObj(obj, ...args) {
    return Object.entries(obj).reduce((carry, [key, fn]) => {
        return keySet(carry, key, fn.apply(null, args));
    }, {});
}

export function arrayPick(arr, paths) {
    return arr.map(obj => pick(obj, paths));
}
