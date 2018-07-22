import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Selectors,withState} from 'store';
import NewItem from '@/list/components/NewItem';
import ItemList from '@/list/components/ItemList';

class Today extends PureComponent {
    render() {
        return (
            <div>
                <h1>Today</h1>
                <NewItem />
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
