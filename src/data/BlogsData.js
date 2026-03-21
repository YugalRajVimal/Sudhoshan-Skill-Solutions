import axios from "axios";

// Returns a Promise that resolves to the blogs data fetched from API
export const fetchBlogs = async () => {
  const API_URL = process.env.REACT_APP_API_URL || '';
  try {
    const response = await axios.get(`${API_URL}/api/blogs`);
    // Assumes backend sends an array of blogs in response.data
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    // Optionally throw or return empty array:
    throw error;
    // return [];
  }
};