
import React, { PureComponent } from 'react';
import { PROP_TYPES } from './config';

export default class AddTask extends PureComponent {
    static propTypes = PROP_TYPES;

    state = {
        text: '',
    };

    handleInputChange = (ev) => {
        this.setState({
            text: ev.target.value.slice(0, 50),
        });
    };

    handleSubmit = (ev) => {
        const { submit } = this.props;
        const { text } = this.state;

        ev.preventDefault();
        if (typeof submit === 'function' && text.length) {
            submit(text);
        }
        this.setState({ text: '' });
    };

    render () {
        const { text } = this.state;

        return (
            <form onSubmit = { this.handleSubmit }>
                <input
                    maxLength = '50'
                    placeholder = 'New task description'
                    type = 'text'
                    value = { text }
                    onChange = { this.handleInputChange }
                />
                <button>
                  Add a task
                </button>
            </form>
        );
    }
}
