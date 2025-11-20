import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SymptomTrendChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/analytics/symptom-trend");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching symptom trend:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="w-full h-64 flex items-end justify-around gap-2">
      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-green-500 rounded-t"
              style={{ height: `${(item.trend / Math.max(...data.map(d => d.trend))) * 100}%` }}
            ></div>
            <span className="text-xs mt-2 text-gray-600 text-center">{item.name}</span>
          </div>
        ))
      )}
    </div>
  );
}
