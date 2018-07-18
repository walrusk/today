import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Day from '@/list/components/Day';
import {Selectors,withState} from 'store';

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

const mapStateToProps = state => withState(state, {
    past: Selectors.list.past,
});

export default connect(mapStateToProps)(Past);
