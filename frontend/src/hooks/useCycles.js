import { useState, useEffect } from "react";
import { cycleApi } from "../services/api";

export const useCycles = () => {
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCycles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cycleApi.getAll();
      setCycles(data);
    } catch (err) {
      setError(err.message || "Failed to fetch cycles");
      console.error("Error fetching cycles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCycles();
  }, []);

  const refetch = () => {
    fetchCycles();
  };

  return {
    cycles,
    loading,
    error,
    refetch,
  };
};

export const useCycle = (id) => {
  const [cycle, setCycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCycle = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await cycleApi.getById(id);
        setCycle(data);
      } catch (err) {
        setError(err.message || "Failed to fetch cycle");
        console.error("Error fetching cycle:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCycle();
  }, [id]);

  return {
    cycle,
    loading,
    error,
  };
};
