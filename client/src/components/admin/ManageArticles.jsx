import { useEffect, useState } from "react";
import { getArticles } from "../../services/api";
import toast from "react-hot-toast";

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((res) => setArticles(res.data))
      .catch(() => toast.error("Failed to load articles"));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((a) => (
          <div key={a._id} className="border rounded p-4 shadow-sm">
            <img src={a.imageUrl} alt="" className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{a.title}</h3>
            <p className="text-gray-600">{a.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
