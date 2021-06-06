# Linkedin Networker using someone else's network

(Write desc...)

# Configuration

Create a `linkedin-config.js` file with the following structure:

```
const config = {
    creds: {
        email: 'youremail@email.com',
        password: 'yourpassword'
    },
    target_profile: 'https://www.linkedin.com/in/target-person/',
};

module.exports = { config };

```

# Run

First, install the dependencies with:

```
npm i
```

Run the code with:

```
npm start
```
