# CineApp - README

CineApp is a movie management and visualization application built with React. It includes Docker for containerization and Electron for a desktop version. Users can register, log in, browse popular movies, add favorites, and filter movies by year, genre, and language.
This is a school project.

## Prerequisites

- Node.js (version 14 or higher)
- Docker (for containerization)
- Electron (for desktop application)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Drakinfer/cine-app
   cd cine-app
   ```

2. Install Node.js Dependencies

```bash
npm install
```

3. Running the Application in Development Mode
To start the application in development mode, run:

    ```bash
    Copier le code
    npm start
    ```
This will start the development server and open the app in your default browser at http://localhost:3000 and launch electron, to open a electron browser.


## Testing
The app uses Jest for unit testing. To run the tests:

```bash
Copier le code
npm test
```
Tests are set up to verify the main components' functionality, including login, registration, and movie display.

## Additional Information
* CI/CD Configuration: The app is set up for continuous integration with GitHub Actions. The CI/CD workflow file is located in .github/workflows/ci.yml.
* Project Structure:
    * src/: Contains React components and pages.
    * public/: Contains static files.
    * .github/workflows/: Contains configuration files for CI/CD.
* Environment Variables: Make sure to configure necessary environment variables, such as API keys, in a .env file if required.

## Acknowledgments
Thank you for using CineApp! Feel free to contribute by submitting PRs and issues.