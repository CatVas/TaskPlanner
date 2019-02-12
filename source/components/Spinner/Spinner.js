
import React, { Component } from 'react';
import { DEFAULT_PROPS, PROP_TYPES } from './config';
import Styles from './styles.m.css';

export default class Spinner extends Component {
    static propTypes = PROP_TYPES;
    static defaultProps = DEFAULT_PROPS;

    render () {
        const { isSpinning } = this.props;

        return isSpinning ? <div className = { Styles.spinner } /> : null;
    }
}
