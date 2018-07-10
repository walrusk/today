import React, { Component } from 'react';
import Item from '@/item/Item';

class ItemList extends Component {
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
