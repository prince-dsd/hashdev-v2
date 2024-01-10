import { isEmpty } from 'lodash';
import { setAuthToken } from 'shared/utils';
import {
    SIGN_UP_SUCCESS,
    SIGN_IN_SUCCESS,
    USER_SIGNED_OUT,
    USER_LOADING,
    USER_FETCH_SUCCESS,
    AUTHENTIACTION_ERROR,
} from 'redux/actionTypes';

const initialState = {
    token: '',
    isAuthenticated: false,
    isLoading: false,
    user: {},
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: initialState.isAuthenticated,
                user: initialState.user,
            };
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                user: payload,
                isAuthenticated: !isEmpty(payload),
                isLoading: initialState.isLoading,
            };
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            setAuthToken(payload);
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
            };
        case USER_SIGNED_OUT:
            setAuthToken('');
            return {
                ...initialState,
            };
        case AUTHENTIACTION_ERROR:
            setAuthToken('');
            return {
                ...state,
                error: payload,
                token: initialState.token,
                isAuthenticated: initialState.isAuthenticated,
                isLoading: false,
                user: initialState.user,
            };
        default:
            return state;
    }
};
