"use client";
import React from "react";
import styles from "./Form.module.scss";

interface LongTextBoxProps {
  name: string;
  value?: string;
  placeholder?: string;
  rows: number;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function LongTextBox({
  name,
  value,
  placeholder,
  rows,
  errorMessage,
  onChange,
}: LongTextBoxProps) {
  return (
    <div className={styles.long_box_wrap}>
      <textarea
        className={`long_input_box ${errorMessage && errorMessage !== "" ? "error" : ""}`}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        rows={rows}
      />
      <div className="error_message">{errorMessage}</div>
    </div>
  );
}
