import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { signIn } from 'redux/auth';
import { SignUp } from 'components';
import Image from 'react-image';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectIsAuthenticated, selectUserUsername } from 'redux/auth';
import { setAlert } from 'redux/alerts';
import { Main } from 'shared/components';
import { toastTypes } from 'shared/constants';
import landing from 'assets/img/home/landing.jpg';
import * as S from './Home.styles';

const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    username: PropTypes.string,
};

const defaultProps = {
    username: undefined,
};

const Home = ({ isAuthenticated, username, signIn, setAlert }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(setIsMounted(true), 500);
    }, []);

    if (isAuthenticated) return <Redirect to={username ? `/profile/${username}` : '/profile'} />;

    const popularSearches = [
        'JavaScript',
        'CSS',
        'React',
        'Node.js',
        'SQL',
        'MongoDB',
        'Bootstrap',
        'C#',
        'PHP',
        'WordPress',
        'Docker',
        'Git',
        'Python',
        'Laravel',
    ];

    return (
        <>
            <Helmet>
                <title>Welcome to HashDev</title>
            </Helmet>
            <S.BackgroundImageContainer>
                <S.BackgroundImage />
            </S.BackgroundImageContainer>
            <Main>
                <S.LandingContent>
                    <S.ContentLeft isMounted={isMounted}>
                        <h1>Where developers gather To build</h1>
                        <p>
                            HashDev is the awesome place to connect with developers and
                            take your knowledge in development to the next level.
                        </p>
                        <S.ButtonsContainer>
                            <S.StyledLink
                                to="/developers"
                                variant="primary-darken"
                                backgroundColor="cyan"
                                color="white1">
                                Find Developers
                            </S.StyledLink>
                            <S.StyledButton
                                onClick={() => {
                                    signIn({
                                        login: 'guest',
                                        password: 'password123/',
                                    });
                                    setAlert(
                                        'You are now signed in as a guest. You are currently unable to edit this profile or account.',
                                        toastTypes.INFO,
                                        8000,
                                    );
                                }}
                                variant="bordered-inset"
                                color="white1"
                                borderColor="white1"
                                backgroundColor="white1">
                                Sign In As A Guest
                            </S.StyledButton>
                        </S.ButtonsContainer>
                    </S.ContentLeft>
                    <S.LandingImageContainer isMounted={isMounted}>
                        <S.SignUpContainer>
                            <SignUp />
                        </S.SignUpContainer>
                    </S.LandingImageContainer>
                </S.LandingContent>
               
            </Main>
        </>
    );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
    username: selectUserUsername,
});


export default connect(mapStateToProps, { signIn, setAlert })(Home);
