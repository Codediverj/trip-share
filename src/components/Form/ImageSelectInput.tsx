"use client";
import React from "react";
import styles from "./Form.module.scss";

interface ImageSelectInputProps {
  name: string;
  accept: string;
  errorMessage?: string;
  //value: File | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageSelectInput({
  name,
  accept,
  errorMessage,
  onChange,
}: ImageSelectInputProps) {
  return (
    <div className={styles.image_input}>
      <div className="find_input_box">
        <input
          className="input_box"
          type="file"
          placeholder="Select Image"
          name={name}
          accept={accept}
          onChange={onChange}
        />
        <button>Find Image</button>
      </div>
      <div className="error_message">{errorMessage}</div>
    </div>
  );
}
