import React, { useState } from "react";
import { Plus } from "lucide-react";

const CreateCycle = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    imageUrl: "",
    title: "",
    description: "",
    cost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit({
      imageUrl: form.imageUrl,
      title: form.title,
      description: form.description,
      cost: Number(form.cost),
    });

    if (success) {
      setForm({
        imageUrl: "",
        title: "",
        description: "",
        cost: "",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Cycle
      </h2>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image Drive URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Enter image drive URL"
              value={form.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cycle Title/Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter cycle title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter cycle description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="cost"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cost (₹)
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              placeholder="Enter cost"
              value={form.cost}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5" />
            {loading ? "Creating..." : "Create Cycle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCycle;
