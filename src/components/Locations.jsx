import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getLocations, deleteLocation, createLocation, editLocation, locationSort } from "./RESTful";
import LocationsAddEdit from "./LocationsAddEdit";
import QRCode from "react-qr-code";

const Locations = () => {
  const { projectId } = useParams(); // This will retrieve the projectId from the URL
  const [locations, setLocations] = useState([]);
  const [targetLocation, setTargetLocation] = useState({});
  const [showQRCodes, setShowQRCodes] = useState(false);

  // Fetch all locations from the database and add them to the locations list
  useEffect(() => {
    const fetchLocations = async () => {
      const myLocations = await getLocations(projectId);
      setLocations(myLocations.sort(locationSort)); // Sort locations after fetching
    };
    fetchLocations();
  }, [projectId]);

  // Toggle visibility of QR codes
  const toggleQRCodes = () => {
    setShowQRCodes(!showQRCodes);
  };

  /**
   * Remove a location from the local state and the database.
   * @param {Object} removedLocation - The location object to be removed.
   */
  const removeLocation = async (removedLocation) => {
    let locationId = removedLocation.id;

    // Adjust the order for locations above the removed location
    const newLocations = [...locations].map(location => {
      if (location.location_order > removedLocation.location_order) {
        return { ...location, location_order: location.location_order - 1 };
      } else {
        return location;
      }
    }).filter(location => location.id !== locationId)
    .sort(locationSort);
    
    setLocations(newLocations); // Update local state
    try {
      await deleteLocation(locationId); // Remove from API
    } catch (error) {
      console.error('Error removing location', error);
    }
  };

  /**
   * Add a new location to the API and update the local state.
   * @param {Object} newLocation - The location object to be added.
   */
  const addLocation = async (newLocation) => {
    newLocation.location_order = getNextOrder(); // Set order for new location
    try {
      const addedLocation = await createLocation(newLocation); // Post to API
      setLocations([...locations, addedLocation[0]].sort(locationSort)); // Update state
    } catch (error) {
      console.error('Error creating location', error);
    }
  };

  /**
   * Update a location in the API and refresh the local state.
   * @param {Object} targetLocation - The location object to be edited.
   */
  const changeLocation = async (targetLocation) => {
    try {
      await editLocation(targetLocation.id, targetLocation); // Update in API
      setLocations((await getLocations(projectId)).sort(locationSort)); // Refresh local state
    } catch (error) {
      console.error('Error editing location', error);
    }
  };

  /**
   * Get the next order number for a new location.
   * @returns {number} - The next order number.
   */
  const getNextOrder = () => {
    return locations.length ? locations[locations.length - 1].location_order + 1 : 0; // Calculate next order
  };

  /**
   * Change the order of a location in the list.
   * @param {Object} targetLocation - The location object whose order is to be changed.
   * @param {number} delta - The amount to change the order by (1 or -1).
   */
  const changeOrder = (targetLocation, delta) => {
    // Ensure that order changes only by one position at a time
    if (delta * delta !== 1) {
      console.error('Must only change order one place at a time');
      return;
    }

    // Find the location to swap with
    let otherLocation = locations.find(location => location.location_order === targetLocation.location_order + delta);
    if (otherLocation === undefined) {
      console.error('Could not find other location');
      return;
    }

    // Swap their orders
    let temp = targetLocation.location_order;
    targetLocation.location_order = otherLocation.location_order;
    otherLocation.location_order = temp;

    // Make changes to the database
    changeLocation(targetLocation);
    changeLocation(otherLocation);
    setLocations([...locations].sort(locationSort)); // Update local state
  };

  return (
    <div className="container-fluid p-5 text-light" style={{ backgroundColor: '#1d1d1d' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Project Locations</h2>
        <div className="btn-group">
          <button className="btn btn-large btn-success" onClick={toggleQRCodes}> Print Qr Codes</button>
          <NavLink 
            to={`/Preview/${projectId}`} 
            type="button" 
            className="btn btn-dark-yellow text-light"
            style={{
              backgroundColor: '#c8a700',
              border: 'none',
            }}>Preview</NavLink>
        </div>
      </div>

      <ul className="list-group">
        {locations.map((location, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light mb-2 rounded">
            <div>
              <h5 className="mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{location.location_name}</h5>
              <p className="mb-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>{`Trigger: ${location.location_trigger}`}</p>
              <p className="mb-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>{`Location: ${location.location_position}`}</p>
              <p className="mb-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>{`Points: ${location.score_points}`}</p>
              <p className="mb-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>{`Order: ${location.location_order}`}</p>
            </div>
            <div className="btn-group" role="group" aria-label="Location actions">
              <button 
                type="button" 
                className="btn btn-outline-light"
                onClick={() => changeOrder(location, -1)}>
                &uarr;
              </button>
              <button 
                type="button" 
                className="btn btn-outline-light"
                onClick={() => changeOrder(location, 1)}>
                &darr;
              </button>
              <button 
                type="button" 
                className="btn btn-outline-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#LocationEdit"
                onClick={() => setTargetLocation(location)}>
                Edit
              </button>
              <button 
                type="button" 
                className="btn btn-outline-danger" 
                onClick={() => removeLocation(location)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#LocationAdd">
        Add Location
      </button>

      <div className="modal fade" id="LocationAdd" tabIndex="-1" aria-labelledby="LocationAddEditLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title text-dark" id="LocationAddEditLabel">Location Add Form</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <LocationsAddEdit onSaveLocation={addLocation} projectId={projectId} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="LocationEdit" tabIndex="-1" aria-labelledby="LocationAddEditLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title text-dark" id="LocationAddEditLabel">Location Edit Form</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <LocationsAddEdit onSaveLocation={changeLocation} location={targetLocation} projectId={projectId} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    
      {showQRCodes && (
        <div className="container mt-5 p-4 bg-light">
          <h3>QR Codes</h3>
          {locations.map((location, index) => (
            <div key={index} className="mb-3">
              <QRCode value={`${projectId}|${location.id}|${location.score_points}`} />
              <p>{location.location_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locations;
