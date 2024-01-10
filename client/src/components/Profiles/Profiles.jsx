import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { ProfilesItem, ProfilesForm } from 'components';
import { Main, Spinner } from 'shared/components';
import { useIsFirstRender } from 'shared/hooks';
import { selectAllProfiles, selectIsProfilesLoading } from 'redux/profiles';
import * as S from './Profiles.styles';

const propTypes = {
    profiles: PropTypes.array.isRequired,
    profilesIsLoading: PropTypes.bool.isRequired,
};

const defaultProps = {};



const Profiles = ({ profiles, profilesIsLoading }) => {
    const isFirstRender = useIsFirstRender();

    return (
        <>
            <Helmet>
                <title>HashDev | Developers</title>
            </Helmet>
            <Main>
                <ProfilesForm isFirstRender={isFirstRender}>
                    <S.ProfileItemsContainer>
                        {isFirstRender || profilesIsLoading ? (
                            <S.SpinnerContainer>
                                <Spinner />
                            </S.SpinnerContainer>
                        ) : (
                            <S.ProfileItemList>
                                {profiles.map(profile => (
                                    <ProfilesItem profile={profile} key={uuidv4()} />
                                ))}
                            </S.ProfileItemList>
                        )}
                    </S.ProfileItemsContainer>
                </ProfilesForm>
            </Main>
        </>
    );
};

Profiles.propTypes = propTypes;
Profiles.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
    profiles: selectAllProfiles,
    profilesIsLoading: selectIsProfilesLoading,
});

export default connect(mapStateToProps)(Profiles);