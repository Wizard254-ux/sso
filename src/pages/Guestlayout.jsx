import React, { createContext, useCallback, useContext } from 'react';
import { CssBaseline } from '@mui/material';
import AuthorizationProvider from '../hooks/Authorize';
import { Outlet } from 'react-router-dom';

const HeaderContext = createContext();

const Header = ({ children }) => {

    return (
            <AuthorizationProvider>
                <Outlet /> {/* Renders nested child routes */}
            </AuthorizationProvider>
    );
};

const useMessage = () => {
    const showMessage = useContext(HeaderContext)?.showMessage;

    const showSuccess = useCallback(
        function (msg) {
            showMessage({ success: msg });
        },
        [showMessage]
    );

    const showError = useCallback(
        function (msg) {
            Array.isArray(msg)
                ? msg.forEach(msg => showMessage({ error: msg }))
                : showMessage({ error: msg });
        },
        [showMessage]
    );

    const showResponse = useCallback(
        function (msg, action) {
            showMessage({ response: msg, action });
        },
        [showMessage]
    );

    return { showError, showSuccess, showResponse };
};

// const useEventEmitter = () => {
//     const eventEmitter = useContext(HeaderContext).eventEmitter;
//     return eventEmitter;
// };

export default Header;

export { useMessage, HeaderContext };
