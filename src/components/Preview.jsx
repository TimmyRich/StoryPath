import { useParams } from "react-router-dom";


const Preview = () => {
    const { projectId } = useParams(); // This will retrieve the projectId from the URL
    
    return (
      <div className="container-fluid text-light px-5" style={{ backgroundColor: '#1d1d1d' }}>
        <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>{`Preview for project ${projectId}`}</h2>
      </div>
    );
  };
  
  export default Preview;