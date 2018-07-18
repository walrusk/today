import React, {PureComponent} from 'react';
import {Layout} from 'antd';
import LoginButton from '@/auth/components/LoginButton';
import AppHeader from '@/app/components/AppHeader';
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
