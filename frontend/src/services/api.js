const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE = `${API_BASE_URL}/api/cycles`;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      // Try to parse response as JSON for error details
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // If response is not JSON (like HTML error page), use status text
      errorMessage = `Failed to fetch cycles`;
    }

    throw new ApiError(errorMessage, response.status);
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.indexOf("application/json") !== -1) {
    try {
      return await response.json();
    } catch {
      throw new ApiError("Invalid JSON response from server", 422);
    }
  } else {
    // If response is not JSON (like HTML), throw appropriate error
    throw new ApiError("Server returned invalid response format", 422);
  }
};

export const cycleApi = {
  // Get all cycles
  async getAll() {
    try {
      const response = await fetch(API_BASE);
      const cycles = await handleResponse(response);

      // Transform backend data to frontend format
      return cycles.map((cycle) => ({
        id: cycle.id || cycle._id,
        name: cycle.title,
        price: cycle.cost,
        image: cycle.imageUrl,
        description: cycle.description,
      }));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network error: Unable to fetch cycles", 0);
    }
  },

  // Get cycle by ID
  async getById(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`);
      const cycle = await handleResponse(response);

      // Transform backend data to frontend format
      return {
        id: cycle.id || cycle._id,
        name: cycle.title,
        price: cycle.cost,
        image: cycle.imageUrl,
        description: cycle.description,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network error: Unable to fetch cycle", 0);
    }
  },
};

export default cycleApi;
