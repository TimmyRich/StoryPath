/**
 * Footer component that displays copyright information and a tagline for the StoryPath application.
 * It is styled with a dark background and light text.
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="d-flex justify-content-center">
        {/* Display the current year and the StoryPath tagline */}
        <p>&copy; {new Date().getFullYear()} StoryPath. For Better Location Based Experiences</p>
      </div>
    </footer>
  );
}

export default Footer;
