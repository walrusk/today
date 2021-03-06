import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Layout,Switch,Button,Popover,Avatar} from 'antd';
import Today from '@/list/components/Today';
import Past from '@/list/components/Past';
import LogoutButton from '@/auth/components/LogoutButton';
import AppHeader from '@/app/components/AppHeader';
import {Selectors,withState} from 'store';
const {Content} = Layout;

class ListPage extends PureComponent {

    state = {
        showHistory: true,
    };

    toggleHistory = () => {
        this.setState({ showHistory: !this.state.showHistory });
    };

    render() {
        const menuContent = (
            <div className="app-heading-menu-popover">
                <div>{this.renderUserInfo()}</div>
                <div>{this.renderShowHistory()}</div>
                <div><LogoutButton>logout</LogoutButton></div>
            </div>
        );

        const menu = (
            <div className="app-heading-menu">
                <Popover
                    placement="bottomRight"
                    content={menuContent}
                    trigger="click"
                    arrowPointAtCenter
                >
                    <Button
                        shape="circle"
                        icon="ellipsis"
                        size="small"
                        ghost
                        type="primary"
                        className="app-heading-menu-button"
                    />
                </Popover>
            </div>
        );

        return (
            <Layout>
                <AppHeader
                    count={this.props.todoCount}
                    isSyncing={this.props.isSyncing}
                    isSyncWaiting={this.props.isSyncWaiting}
                    menu={menu}
                />
                <Content>
                    <Today />
                    {this.state.showHistory ? <Past /> : null}
                </Content>
            </Layout>
        );
    }

    renderUserInfo() {
        return (
            <div className="user-info">
                <Avatar
                    src={this.props.userPhoto}
                    size="small"
                />
                <span>{this.props.userEmail}</span>
            </div>
        );
    }

    renderShowHistory() {
        return (
            <div className="show-history">
                <Switch
                    size="small"
                    checked={this.state.showHistory}
                    onChange={this.toggleHistory}
                />
                <span className="show-history-word">History</span>
            </div>
        );
    }
}

// SELECTORS
const mapStateToProps = state => withState(state, {
    listCount: Selectors.list.todayLength,
    isSyncing: Selectors.app.isSyncing,
    isSyncWaiting: Selectors.app.isSyncWaiting,
    userEmail: Selectors.auth.userEmail,
    userPhoto: Selectors.auth.userPhoto,
});

export default connect(mapStateToProps)(ListPage);
