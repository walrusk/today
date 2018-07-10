import React, { Component } from 'react';
import {connect} from 'react-redux';
import ItemList from '@/item/ItemList';

class Today extends Component {
    render() {
        return (
            <div>
                <h1>Today</h1>
                <ItemList items={this.props.items} />
            </div>
        );
    }
}

// SELECTORS
const mapStateToProps = state => ({
    items: state.app.today,
});

export default connect(mapStateToProps)(Today);
