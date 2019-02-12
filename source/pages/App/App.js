
import { Scheduler } from 'components';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Scheduler />
        );
    }
}
