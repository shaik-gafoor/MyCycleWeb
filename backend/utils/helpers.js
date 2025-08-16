// Utility functions for the backend

/**
 * Convert Google Drive share URL to direct image URL
 * @param {string} url - Google Drive share URL
 * @returns {string} - Direct image URL
 */
const convertGoogleDriveUrl = (url) => {
  if (!url || typeof url !== "string") return url;

  // Check if it's a Google Drive URL
  if (url.includes("drive.google.com")) {
    // Extract file ID from different Google Drive URL formats
    let fileId = null;

    // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const match1 = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match1) {
      fileId = match1[1];
    }

    // Format: https://drive.google.com/open?id=FILE_ID
    const match2 = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (match2) {
      fileId = match2[1];
    }

    // If we found a file ID, convert to direct URL
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }

  // Return original URL if not a Google Drive URL or couldn't extract ID
  return url;
};

/**
 * Validate cycle data
 * @param {Object} data - Cycle data to validate
 * @returns {Array} - Array of validation errors
 */
const validateCycleData = (data) => {
  const errors = [];

  if (!data.imageUrl || typeof data.imageUrl !== "string") {
    errors.push("imageUrl is required and must be a string");
  }

  if (!data.title || typeof data.title !== "string") {
    errors.push("title is required and must be a string");
  }

  if (!data.description || typeof data.description !== "string") {
    errors.push("description is required and must be a string");
  }

  if (!data.cost || typeof data.cost !== "number" || data.cost <= 0) {
    errors.push("cost is required and must be a positive number");
  }

  return errors;
};

module.exports = {
  convertGoogleDriveUrl,
  validateCycleData,
};
