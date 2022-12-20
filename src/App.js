import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ReadMail from "./Components/ReadMail";
import { mailActions } from "./Store/MailSlice";
import SignUp from "./Components/SignUp";
import ComposeMail from "./Components/ComposeMail";
import { authActions } from "./Store/AuthSlice";
import MailBox from "./Components/MailBox";

function App() {
    const dispatch = useDispatch();
    dispatch(authActions.setIsAuth());
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const userId = useSelector((state) => state.auth.userId);

    setInterval(() => {
        axios
            .get(
                `https://mailbox-client-111111-default-rtdb.firebaseio.com/mails/${userId}inbox.json`
            )
            .then((res) => {
                let datas = res.data;
                let mailArray = [];
                for (let id in datas) {
                    let mail = datas[id];
                    mail.id = id;
                    mailArray.push(mail);
                }
                dispatch(mailActions.addMail(mailArray));
            });
    }, 2000);
    return (
        <Fragment>
            {!isAuth && <SignUp />}
            {!isAuth && (
                <nav>
                    <Route path="/mail-box">
                        <Redirect to="/" />
                    </Route>
                    <Route path="/compose-mail">
                        <Redirect to="/" />
                    </Route>
                    <Route path="/read-mail">
                        <Redirect to="/" />
                    </Route>
                </nav>
            )}
            {isAuth && <Redirect to="/mail-box" />}

            <Route path="/mail-box">
                <MailBox />
            </Route>
            <Route path="/compose-mail">
                <ComposeMail />
            </Route>
            <Route path="/read-mail">
                <ReadMail />
            </Route>
        </Fragment>
    );
}
export default App;
