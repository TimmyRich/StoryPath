import { useParams } from "react-router-dom";
import Smartphone from "./SmartPhone";

const Preview = () => {
    const { projectId } = useParams(); // This will retrieve the projectId from the URL
    
    return (
        <div className="container-fluid p-5 text-light" style={{ backgroundColor: '#1d1d1d' }}>
            <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {`Preview for Project ${projectId}`}
            </h2>
            <div className="d-flex justify-content-center">
                <Smartphone />
            </div>
        </div>
    );
};

export default Preview;
