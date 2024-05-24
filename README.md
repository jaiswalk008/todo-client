Here's a revised version of the instructions for setting up the client side for the Todo app locally:

1. **Clone the repository**:
```bash
git clone https://github.com/jaiswalk008/todo-client
```

2. **Change into the project directory**:
```bash
cd todo-client
```

3. **Install the required dependencies**:
```bash
npm install
```

4. **Start the development server**:
```bash
npm start
```

## Environment Variables

To run this project, you will need to add the following environment variable to your `.env` file:

```
REACT_APP_BACKEND_URL=http://localhost:4000
```
Ensure to replace http://localhost:4000 with the actual Backend URL of your app and after updating the environment variable you need to restart the server.

