// Base URL for the Storypath RESTful API
const API_BASE_URL = 'https://0b5ff8b0.uqcloud.net/api';

// JWT token for authorization, replace with your actual token from My Grades in Blackboard
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ2OTcyMjMifQ.WY-aa1eeTZyKbvbumazRbp5pYVsufZBSbCARklGoJ-g';

// Your UQ student username, used for row-level security to retrieve your records
const USERNAME = 's4697223';

/**
 * Helper function to handle API requests.
 * It sets the Authorization token and optionally includes the request body.
 * 
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} [method='GET'] - The HTTP method to use (GET, POST, PATCH).
 * @param {object} [body=null] - The request body to send, typically for POST or PATCH.
 * @returns {Promise<object>} - The JSON response from the API.
 * @throws Will throw an error if the HTTP response is not OK.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method, // Set the HTTP method (GET, POST, PATCH)
    headers: {
      'Content-Type': 'application/json', // Indicate that we are sending JSON data
      'Authorization': `Bearer ${JWT_TOKEN}` // Include the JWT token for authentication
    },
  };

  // If the method is POST or PATCH, we want the response to include the full representation
  if (method === 'POST' || method === 'PATCH') {
    options.headers['Prefer'] = 'return=representation';
  }

  // If a body is provided, add it to the request and include the username
  if (body) {
    options.body = JSON.stringify({ ...body, username: USERNAME });
  }

  // Make the API request and check if the response is OK
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // Return the response as a JSON object
  return response.json();
}

/**
 * Function to insert a new project into the database.
 * 
 * @param {object} project - The project data to insert.
 * @returns {Promise<object>} - The created project object returned by the API.
 */
export async function createProject(project) {
  return apiRequest('/project', 'POST', project);
}

/**
 * Function to list all projects associated with the current user.
 * 
 * @returns {Promise<Array>} - An array of project objects.
 */
export async function getProjects() {
  return apiRequest('/project');
}

/**
 * Function to get a single project by its ID.
 * The URL is slightly different from usual RESTful standards.
 * 
 * @param {string} id - The ID of the project to retrieve.
 * @returns {Promise<object>} - The project object matching the ID.
 */
export async function getProject(id) {
  return apiRequest(`/project?id=eq.${id}`);
}

/**
 * Function to delete a project by its ID.
 * 
 * @param {string} id - The ID of the project to delete.
 * @returns {Promise<void>} - A promise that resolves when the project is deleted.
 */
export async function deleteProject(id) {
  return apiRequest(`/project?id=eq.${id}`, 'DELETE');
}

/**
 * Function to update an existing project in the database.
 * 
 * @param {string} id - The ID of the project to update.
 * @param {object} project - The updated project data.
 * @returns {Promise<object>} - The updated project object returned by the API.
 */
export async function editProject(id, project) {
  return apiRequest(`/project?id=eq.${id}`, 'PATCH', project);
}

// Locations Section

/**
 * Function to insert a new location into the database.
 * 
 * @param {object} location - The location data to insert.
 * @returns {Promise<object>} - The created location object returned by the API.
 */
export async function createLocation(location) {
  return apiRequest('/location', 'POST', location);
}

/**
 * Function to list all locations associated with the current user or a specific project.
 * 
 * @param {string} [projectId=null] - Optional project ID to filter locations by project.
 * @returns {Promise<Array>} - An array of location objects.
 */
export async function getLocations(projectId = null) {
  const endpoint = projectId ? `/location?project_id=eq.${projectId}` : '/location';
  return apiRequest(endpoint);
}

/**
 * Function to get a single location by its ID.
 * 
 * @param {string} id - The ID of the location to retrieve.
 * @returns {Promise<object>} - The location object matching the ID.
 */
export async function getLocation(id) {
  return apiRequest(`/location?id=eq.${id}`);
}

/**
 * Function to delete a location by its ID.
 * 
 * @param {string} id - The ID of the location to delete.
 * @returns {Promise<void>} - A promise that resolves when the location is deleted.
 */
export async function deleteLocation(id) {
  return apiRequest(`/location?id=eq.${id}`, 'DELETE');
}

/**
 * Function to update an existing location in the database.
 * 
 * @param {string} id - The ID of the location to update.
 * @param {object} location - The updated location data.
 * @returns {Promise<object>} - The updated location object returned by the API.
 */
export async function editLocation(id, location) {
  return apiRequest(`/location?id=eq.${id}`, 'PATCH', location);
}

/**
 * Function to generate a location object given some input parameters.
 * 
 * @param {string} name - The name of the location.
 * @param {string} project_id - The ID of the associated project.
 * @param {string} [trigger="Location Entry"] - How the location is triggered by the app.
 * @returns {object} - The generated location object.
 */
export const generateLocation = (name, project_id, trigger = "Location Entry") => {
  return {
    project_id: project_id,
    location_name: name,
    location_trigger: trigger
  };
};

// Sort Locations by location_order. Should be called when setting locations.
/**
 * Function to sort two locations by their order.
 * 
 * @param {object} location1 - The first location to compare.
 * @param {object} location2 - The second location to compare.
 * @returns {number} - A negative value if location1 should come before location2,
 * a positive value if location1 should come after location2, or 0 if they are equal.
 */
export const locationSort = (location1, location2) => {
  return location1.location_order - location2.location_order;
};