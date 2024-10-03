import { useState } from "react";

const Smartphone = ({project, selectedLocation}) => {
  const [targetLocation, setTargetLocation] = useState(selectedLocation? selectedLocation : null)
    
  return (
      <div
        style={{
          width: "300px",
          height: "600px",
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
          <h3>Loading...</h3>
          <h3>{targetLocation}</h3>
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
    );
  };
  
  export default Smartphone;
  
