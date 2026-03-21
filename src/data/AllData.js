/**
 * Utility function to fetch all relevant data for the app in a single request.
 * This can be used to get blogs, jobs, partners, services, courses, etc. all at once
 * from the backend /api/all-data endpoint.
 *
 * Returns a promise that resolves to the full data object if successful.
 * On error, the promise rejects with the error object.
 */

export async function fetchAllData() {
  const API_URL = process.env.REACT_APP_API_URL || '';
  const endpoint = `${API_URL}/api/all-data`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      // Collect error info for better debugging
      const errText = await response.text();
      throw new Error(`Error fetching all-data (Status: ${response.status}): ${errText}`);
    }
    const data = await response.json();
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid response: expected an object.");
    }
    return data;
  } catch (err) {
    // Caller can catch this
    throw err;
  }
}