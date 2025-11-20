import { useState } from "react";
import ManageUsers from "../components/admin/ManageUsers";
import AddArticle from "../components/admin/AddArticle";
import ManageArticles from "../components/admin/ManageArticles";
import AnalyticsDashboard from "../components/admin/AnalyticsDashboard";

export default function AdminDashboard() {
  const [tab, setTab] = useState("users");

  return (
    <div className="min-h-screen px-6 py-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        <button
          className={`px-4 py-2 rounded ${
            tab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("users")}
        >
          Manage Users
        </button>

        <button
          className={`px-4 py-2 rounded ${
            tab === "articles" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("articles")}
        >
          Manage Articles
        </button>

        <button
          className={`px-4 py-2 rounded ${
            tab === "add-article" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("add-article")}
        >
          Add Article
        </button>

        <button
          className={`px-4 py-2 rounded ${
            tab === "analytics" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      {tab === "users" && <ManageUsers />}
      {tab === "articles" && <ManageArticles />}
      {tab === "add-article" && <AddArticle />}
      {tab === "analytics" && <AnalyticsDashboard />}
    </div>
  );
}
