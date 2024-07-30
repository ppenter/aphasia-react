# AphasiaTalk

 AphasiaTalk is a cross-platform application built using CapacitorJS and Yarn. It allows you to develop, build, and export your application to various platforms (iOS, Android, Web) seamlessly.

# Table of Contents
- [AphasiaTalk](#aphasiatalk)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Development](#development)

## Prerequisites
- Node.js (>= 20)
- Yarn (>= 2.x)
- Capacitor CLI (>= 5.x)

*Ensure you have these tools installed before proceeding.*

## Getting Started
### Installation

To get started, clone the repository and install the dependencies using Yarn:

```bash
yarn install
```
This will install all the necessary packages required for the project.

### Development
To start the development server and begin working on the application:

```bash
yarn dev
```
This will start a local development server, allowing you to view your application in the browser with live reloading.

### Building and Exporting
To build the application and prepare it for deployment on various platforms, use the following command:

```bash
yarn export
```
This command will:

- Build the project
- Copy the built assets to the Capacitor native projects
- Sync the changes with the native projects
Internally, yarn export runs the following commands:

```bash
yarn build && npx cap copy && npx cap sync
```

### Additional Capacitor Commands
You may need to run additional Capacitor commands depending on your specific use case. Here are a few commonly used ones:

Open the iOS project in Xcode:

```bash
npx cap open ios
```
Open the Android project in Android Studio:

```bash
npx cap open android
```
Update Capacitor plugins:

```bash
npx cap update
```

## Project Structure
- `src/`: Contains the source code for your application.
- `public/`: Contains static assets and the main HTML file.
- `android/`: Android native project.
- `ios/`: iOS native project.

## Contributing
If you would like to contribute to this project, please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and include relevant tests.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any inquiries or support, please contact [jarupak.sri@gmail.com].