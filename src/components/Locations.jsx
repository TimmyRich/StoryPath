

const Locations = () => {
  const locations = [{title: "Location 1", description: "Description of Location 1"}, {title: "Location 2", description: "Description of Location 2"}]
  
  return (
    <div className="container-fluid p-5 text-light" style={{ backgroundColor: '#1d1d1d' }}>
      <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Project Locations</h2>
      <ul className="list-group">
        {locations.map((location, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light mb-2 rounded">
            <div>
              <h5 className="mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{location.title}</h5>
              <p className="mb-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>{location.description}</p>
            </div>
            <div className="btn-group" role="group" aria-label="Location actions">
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#LocationEdit">Edit</button>
              <button type="button" className="btn btn-outline-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#LocationAdd">
        Add Location
      </button>
    </div>
  )
}

export default Locations