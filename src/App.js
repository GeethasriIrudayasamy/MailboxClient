import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Welcome from "./Components/Welcome";
import { authActions } from "./Store/AuthSlice";

function App() {
    const dispatch = useDispatch();
    dispatch(authActions.setIsAuth());
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    return (
        <Fragment>
            {!isAuth && <SignUp />}
            {!isAuth && (
                <Route path="/welcome">
                    <Redirect to="/" />
                </Route>
            )}
            {isAuth && <Redirect to="/welcome" />}

            <Route path="/welcome">
                <Welcome />
            </Route>
        </Fragment>
    );
}
export default App;
