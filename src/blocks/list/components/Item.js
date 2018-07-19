import React, {PureComponent} from 'react';
import {Checkbox} from 'antd';
import {Actions} from 'store';

class Item extends PureComponent {

    onChange = (evt) => {
        Actions.list.updateItem({
            ...this.props,
            done: evt.target.checked,
        });
    };

    render() {
        const {done, name} = this.props;
        return (
            <li className="item">
                <Checkbox checked={done} onChange={this.onChange} />
                <span className="item_name">{name}</span>
            </li>
        );
    }
}

export default Item;
