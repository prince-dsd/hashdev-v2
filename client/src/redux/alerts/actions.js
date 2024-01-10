import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, CLEAR_ALERTS, REMOVE_ALERT } from 'redux/actionTypes';
import { toastTypes } from 'shared/constants';

export const setAlert = (message, type = toastTypes.ERROR, timeout = 3000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { id, message, type, timeout },
    });
};

export const clearAlerts = () => ({
    type: CLEAR_ALERTS,
});

export const removeAlert = payload => ({
    type: REMOVE_ALERT,
    payload,
});
