import { useState, useEffect } from "react";

const ProjectsAddEdit = ({ onSaveProject, project: targetProject }) => {
  // Initialize state hooks
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [initialClue, setInitialClue] = useState('');
  const [display, setDisplay] = useState('0'); // Assuming 0 is the default
  const [scoring, setScoring] = useState('0'); // Assuming 0 is the default
  const [published, setPublished] = useState(false);

  // Re-render form if targetProject changes
  useEffect(() => {
    if (targetProject) {
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

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setInstructions('');
    setInitialClue('');
    setDisplay('0');
    setScoring('0');
    setPublished(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const newProject = {
      title,
      description,
      instructions,
      initial_clue: initialClue,
      homescreen_display: display,
      is_published: published,
      participant_scoring: scoring,
    };

    if (targetProject) {
      // If editing an existing project
      newProject.id = targetProject.id;
      newProject.username = targetProject.username;
    }

    // Call API to save project
    onSaveProject(newProject);
    clearInputs();
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <div className="form-text">The name of your project.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          <div className="form-text">Describe your project. This is not shown to participants.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
            required
          />
          <div className="form-text">Give your participants some instructions for this project.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Initial Clue</label>
          <textarea
            className="form-control"
            onChange={(e) => setInitialClue(e.target.value)}
            value={initialClue}
          />
          <div className="form-text">Optional. Provide a small clue to help get participants started.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Homescreen Display</label>
          <select
            className="form-select"
            onChange={(e) => setDisplay(e.target.value)}
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
            onChange={(e) => setScoring(e.target.value)}
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
            onChange={(e) => setPublished(e.target.checked)}
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
