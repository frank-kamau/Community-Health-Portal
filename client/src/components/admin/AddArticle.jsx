import { useState } from "react";
import { addArticle } from "../../services/api";
import toast from "react-hot-toast";

export default function AddArticle() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    imageUrl: "",
    body: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.body)
      return toast.error("Title and body are required");

    try {
      await addArticle(form);
      toast.success("Article added successfully!");
    } catch (err) {
      toast.error("Failed to add article");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add New Article</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="body"
          placeholder="Article body..."
          className="w-full border p-2 rounded h-40"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Publish Article
        </button>
      </form>
    </div>
  );
}
