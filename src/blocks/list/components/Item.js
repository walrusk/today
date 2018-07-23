import React, {PureComponent} from 'react';
import firebase from 'firebase';
import {Checkbox} from 'antd';
import AutosizeInput from 'react-input-autosize';
import {Actions} from 'store';

class Item extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
        };
    }

    handleCheck = (evt) => {
        Actions.list.updateItem({
            id: this.props.id,
            done: evt.target.checked,
            date: firebase.firestore.FieldValue.serverTimestamp(),
        });
    };

    handleBlur = (evt) => {
        evt.target.value === ''
            ? Actions.list.deleteItem(this.props.id)
            : this.handleChangeName(evt);
    };

    handleChangeName = (evt, buffer = 0) => {
        this.setState({ name: evt.target.value });
        Actions.list.updateItem({ id: this.props.id, name: evt.target.value }, buffer);
    };

    handleChangeNameWithBuffer = (evt) => {
        this.handleChangeName(evt, 2000);
    };

    render() {
        return (
            <li className="item">
                <Checkbox checked={this.props.done} onChange={this.handleCheck} />
                <div className="item-input-container">
                    <AutosizeInput
                        type="text"
                        value={this.state.name}
                        spellCheck={false}
                        onChange={this.handleChangeNameWithBuffer}
                        onBlur={this.handleBlur}
                    />
                </div>
            </li>
        );
    }
}

export default Item;
