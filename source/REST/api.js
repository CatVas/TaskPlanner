
import { MAIN_URL, TOKEN } from './config';

const completeTask = (task) => ({ ...task, completed: true });
const headers = {
    Authorization: TOKEN,
};
const headersFull = {
    ...headers,
    'Content-Type': 'application/json',
};

const fetchCompletedTask = (incompletedTask) => fetch(MAIN_URL, {
    body:    JSON.stringify([completeTask(incompletedTask)]),
    headers: headersFull,
    method:  'PUT',
});

export const api = {
    completeAllTasks: async (incompleted) => {
        try {
            const res = await Promise.all(incompleted.map(fetchCompletedTask));
            const notPassed = res.find((result) => result.status !== 200);

            if (notPassed) {
                throw new Error('Bad all tasks complete');
            }
        } catch (error) {
            throw new Error('Bad all tasks complete');
        }
    },

    createTask: async (message) => {
        try {
            const response = await fetch(MAIN_URL, {
                body:    JSON.stringify({ message }),
                headers: headersFull,
                method:  'POST',
            });

            if (response.status === 200) {
                const { data: todoObj } = await response.json();

                return todoObj;
            }

            throw new Error('Bad task creation. Please try again.');
        } catch (error) {
            throw new Error('Bad task creation. Please try again.');
        }
    },

    fetchTasks: async () => {
        try {
            const response = await fetch(MAIN_URL, {
                headers,
                method: 'GET',
            });

            if (response.status === 200) {
                const { data } = await response.json();

                return data;
            }

            throw new Error('Bad fetching tasks. Please try again.');
        } catch (error) {
            throw new Error('Bad fetching tasks. Please try again.');
        }
    },

    removeTask: async (id) => {
        try {
            await fetch(`${MAIN_URL}/${id}`, {
                headers,
                method: 'DELETE',
            });
        } catch (error) {
            throw new Error('Bad task remove. Please try again.');
        }
    },

    updateTask: async (message) => {
        try {
            const response = await fetch(MAIN_URL, {
                body:    JSON.stringify([message]),
                headers: headersFull,
                method:  'PUT',
            });

            if (response.status === 200) {
                const { data } = await response.json();

                return data;
            }

            throw new Error('Bad task update. Please try again.');
        } catch (error) {
            throw new Error('Bad task update. Please try again.');
        }
    },
};
