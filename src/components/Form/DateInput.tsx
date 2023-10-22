"use client";
import React from "react";
import styles from "./Form.module.scss";

interface DateInputProps {
  name: string;
  value: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateInput({ name, value, errorMessage, onChange }: DateInputProps) {
  return (
    <div className={styles.date_input}>
      <input
        className={`input_box ${errorMessage !== "" ? "error" : ""}`}
        type="date"
        placeholder="Select Date"
        name={name}
        value={value}
        onChange={onChange}
      />
      <div className="error_message">{errorMessage}</div>
    </div>
  );
}
