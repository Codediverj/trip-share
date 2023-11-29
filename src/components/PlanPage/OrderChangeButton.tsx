import Image from "next/image";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";

function OrderChangeButton({ data }: { data: DayPlanDataStore[number] }) {
  return (
    <div className="order_change_wrap">
      <button className="top_button">
        <Image src="/order-up.svg" alt="edit icon" width="20" height="20" className="edit_icon" />
      </button>
      <button className="bottom_button">
        <Image
          src="/order-down.svg"
          alt="delete icon"
          width="20"
          height="20"
          className="delete_icon"
        />
      </button>
    </div>
  );
}

export default OrderChangeButton;
