import { api, apiErrorHandler, url } from 'shared/utils';
import {
    PROFILES_FETCH_SUCCESS,
    PROFILES_ERROR,
    CLEAR_PROFILES,
    PROFILES_LOADING,
    MORE_PROFILES_LOADING,
    CLEAR_RECOMMENDED_PROFILES,
    MORE_PROFILES_FETCH_SUCCESS,
    SEARCH_CONSTANTS_FETCH_SUCCESS,
    RECOMMENDED_PROFILES_FETCH_SUCCESS,
} from 'redux/actionTypes';

export const fetchProfiles = (queryObj = null) => async dispatch => {
    try {
        dispatch(resetProfiles());
        dispatch(profilesLoading());

        if (queryObj) {
            const queryString = url.objectToQueryString(queryObj);
            const res = await api.get(`/api/v1/profile/all?${queryString}`);
            dispatch(profilesLoaded(res.data.data.profiles));
        } else {
            const res = await api.get(`/api/v1/profile/all`);
            dispatch(profilesLoaded(res.data.data.profiles));
        }
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const fetchRecommendedProfiles = queryObj => async dispatch => {
    try {
        dispatch(clearRecommendedProfiles());
        dispatch(profilesLoading());
        const queryString = url.objectToQueryString(queryObj);
        const res = await api.get(`/api/v1/profile/all?${queryString}`);
        dispatch(recommendedProfilesLoaded(res.data.data.profiles));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const fetchMoreProfiles = queryObj => async dispatch => {
    try {
        dispatch(moreProfilesLoading());
        const queryString = url.objectToQueryString(queryObj);
        const res = await api.get(`/api/v1/profile/all?${queryString}`);
        dispatch(moreProfilesLoaded(res.data.data.profiles));
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const fetchSearchConstants = () => async dispatch => {
    try {
        const res = await api.get(
            `/api/v1/profile/all?fields=skills,desired_roles,portfolio,-user`,
        );
        const profileSkillsArr = res.data.data.profiles.map(profile => profile.skills).flat();
        const portfolioSkillsArr = res.data.data.profiles
            .map(profile => profile.portfolio.map(item => item.skills).flat())
            .flat();
        const skillsSet = new Set([profileSkillsArr, portfolioSkillsArr].flat());
        const desiredRoles = new Set(
            res.data.data.profiles.map(profile => profile.desired_roles).flat(),
        );

        dispatch(
            searchConstantsLoaded({
                allSkills: Array.from(skillsSet).sort((a, b) =>
                    a.toLowerCase() < b.toLowerCase() ? -1 : 1,
                ),
                allDesiredRoles: Array.from(desiredRoles).sort((a, b) =>
                    a.toLowerCase() < b.toLowerCase() ? -1 : 1,
                ),
            }),
        );
    } catch (err) {
        dispatch(apiErrorHandler(err));
        dispatch(profilesError(err));
    }
};

export const resetProfiles = () => ({
    type: CLEAR_PROFILES,
});

export const clearRecommendedProfiles = () => ({
    type: CLEAR_RECOMMENDED_PROFILES,
});

export const profilesError = () => ({
    type: PROFILES_ERROR,
});

export const profilesLoading = () => ({
    type: PROFILES_LOADING,
});

export const moreProfilesLoading = () => ({
    type: MORE_PROFILES_LOADING,
});

export const profilesLoaded = payload => ({
    type: PROFILES_FETCH_SUCCESS,
    payload,
});

export const recommendedProfilesLoaded = payload => ({
    type: RECOMMENDED_PROFILES_FETCH_SUCCESS,
    payload,
});

export const moreProfilesLoaded = payload => ({
    type: MORE_PROFILES_FETCH_SUCCESS,
    payload,
});

export const searchConstantsLoaded = payload => ({
    type: SEARCH_CONSTANTS_FETCH_SUCCESS,
    payload,
});
