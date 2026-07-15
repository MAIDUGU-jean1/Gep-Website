const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

/**
 * Fetches courses from the backend API
 * @returns {Promise<Array>} Array of course objects
 */
export const fetchCourses = async () => {
  try {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched courses:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

/**
 * Helper to assign a category to a course based on its title or other properties
 * Used as fallback if backend doesn't provide category
 * @param {Object} course - Course object
 * @returns {string} Category name
 */
export const getCourseCategory = (course) => {
  if (course.category) return course.category;

  // const title = course.title.toLowerCase();

  // if (title.includes("front-end") || title.includes("backend") || 
  //     title.includes("mobile") || title.includes("programming") ||
  //     title.includes("devops") || title.includes("software") ||
  //     title.includes("hardware") || title.includes("network") ||
  //     title.includes("cyber") || title.includes("ai") ||
  //     title.includes("data") || title.includes("cad") ||
  //     title.includes("topography") || title.includes("cartography")) {
  //   return "Tech";
  // }

  // if (title.includes("design") || title.includes("ui/ux") ||
  //     title.includes("graphic") || title.includes("ux") ||
  //     title.includes("wireframing") || title.includes("prototyping")) {
  //   return "Design";
  // }

  // if (title.includes("marketing") || title.includes("business") ||
  //     title.includes("management") || title.includes("project") ||
  //     title.includes("intelligence")) {
  //   return "Business";
  // }

  // if (title.includes("development") || title.includes("development")) {
  //   return "Development";
  // }

  // return "Tech"; // default category
};

/**
 * Derives unique categories from courses array
 * @param {Array} courses - Array of course objects
 * @returns {Array} Array of unique category names
 */
export const getCategoriesFromCourses = (courses) => {
  const categories = new Set();
  courses.forEach(course => {
    const category = getCourseCategory(course);
    if(category !== undefined && category !== null && category !== "All" && category !== "" && category !== "Other"){
      categories.add(category);
    }else{
      categories.add("Other");
    }
  });
  return ["All", ...Array.from(categories).filter(c => c !== "All")];
};

/**
 * Groups courses by category
 * @param {Array} courses - Array of course objects
 * @returns {Object} Object with category names as keys and arrays of course titles as values
 */
export const getCourseCategoriesMapping = (courses) => {
  const mapping = {};
  courses.forEach(course => {
    const category = getCourseCategory(course);
    if (!mapping[category]) {
      mapping[category] = [];
    }
    mapping[category].push(course.title);
  });
  return mapping;
};