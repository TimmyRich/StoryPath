import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill'; // Assuming you're using ReactQuill for rich text editing
import 'react-quill/dist/quill.snow.css'; // Importing ReactQuill styles

const LocationsAddEdit = ({ onSaveLocation, location, projectId }) => {
  const [locationName, setLocationName] = useState(location?.location_name || '');
  const [locationTrigger, setLocationTrigger] = useState(location?.location_trigger || 'Location Entry');
  const [locationPosition, setLocationPosition] = useState(location?.location_position || '(27.4975,153.013276)');
  const [scorePoints, setScorePoints] = useState(location?.score_points || 5);
  const [clue, setClue] = useState(location?.clue || '');
  const [locationContent, setLocationContent] = useState(location?.location_content || '');
  
  const clearInputs = () => {
    setLocationName('');
    setLocationTrigger('Location Entry');
    setLocationPosition('(27.4975,153.013276)');
    setScorePoints(5);
    setClue('');
    setLocationContent('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = {
      location_name: locationName,
      location_trigger: locationTrigger,
      location_position: locationPosition,
      score_points: scorePoints,
      clue: clue,
      location_content: locationContent,
      project_id: projectId
    };
    console.table(newLocation)
    onSaveLocation(newLocation); // Call the parent component's save function
    clearInputs()
  };

  return (
    <div className="container p-5 text-dark">
      <h2 className="text-center mb-4">Project Location</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label className="form-label">Clue</label>
          <textarea 
            className="form-control" 
            value={clue} 
            onChange={(e) => setClue(e.target.value)} 
          />
          <div className="form-text">Enter the clue that leads to the next location (optional).</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Location Content</label>
          <ReactQuill 
            value={locationContent} 
            onChange={setLocationContent} 
          />
          <div className="form-text">Provide additional content displayed when participants reach this location. Images must be small and in base64 format.</div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">{location ? 'Save Changes' : 'Add Location'}</button>
        </div>
      </form>
    </div>
  );
};

LocationsAddEdit.propTypes = {
  onSaveLocation: PropTypes.func,
  location: PropTypes.object,
  projectId: PropTypes.string
};

export default LocationsAddEdit;
