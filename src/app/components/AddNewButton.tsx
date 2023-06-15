import React from "react";
import Image from "next/image";

function AddNewButton() {
  return (
    <div className="add_new_button">
      <Image src="/plus-square.svg" alt="plus icon" width="24" height="24" />
      Add New Plan
    </div>
  );
}

export default AddNewButton;
