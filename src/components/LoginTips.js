import styles from "./LoginTips.module.css";

export default function LoginTips() {
  return (
    <div className={styles.container}>
      <div>
        Here are some pre-configured users that can be used to test this site:
      </div>
      <div>
        Email: <span>user1@gmail.com</span> to <span>user6@gmail.com</span>
      </div>
      <div>
        Password: <span>password1</span> to <span>password6</span>
      </div>
    </div>
  );
}
