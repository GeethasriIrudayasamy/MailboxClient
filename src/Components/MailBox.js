import MailHeader from "./MailHeader";
import Buttons from "./Button";
import classes from "./MailBox.module.css";
import MailList from "./MailList";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const MailBox = () => {
    const mails = useSelector((state) => state.mail.mails);

    const mailList = mails.map((mail) => (
        <MailList
            key={mail.id}
            subject={mail.subject}
            to={mail.to}
            id={mail.id}
            message={mail.message}
            isRead={mail.isRead}
        />
    ));
    return (
        <Fragment>
            <MailHeader />
            <div className={classes.main}>
                <div className={classes.buttons}>
                    <Buttons />
                </div>
                <div className={classes.list}>{mailList}</div>
            </div>
        </Fragment>
    );
};

export default MailBox;