# Costume Kit

## Description
As a tailor and hobbyist costumer, I enjoy sewing and wearing historical and fantasy costumes, but sometimes there is such a variety of garments involved in each outfit that it is hard to keep track of them all, particularly because some garments are used for more than one outfit. So I have made this React app that will help me keep track of all my costume outfits and which garments are included in each. Users can add outfits to their account, manage the garments in each, and see all the garments in the database for inspiration or to add to their own outfit(s). I used Bootstrap for layout and styling and React Router DOM for routing; I also developed the web API in C#/.NET and the database using T-SQL.

## Screenshots
The home page shows the user's outfits:
![Home page](https://raw.githubusercontent.com/jthielman/costumekit/master/screenshots/main_view.png)

Clicking on one outfit will show that outfit's page:
![Outfit page](https://raw.githubusercontent.com/jthielman/costumekit/master/screenshots/outfit_view.png)

And there is a page to show all garments in the database:
![Garments page](https://raw.githubusercontent.com/jthielman/costumekit/master/screenshots/garments_view.png)

## Technologies used:
HTML, SCSS, JavaScript, Version Control with Github, Webpack, React, C#, ASP.NET Core 3.1, Dapper, T-SQL

## How to Run
- Clone down this project
- At the root of the project run the following command: `npm install`
- You will need to set up a database to run locally (run the script in `CostumeKitDatabaseScript.sql` in SQL Server) and add the api keys of that database to a file in this project called `src/helpers/apiKeys.json`, using the example of `src/helpers/apiKeys.example.json`.
- Then run this command: `npm start`
- A window or tab should automatically open in your browser.

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
