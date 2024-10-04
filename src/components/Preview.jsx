import { resolvePath, useParams } from "react-router-dom";
import { getLocations, getLocation, getProject, locationSort } from "./RESTful";
import { useState, useEffect } from "react";

const Preview = () => {
    const { projectId } = useParams(); // Retrieve the projectId from the URL
    const [project, setProject] = useState({});
    const [locations, setLocations] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState(""); // State to manage selected location
    const [targetLocation, setTargetLocation] = useState({}); // State for the selected location's data
    const [score, setScore] = useState(0);
    const [visited, setVisited] = useState(0);
    const [locationsVisited, setLocationsVisited] = useState([]);

    // Fetch the project and the list of locations when the component mounts
    useEffect(() => {
        const fetchProject = async () => {
            const myProject = await getProject(projectId);
            setProject(myProject[0]);
        };
        const fetchLocations = async () => {
            setLocations((await getLocations(projectId)).sort(locationSort));
        };
        fetchProject();
        fetchLocations();
    }, [projectId]);

    const maxScore = locations.reduce((total, location) => total + (location.score_points || 0), 0);

    const handleLocationChange = (e) => {
        const locationId = e.target.value;
        const selectedLocation = locations.find(location => location.id == locationId);
        
        // Update selected location state
        setSelectedLocationId(locationId);
        setTargetLocation(selectedLocation);

        // Pass the selected location's score points directly to updatePlayerScore
        updatePlayerScore(locationId, selectedLocation?.score_points || 0);
    };

    const updatePlayerScore = (locationId, scorePoints) => {
        // Check if locationId is already visited
        if (locationsVisited.find(id => id === locationId)) {
            return;
        }
        // Check if this is the homescreen
        if (locationId === "") {
            return;
        }

        // Update the score and visited count
        setScore(prevScore => prevScore + scorePoints);
        setVisited(prevVisited => prevVisited + 1);

        // Update the locationsVisited array with the new locationId
        setLocationsVisited(prevLocationsVisited => [...prevLocationsVisited, locationId]);
    };

    return (
        <div className="container-fluid p-5 text-light" style={{ backgroundColor: '#1d1d1d' }}>
            <h2 className="display-4 fw-bold mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {`Preview for Project: ${project.title}`}
            </h2>
            
            {/* Dropdown below the header */}
            <div className="d-flex justify-content-center mb-4">
                <select
                    className="form-select form-select-lg w-auto"
                    value={selectedLocationId}
                    onChange={handleLocationChange}
                >
                    <option value="">Homescreen</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.location_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Smartphone */}
            <div className="d-flex justify-content-center">
                <div
                    style={{
                        width: "450px",
                        height: "900px",
                        backgroundColor: "#444",
                        borderRadius: "30px",
                        position: "relative",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                    }}
                    className="d-flex flex-column justify-content-between p-3"
                >
                    {/* Smartphone Screen */}
                    <div style={{
                            width: "100%",
                            height: "3%"
                        }}/>
                    <div
                        style={{
                            width: "100%",
                            height: "97%",
                            backgroundColor: "#1d1d1d",
                            borderRadius: "30px 30px 0 0",
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between", // Space the elements vertically
                            alignItems: "center",
                            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                            padding: "20px", // Padding for internal elements
                        }}
                    >
                        <div style={{
                            backgroundColor: "#007bff",
                            borderRadius: "50px",
                            padding: "10px 20px",
                            color: "white",
                            display: "inline-block",
                            textAlign: "center",
                            marginTop: "10px"
                        }}>
                            <h2>{`${project.title}`}</h2>
                        </div>
                        {/* Conditionally render location_content or a loading message */}
                        {/* Content Area */}
                        <h3 style={{ margin: "10px 0" }}>{targetLocation?.location_name || "Homescreen"}</h3> {/* Display the selected location's name */}
                        {selectedLocationId ? (
                            <div 
                                className="text-dark"
                                style={{
                                    height: "50%",
                                    width: "100%",
                                    overflowY: "auto", // Allow scrolling if content is too long
                                    backgroundColor: "#ffffff", // Conditional background
                                    borderRadius: "10px",
                                    padding: "15px",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Conditional shadow
                                    marginTop: "10px",
                                }}
                            >
                                {targetLocation?.location_content ? (
                                    <div
                                        dangerouslySetInnerHTML={{ __html: targetLocation.location_content }}
                                    />
                                ) : (
                                    <div>
                                        {/* Optional loading message or homescreen content */}
                                        <p className="text-dark text-center">No content available</p>
                                    </div>
                                )}
                                
                            </div>
                        ) : ( project.homescreen_display === "Display all locations" ? (
                            <div>
                                {/* Homescreen Content */}
                                {locations.map((location) => (
                                    <div
                                    className="container"
                                    key={location.id}
                                    style={{
                                        display: "inline-block",
                                        backgroundColor: "#007bff", // Blue background color
                                        borderRadius: "50px", // Make it pill-shaped
                                        padding: "10px 20px", // Padding for some space
                                        color: "white", // Text color
                                        margin: "5px", // Space between pills
                                        textAlign: "center", // Center the text
                                        fontSize: "16px", // Font size
                                    }}
                                >
                                    <h4 style={{ margin: 0 }}>{`${location.location_name}`}</h4>
                                </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <h3>Instructions</h3>
                                <p>{`${project.instructions}`}</p>
                                <h3>Initial Clue</h3>
                                <p>{`${project.initial_clue}`}</p>
                            </div>
                        ))} 
                        <h4>{`${targetLocation?.clue ? `Clue for next location:\n${targetLocation.clue}` : ""}`}</h4>
                        
                        {/* Scoring/Visited */}
                        <div style={{
                            backgroundColor: "#007bff",
                            borderRadius: "50px",
                            padding: "10px 20px",
                            color: "white",
                            display: "inline-block",
                            textAlign: "center",
                            marginTop: "10px"
                            }}>
                            <h3>
                                {project.participant_scoring == 1 && 
                                    `Score: ${score}/${maxScore} `}
                                {project.participant_scoring != 0 && 
                                    `Visited: ${visited}/${locations.length}`}
                            </h3>
                        </div>
                    </div>
                
                    {/* Home Button */}
                    <div
                        style={{
                            width: "60px",
                            height: "10px",
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            margin: "20px auto 0", // Centering the button
                        }}
                    />
                
                    {/* Front Camera */}
                    <div
                        style={{
                            width: "15px",
                            height: "15px",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "20px",
                            left: "50%",
                            transform: "translateX(-50%) translateY(-30%)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Preview;
