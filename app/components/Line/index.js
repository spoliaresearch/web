import styles from "./Line.module.css";

export default function Line({ className = "", style = {}, ...props }) {
  return <div className={`${styles.line} ${className}`.trim()} style={style} {...props} />;
}
