import SymptomTrendChart from "../charts/SymptomTrendChart";
import TopSymptomsChart from "../charts/TopSymptomsChart";
import DailyReportsChart from "../charts/DailyReportsChart";

export default function AnalyticsDashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Health Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SymptomTrendChart />
        <TopSymptomsChart />
        <DailyReportsChart />
      </div>
    </div>
  );
}
