import React from 'react';
import {Button} from 'antd';
import Actions from 'store/actions';

const LogoutButton = (props) => {
    return (
        <Button onClick={Actions.auth.logout} size="small" icon="lock">
            {props.children}
        </Button>
    );
};

export default LogoutButton;
