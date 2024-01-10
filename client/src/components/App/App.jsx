import React from 'react';
import { useLoadUser, useToast } from 'shared/hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './ThemeProvider';
import Routes from './Routes';
import GlobalStyles from './Global.style';
import NormalizeStyles from './Normalize.style';

const App = () => {
    useLoadUser();
    useToast();
    return (
        <ThemeProvider>
            <NormalizeStyles />
            <GlobalStyles />
            <Router>
                <Routes />
            </Router>
        </ThemeProvider>
    );
};

export default App;
