# Project: Organize

## Description
OrganizeMe is a task and time management application designed to help users stay organized and productive. With OrganizeMe, users can efficiently manage their tasks, set reminders, and track their progress towards their goals.

## Features
### Task Management
- Create, edit, and delete tasks
- Organize tasks into categories or projects
- Set due dates and priorities for tasks
- Mark tasks as complete
- Set reminders for important deadlines or events

### Customization
- Customize task categories, labels, and priorities
- Choose from different themes or color schemes


### Journal
- Reflect and write thoughts down  
- Use prompts generated for guidance


## Installation Guide
To run this application, there are 3 main components that would be hosted on seperate areas. 

### Database 
The database uses mysql on the online service known as TiDB. this service allows remote hosting of database up to 5GB instead of a localhost. Allowing easy access from many users as long as the database details are provided

https://tidbcloud.com/console/clusters

The database that details are

Host: gateway01.ap-southeast-1.prod.aws.tidbcloud.com
Port: 4000
Username: 2pT3FsZNMW7qPr5.root
Password: ASK ME FOR THE PASSWORD
CA: This is the SSL certificate that is required to access the DB(isrgrootx1.pem)

You can also take a look at the current DB architecture here on lucidchart:
https://lucid.app/lucidchart/ae6a6f72-25eb-49ab-b2c1-72329801ac08/edit?viewport_loc=480%2C-160%2C2524%2C1167%2C0_0&invitationId=inv_56ac4242-9372-4467-95e8-4e1db7409063

### Backend
The backend will be hosted on replit for easy access as well from multiple parties

Public Link: https://replit.com/@Aw-ShaoShao/organzieAPI#index.js
Ask me to add for editor.


### Front End 
The front end will use react and it will be handled here. It will contain both the actual application as well as the marketing site.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
