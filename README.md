# StoryPath

**StoryPath** is a web application designed to help users create and manage location-based experiences. Users can build projects, upload locations, and preview their stories seamlessly.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [GenAI Usage](#genai-usage)
  
## Features

- Create and manage projects
- Upload and organize locations
- Preview created story paths
- User-friendly interface with responsive design

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **React Router**: For navigation between different pages
- **Bootstrap**: For styling and responsive design
- **RESTFul API**: For storing and retreiving project/location objects to and from the database

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/TimmyRich/storypath.git
   cd storypath
2. Install dependencies
   ```bash
    npm install
4. Run webpage
   ```bash
   npm run dev

## GenAI Usage

- Used to re-style website homepage to a dark mode theme; prompt: "Restyle my Home component to use darker colours\n\n<-code goes here->"
- Used to help create WYSIWYG editor that handles images as base64; prompt: "How do I implement a WYSIWYG editor using react-quill that handles images as BASE64 text?"
- Used to add additional comments and docstrings where appropriate or missing; prompt: "Where appropriate add comments and function docstrings:\n\n<-code goes here->
- Used to generate a README template; prompt: "Generate a template for a README.md for my project"

