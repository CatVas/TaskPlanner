
import { MAIN_URL, TOKEN } from './config';

const headers = {
    Authorization: TOKEN,
};
const headersFull = {
    ...headers,
    'Content-Type': 'application/json',
}

export const api = {
    completeAllTasks: async (incompleted) => {
        const res = await Promise.all(incompleted.map(ic => fetch(MAIN_URL, {
            body: JSON.stringify([{ ...ic, completed: true }]),
            headers: headersFull,
            method: 'PUT',
        })));
        const notPassed = res.find(r => r.status !== 200);

        if (notPassed) {
            throw new Error('Bad all tasks complete');
        }
    },

    createTask: async (message) => {
        const response = await fetch(MAIN_URL, {
            body:    JSON.stringify({ message }),
            headers: headersFull,
            method:  'POST',
        });

        if (response.status === 200) {
            const { data: todoObj } = await response.json();

            return todoObj;
        }
    },

    fetchTasks: async () => {
        const response = await fetch(MAIN_URL, {
            headers,
            method: 'GET',
        });

        if (response.status === 200) {
            const { data } = await response.json();

            return data;
        }

        return [];
    },

    removeTask: async (id) => {
        await fetch(`${MAIN_URL}/${id}`, {
            headers,
            method: 'DELETE',
        });
    },

    updateTask: async (message) => {
        const response = await fetch(MAIN_URL, {
            body:    JSON.stringify([message]),
            headers: headersFull,
            method:  'PUT',
        });

        if (response.status === 200) {
            const { data } = await response.json();

            return data;
        }

        return [];
    },
};
