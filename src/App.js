import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Avatar, Badge, Switch} from 'antd';
import Today from '@/day/Today';
import Past from '@/day/Past';
import {vars as styleVars} from './styles/vars';
const {Header, Content} = Layout;

class App extends Component {

    state = {
        showHistory: true,
    };

    toggleHistory = () => {
        this.setState({ showHistory: !this.state.showHistory });
    };

    render() {
        return (
            <Layout>
                <Header>
                    <Badge count={this.props.todoCount}>
                        <Avatar
                            style={{ backgroundColor: styleVars['@primary-color'] }}
                            icon="pushpin"
                        />
                    </Badge>
                    <span className="app-heading">To Do</span>
                    {this.renderShowHistory()}
                </Header>
                <Content>
                    <Today />
                    {this.state.showHistory ? <Past /> : null}
                </Content>
            </Layout>
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
const mapStateToProps = state => ({
    todoCount: state.app.today.length,
});

export default connect(mapStateToProps)(App);
