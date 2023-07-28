/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Callback from '../pages/Callback';
import Logout from '../pages/Logout';
import Authorized from '../pages/Authorized';
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import authConfig from '../configs/authConfig';
import { useEffect } from 'react';

const MainRouter = (props: any) => {

    const userManager = new UserManager({
        userStore: new WebStorageStateStore({ store: window.localStorage }),
        loadUserInfo: true,
        ...authConfig,
    });

    useEffect(() => {
        userManager.getUser().then((user) => {
            if (!user) {
                clearAuth();
            }
        });
    },[])

    function authorize() {
        userManager.signinRedirect();
    }

    function clearAuth() {
        userManager.signoutRedirect();
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <SignIn handleLogin={authorize} userManager={userManager} />
                    }
                />

                <Route
                    path="/auth/callback"
                    element={
                        <Callback userManager={userManager} />
                    }
                />

                <Route
                    path="/logout"
                    element={
                        <Logout userManager={userManager} />
                    }
                />

                <Route
                    path="/authorized"
                    element={
                        <Authorized handleLogout={clearAuth} userManager={userManager} />
                    }
                />

                <Route path="*" element={<>Nothing Here</>} />
            </Routes>
        </BrowserRouter>
    );
};
export default MainRouter;
