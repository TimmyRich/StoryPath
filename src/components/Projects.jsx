import { useEffect, useState } from "react"; 
import ProjectsAddEdit from "./ProjectsAddEdit"; 
import { getProjects, createProject, deleteProject, editProject } from "./RESTful"; 
import { NavLink } from 'react-router-dom';

const Projects = () => {
  // State to hold the list of projects and the project to be edited
  const [projects, setProjects] = useState([]);
  const [targetProject, setTargetProject] = useState({});

  // Fetch all projects from the database and add them to the projects list
  useEffect(() => {
    const fetchProjects = async () => {
      const myProjects = await getProjects();
      setProjects(myProjects);
    };
    fetchProjects(); // Call the fetch function on component mount
  }, []);

  /**
   * Adds a new project to the API and updates the local projects list.
   * @param {Object} newProject - The project object to be added.
   */
  const addProject = async (newProject) => {
    try {
      const addedProject = await createProject(newProject);
      setProjects([...projects, addedProject[0]]); // Update the state with the newly added project
    } catch (error) {
      console.error('Error creating project', error);
    }
  };

  /**
   * Edits an existing project in the API and refreshes the local projects list.
   * @param {Object} targetProject - The project object containing updated information.
   */
  const changeProject = async (targetProject) => {
    try {
      await editProject(targetProject.id, targetProject); // Update the project in the API
      setProjects(await getProjects()); // Refresh the local projects list
      console.table(targetProject); // Log the target project for debugging
    } catch (error) {
      console.error('Error editing project', error);
    }
  };

  /**
   * Removes a project with the given project ID from the API and updates the local projects list.
   * @param {number} projectID - The ID of the project to be removed.
   */
  const removeProject = async (projectID) => {
    setProjects([...projects.filter(project => project.id !== projectID)]); // Update state to remove the project
    try {
      await deleteProject(projectID); // Delete the project from the API
    } catch (error) {
      console.error('Error removing project', error);
    }
  };

  return (
    <div className="container-fluid p-5 text-light" style={{ backgroundColor: '#1d1d1d' }}>
      <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>My Projects</h2>
      <ul className="list-group">
        {projects.map((project, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light mb-2 rounded">
            <div>
              <h5 className="mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{project.title}</h5>
              {project.is_published ? 
                <span className="badge bg-success ms-2">Published</span>
                : 
                <span className="badge bg-secondary ms-2">Unpublished</span>
              }
              <p className="mb-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>{project.description}</p>
            </div>
            <div className="btn-group" role="group" aria-label="Project actions">
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#ProjectsEdit" onClick={() => setTargetProject(project)}>Edit</button>
              <NavLink to={`/Locations/${project.id}`} type="button" className="btn btn-outline-success">Locations</NavLink>
              <button type="button" className="btn btn-outline-danger" onClick={() => removeProject(project.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#ProjectsAdd">
        Add Project
      </button>

      {/* Modal for adding a new project */}
      <div className="modal fade" id="ProjectsAdd" tabIndex="-1" aria-labelledby="ProjectsAddEditLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="ProjectsAddEditLabel">Project Add Form</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ProjectsAddEdit onSaveProject={addProject} project={null} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing an existing project */}
      <div className="modal fade" id="ProjectsEdit" tabIndex="-1" aria-labelledby="ProjectsAddEditLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="ProjectsAddEditLabel">Project Edit Form</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ProjectsAddEdit onSaveProject={changeProject} project={targetProject} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
