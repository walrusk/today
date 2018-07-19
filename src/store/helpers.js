import snakeCase from 'lodash/snakeCase';
import {keySet} from 'src/helpers/jsHelpers';
import {dispatch} from 'store/configureStore';

export function typesObj(types) {
    return types.reduce((types, type) => {
        types[type] = type;
        return types;
    }, {});
}

export function createActionCreator(type, ...params) {
    return (...paramVals) => params.reduce((action, param, index) => {
        return keySet(action, param, paramVals[index]);
    }, {type});
}

export function createActionCreatorGroup(actionCreatorDef) {
    return Object.keys(actionCreatorDef).reduce((acGroup, acName) => {
        const type = snakeCase(acName).toUpperCase();
        const params = actionCreatorDef[acName];
        acGroup.Types[type] = type;
        acGroup.Actions[acName] = createActionCreator(type, ...params);
        return acGroup;
    }, {
        Types: {},
        Actions: {},
    });
}

export function bindToDispatch(actions) {
    return Object.entries(actions).reduce((carry, [action, actionCreator]) => {
        return keySet(carry, action, (...params) => dispatch(actionCreator(...params)));
    }, {});
}
