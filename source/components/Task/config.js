
import {
    bool, func, number, oneOfType, string
} from 'prop-types';

export const PROP_TYPES = {
    _removeTaskAsync: func,
    _updateTaskAsync: func,
    completed:        bool,
    favorite:         bool,
    id:               oneOfType([
        number,
        string
    ]).isRequired,
    message: string,
};
