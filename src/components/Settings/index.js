import { useState } from "react";
import { doesUsernameExist, updateUserInfo } from "../../services/firebase";
import styles from "./index.module.css";
import Row from "./Row";
import Avatar from "../UI/Avatar";
import InputRow from "./InputRow";
import Message from "./Message";

export default function Settings({ userInfo, setUserInfo }) {
  const [fullName, setFullName] = useState(userInfo.fullName);
  const [username, setUsername] = useState(userInfo.username);
  const [bio, setBio] = useState(userInfo.bio);
  const [message, setMessage] = useState(null);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const isFormValid = fullName && username;

  let buttonClassName = styles.submitButton;
  if (isWaitingResponse || !isFormValid)
    buttonClassName += ` ${styles.disabledButton}`;

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsWaitingResponse(true);

    if (username !== userInfo.username) {
      const usernameExists = await doesUsernameExist(username);
      if (usernameExists) {
        showMessage(`This username isn't available. Please try another.`);
        setUsername(userInfo.username);
        setIsWaitingResponse(false);
        return;
      }
    }

    // Username can't be changed now. Otherwise the avatar image can't display
    // correctly.
    await updateUserInfo(userInfo.uid, { fullName, username, bio });
    setUserInfo((prevState) => ({ ...prevState, fullName, username, bio }));

    showMessage("Profile saved.");
    setIsWaitingResponse(false);
  };

  return (
    <div className={styles.outerContainer} onSubmit={handleSubmit}>
      <form className={styles.formWrapper}>
        <Row>
          <div>
            <Avatar username={userInfo.username} className={styles.avatar} />
          </div>
          <div className={styles.username}>{username}</div>
        </Row>
        <InputRow text="Name" state={fullName} settingFunction={setFullName} />
        <InputRow
          text="Username"
          state={username}
          settingFunction={setUsername}
        />
        <Row>
          <div>{/* To follow the grid format */}</div>
          <div className={styles.warning}>
            WARNING: Changing username will make the avatar image inoperative,
            because currently the file path of the avatar image is static.
          </div>
        </Row>
        <InputRow text="Bio" state={bio} settingFunction={setBio} />
        <Row>
          <div>{/* To follow the grid format */}</div>
          <div>
            <button className={buttonClassName}>Submit</button>
          </div>
        </Row>
      </form>

      <Message message={message} />
    </div>
  );
}
