"use client";
import React from "react";
import styles from "./Form.module.scss";

interface DefaultTextProps {
  name: string;
  value?: string;
  placeholder?: string;
  codeInput?: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DefaultText({
  name,
  value,
  placeholder,
  codeInput,
  disabled,
  onChange,
}: DefaultTextProps) {
  return (
    <input
      className={`${codeInput ? styles.input_box_code : styles.input_box}`}
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
