import styles from "./Button.module.css";

export default function Button({ children, disabled, type }) {
  let className = styles.button;
  if (disabled) className += ` ${styles.disabled}`;

  return (
    <button className={className} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
