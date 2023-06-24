"use client";
import Image from "next/image";
import styles from "./plan.module.scss";
import { useState } from "react";

export default function Page({ activeTab }: { activeTab: number }) {
  const [activeSubTab, setActiveSubTab] = useState(0);

  const handleSubTabClick = (index: number) => {
    setActiveSubTab(index);
  };
  return (
    <div className="tab-content">
      {activeTab === 0 && (
        <div>
          <div className="sub-tab-menu">
            <button
              className={activeSubTab === 0 ? "active" : ""}
              onClick={() => handleSubTabClick(0)}
            >
              Day 1
            </button>
            <button
              className={activeSubTab === 1 ? "active" : ""}
              onClick={() => handleSubTabClick(1)}
            >
              Day 2
            </button>
            <button
              className={activeSubTab === 2 ? "active" : ""}
              onClick={() => handleSubTabClick(2)}
            >
              Day 3
            </button>
          </div>
          <div className="sub-tab-content">
            {activeSubTab === 0 && <p>Content for Day 1</p>}
            {activeSubTab === 1 && <p>Content for Day 2</p>}
            {activeSubTab === 2 && <p>Content for Day 3</p>}
          </div>
        </div>
      )}
      {activeTab === 1 && <p>Content for Tab 2</p>}
      {activeTab === 2 && <p>Content for Tab 3</p>}
    </div>
  );
}
