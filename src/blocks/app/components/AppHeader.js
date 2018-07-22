import React, {PureComponent} from 'react';
import {Layout,Avatar,Badge} from 'antd';
import {vars as styleVars} from 'src/styles/vars';
const {Header} = Layout;

class AppHeader extends PureComponent {
    render() {
        return (
            <Header>
                {this.renderAvatar()}
                <span className="app-heading">{'// todo:'}</span>
                {this.props.menu ? this.props.menu : null}
            </Header>
        );
    }

    getIcon() {
        if (this.props.isSyncWaiting) {
            return 'hourglass';
        }

        if (this.props.loading || this.props.isSyncing) {
            return 'loading';
        }

        return 'pushpin';
    }

    renderAvatar() {
        const avatar = (
            <Avatar
                style={{ backgroundColor: styleVars['@primary-color'] }}
                icon={this.getIcon()}
            />
        );

        if (this.props.count) {
            return (
                <Badge count={this.props.todoCount}>
                    {avatar}
                </Badge>
            );
        }

        return avatar;
    }
}

export default AppHeader;
