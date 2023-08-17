# Gym Tracker 0.3 - Still Under Developement (Does NOT fully work)
****

This is an app to track your gym progress and visualize it 

## Disclaimer
Currently, this is ONLY a project to practice my software skills.
I am not responsible for any data leaks, security breaches, or other issues that might arise from its use. 
Please **REFRAIN** from using important usernames or passwords! 


## Completed Features

- Sign-In / Login to save progress to the cloud 
- Currently supports only push, pull and leg split
- Import data from Apple notes?

## Work in Progress Features
- Uploading Progress Data
- Visualize Progress

## Technical Features

### Server Side
- User Auth System which encrypts data with salt before saving to MongoDB
- Returns a cookie which saves user login info for next use

### Client Side
- Converts gym progress from notes which is based on a set schema to JSON
- Password requirements (character min limit) are checked by client for now



## Modules used
- [Next.js](https://nextjs.org/) - Built on top of React, makes routing easier
- [node.js](https://nodejs.org/en) - Run time environment using JS
- [Sakura CSS](https://github.com/oxalorg/sakura) - Simple and clean CSS
- [MongoDB](https://www.mongodb.com/) - Free for testing and easy to use Database service
- [Chart.js](https://www.chartjs.org/) - All graphs/visuals are produced using this

## Installation

Make an .env.local file and add a varible DATABASE_URL for the DB link

```sh
cd gym tracker
npm i
npm run dev
```

## License

MIT

**Please credit me!**