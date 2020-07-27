Atrappos Web

Desktop Application for the project Atrappos

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Also, SCSS is compiled automatically.

### Production Build

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### DEPLOY
### `npm install -g serve`
### `serve -s build`

### ENVIRONMENT VARIABLES

* SERVER_URL: `<Atrappos server url>`
* THUNDERFOREST_API_KEY: An api key acquired from [Thunderforest Maps](https://www.thunderforest.com/)
* STADIA_API_KEY: An api key acquired from [Stadia Maps](https://stadiamaps.com/)
* MOBILE_APP_URL: `<Atrappos mobile App url for redirecting>`
* GA_ID: Your [Google Analytics](https://analytics.google.com/analytics/web/) ID


### At Atrappos Server a new environment variable should be added:

CLIENT_URL: `<The hostname of this app>`
