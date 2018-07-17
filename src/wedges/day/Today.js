import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import ItemList from '@/list/ItemList';
import {Selectors,withState} from 'store';

class Today extends PureComponent {
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
const mapStateToProps = state => withState(state, {
    items: Selectors.list.today,
});

export default connect(mapStateToProps)(Today);
