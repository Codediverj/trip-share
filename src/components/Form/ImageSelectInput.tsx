"use client";
import React from "react";
import styles from "./Form.module.scss";

interface ImageSelectInputProps {
  name: string;
  value?: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageSelectInput({
  name,
  value,
  errorMessage,
  onChange,
}: ImageSelectInputProps) {
  return (
    <div className={styles.image_input}>
      <div className="find_input_box">
        <input
          className="input_box"
          type="text"
          placeholder="Select Image"
          name={name}
          value={value}
          onChange={onChange}
        />
        <button>Find Image</button>
      </div>
      <div className="error_message">{errorMessage}</div>
    </div>
  );
}
