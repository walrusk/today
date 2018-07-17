import React, {PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import EventListener from '@/app/EventListener';
import TodoPage from '@/app/TodoPage';
import LoadingPage from '@/app/LoadingPage';
import LoginPage from '@/auth/LoginPage';
import {callObj} from 'src/helpers/jsHelpers';
import Selectors from 'store/selectors';

class AppContainer extends PureComponent {
    render() {
        return (
            <Fragment>
                <EventListener />  
                {this.renderApp()}
            </Fragment>
        );
    }

    renderApp() {
        const {initialLoad, isLoggedIn} = this.props;

        if (initialLoad) {
            return <LoadingPage />;
        }

        if (!isLoggedIn) {
            return <LoginPage />;
        }

        return <TodoPage />;
    }
}

const mapStateToProps = state => callObj({
    initialLoad: Selectors.app.initialLoad,
    isLoggedIn: Selectors.auth.isLoggedIn,
}, state);

export default connect(mapStateToProps)(AppContainer);
