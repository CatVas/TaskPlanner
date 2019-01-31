
import React, { createRef, PureComponent } from 'react';
import { Checkbox, Edit, Remove, Star } from 'theme/assets';
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

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    };

    _setTaskEditingState = (isTaskEditing) => {
        this.setState({ isTaskEditing });

        if (isTaskEditing) {
            this.taskInput.current.focus();
        }
    };

    _taskInputFocus = () => {};

    _toggleTaskCompletedState = () => {
        const { _updateTaskAsync, completed } = this.props;
        const task = this._getTaskShape({ completed: !completed });

        _updateTaskAsync(task);
    };

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync, favorite } = this.props;
        const task = this._getTaskShape({ favorite: !favorite });

        _updateTaskAsync(task);
    };

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

    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if (isTaskEditing) {
            this._updateTask();

            return null;
        }
        this._setTaskEditingState(true);
    };

    _updateTaskMessageOnKeyDown = (ev) => {
        const { newMessage } = this.state;

        if (!newMessage) {
            return null;
        }
        if (ev.key === 'Enter') {
            this._updateTask();
        }
        if (ev.key === 'Escape') {
            this._cancelUpdatingTaskMessage();
        }
    };

    render () {
        const {
            completed,
            favorite,
            message,
        } = this._getTaskShape(this.props);
        const { isTaskEditing } = this.state;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { !isTaskEditing }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { message }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
