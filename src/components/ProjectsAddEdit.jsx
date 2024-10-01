import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ProjectsAddEdit = ({ onSaveProject , project: targetProject}) => {

  // Re-render form if targetProject changes
  useEffect(() => {
    if (targetProject) {
      setTitle(targetProject.title);
      setDescription(targetProject.description);
      setInstructions(targetProject.instructions);
      setInitialClue(targetProject.initial_clue);
      setDisplay(targetProject.homescreen_display);
      setScoring(targetProject.participant_scoring);
      setPublished(targetProject.is_published);
    }
  }, [targetProject]);

// Check if targetProject is null, initalise empty project if true
  const [title, setTitle] = useState(targetProject ? targetProject.title : '');
  const [description, setDescription] = useState(targetProject ? targetProject.description : '');
  const [instructions, setInstructions] = useState(targetProject ? targetProject.instructions : '');
  const [initialClue, setInitialClue] = useState(targetProject ? targetProject.initial_clue : '');
  const [display, setDisplay] = useState(targetProject ? targetProject.homescreen_display : '0');
  const [scoring, setScoring] = useState(targetProject ? targetProject.participant_scoring : '0');
  const [published, setPublished] = useState(targetProject ? targetProject.is_published : false);

  console.log("Project Properties")
  console.table(display, scoring)
  console.log("\n")
  console.table(targetProject)
  

  /**
   * clearInputs
   * 
   * Sets the state hooks for the target project back to their default values.
   */
  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setInstructions('');
    setInitialClue('');
    setDisplay('0');
    setScoring('0');
    setPublished(false);
  }

  /**
   * handleSubmit
   * 
   * Function to handle functionality of submit button. 
   * 
   * @param {*} e Event sent from the submit button.
   * @returns None.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Trim inputs and check for empty fields
    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }
    if (!description.trim()) {
      alert("Description cannot be empty");
      return;
    }
    if (!instructions.trim()) {
      alert("Instructions cannot be empty");
      return;
    }

    if (onSaveProject.name === 'addProject') {

      //Create template of new project
      const displayVal = display;
      const scoringVal = scoring;
      const newProject = {
        title: title,
        description: description,
        instructions: instructions,
        initial_clue: initialClue,
        homescreen_display: displayVal,
        is_published: published,
        participant_scoring: scoringVal
      };
      
      // Make API call to add project to database
      onSaveProject(newProject);
    } else {
      //Create edited project
      const displayVal = display
      const scoringVal = scoring
      const editedProject = {
        title: title,
        description: description,
        instructions: instructions,
        initial_clue: initialClue,
        homescreen_display: displayVal,
        is_published: published,
        participant_scoring: scoringVal,
        id: targetProject.id,
        username: targetProject.username
      };

      // Make API call to edit project in our database
      onSaveProject(editedProject)
  }

    clearInputs()
  };

  return (
    <div className="container p-5 text-dark"> {/* Added text-dark class */}
      <h2 className="text-center mb-4">My Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
          <div className="form-text">The name of your project.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} />
          <div className="form-text">Describe your project. This is not shown to participants.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea className="form-control" onChange={(e) => setInstructions(e.target.value)} value={instructions} />
          <div className="form-text">Give your participants some instructions for this project.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Initial Clue</label>
          <textarea className="form-control" onChange={(e) => setInitialClue(e.target.value)} value={initialClue} />
          <div className="form-text">Optional. Provide a small clue to help get participants started.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Homescreen Display</label>
          <select className="form-select" onChange={(e) => setDisplay(e.target.value)} value={display}>
            <option value="Display initial clue">Display Initial Clue</option>
            <option value="Display all locations">Display All Locations</option>
          </select>
          <div className="form-text">Select what to display on the homescreen of the project.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Participant Scoring</label>
          <select className="form-select" onChange={(e) => setScoring(e.target.value)} value={scoring}>
            <option value="Not Scored">Not Scored</option>
            <option value="Number of Scanned QR Codes">Number of Scanned QR Codes</option>
            <option value="Number of Locations Entered">Number of Locations Entered</option>
          </select>
          <div className="form-text">Select how participants will be scored in this project.</div>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" onChange={(e) => setPublished(e.target.checked)} checked={published} />
          <label className="form-check-label">Published</label>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Project</button>
        </div>
      </form>
    </div>
  );
};

ProjectsAddEdit.propTypes = {
  onSaveProject: PropTypes.func.isRequired,
  project: PropTypes.any
};

export default ProjectsAddEdit;
