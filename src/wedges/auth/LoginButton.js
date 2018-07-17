import React from 'react';
import Actions from 'store/actions';

const LoginButton = (props) => {
    return (
        <button className="google-login-button" onClick={Actions.auth.login}>
            props.children
        </button>
    );
};

export default LoginButton;
