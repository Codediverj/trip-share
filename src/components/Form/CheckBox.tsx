"use client";
import React from "react";
import styles from "./Form.module.scss";
import Image from "next/image";

interface CheckBoxProps {
  text?: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({ text, checked, onChange }: CheckBoxProps) {
  return (
    <label className={`${styles.input_disable_checkbox} ${styles.checkbox_label}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox_input}
      />
      {text}
      <span className={`${styles.custom_checkbox} ${checked ? styles.clicked : ""}`}></span>
    </label>
  );
}
