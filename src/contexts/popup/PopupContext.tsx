"use client";
import React, { createContext, useState, useContext } from "react";

interface PopupContextType {
  isPopupOpen: boolean;
  popupContent: React.ReactNode | null;
  openPopup: (content: React.ReactNode) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupContext must be used within a PopupContextProvider");
  }
  return context;
};

export const PopupContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<React.ReactNode | null>(null);

  const openPopup = (content: React.ReactNode) => {
    setIsPopupOpen(true);
    setPopupContent(content);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  const contextValue: PopupContextType = {
    isPopupOpen,
    popupContent,
    openPopup,
    closePopup,
  };

  return <PopupContext.Provider value={contextValue}>{children}</PopupContext.Provider>;
};
