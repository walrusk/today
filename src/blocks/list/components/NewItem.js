import React, {PureComponent} from 'react';
import {Actions} from 'store';
import {Input} from 'antd';

class NewItem extends PureComponent {
    
    state = {
        name: '',
    };

    changeName = (evt) => {
        this.setState({ name: evt.target.value });
    };

    handleKeyPress = (evt) => {
        evt.key === 'Enter' && this.addItem(evt);
    }

    addItem(evt) {
        Actions.list.addItem({
            done: false,
            name: evt.target.value,
        });
        this.setState({ name: '' });
    }

    render() {
        return (
            <div className="new-item">
                <Input
                    value={this.state.name}
                    onChange={this.changeName}
                    onKeyPress={this.handleKeyPress}
                    size="small"
                    placeholder="new..."
                    className="item-input-new"
                    autoFocus
                />
            </div>
        );
    }
}

export default NewItem;
