import cloneDeep from 'lodash/cloneDeep';
import {callObj} from 'src/helpers/jsHelpers';
import {bindToDispatch as btd} from 'store/helpers';

import {Selectors as AppSelectors} from '@/app/appSelectors';
import {Selectors as AuthSelectors} from '@/auth/authSelectors';
import {Selectors as ListSelectors} from '@/list/listSelectors';

import {Actions as AppActions} from '@/app/appActions';
import {Actions as AuthActions} from '@/auth/authActions';
import {Actions as ListActions} from '@/list/listActions';
import {Actions as ErrorActions} from '@/error/errorActions';

import {Types as AppTypes} from '@/app/appActions';
import {Types as AuthTypes} from '@/auth/authActions';
import {Types as ListTypes} from '@/list/listActions';
import {Types as ErrorTypes} from '@/error/errorActions';

export const Selectors = {
    app: AppSelectors,
    auth: AuthSelectors,
    list: ListSelectors,
};

export const Actions = {
    app: btd(AppActions),
    auth: btd(AuthActions),
    list: btd(ListActions),
    error: btd(ErrorActions),
};

export const Types = {
    app: AppTypes,
    auth: AuthTypes,
    list: ListTypes,
    error: ErrorTypes,
};

export const withState = (state, selections) => callObj(selections, state);
export const clone = cloneDeep;
