import {
    USER_PROFILE_FETCH_SUCCESS,
    PROFILE_ERROR,
    RESET_PROFILE,
    USER_PROFILE_LOADING,
    SET_IS_CURRENT_USER,
    USER_SIGNED_OUT,
} from 'redux/actionTypes';

const initialState = {
    profile: {},
    isLoading: false,
    isCurrentUser: false,
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_PROFILE_LOADING:
            return {
                ...state,
                isLoading: true,
                profile: initialState.profile,
            };
        case USER_PROFILE_FETCH_SUCCESS:
            return {
                ...state,
                profile: payload,
                isLoading: initialState.isLoading,
            };

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: initialState.isLoading,
            };
        case SET_IS_CURRENT_USER:
            return {
                ...state,
                isCurrentUser: payload,
            };
        case USER_SIGNED_OUT:
            return {
                ...state,
                isLoading: initialState.isLoading,
                isCurrentUser: initialState.isCurrentUser,
            };
        case RESET_PROFILE:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
