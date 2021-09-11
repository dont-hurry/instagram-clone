import styles from "./InputRow.module.css";
import Row from "./Row";

export default function InputRow({ text, state, settingFunction }) {
  return (
    <Row>
      <div className={styles.textWrapper}>{text}</div>
      <input
        placeholder={text}
        value={state}
        onChange={({ target }) => settingFunction(target.value)}
        className={styles.input}
      />
    </Row>
  );
}
