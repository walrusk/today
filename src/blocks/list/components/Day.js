import React, {PureComponent} from 'react';
import ItemList from '@/list/components/ItemList';

class Day extends PureComponent {
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
