import { useState, useEffect} from "react"
import { useParams, NavLink } from "react-router-dom";
import { getLocations, deleteLocation, createLocation, editLocation } from "./RESTful"
import LocationsAddEdit from "./LocationsAddEdit";
import QRCode from "react-qr-code";


const Locations = () => {
  const { projectId } = useParams(); // This will retrieve the projectId from the URL
  const [locations, setLocations] = useState([])
  const [targetLocation, setTargetLocation] = useState({})
  const [showQRCodes, setShowQRCodes] = useState(false)

  // Fetch all locations from database and add them to locations list
  useEffect(() => {
    const fetchLocations = async () => {
      const myLocations = await getLocations(projectId);
      setLocations(myLocations.sort(locationSort));
    };
    fetchLocations();
  }, [projectId]);

  const toggleQRCodes = () => {
    setShowQRCodes(!showQRCodes)
  }

  // Remove project with the given project ID and remove from local projects list and the API database
  const removeLocation = async (removedlocation) => {
    let locationId = removedlocation.id

    // Adjust the order for locations above the removed location
    const newLocations = [...locations].map(location => {
      if (location.location_order > removedlocation.location_order) {
        return {...location, location_order: location.location_order - 1}
      } else
      return location
    }).filter(location => location.id !== locationId)
    .sort(locationSort)
    setLocations(newLocations);
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
      setLocations((await getLocations(projectId)).sort(locationSort))
    } catch (error) {
      console.error('Error editing location', error);
    }
  };

  // Sort Locations by location_order. Should be called when setting locations.
  const locationSort = (location1, location2) => {
    return location1.location_order - location2.location_order
  }

  const getNextOrder = () => {
    return locations.length ? locations[locations.length - 1].location_order + 1 : 0
  }
  
  const changeOrder = (targetLocation, delta) => {
    //we want to swap location with the location that is either above or below it which
    //will mean editing both locations so that they have swapped their location_order
    //property. Then we get an updated list from the database, sort it and then update
    //the local list of locations
    if (delta * delta !== 1) {
      console.error('Must only change order one place at a time')
      return
    }

    //find location in the position we want to move our targetLocation to
    let otherLocation = locations.find(location => location.location_order === targetLocation.location_order + delta);
    if (otherLocation === undefined) {
      console.error('Could not find other location')
      return 
    }
    //swap their orders
    let temp = targetLocation.location_order
    targetLocation.location_order = otherLocation.location_order
    otherLocation.location_order = temp
    //make changes to database
    changeLocation(targetLocation)
    changeLocation(otherLocation)
    setLocations([...locations].sort(locationSort))

  }

  return (
    <div className="container-fluid p-5 text-light" style={{ backgroundColor: '#1d1d1d' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="display-4 fw-bold mb-4 " style={{ fontFamily: 'Roboto, sans-serif' }}>Project Locations</h2>
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
    
      {showQRCodes && (
        <div className="container mt-5 p-4 bg-light rounded shadow">
          <h2 className="text-dark text-center mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>QR Codes</h2>
          <div className="row">
            {locations.map(location => (
              <div key={location.id} className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mb-4">
                <div className="p-3 bg-white rounded shadow-sm">
                  <QRCode value={`locationId=${location.id}&projectId=${projectId}`} size={128} />
                  <p className="text-center text-dark mt-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {location.location_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      
    
    </div>

    

  )
}

export default Locations