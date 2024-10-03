import { useParams } from "react-router-dom";
import { getLocations, getLocation, getProject, locationSort } from "./RESTful";
import { useState, useEffect } from "react";

const Preview = () => {
    const { projectId } = useParams(); // Retrieve the projectId from the URL
    const [project, setProject] = useState({});
    const [locations, setLocations] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState(""); // State to manage selected location
    const [targetLocation, setTargetLocation] = useState({})

    useEffect(() => {
        const fetchProject = async () => {
            const myProjects = await getProject(projectId);
            setProject(myProjects);
        };
        const fetchLocations = async () => {
            setLocations((await getLocations(projectId)).sort(locationSort));
        };
        fetchProject();
        fetchLocations();
    }, [projectId, setSelectedLocationId]);

    // Fetch the location details when selectedLocationId changes
    //useEffect(() => {
    //    const fetchLocation = async () => {
    //        const location = await getLocation(selectedLocationId);
    //        setTargetLocation(location);
    //    };
    //
    //    fetchLocation();
    //}, [selectedLocationId]);

    const handleLocationChange = (e) => {
        setSelectedLocationId(e.target.value);
    };

    return (
        <div className="container-fluid p-5 text-light" style={{ backgroundColor: '#1d1d1d' }}>
            <h2 className="display-4 fw-bold mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {`Preview for Project ${projectId}`}
            </h2>
            
            {/* Dropdown below the header */}
            <div className="d-flex justify-content-center mb-4">
                <select
                    className="form-select form-select-lg w-auto"  // Smaller dropdown size
                    value={selectedLocationId}
                    onChange={handleLocationChange} // Adjust the font size to make it smaller
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
                    backgroundColor: "#444", // Changed to a lighter color
                    borderRadius: "30px",
                    position: "relative",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                    }}
                    className="d-flex flex-column justify-content-between p-3"
                >
                    {/* Smartphone Screen */}
                    <div
                    style={{
                        width: "100%",
                        height: "90%",
                        backgroundColor: "#1d1d1d",
                        borderRadius: "30px 30px 0 0",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                    }}
                    >
                    <h3>Smartphone Screen</h3>
                    <h3>{selectedLocationId}</h3>
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
                        transform: "translateX(-50%)",
                    }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Preview;
