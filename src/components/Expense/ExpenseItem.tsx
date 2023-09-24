import Image from "next/image";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { usePopupContext } from "../../contexts/popup/PopupContext";
import EditSchedule from "../Popup/EditSchedule/EditSchedule";
import { formatDate } from "@/utils/formatDate.utils";
import { myExpense, ExpenseItemType as ExpenseItemType } from "@/utils/myExpense.utils";

function ExpenseItem({ data }: any) {
  const userData = useUserDataStore();
  const { openPopup } = usePopupContext();

  return (
    <li>
      <div className="expense_con">
        <h6>{data.placeFromName}</h6>
        <span>{formatDate(data.date)}</span>
      </div>
      <button className="expense_price" onClick={() => openPopup(<EditSchedule data={data} />)}>
        <span className="number">$ {myExpense(data.Single_Plan_Expense, userData.userId)}</span>
        <Image
          src="/expense_arrow_right.svg"
          alt="detail icon"
          width="18"
          height="18"
          className="detail"
        />
      </button>
    </li>
  );
}

export default ExpenseItem;
