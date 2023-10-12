"use client";
import React from "react";
import styles from "./Form.module.scss";

interface LongTextBoxProps {
  name: string;
  value?: string;
  placeholder?: string;
  rows: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function LongTextBox({
  name,
  value,
  placeholder,
  rows,
  onChange,
}: LongTextBoxProps) {
  return (
    <textarea
      className={styles.input_box}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      rows={rows}
    />
  );
}
