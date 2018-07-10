import React, { Component } from 'react';
import {connect} from 'react-redux';
import Day from '@/day/Day';

class Past extends Component {
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

const mapStateToProps = state => ({
    past: state.app.past,
});

export default connect(mapStateToProps)(Past);
