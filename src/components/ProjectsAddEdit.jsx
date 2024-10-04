import { useState, useEffect } from "react"; 

/**
 * ProjectsAddEdit component for adding or editing a project.
 *
 * @param {function} onSaveProject - Callback function to handle saving the project.
 * @param {object} project - Project object to edit, or null for a new project.
 * @returns {JSX.Element} The rendered component.
 */
const ProjectsAddEdit = ({ onSaveProject, project: targetProject }) => {
  // Initialize state hooks
  const [title, setTitle] = useState(''); // Project title
  const [description, setDescription] = useState(''); // Project description
  const [instructions, setInstructions] = useState(''); // Project instructions
  const [initialClue, setInitialClue] = useState(''); // Initial clue for participants
  const [display, setDisplay] = useState('0'); // Homescreen display option (default 0)
  const [scoring, setScoring] = useState('0'); // Participant scoring option (default 0)
  const [published, setPublished] = useState(false); // Publication status of the project

  // Re-render form if targetProject changes
  useEffect(() => {
    if (targetProject) {
      // Set state from targetProject fields
      setTitle(targetProject.title || ''); // Default to empty string if undefined
      setDescription(targetProject.description || '');
      setInstructions(targetProject.instructions || '');
      setInitialClue(targetProject.initial_clue || '');
      setDisplay(targetProject.homescreen_display || '0');
      setScoring(targetProject.participant_scoring || '0');
      setPublished(targetProject.is_published || false);
    } else {
      // Reset to default values if no targetProject
      clearInputs();
    }
  }, [targetProject]);

  /**
   * Clears the input fields to their default values.
   */
  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setInstructions('');
    setInitialClue('');
    setDisplay('0');
    setScoring('0');
    setPublished(false);
  };

  /**
   * Handles the form submission.
   *
   * @param {Event} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Create a new project object with form data
    const newProject = {
      title,
      description,
      instructions,
      initial_clue: initialClue,
      homescreen_display: display,
      is_published: published,
      participant_scoring: scoring,
    };
  
    // If editing an existing project, add its ID and username
    if (targetProject) {
      newProject.id = targetProject.id;
      newProject.username = targetProject.username;
    }
  
    try {
      // Call API to save project
      await onSaveProject(newProject);
      clearInputs(); // Clear inputs after saving
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  return (
    <div className="container p-5 text-dark">
      <h2 className="text-center mb-4">My Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)} // Update title state
            value={title}
            required // Make the title input required
          />
          <div className="form-text">The name of your project.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)} // Update description state
            value={description}
            required // Make the description input required
          />
          <div className="form-text">Describe your project. This is not shown to participants.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            onChange={(e) => setInstructions(e.target.value)} // Update instructions state
            value={instructions}
            required // Make the instructions input required
          />
          <div className="form-text">Give your participants some instructions for this project.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Initial Clue</label>
          <textarea
            className="form-control"
            onChange={(e) => setInitialClue(e.target.value)} // Update initial clue state
            value={initialClue}
          />
          <div className="form-text">Optional. Provide a small clue to help get participants started.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Homescreen Display</label>
          <select
            className="form-select"
            onChange={(e) => setDisplay(e.target.value)} // Update display state
            value={display}
          >
            <option value="0">Display initial clue</option>
            <option value="1">Display all locations</option>
          </select>
          <div className="form-text">Select what to display on the homescreen of the project.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Participant Scoring</label>
          <select
            className="form-select"
            onChange={(e) => setScoring(e.target.value)} // Update scoring state
            value={scoring}
          >
            <option value="0">Not Scored</option>
            <option value="1">Number of Scanned QR Codes</option>
            <option value="2">Number of Locations Entered</option>
          </select>
          <div className="form-text">Select how participants will be scored in this project.</div>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={(e) => setPublished(e.target.checked)} // Update published state
            checked={published}
          />
          <label className="form-check-label">Published</label>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Save Project</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectsAddEdit;
