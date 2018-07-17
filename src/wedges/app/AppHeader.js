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

    renderAvatar() {
        const icon = this.props.loading ? 'loading' : 'pushpin';       
        const avatar = (
            <Avatar
                style={{ backgroundColor: styleVars['@primary-color'] }}
                icon={icon}
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
