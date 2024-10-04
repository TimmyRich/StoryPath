import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importing Quill styles

/**
 * WYSIWYGEditor component that renders a rich text editor using React Quill.
 * 
 * This component allows users to edit content with various formatting options 
 * and manages the content state through the parent component via the onChange 
 * prop. It uses an effect to update the editor when the initial content changes.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.content - The current content to be displayed in the editor.
 * @param {Function} props.onChange - Callback function to handle content changes.
 * 
 * @returns {JSX.Element} The rendered WYSIWYGEditor component.
 */
const WYSIWYGEditor = ({ content, onChange }) => {
  // Update the parent component when the content changes
  useEffect(() => {
    if (content) {
      onChange(content);
    }
  }, [content, onChange]);

  /**
   * Handle content change in the editor.
   * 
   * @param {string} value - The new content value from the editor.
   */
  const handleChange = (value) => {
    onChange(value); // Save content to the parent component
  };

  return (
    <div>
      <ReactQuill
        value={content} // Bind the editor value to the content prop
        onChange={handleChange} // Handle content changes
        theme="snow" // Set the Quill theme
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
