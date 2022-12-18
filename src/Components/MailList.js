import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../Store/MailSlice";
import { useHistory } from "react-router-dom";
import classes from "./MailList.module.css";
import { Fragment } from "react";

const MailList = (props) => {
    console.log(props);
    const userId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();
    const history = useHistory();
    const readMessageHandler = () => {
        axios
            .put(
                `https://mailbox-client-111111-default-rtdb.firebaseio.com/mails/${userId}inbox/${props.id}.json`,
                {
                    to: props.to,
                    subject: props.subject,
                    message: props.message,
                    isRead: true,
                }
            )

            .then((res) => {
                dispatch(
                    mailActions.updateMail({
                        id: props.id,
                        to: props.to,
                        subject: props.subject,
                        message: props.message,
                        isRead: true,
                    })
                );
            })
            .catch((err) => alert(err));
        history.push("./read-mail");
    };

    return (
        <Fragment>
            <div className={classes.list} onClick={readMessageHandler}>
                {!props.isRead && <div className={classes.circle} />}
                <div className={classes.to}>{props.to}</div>
                <div>{props.subject}</div>
            </div>
        </Fragment>
    );
};
export default MailList;
