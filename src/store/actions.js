import {bindToDispatch as btd} from 'src/helpers/actionHelpers';

import {Actions as AppActions} from '@/app/appActions';
import {Actions as AuthActions} from '@/auth/authActions';
import {Actions as ErrorActions} from '@/error/errorActions';

export default {
    app: btd(AppActions),
    auth: btd(AuthActions),
    error: btd(ErrorActions),
};
