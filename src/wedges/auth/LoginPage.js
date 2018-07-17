import React, {PureComponent} from 'react';
import {Layout} from 'antd';
import LoginButton from '@/auth/LoginButton';
import AppHeader from '@/app/AppHeader';
const {Content} = Layout;

class LoginPage extends PureComponent {
    render() {
        return (
            <Layout>
                <AppHeader />
                <Content>
                    <LoginButton>Login</LoginButton>
                </Content>
            </Layout>
        );
    }
}

export default LoginPage;
