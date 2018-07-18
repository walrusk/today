import React, {PureComponent} from 'react';
import AppHeader from '@/app/components/AppHeader';

class LoadingPage extends PureComponent {
    render() {
        return (
            <AppHeader loading />
        );
    }
}

export default LoadingPage;
