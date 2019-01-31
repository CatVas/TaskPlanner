
import { Spinner, Task } from 'components';
import React, { Component } from 'react';
import Checkbox from 'theme/assets/Checkbox';
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    state = {
        isTasksFetching: false,
        newTaskMessage:  '',
        tasks:           [],
        tasksFilter:     '',
    };

    componentDidMount () {}

    _completeAllTasksAsync = async () => {
        const { tasks } = this.state;
        const incompleted = tasks.filter((task) => !task.completed);

        if (incompleted.length > 0) {
            this._setTasksFetchingState(true);
            await api.completeAllTasks(incompleted);
            this.setState({
                tasks: tasks.map((task) => ({ ...task, completed: true }))
            });
            this._setTasksFetchingState(false);
        } else {
            return null;
        }
    }

    _createTaskAsync = async (ev) => {
        const { newTaskMessage } = this.state;

        if (newTaskMessage) {
            ev.preventDefault();
            this._setTasksFetchingState(true);

            const newTask = await api.createTask(newTaskMessage);

            this.setState(({ tasks }) => ({
                newTaskMessage: '',
                tasks: [ ...tasks, newTask ],
            }));
            this._setTasksFetchingState(false);
        } else {
            return null;
        }
    }

    _fetchTasksAsync = async () => {
        this._setTasksFetchingState(true);

        const tasks = await api.fetchTasks();

        this.setState({ tasks });
        this._setTasksFetchingState(false);
    }

    _getAllCompleted = () => !this.state.tasks.find((t) => !t.completed);

    handleAddTask = (task) => {
        console.log(task);
    };

    _removeTaskAsync = async (id) => {
        this._setTasksFetchingState(true);
        await api.removeTask(id);
        this.setState(({ tasks }) => ({
            tasks: tasks.filter((task) => task.id !== id),
        }));
        this._setTasksFetchingState(false);
    }

    _setTasksFetchingState = (isTasksFetching) => {
        this.setState({ isTasksFetching });
    };
    _updateNewTaskMessage = (ev) => {
        this.setState({ newTaskMessage: ev.target.value })
    };

    _updateTaskAsync = async (task) => {
        this._setTasksFetchingState(true);
        await api.updateTask(task);
        this._setTasksFetchingState(false);
    }

    _updateTasksFilter = (ev) => {
        this.setState({ tasksFilter: ev.target.value.toLowerCase() });
    };

    render () {
        const { isTasksFetching, newTaskMessage, tasks, tasksFilter } = this.state;

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                maxLength = { 50 }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>
                                Добавить задачу
                            </button>
                        </form>
                        <ul>
                            {tasks.map((task) => (
                                <Task
                                    _removeTaskAsync = { this._removeTaskAsync }
                                    _updateTaskAsync = { this._updateTaskAsync }
                                    key = { task.id }
                                    { ...task }
                                />
                            ))}
                        </ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { this._getAllCompleted() }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = 'completeAllTasks'>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
