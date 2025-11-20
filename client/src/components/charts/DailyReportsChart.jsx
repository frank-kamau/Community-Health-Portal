import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DailyReportsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/analytics/daily-reports");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching daily reports:", err);
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
              className="w-full bg-blue-500 rounded-t"
              style={{ height: `${(item.count / Math.max(...data.map(d => d.count))) * 100}%` }}
            ></div>
            <span className="text-xs mt-2 text-gray-600">{item.date}</span>
          </div>
        ))
      )}
    </div>
  );
}
