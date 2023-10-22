"use client";
import React from "react";
import styles from "./Form.module.scss";
import { usePlanDataStore } from "@/contexts/planData/planData.provider";

interface DefaultTextExpenseProps {
  name: string;
  value: number;
  nextText?: string;
  placeholder?: string;
  isGroupActivity: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

export default function DefaultTextExpense({
  name,
  value,
  nextText,
  placeholder,
  isGroupActivity,
  onChange,
  onClick,
}: DefaultTextExpenseProps) {
  const planData = usePlanDataStore();

  return (
    <div
      className={`${isGroupActivity ? styles.group_total_expense : styles.personal_total_expense}`}
    >
      <span>{nextText}</span>
      <input
        className={`${
          isGroupActivity ? styles.group_total_expense_input : styles.personal_total_expense_input
        }`}
        type="number"
        placeholder={placeholder}
        name={name}
        value={value}
        onClick={onClick}
        onChange={onChange}
      />
      <span>{planData.currency}</span>
    </div>
  );
}
