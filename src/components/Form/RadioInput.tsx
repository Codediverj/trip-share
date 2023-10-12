"use client";
import React from "react";
import styles from "./Form.module.scss";
import Image from "next/image";

interface RadioInputProps {
  name: string;
  value?: string;
  labelText?: string;
  checked?: boolean;
  withImage?: boolean;
  imageSrc?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioInput({
  name,
  value,
  checked,
  labelText,
  withImage,
  imageSrc,
  onChange,
}: RadioInputProps) {
  return (
    <div className={`${withImage ? styles.radio_container_bg : styles.radio_container}`}>
      <input
        type="radio"
        className={styles.radio_input}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {withImage && (
        <Image src={imageSrc || "/profile_default_image.svg"} alt="image" width="20" height="20" />
      )}
      <label className={styles.radio_label}>{labelText}</label>
    </div>
  );
}
