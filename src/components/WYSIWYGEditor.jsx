import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importing Quill styles

const WYSIWYGEditor = ({ content, onChange }) => {

  useEffect(() => {
    if (content) {
      onChange(content);
    }
  }, [content, onChange]);

  
  const handleChange = (value) => {
    onChange(value); // Save content to the parent component
  };

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleChange}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }], // Headings
            ['bold', 'italic', 'underline'], // Text formatting
            ['link', 'image'], // Link and image
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            [{ color: [] }, { background: [] }], // Text color and background color
            ['clean'], // Clear formatting
          ],
        }}
      />
    </div>
  );
};

export default WYSIWYGEditor;
