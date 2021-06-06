# Linkedin Networker using someone else's network

This is a simple tool that I built in a few hours, it uses scraping software, so it can be a bit buggy, but hey, it's free to modify as you wish.
You can use this tool to grow your linkedin network by using the network of one of your connections and automatically send an invitation to everyone on their list. Please use it responsibly.

Also note, fyi, linkdin has a weekly cap of 100 requests to cap bots like this.

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
