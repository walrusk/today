import React, {PureComponent} from 'react';
import AppHeader from '@/app/AppHeader';

class LoadingPage extends PureComponent {
    render() {
        return (
            <AppHeader loading />
        );
    }
}

export default LoadingPage;
