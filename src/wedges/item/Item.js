import React, { Component } from 'react';
import {Checkbox} from 'antd';

class Item extends Component {
    render() {
        const {done, name} = this.props;
        return (
            <li className="item">
                <Checkbox checked={done} />
                <span className="item_name">{name}</span>
            </li>
        );
    }
}

export default Item;
