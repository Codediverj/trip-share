"use client";
import React from "react";
import styles from "./Form.module.scss";

interface ImageSelectInputProps {
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageSelectInput({ name, value, onChange }: ImageSelectInputProps) {
  return (
    <div className={styles.find_input_box}>
      <input
        className={styles.input_box}
        type="text"
        placeholder="Select Image"
        name={name}
        value={value}
        onChange={onChange}
      />
      <button>Find Image</button>
    </div>
  );
}
