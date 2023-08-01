//Component
import Expense from "../../../components/PlanPage/Expense";
import Moment from "../../../components/PlanPage/Moment";
import DayPlan from "../../../components/PlanPage/DayPlan";

export default function PlanPage({ activeTab }: { activeTab: number }) {
  return (
    <div className="tab-content">
      {activeTab === 0 && <DayPlan />}
      {activeTab === 1 && <Expense />}
      {activeTab === 2 && <Moment />}
    </div>
  );
}
