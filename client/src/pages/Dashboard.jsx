import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import Card from "../components/ui/Card";
import DailyReportsChart from "../components/charts/DailyReportsChart";
import SymptomTrendChart from "../components/charts/SymptomTrendChart";
import TopSymptomsChart from "../components/charts/TopSymptomsChart";

export default function Dashboard() {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/symptoms/my");
        setSymptoms(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome, {user?.email || "User"}!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Reports" value={symptoms.length} />
        <Card title="Active Reports" value={symptoms.filter(s => !s.resolved).length} />
        <Card title="Resolved Reports" value={symptoms.filter(s => s.resolved).length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Daily Reports</h2>
          <DailyReportsChart />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Symptom Trends</h2>
          <SymptomTrendChart />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Top Symptoms</h2>
        <TopSymptomsChart />
      </div>
    </div>
  );
}
