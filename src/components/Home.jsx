/**
 * Home component that displays the landing page of the StoryPath application.
 * It provides an introduction and instructions for users to start building their location-based experiences.
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  return (
    <div className="container-fluid text-light px-5" style={{ backgroundColor: '#1d1d1d' }}>
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          {/* Main heading for the application */}
          <h1 className="display-3 fw-bold" style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '1px' }}>
            StoryPath
          </h1>
          {/* Subheading that encourages users to start creating experiences */}
          <p className="lead fs-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Start authoring your location-based experiences today!
          </p>
          <hr className="my-4 border-3 border-light w-50" />
          <ul className="list-unstyled">
            {/* List of steps to guide the user */}
            <li className="mb-3">
              <p className="fs-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Start by building your very own project
              </p>
            </li>
            <li className="mb-3">
              <p className="fs-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Upload your chosen locations
              </p>
            </li>
            <li className="mb-3">
              <p className="fs-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Preview your story path and marvel at your creation
              </p>
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          {/* Image section with a hero image */}
          <div className="text-center">
            <img 
              src="src/images/hero_image.jpeg" 
              className="img-fluid rounded shadow-lg" 
              alt="hero image" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
