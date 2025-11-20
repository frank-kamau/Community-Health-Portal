import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TopSymptomsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/analytics/top-symptoms");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching top symptoms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="w-24 text-sm font-medium">{item.name}</span>
            <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${(item.count / Math.max(...data.map(d => d.count))) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold w-8 text-right">{item.count}</span>
          </div>
        ))
      )}
    </div>
  );
}
