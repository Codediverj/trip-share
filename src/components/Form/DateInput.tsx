"use client";
import React from "react";
import styles from "./Form.module.scss";

interface DateInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateInput({ name, value, onChange }: DateInputProps) {
  return (
    <div className={styles.date_input}>
      <input
        className={styles.input_box}
        type="date"
        placeholder="Select Date"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
