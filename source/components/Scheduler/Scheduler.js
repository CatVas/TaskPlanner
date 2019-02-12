
import { Spinner, Task } from 'components';
import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import Checkbox from 'theme/assets/Checkbox';
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    state = {
        isTasksFetching: true,
        newTaskMessage:  '',
        tasks:           [],
        tasksFilter:     '',
    };

    componentDidMount () {
        this._fetchTasksAsync();
    }

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
        ev.preventDefault();
        const { newTaskMessage } = this.state;

        if (newTaskMessage) {
            this._setTasksFetchingState(true);

            const newTask = await api.createTask(newTaskMessage);

            this.setState(({ tasks }) => ({
                newTaskMessage: '',
                tasks:          [...tasks, newTask],
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

    _sortTasks = (tasks) => tasks.sort((task1, task2) => {
        // TODO: complete the filtration later
        if (task1.favorite && !task2.favorite) {
            return -1;
        }

        return 0;
    });

    _updateNewTaskMessage = (ev) => {
        this.setState({ newTaskMessage: ev.target.value })
    };

    _updateTaskAsync = async (updatedTask) => {
        this._setTasksFetchingState(true);
        const res = await api.updateTask(updatedTask);
        const updated = res[0];

        if (updated) {
            this.setState(({ tasks }) => ({
                tasks: tasks.map((task) => task.id === updated.id ? updated : task),
            }));
        }
        this._setTasksFetchingState(false);
    }

    _updateTasksFilter = (ev) => {
        this.setState({ tasksFilter: ev.target.value.toLowerCase() });
    };

    render () {
        const {
            isTasksFetching,
            newTaskMessage,
            tasks,
            tasksFilter,
        } = this.state;

        const tasksToShow = this._sortTasks(
            tasks.filter(task => tasksFilter
                ? task.message.toLowerCase().indexOf(tasksFilter) > -1
                : true
            ),
        );

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
                            <FlipMove duration = { 400 }>
                                {tasksToShow.map((task) => (
                                    <Task
                                        _removeTaskAsync = { this._removeTaskAsync }
                                        _updateTaskAsync = { this._updateTaskAsync }
                                        key = { task.id }
                                        { ...task }
                                    />
                                ))}
                            </FlipMove>
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
