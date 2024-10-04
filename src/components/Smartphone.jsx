import { useState } from "react";

/**
 * Smartphone component that simulates a smartphone interface.
 * 
 * This component displays a smartphone-like UI with a screen that 
 * shows the loading state and a target location. It also includes 
 * a home button and a front camera. The target location can be 
 * set based on the selected location prop or initialized as null.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.project - The project object (not currently used in this implementation).
 * @param {string} [props.selectedLocation] - The initially selected location to display on the smartphone screen.
 * 
 * @returns {JSX.Element} The rendered Smartphone component.
 */
const Smartphone = ({ project, selectedLocation }) => {
  // State to manage the target location displayed on the smartphone screen
  const [targetLocation, setTargetLocation] = useState(selectedLocation ? selectedLocation : null);

  return (
    <div
      style={{
        width: "300px",
        height: "600px",
        backgroundColor: "#444", // Dark background color for the smartphone
        borderRadius: "30px",
        position: "relative",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", // Shadow effect for depth
      }}
      className="d-flex flex-column justify-content-between p-3"
    >
      {/* Smartphone Screen */}
      <div
        style={{
          width: "100%",
          height: "90%",
          backgroundColor: "#1d1d1d", // Darker screen background
          borderRadius: "30px 30px 0 0", // Rounded top corners
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)", // Inner shadow effect
        }}
      >
        <h3>Smartphone Screen</h3>
        <h3>Loading...</h3>
        <h3>{targetLocation}</h3> {/* Display the target location */}
      </div>
  
      {/* Home Button */}
      <div
        style={{
          width: "60px",
          height: "10px",
          backgroundColor: "#fff", // White color for the home button
          borderRadius: "5px", // Rounded corners for the button
          margin: "20px auto 0", // Center the button horizontally
        }}
      />
  
      {/* Front Camera */}
      <div
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "#fff", // White color for the camera
          borderRadius: "50%", // Circular camera shape
          position: "absolute",
          top: "20px", // Position the camera near the top
          left: "50%",
          transform: "translateX(-50%)", // Center the camera horizontally
        }}
      />
    </div>
  );
};

export default Smartphone;
