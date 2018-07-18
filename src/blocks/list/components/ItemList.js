import React, {PureComponent} from 'react';
import Item from '@/list/components/Item';

class ItemList extends PureComponent {
    render() {
        return (
            <ul className="item-list">
                {this.renderItems()}
            </ul>
        );
    }
    
    renderItems() {
        return this.props.items.map(item => (
            <Item key={item.id} {...item} />
        ));
    }
}

export default ItemList;
