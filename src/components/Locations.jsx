import { useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import { getLocations, deleteLocation, createLocation, editLocation } from "./RESTful"
import LocationsAddEdit from "./LocationsAddEdit";

const Locations = () => {
  const { projectId } = useParams(); // This will retrieve the projectId from the URL
  const [locations, setLocations] = useState([])
  const [targetLocation, setTargetLocation] = useState({})

  // Fetch all locations from database and add them to locations list
  useEffect(() => {
    const fetchLocations = async () => {
      const myLocations = await getLocations(projectId);
      setLocations(myLocations.sort(locationSort));
    };
    fetchLocations();
  }, [projectId]);

  // Remove project with the given project ID and remove from local projects list and the API database
  const removeLocation = async (locationId) => {
    setLocations([...locations.filter(location => location.id !== locationId)].sort(locationSort));
    try {
      deleteLocation(locationId);
    } catch (error) {
      console.error('Error removing location', error);
    }
  };

   // Take location object and post it to the API database and add to locations list
  const addLocation = async (newLocation) => {
    newLocation.location_order = getNextOrder()
    console.log(`New location is:`)
    console.log(newLocation)
    try {
      const addedLocation = await createLocation(newLocation);
      setLocations([...locations, addedLocation[0]].sort(locationSort));
    } catch (error) {
      console.error('Error creating location', error);
    }
  };

  // Take project object and post it to the API database and add to projects list
  const changeLocation = async (targetLocation) => {
    try {
      await editLocation(targetLocation.id, targetLocation)
      setLocations(await getLocations())
    } catch (error) {
      console.error('Error editing location', error);
    }
  };

  // Sort Locations by location_order. Should be called when setting locations.
  const locationSort = (location1, location2) => {
    return location1.location_order - location2.location_order
  }

  const getNextOrder = () => {
    return locations[locations.length - 1].location_order + 1;
  }

  //const fakeLocations = [{title: "Location 1", description: "Description of Location 1"}, {title: "Location 2", description: "Description of Location 2"}]
  
  return (
    <div className="container-fluid p-5 text-light" style={{ backgroundColor: '#1d1d1d' }}>
      <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Project Locations</h2>
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
              className="btn btn-outline-light">
                &uarr;
              </button>
              <button 
              type="button" 
              className="btn btn-outline-light">
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
              onClick={() => removeLocation(location.id)}>
                Delete
              </button>
              <button 
              type="button" 
              className="btn btn-outline-success">
                Print QR Code
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
              <LocationsAddEdit onSaveLocation={addLocation} projectId={projectId}/>
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

    </div>


  )
}

export default Locations