
import {
    bool, func, number, oneOfType, string
} from 'prop-types';

export const PROP_TYPES = {
    completed: bool,
    favorite:  bool,
    id:        oneOfType([
        number,
        string
    ]),
    message:          string,
    _updateTaskAsync: func,
};
