
import React, { createRef, PureComponent } from 'react';
import { PROP_TYPES } from './config';
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    static propTypes = PROP_TYPES;

    state = {
        isTaskEditing: false,
        newMessage:    '',
    };

    taskInput = createRef();

    _cancelUpdatingTaskMessage = () => {};

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _removeTask = () => {};

    _setTaskEditingState = (isTaskEditing) => {
        this.setState({ isTaskEditing });

        if (isTaskEditing) {
            this.taskInput.current.focus();
        }
    };

    _taskInputFocus = () => {};
    _toggleTaskCompletedState = () => {};
    _toggleTaskFavoriteState = () => {};

    _updateNewTaskMessage = (ev) => {
        this.setState({ newMessage: ev.target.value });
    };

    _updateTask = () => {
        const { newMessage } = this.state;
        const {
            _updateTaskAsync,
            message,
        } = this.props;

        this._setTaskEditingState(false);
        if (message === newMessage) {
            return null;
        }
        _updateTaskAsync();
    };

    _updateTaskMessageOnClick = () => {};
    _updateTaskMessageOnKeyDown = () => {};

    render () {
        const {
            id,
            completed,
            favorite,
            message,
        } = this._getTaskShape(this.props);

        return (
            <li className = { Styles.task }>
                <input
                    ref = { this.taskInput }
                />
            </li>
        );
    }
}
