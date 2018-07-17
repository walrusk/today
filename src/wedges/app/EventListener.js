import {PureComponent} from 'react';
import {Actions} from 'store';

class EventListener extends PureComponent {
    componentDidMount() {
        window.addEventListener('online', Actions.app.appOnline);
        window.addEventListener('offline', Actions.app.appOffline);
    }

    componentWillUnmount() {
        window.removeEventListener('online', Actions.app.appOnline);
        window.removeEventListener('offline', Actions.app.appOffline);
    }

    render() {
        return null;
    }
}

export default EventListener;
