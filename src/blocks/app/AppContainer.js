import React, {PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import EventListener from '@/app/components/EventListener';
import ListPage from '@/list/ListPage';
import LoadingPage from '@/app/LoadingPage';
import LoginPage from '@/auth/LoginPage';
import {Selectors,withState} from 'store';

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

        return <ListPage />;
    }
}

const mapStateToProps = state => withState(state, {
    initialLoad: Selectors.app.initialLoad,
    isLoggedIn: Selectors.auth.isLoggedIn,
});

export default connect(mapStateToProps)(AppContainer);
