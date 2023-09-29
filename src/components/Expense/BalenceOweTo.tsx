import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { useExpenseDataStore } from "@/contexts/expenseData/expenseData.provider";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import ExpenseItem from "./ExpenseItem";

function BalenceOweTo() {
  const userData = useUserDataStore();
  const allExpenseData = useExpenseDataStore();
  const planContextData = usePlanDataStore();

  const groupAndPaidExpenses = allExpenseData.filter((data) => {
    return (
      data.isGroupActivity &&
      data.Single_Plan_Expense.length > 0 &&
      data.Single_Plan_Expense.every((expenseItem) => expenseItem.paidUser !== undefined)
    );
  });

  function makeList(selectedJoinUser: string, owe: number) {
    const filteredExpenses = groupAndPaidExpenses.filter((data) => {
      return data.Single_Plan_Expense.some((expenseItem) => {
        if (owe === 1) {
          return (
            expenseItem.paidUser?.paidUserId === selectedJoinUser &&
            expenseItem.attendedUser.attendedUserId === userData.userId &&
            !expenseItem.isPaidBack
          );
        }
        if (owe === 2) {
          return (
            expenseItem.paidUser?.paidUserId === userData.userId &&
            expenseItem.attendedUser.attendedUserId === selectedJoinUser &&
            !expenseItem.isPaidBack
          );
        }
      });
    });
    return filteredExpenses.map((data) => <ExpenseItem key={data.singlePlanId} data={data} />);
  }

  const changeGroupToPersonal = (selectedJoinUser: string) => {
    fetch("/api/expense", {
      method: "POST",
      body: JSON.stringify({
        singlePlanId: "??",
        planId: planContextData.planId,
        expense: 0,
      }),
    });
  };

  return (
    <>
      {/* 1. 타인이 Paid */}
      {planContextData.peopleJoin
        .filter((joinUser) => joinUser.userId !== userData.userId)
        .map((joinUser) => {
          const expenseList = makeList(joinUser.userId, 1);
          if (expenseList.length === 0) {
            return null;
          }
          return (
            <div className="owe_expense" key={joinUser.userId}>
              <h4 className="owe_expense_title">
                <span className="me">My</span>
                <span className="owe_span1">{`Balence owe to `}</span>
                {joinUser.nickname}
              </h4>
              <div className="owe_expense_con purple">
                <ul className="expense_list">{expenseList}</ul>
                <div className="send_money">
                  <p>Did you repay the money owed to {joinUser.nickname} ?</p>
                  <button onClick={() => changeGroupToPersonal(joinUser.userId)}>Yes, I did</button>
                </div>
              </div>
            </div>
          );
        })}

      {/* 2. 내가 Paid */}
      {planContextData.peopleJoin
        .filter((joinUser) => joinUser.userId !== userData.userId)
        .map((joinUser) => {
          const expenseList = makeList(joinUser.userId, 2);
          if (expenseList.length === 0) {
            return null;
          }
          return (
            <div className="owe_expense" key={joinUser.userId}>
              <h4 className="owe_expense_title">
                {joinUser.nickname}
                <span className="owe_span2">{`'s Balence owe to `}</span>
                <span className="me">Me</span>
              </h4>
              <div className="owe_expense_con">
                <ul className="expense_list">{makeList(joinUser.userId, 2)}</ul>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default BalenceOweTo;
