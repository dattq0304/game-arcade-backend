This is a simple server built with Express to allow you to work with APIs in your web application.

# Installation

To install the server, follow these steps:

1. Clone the repository to your machine.

```
git clone https://github.com/your_username/server-express.git
```

2. Install the dependencies using npm.

```
cd server-express
npm install
```

# Usage

To run the server, run the following command:

```
npm start

```

The server will run on port 3001, you can access it at http://localhost:3001 to check.

# Directory Structure

The root directory of this Express server includes the following files and folders:

- package.json: Contains information about the dependencies and scripts of the application.
- server.js: The main file of the application, where the server and middleware are initialized.
- routes/: Contains route files for the application.
- controllers/: Contains controller files to handle client requests.
- models/: Contains model files to access and interact with the database.
- middlewares/: Contains middleware files to handle requests before they are passed to the controllers.
- config/: Contains configuration files for the application.

# References

[MDN Web Docs: Express/Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
