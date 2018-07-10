import React, { Component } from 'react';
import ItemList from '@/item/ItemList';

class Day extends Component {
    render() {
        const {date, items} = this.props;
        return (
            <div>
                <h2>{date}</h2>
                <ItemList items={items} />
            </div>
        );
    }
}

export default Day;
