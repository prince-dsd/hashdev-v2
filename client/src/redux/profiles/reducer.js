import {
    PROFILES_ERROR,
    CLEAR_PROFILES,
    PROFILES_FETCH_SUCCESS,
    PROFILES_LOADING,
    SEARCH_CONSTANTS_FETCH_SUCCESS,
    MORE_PROFILES_LOADING,
    MORE_PROFILES_FETCH_SUCCESS,
    RECOMMENDED_PROFILES_FETCH_SUCCESS,
    CLEAR_RECOMMENDED_PROFILES,
} from 'redux/actionTypes';

const initialState = {
    error: {},
    profiles: [],
    allSkills: [],
    allDesiredRoles: [],
    recommendedProfiles: [],
    isProfilesLoading: false,
    isNoMoreProfiles: false,
    isMoreProfilesLoading: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILES_LOADING:
            return {
                ...state,
                isProfilesLoading: true,
                isNoMoreProfiles: initialState.isNoMoreProfiles,
            };
        case MORE_PROFILES_LOADING:
            return {
                ...state,
                isMoreProfilesLoading: true,
            };
        case PROFILES_FETCH_SUCCESS:
            return {
                ...state,
                isProfilesLoading: false,
                profiles: payload,
            };
        case RECOMMENDED_PROFILES_FETCH_SUCCESS:
            return {
                ...state,
                isProfilesLoading: false,
                recommendedProfiles: payload,
            };
        case MORE_PROFILES_FETCH_SUCCESS:
            return {
                ...state,
                isMoreProfilesLoading: false,
                profiles: [...state.profiles, ...payload],
                isNoMoreProfiles: payload.length === 0,
            };
        case PROFILES_ERROR:
            return {
                ...state,
                isProfilesLoading: initialState.isProfilesLoading,
                profiles: initialState.profiles,
                isNoMoreProfiles: initialState.isNoMoreProfiles,
                isMoreProfilesLoading: initialState.isMoreProfilesLoading,
                error: payload,
            };
        case CLEAR_PROFILES:
            return {
                ...state,
                profiles: [],
            };
        case CLEAR_RECOMMENDED_PROFILES:
            return {
                ...state,
                recommendedProfiles: [],
            };
        case SEARCH_CONSTANTS_FETCH_SUCCESS:
            return {
                ...state,
                allSkills: payload.allSkills,
                allDesiredRoles: payload.allDesiredRoles,
            };
        default:
            return state;
    }
};
