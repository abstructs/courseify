### Stuff about the frontend

## Development
# For development we use the webpack development server by running 
```npm run start```

# To run in production, we must first build the app
```npm run build```

# Then we can serve the production ready build with
```PORT=(INSERT PORT # HERE) node server.js```

# For the app to work you must setup a .env file with a link to the API url
```REACT_APP_API_URL=(INSERT API URL HERE)```

# Setup for .env can be done as follows:
```touch .env```

```echo "REACT_APP_API_URL=localhost:3000" >> .env```