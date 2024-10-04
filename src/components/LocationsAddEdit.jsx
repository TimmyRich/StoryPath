import { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'; // Importing ReactQuill styles
import WYSIWYGEditor from './WYSIWYGEditor';

/**
 * LocationsAddEdit component for adding or editing a location.
 * @param {Function} onSaveLocation - Function to handle saving the location data.
 * @param {Object} location - Optional location object for editing.
 * @param {string} projectId - ID of the project to which the location belongs.
 */
const LocationsAddEdit = ({ onSaveLocation, location, projectId }) => {
  // State hooks for managing form input values
  const [locationName, setLocationName] = useState(location ? location.location_name : '');
  const [locationTrigger, setLocationTrigger] = useState(location ? location.location_trigger : 'Location Entry');
  const [locationPosition, setLocationPosition] = useState(location ? location.location_position : '(27.4975,153.013276)');
  const [scorePoints, setScorePoints] = useState(location ? location.score_points : 5);
  const [clue, setClue] = useState(location ? location.clue : '');
  const [locationContent, setLocationContent] = useState(location ? location.location_content : '');

  // Update form fields when location prop changes
  useEffect(() => {
    if (location) {
      setLocationName(location.location_name || '');
      setLocationTrigger(location.location_trigger || 'Location Entry');
      setLocationPosition(location.location_position || '(27.4975,153.013276)');
      setScorePoints(location.score_points || 5);
      setClue(location.clue || '');
      setLocationContent(location.location_content || '');
    }
  }, [location]); // Run effect when location changes

  /**
   * Clears all input fields in the form.
   */
  const clearInputs = () => {
    setLocationName('');
    setLocationTrigger('Location Entry');
    setLocationPosition('(27.4975,153.013276)');
    setScorePoints(5);
    setClue('');
    setLocationContent('');
  };

  /**
   * Handles form submission.
   * @param {Object} e - The event object for the form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (onSaveLocation.name === "changeLocation") {
      // Prepare the new location object
      const newLocation = {
        location_name: locationName,
        location_trigger: locationTrigger,
        location_position: locationPosition,
        score_points: scorePoints,
        clue: clue,
        location_content: locationContent,
        project_id: projectId,
        id: location.id,
        username: location.username
      };
      onSaveLocation(newLocation); // Call the parent component's save function
    } else {
      // Prepare the edited location object
      const editedLocation = {
        location_name: locationName,
        location_trigger: locationTrigger,
        location_position: locationPosition,
        score_points: scorePoints,
        clue: clue,
        location_content: locationContent,
        project_id: projectId
      };
      onSaveLocation(editedLocation); // Call the parent component's save function
    }
    clearInputs(); // Clear input fields after submission
  };

  return (
    <div className="container p-5 text-dark">
      <h2 className="text-center mb-4">Project Location</h2>
      <form onSubmit={handleSubmit}>
        {/* Location Name Input */}
        <div className="mb-3">
          <label className="form-label">Location Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={locationName} 
            onChange={(e) => setLocationName(e.target.value)} 
            required 
          />
          <div className="form-text">The name of the location, required for submission.</div>
        </div>

        {/* Location Trigger Selection */}
        <div className="mb-3">
          <label className="form-label">Location Trigger</label>
          <select 
            className="form-select" 
            value={locationTrigger} 
            onChange={(e) => setLocationTrigger(e.target.value)} 
            required
          >
            <option value="Location Entry">Location Entry</option>
            <option value="QR Code Scan">QR Code Scan</option>
            <option value="Both Location Entry and QR Code Scan">Both Location Entry and QR Code Scan</option>
          </select>
          <div className="form-text">Select how this location&apos;s content will be triggered.</div>
        </div>

        {/* Location Position Input */}
        <div className="mb-3">
          <label className="form-label">Location Position</label>
          <input 
            type="text" 
            className="form-control" 
            value={locationPosition} 
            onChange={(e) => setLocationPosition(e.target.value)} 
            required
          />
          <div className="form-text">Enter the latitude and longitude for this location (e.g., (27.4975,153.013276)).</div>
        </div>

        {/* Score Points Input */}
        <div className="mb-3">
          <label className="form-label">Score Points</label>
          <input 
            type="number" 
            className="form-control" 
            value={scorePoints} 
            onChange={(e) => setScorePoints(e.target.value)} 
            required 
          />
          <div className="form-text">Specify the number of points participants earn by reaching this location, required for submission.</div>
        </div>

        {/* Clue Input */}
        <div className="mb-3">
          <label className="form-label">Clue</label>
          <textarea 
            className="form-control" 
            value={clue} 
            onChange={(e) => setClue(e.target.value)} 
          />
          <div className="form-text">Enter the clue that leads to the next location (optional).</div>
        </div>

        {/* WYSIWYG Editor for Location Content */}
        <div className="mb-3">
          <label className="form-label">Location Content</label>
          <WYSIWYGEditor content={locationContent} onChange={setLocationContent} />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Save Location</button>
        </div>
      </form>
    </div>
  );
};

export default LocationsAddEdit;
