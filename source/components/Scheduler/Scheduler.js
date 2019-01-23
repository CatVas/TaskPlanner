
import { AddTask } from 'components';
import React, { Component } from 'react';
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    handleAddTask = (task) => {
        console.log(task);
    };

    render () {
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>
                            Tasks Planner
                        </h1>
                        <input
                            placeholder = 'Search'
                            type = 'search'
                        />
                    </header>
                    <section>
                        <AddTask submit = { this.handleAddTask } />
                    </section>
                </main>
            </section>
        );
    }
}
