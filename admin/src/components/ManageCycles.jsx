import React, { useState } from "react";
import { Settings, Edit3, Trash2, Save, X } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const ManageCycles = ({ cycles, loading, onUpdate, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    imageUrl: "",
    title: "",
    description: "",
    cost: "",
  });

  const handleEdit = (cycle) => {
    setEditId(cycle.id);
    setEditForm({
      imageUrl: cycle.imageUrl,
      title: cycle.title,
      description: cycle.description,
      cost: cycle.cost,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    if (!id) {
      console.warn("Attempted to update cycle with undefined id");
      alert("Error: Cycle ID is missing. Please refresh the page.");
      return;
    }
    const success = await onUpdate(id, {
      imageUrl: editForm.imageUrl,
      title: editForm.title,
      description: editForm.description,
      cost: Number(editForm.cost),
    });
    if (success) {
      setEditId(null);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.warn("Attempted to delete cycle with undefined id");
      alert("Error: Cycle ID is missing. Please refresh the page.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this cycle?")) {
      await onDelete(id);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Update/Delete Cycles
      </h2>

      <div className="space-y-4">
        {cycles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Settings className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500 text-lg">No cycles found to manage.</p>
          </div>
        ) : (
          cycles.map((cycle, idx) => (
            <div
              key={cycle.id || idx}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              {editId === cycle.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="imageUrl"
                        value={editForm.imageUrl}
                        onChange={handleEditChange}
                        placeholder="Image Drive URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        placeholder="Cycle Title/Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        placeholder="Description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost (₹)
                      </label>
                      <input
                        type="number"
                        name="cost"
                        value={editForm.cost}
                        onChange={handleEditChange}
                        placeholder="Cost"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditSave(cycle.id)}
                      disabled={loading}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <img
                    src={cycle.imageUrl}
                    alt={cycle.title}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      if (e.target.src !== "/no-image.png") {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = "/no-image.png"; // Use a local fallback image
                      }
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {cycle.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {cycle.description}
                    </p>
                    <div className="text-lg font-bold text-green-600">
                      ₹{cycle.cost}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cycle)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cycle.id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageCycles;
