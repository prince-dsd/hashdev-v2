import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { uniqueId } from 'lodash';
import { Form, InputDebounced, Button } from 'shared/components';
import {
    fetchProfiles,
    fetchSearchConstants,
    selectAllSkills,
    fetchMoreProfiles,
    selectIsMoreProfilesLoading,
    selectIsNoMoreProfiles,
    selectNumberOfProfiles,
    selectIsProfilesLoading,
    selectAllDesiredRoles,
} from 'redux/profiles';
import { selectUserId, selectIsAuthenticated } from 'redux/auth';
import * as utils from 'shared/utils';
import { formConstants } from 'shared/constants';
import * as S from './ProfilesForm.styles';

const propTypes = {
    children: PropTypes.node.isRequired,
    fetchProfiles: PropTypes.func.isRequired,
    currentUserId: PropTypes.string,
    fetchMoreProfiles: PropTypes.func.isRequired,
    fetchSearchConstants: PropTypes.func.isRequired,
    allSkills: PropTypes.array.isRequired,
    allDesiredRoles: PropTypes.array.isRequired,
    isMoreProfilesLoading: PropTypes.bool.isRequired,
    isNoMoreProfiles: PropTypes.bool.isRequired,
    numberOfProfiles: PropTypes.number.isRequired,
    isProfilesLoading: PropTypes.bool.isRequired,
    isFirstRender: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const defaultProps = {
    currentUserId: undefined,
};



const ProfilesForm = ({
    fetchProfiles,
    fetchSearchConstants,
    allSkills,
    isMoreProfilesLoading,
    fetchMoreProfiles,
    children,
    isNoMoreProfiles,
    numberOfProfiles,
    isProfilesLoading,
    isFirstRender,
    currentUserId,
    isAuthenticated,
    allDesiredRoles,
}) => {
    const history = useHistory();
    const { search: queryString, pathname } = useLocation();
    const { queryStringToObject, objectToQueryString } = utils.url;
    const queryStringObj = queryStringToObject(queryString);

    const [pageValue, setPageValue] = useState(1);
    const [nameValue, setNameValue] = useState(queryStringObj.name || '');
    const [companyValue, setCompanyValue] = useState(queryStringObj.company || '');
    const [currentPositionValue, setCurrentPositionValue] = useState(
        queryStringObj.current_position || '',
    );

    const limit = 6;
    const nameId = uniqueId('form-field-');
    const companyId = uniqueId('form-field-');
    const currentPositionId = uniqueId('form-field-');

    const getInitialProfiles = () => {
        fetchProfiles({
            page: pageValue,
            [`name[regex]`]: nameValue,
            [`company[regex]`]: companyValue,
            [`current_position[regex]`]: currentPositionValue,
            [`availability[allregex]`]: queryStringObj.availability,
            [`skills[allregex]`]: queryStringObj.skills,
            [`role_types[allregex]`]: queryStringObj.role_types,
            [`desired_roles[allregex]`]: queryStringObj.desired_roles,
            sort: queryStringObj.sort || '-total_stars',
            [`stars[in]`]: queryStringObj.starred_by_me === 'true' ? currentUserId : null,
            [`watchers[in]`]: queryStringObj.watched_by_me === 'true' ? currentUserId : null,
            limit: limit,
            active: true,
        });
    };

    useEffect(() => {
        getInitialProfiles();
        if (allSkills.length === 0 || allDesiredRoles.length === 0) fetchSearchConstants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initialValues = {
        name: nameValue,
        company: companyValue,
        current_position: currentPositionValue,
        availability: queryStringObj.availability ? [queryStringObj.availability].flat() : [],
        skills: queryStringObj.skills ? [queryStringObj.skills].flat() : [],
        role_types: queryStringObj.role_types ? [queryStringObj.role_types].flat() : [],
        desired_roles: queryStringObj.desired_roles ? [queryStringObj.desired_roles].flat() : [],
        sort: queryStringObj.sort || '-total_stars',
        starred_by_me: queryStringObj.starred_by_me === 'true',
        watched_by_me: queryStringObj.watched_by_me === 'true',
    };

    return (
        <S.ProfilesFormContainer>
            <Form
                initialValues={initialValues}
                onSubmit={values => {
                    history.push(
                        `${pathname}?${objectToQueryString({
                            name: nameValue,
                            company: companyValue,
                            current_position: currentPositionValue,
                            availability: values.availability,
                            skills: values.skills,
                            role_types: values.role_types,
                            desired_roles: values.desired_roles,
                            starred_by_me: values.starred_by_me,
                            watched_by_me: values.watched_by_me,
                            sort: values.sort,
                        })}`,
                    );
                    const queryObj = {
                        page: pageValue,
                        [`name[regex]`]: nameValue,
                        [`company[regex]`]: companyValue,
                        [`current_position[regex]`]: currentPositionValue,
                        [`availability[allregex]`]: values.availability,
                        [`skills[allregex]`]: values.skills,
                        [`role_types[allregex]`]: values.role_types,
                        [`desired_roles[allregex]`]: values.desired_roles,
                        [`sort`]: values.sort,
                        [`stars[in]`]: values.starred_by_me ? currentUserId : null,
                        [`watchers[in]`]: values.watched_by_me ? currentUserId : null,
                        limit: limit,
                    };

                    if (pageValue === 1) {
                        fetchProfiles(queryObj);
                    } else {
                        fetchMoreProfiles(queryObj);
                    }
                }}>
                {form => (
                    <Form.Element>
                        <S.FormFieldContainer>
                            <Form.Field.Select
                                label="Availability"
                                isMulti
                                valuePlaceholder="Add availability"
                                name="availability"
                                variant="empty"
                                submitOnChange
                                customOnChange={() => setPageValue(1)}
                                options={formConstants.availability.map(type => ({
                                    label: type,
                                    value: type,
                                }))}
                            />
                            <Form.Field.Select
                                label="Role types"
                                isMulti
                                valuePlaceholder="Add role type"
                                name="role_types"
                                variant="empty"
                                submitOnChange
                                customOnChange={() => setPageValue(1)}
                                options={formConstants.roleTypes.map(type => ({
                                    label: type,
                                    value: type,
                                }))}
                            />
                            <Form.Field.Select
                                label="Desired roles"
                                isMulti
                                valuePlaceholder="Add desired role"
                                name="desired_roles"
                                variant="empty"
                                submitOnChange
                                customOnChange={() => setPageValue(1)}
                                options={
                                    allDesiredRoles.length > 0
                                        ? allDesiredRoles.map(skill => ({
                                              label: skill,
                                              value: skill,
                                          }))
                                        : []
                                }
                            />
                            <Form.Field.Select
                                label="Skills"
                                valuePlaceholder="Add skill"
                                allowNonExistentOptions
                                submitOnChange
                                name="skills"
                                variant="empty"
                                isMulti
                                customOnChange={() => setPageValue(1)}
                                options={
                                    allSkills.length > 0
                                        ? allSkills.map(skill => ({ label: skill, value: skill }))
                                        : []
                                }
                            />
                        </S.FormFieldContainer>
                        <S.CheckboxContainer>
                            <Form.Field.Checkbox
                                disabled={!isAuthenticated}
                                submitOnChange
                                type="checkbox"
                                label="Starred by me"
                                name="starred_by_me"
                            />
                            <Form.Field.Checkbox
                                disabled={!isAuthenticated}
                                submitOnChange
                                type="checkbox"
                                label="Watched by me"
                                name="watched_by_me"
                            />
                        </S.CheckboxContainer>
                        <Form.Flex>
                            <S.SortBy
                                removeSelected={false}
                                submitOnChange
                                name="sort"
                                withInput={false}
                                customOnChange={() => setPageValue(1)}
                                renderValuePlaceholder
                                valuePlaceholder="Sort By"
                                options={[
                                    { label: 'Name', value: 'name' },
                                    { label: 'Total stars', value: '-total_stars' },
                                    { label: 'Total watchers', value: '-total_watchers' },
                                    { label: 'Date joined', value: '-created_at' },
                                ]}
                            />
                            <S.SortByDivider />
                            <Button
                                backgroundColor="background2"
                                type="button"
                                onClick={() => {
                                    history.push(pathname);
                                    setPageValue(1);
                                    setNameValue('');
                                    setCompanyValue('');
                                    setCurrentPositionValue('');
                                    form.resetForm({
                                        values: {
                                            ...initialValues,
                                            skills: [],
                                            availability: [],
                                            role_types: [],
                                            desired_roles: [],
                                            sort: '-total_stars',
                                            starred_by_me: false,
                                            watched_by_me: false,
                                        },
                                    });
                                    fetchProfiles({
                                        page: 1,
                                        sort: '-total_stars',
                                        limit: limit,
                                        active: true,
                                    });
                                }}>
                                Clear
                            </Button>
                        </Form.Flex>
                        {children}
                        {!isFirstRender && !isProfilesLoading && (
                            <Form.Buttons
                                align="center"
                                withSubmit={false}
                                customButtons={
                                    <Button
                                        backgroundColor="background2"
                                        disabled={isNoMoreProfiles || numberOfProfiles === 0}
                                        isWorking={isMoreProfilesLoading}
                                        onClick={() => {
                                            setPageValue(pageValue + 1);
                                            form.submitForm();
                                        }}>
                                        {numberOfProfiles === 0
                                            ? ' No profiles found'
                                            : isNoMoreProfiles
                                            ? 'No more profiles'
                                            : 'Load More'}
                                    </Button>
                                }
                            />
                        )}
                    </Form.Element>
                )}
            </Form>
        </S.ProfilesFormContainer>
    );
};

ProfilesForm.propTypes = propTypes;
ProfilesForm.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
    allSkills: selectAllSkills,
    allDesiredRoles: selectAllDesiredRoles,
    isMoreProfilesLoading: selectIsMoreProfilesLoading,
    isNoMoreProfiles: selectIsNoMoreProfiles,
    numberOfProfiles: selectNumberOfProfiles,
    isProfilesLoading: selectIsProfilesLoading,
    currentUserId: selectUserId,
    isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
    fetchProfiles,
    fetchMoreProfiles,
    fetchSearchConstants,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesForm);
