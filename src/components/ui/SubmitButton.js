import styles from "./SubmitButton.module.css";

export default function SubmitButton({ disabled, children }) {
  let className = styles.button;
  if (disabled) className += ` ${styles.disabled}`;

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}
