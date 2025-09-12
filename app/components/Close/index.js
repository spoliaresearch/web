"use client";

import Link from "next/link";
import styles from "./Close.module.css";
import DissolveImage from "../DissolveImage";

export default function Close({ to = "/", className = "" }) {
  return (
    <Link href={to} className={`${styles.closeButton} ${className}`}>
      <div className={styles.icon}>
        <DissolveImage name="arrow-left" fill="black" width={20} height={20} />
      </div>
    </Link>
  );
}
