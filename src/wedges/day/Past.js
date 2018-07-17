import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Day from '@/day/Day';
import Selectors from 'store/selectors';
import {callObj} from 'src/helpers/jsHelpers';

class Past extends PureComponent {
    render() {
        return (
            <div>
                {this.renderDays()}
            </div>
        );
    }

    renderDays() {
        return this.props.past.map(day => (
            <Day key={day.date} {...day} />
        ));
    }
}

const mapStateToProps = state => callObj({
    past: Selectors.app.past,
}, state);

export default connect(mapStateToProps)(Past);
