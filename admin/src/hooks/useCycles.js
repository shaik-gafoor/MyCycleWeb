import { useState, useEffect } from "react";
import { cycleApi } from "../services/api";
import toast from "react-hot-toast";

export const useCycles = () => {
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCycles = async () => {
    setLoading(true);
    try {
      const data = await cycleApi.getAll();
      setCycles(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch cycles");
    } finally {
      setLoading(false);
    }
  };

  const createCycle = async (cycleData) => {
    setLoading(true);
    try {
      await cycleApi.create(cycleData);
      toast.success("Cycle created successfully!");
      await fetchCycles(); // Refresh the list
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to create cycle");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCycle = async (id, cycleData) => {
    setLoading(true);
    try {
      await cycleApi.update(id, cycleData);
      toast.success("Cycle updated successfully!");
      await fetchCycles(); // Refresh the list
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to update cycle");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCycle = async (id) => {
    setLoading(true);
    try {
      await cycleApi.delete(id);
      toast.success("Cycle deleted successfully!");
      await fetchCycles(); // Refresh the list
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to delete cycle");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCycles();
  }, []);

  return {
    cycles,
    loading,
    createCycle,
    updateCycle,
    deleteCycle,
    refetch: fetchCycles,
  };
};
